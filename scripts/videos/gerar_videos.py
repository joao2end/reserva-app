import argparse
import hashlib
import json
import math
import os
import subprocess
import sys
import tempfile
import time
import urllib.request
import wave

import numpy as np

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TAXA = 22050
QUADROS_POR_SEGUNDO = 24
LARGURA, ALTURA = 1280, 720
INICIO_FALA = 0.45
FOLGA_FIM = 0.75
ARQUIVOS_DO_MOTOR = [
    "video/Filme.vue",
    "src/presentation/components/CenaDesenhada.vue",
    "src/presentation/components/IlustracaoCena.vue",
    "src/presentation/desenhos.ts",
    "scripts/videos/gerar_videos.py",
]


def sha256_de_arquivo(caminho: str) -> str:
    with open(caminho, "rb") as arquivo:
        return hashlib.sha256(arquivo.read()).hexdigest()


def versao_do_motor() -> str:
    resumo = hashlib.sha256()
    for relativo in ARQUIVOS_DO_MOTOR:
        with open(os.path.join(RAIZ, relativo), "rb") as arquivo:
            resumo.update(arquivo.read())
    return resumo.hexdigest()[:16]


def carregar_roteiros() -> list[dict]:
    saida = subprocess.run(["npx", "tsx", "video/roteiros.ts"], cwd=RAIZ, capture_output=True, text=True, check=True)
    return json.loads(saida.stdout)


def impressao_digital(roteiro: dict, motor: str, voz: str) -> str:
    base = json.dumps({"conteudo": roteiro["conteudo"], "falas": [t["fala"] for t in roteiro["trechos"]], "motor": motor, "voz": voz})
    return hashlib.sha256(base.encode()).hexdigest()[:20]


class Narrador:
    def __init__(self, modelo: str | None):
        self.voz = None
        self.configuracao = None
        if modelo:
            from piper import PiperVoice

            self.voz = PiperVoice.load(modelo)
            try:
                from piper import SynthesisConfig

                self.configuracao = SynthesisConfig(length_scale=1.08)
            except ImportError:
                self.configuracao = None

    def falar(self, texto: str) -> np.ndarray:
        if self.voz is None:
            return np.zeros(int(TAXA * max(1.5, len(texto) / 15)), dtype=np.float32)
        with tempfile.NamedTemporaryFile(suffix=".wav") as temporario:
            with wave.open(temporario.name, "wb") as destino:
                if self.configuracao is not None:
                    self.voz.synthesize_wav(texto, destino, syn_config=self.configuracao)
                else:
                    self.voz.synthesize_wav(texto, destino)
            with wave.open(temporario.name, "rb") as origem:
                taxa = origem.getframerate()
                amostras = np.frombuffer(origem.readframes(origem.getnframes()), dtype=np.int16).astype(np.float32) / 32768
        if taxa != TAXA:
            posicoes = np.linspace(0, len(amostras) - 1, int(len(amostras) * TAXA / taxa))
            amostras = np.interp(posicoes, np.arange(len(amostras)), amostras).astype(np.float32)
        return amostras


def nota(frequencia: float, duracao: float, volume: float) -> np.ndarray:
    tempo = np.arange(int(TAXA * duracao)) / TAXA
    envelope = np.minimum(1, tempo / 0.9) * np.minimum(1, (duracao - tempo) / 1.2)
    onda = np.sin(2 * np.pi * frequencia * tempo) + 0.3 * np.sin(4 * np.pi * frequencia * tempo) + 0.12 * np.sin(6 * np.pi * frequencia * tempo)
    return (onda * envelope * volume).astype(np.float32)


def sino(frequencia: float, volume: float) -> np.ndarray:
    tempo = np.arange(int(TAXA * 1.6)) / TAXA
    return (np.sin(2 * np.pi * frequencia * tempo) * np.exp(-tempo * 3.2) * volume).astype(np.float32)


ACORDES = [
    [261.63, 329.63, 392.00],
    [220.00, 261.63, 329.63],
    [174.61, 220.00, 261.63],
    [196.00, 246.94, 293.66],
]


def trilha(segundos: float) -> np.ndarray:
    total = int(TAXA * segundos)
    musica = np.zeros(total + TAXA * 5, dtype=np.float32)
    compasso = 4.0
    for indice in range(math.ceil(segundos / compasso)):
        acorde = ACORDES[indice % len(ACORDES)]
        inicio = int(indice * compasso * TAXA)
        for frequencia in acorde:
            som = nota(frequencia / 2, compasso + 0.8, 0.06)
            musica[inicio : inicio + len(som)] += som
        for passo, frequencia in enumerate(acorde + [acorde[1]]):
            som = sino(frequencia * 2, 0.035)
            comeco = inicio + int(passo * TAXA)
            musica[comeco : comeco + len(som)] += som
    musica = musica[:total]
    entrada = np.minimum(1, np.arange(total) / (TAXA * 1.5))
    saida = np.minimum(1, (total - np.arange(total)) / (TAXA * 2.0))
    return musica * entrada * saida


def montar_audio(falas: list[np.ndarray], duracoes: list[float]) -> np.ndarray:
    total = sum(duracoes)
    voz = np.zeros(int(TAXA * total) + TAXA, dtype=np.float32)
    inicio = 0.0
    for fala, duracao in zip(falas, duracoes):
        comeco = int((inicio + INICIO_FALA) * TAXA)
        voz[comeco : comeco + len(fala)] += fala
        inicio += duracao
    voz = voz[: int(TAXA * total)]
    pico = np.max(np.abs(voz)) or 1
    voz = voz / pico * 0.85
    janela = int(TAXA * 0.25)
    atividade = np.convolve(np.abs(voz) > 0.02, np.ones(janela) / janela, mode="same")
    abaixar = 1 - 0.65 * np.clip(atividade * 3, 0, 1)
    mistura = voz + trilha(total) * abaixar
    return np.clip(mistura / max(1, np.max(np.abs(mistura)) / 0.95), -1, 1)


def salvar_wav(caminho: str, amostras: np.ndarray):
    with wave.open(caminho, "wb") as destino:
        destino.setnchannels(1)
        destino.setsampwidth(2)
        destino.setframerate(TAXA)
        destino.writeframes((amostras * 32767).astype(np.int16).tobytes())


def esperar_servidor(endereco: str):
    for _ in range(60):
        try:
            urllib.request.urlopen(endereco, timeout=2)
            return
        except Exception:
            time.sleep(1)
    raise RuntimeError("O servidor do vídeo não subiu")


def renderizar(pagina, licao_id: str, duracoes: list[float], audio: str, saida: str, endereco: str):
    parametros = f"?licao={licao_id}&duracoes={','.join(f'{d:.3f}' for d in duracoes)}"
    pagina.goto(endereco + parametros)
    pagina.wait_for_function("window.pronto === true", timeout=60000)
    total = sum(duracoes)
    quadros = int(total * QUADROS_POR_SEGUNDO)
    ffmpeg = subprocess.Popen(
        [
            "ffmpeg", "-loglevel", "error", "-y",
            "-f", "image2pipe", "-framerate", str(QUADROS_POR_SEGUNDO), "-c:v", "mjpeg", "-i", "-",
            "-i", audio,
            "-c:v", "libx264", "-preset", "medium", "-crf", "27", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "96k", "-ar", "44100",
            "-shortest", "-movflags", "+faststart", saida,
        ],
        stdin=subprocess.PIPE,
    )
    for quadro in range(quadros):
        pagina.evaluate("t => window.posicionar(t)", quadro / QUADROS_POR_SEGUNDO)
        ffmpeg.stdin.write(pagina.screenshot(type="jpeg", quality=92))
    ffmpeg.stdin.close()
    if ffmpeg.wait() != 0:
        raise RuntimeError(f"ffmpeg falhou em {licao_id}")


def principal():
    argumentos = argparse.ArgumentParser(description="Gera os vídeos narrados das lições")
    argumentos.add_argument("--modelo", help="arquivo .onnx da voz Piper; sem ele, o vídeo sai sem voz")
    argumentos.add_argument("--saida", default=os.path.join(RAIZ, "saida-videos"))
    argumentos.add_argument("--manifesto-anterior")
    argumentos.add_argument("--licoes", nargs="*")
    argumentos.add_argument("--chrome")
    opcoes = argumentos.parse_args()

    os.makedirs(opcoes.saida, exist_ok=True)
    motor = versao_do_motor()
    voz = os.path.basename(opcoes.modelo) if opcoes.modelo else "sem-voz"
    roteiros = carregar_roteiros()
    if opcoes.licoes:
        roteiros = [r for r in roteiros if r["licaoId"] in opcoes.licoes]

    anteriores = {}
    if opcoes.manifesto_anterior and os.path.exists(opcoes.manifesto_anterior):
        with open(opcoes.manifesto_anterior, encoding="utf-8") as arquivo:
            anteriores = {v["licaoId"]: v for v in json.load(arquivo).get("videos", [])}

    pendentes = [r for r in roteiros if anteriores.get(r["licaoId"], {}).get("impressao") != impressao_digital(r, motor, voz)]
    print(f"{len(roteiros)} lições, {len(pendentes)} para gerar")

    narrador = Narrador(opcoes.modelo)
    novos = {}
    if pendentes:
        from playwright.sync_api import sync_playwright

        servidor = subprocess.Popen(
            ["npx", "vite", "--config", "video/vite.config.ts", "--port", "5180", "--strictPort"],
            cwd=RAIZ, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
        )
        endereco = "http://localhost:5180/"
        try:
            esperar_servidor(endereco)
            with sync_playwright() as playwright:
                navegador = playwright.chromium.launch(executable_path=opcoes.chrome) if opcoes.chrome else playwright.chromium.launch()
                pagina = navegador.new_page(viewport={"width": LARGURA, "height": ALTURA})
                for roteiro in pendentes:
                    inicio = time.time()
                    falas = [narrador.falar(trecho["fala"]) for trecho in roteiro["trechos"]]
                    duracoes = [
                        round(max(trecho["minimoSegundos"], INICIO_FALA + len(fala) / TAXA + FOLGA_FIM), 3)
                        for trecho, fala in zip(roteiro["trechos"], falas)
                    ]
                    arquivo = f"{roteiro['licaoId']}.mp4"
                    with tempfile.TemporaryDirectory() as pasta:
                        audio = os.path.join(pasta, "audio.wav")
                        salvar_wav(audio, montar_audio(falas, duracoes))
                        renderizar(pagina, roteiro["licaoId"], duracoes, audio, os.path.join(opcoes.saida, arquivo), endereco)
                    caminho = os.path.join(opcoes.saida, arquivo)
                    novos[roteiro["licaoId"]] = {
                        "licaoId": roteiro["licaoId"],
                        "arquivo": arquivo,
                        "bytes": os.path.getsize(caminho),
                        "sha256": sha256_de_arquivo(caminho),
                        "segundos": round(sum(duracoes), 1),
                        "impressao": impressao_digital(roteiro, motor, voz),
                    }
                    print(f"ok {arquivo}: {sum(duracoes):.0f} s, {os.path.getsize(caminho) // 1024} KB, {time.time() - inicio:.0f} s para gerar", flush=True)
                navegador.close()
        finally:
            servidor.terminate()

    ids = [r["licaoId"] for r in carregar_roteiros()]
    videos = [novos.get(i) or anteriores.get(i) for i in ids]
    manifesto = {"voz": voz, "motor": motor, "videos": [v for v in videos if v]}
    with open(os.path.join(opcoes.saida, "manifesto.json"), "w", encoding="utf-8") as arquivo:
        json.dump(manifesto, arquivo, ensure_ascii=False, indent=1)
    print(f"manifesto com {len(manifesto['videos'])} vídeos")


if __name__ == "__main__":
    sys.exit(principal())

import argparse
import hashlib
import json
import os
import subprocess
import sys
import time
import uuid

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from gerar_videos import RAIZ, carregar_roteiros, salvar_wav, sha256_de_arquivo, trilha

TERMOS = os.path.join(RAIZ, "scripts", "videos", "termos_moneyprinter.json")
VOZ = "pt-BR-AntonioNeural-Male"
AJUSTES = {
    "video_aspect": "16:9",
    "clip": 4,
    "voz": VOZ,
    "velocidade": 0.92,
    "fonte_legenda": "BeVietnamPro-Bold.ttf",
    "tamanho_legenda": 58,
    "volume_trilha": 0.12,
    "saida": "1280x720 crf27",
}


def configurar(pasta_mpt: str, fonte: str):
    import toml

    configuracao = toml.load(os.path.join(pasta_mpt, "config.example.toml"))
    aplicativo = configuracao.setdefault("app", {})
    chaves = {"pexels": "PEXELS_API_KEY", "pixabay": "PIXABAY_API_KEY"}
    if fonte in chaves:
        chave = os.environ.get(chaves[fonte], "").strip()
        if not chave:
            sys.exit(f"Falta a chave {chaves[fonte]}. Crie a chave gratuita e salve como secret do repositório.")
        aplicativo[f"{fonte}_api_keys"] = [chave]
    aplicativo["video_source"] = fonte
    aplicativo["subtitle_provider"] = "edge"
    with open(os.path.join(pasta_mpt, "config.toml"), "w", encoding="utf-8") as arquivo:
        toml.dump(configuracao, arquivo)


def versao_do_mpt(pasta_mpt: str) -> str:
    saida = subprocess.run(["git", "rev-parse", "--short", "HEAD"], cwd=pasta_mpt, capture_output=True, text=True)
    return saida.stdout.strip() or "desconhecida"


def roteiro_falado(roteiro: dict) -> str:
    return "\n".join(trecho["fala"] for trecho in roteiro["trechos"])


def impressao_digital(roteiro: dict, termos: list[str], versao: str) -> str:
    base = json.dumps({"falas": roteiro_falado(roteiro), "termos": termos, "mpt": versao, "ajustes": AJUSTES}, ensure_ascii=False)
    return hashlib.sha256(base.encode()).hexdigest()[:20]


def comando(roteiro: dict, termos: list[str], fonte: str, trilha_wav: str, tarefa: str) -> list[str]:
    return [
        sys.executable, "cli.py",
        "--video-subject", roteiro["titulo"],
        "--video-script", roteiro_falado(roteiro),
        "--video-terms", ",".join(termos),
        "--video-language", "pt-BR",
        "--video-source", fonte,
        "--video-aspect", AJUSTES["video_aspect"],
        "--match-materials-to-script",
        "--video-clip-duration", str(AJUSTES["clip"]),
        "--video-transition-mode", "fade-in",
        "--voice-name", AJUSTES["voz"],
        "--voice-rate", str(AJUSTES["velocidade"]),
        "--bgm-type", "custom",
        "--bgm-file", trilha_wav,
        "--bgm-volume", str(AJUSTES["volume_trilha"]),
        "--subtitle-enabled",
        "--font-name", AJUSTES["fonte_legenda"],
        "--font-size", str(AJUSTES["tamanho_legenda"]),
        "--subtitle-position", "bottom",
        "--subtitle-background-enabled",
        "--text-fore-color", "#FFFFFF",
        "--stroke-color", "#000000",
        "--stroke-width", "2",
        "--task-id", tarefa,
    ]


def video_da_tarefa(pasta_mpt: str, tarefa: str) -> str:
    caminho = os.path.join(pasta_mpt, "storage", "tasks", tarefa, "final-1.mp4")
    if not os.path.exists(caminho):
        raise RuntimeError(f"O MoneyPrinterTurbo não gerou {caminho}")
    return caminho


def compactar(origem: str, destino: str) -> float:
    temporario = destino.replace(".mp4", ".parcial.mp4")
    subprocess.run(
        [
            "ffmpeg", "-v", "error", "-y", "-i", origem,
            "-vf", "scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2",
            "-c:v", "libx264", "-preset", "veryfast", "-crf", "27", "-pix_fmt", "yuv420p",
            "-c:a", "aac", "-b:a", "96k", "-movflags", "+faststart", temporario,
        ],
        check=True,
    )
    os.replace(temporario, destino)
    duracao = subprocess.run(
        ["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", destino],
        capture_output=True, text=True, check=True,
    )
    return float(duracao.stdout.strip())


def principal():
    argumentos = argparse.ArgumentParser(description="Gera os vídeos das lições com o MoneyPrinterTurbo")
    argumentos.add_argument("--mpt", required=True, help="pasta do MoneyPrinterTurbo")
    argumentos.add_argument("--saida", default=os.path.join(RAIZ, "saida-moneyprinter"))
    argumentos.add_argument("--fonte", default="pexels", choices=["pexels", "pixabay"])
    argumentos.add_argument("--manifesto-anterior")
    argumentos.add_argument("--licoes", nargs="*")
    opcoes = argumentos.parse_args()

    os.makedirs(opcoes.saida, exist_ok=True)
    pasta_mpt = os.path.abspath(opcoes.mpt)
    configurar(pasta_mpt, opcoes.fonte)
    versao = versao_do_mpt(pasta_mpt)

    with open(TERMOS, encoding="utf-8") as arquivo:
        termos_por_licao = json.load(arquivo)
    todos = carregar_roteiros()
    titulos = {}
    for roteiro in todos:
        titulos[roteiro["licaoId"]] = json.loads(roteiro["conteudo"])["licao"]["titulo"]
        roteiro["titulo"] = titulos[roteiro["licaoId"]]
    roteiros = [r for r in todos if not opcoes.licoes or r["licaoId"] in opcoes.licoes]
    sem_termos = [r["licaoId"] for r in roteiros if not termos_por_licao.get(r["licaoId"])]
    if sem_termos:
        print(f"Sem termos de busca em termos_moneyprinter.json, ficam de fora: {', '.join(sem_termos)}")
    roteiros = [r for r in roteiros if termos_por_licao.get(r["licaoId"])]

    anteriores = {}
    if opcoes.manifesto_anterior and os.path.exists(opcoes.manifesto_anterior):
        with open(opcoes.manifesto_anterior, encoding="utf-8") as arquivo:
            anteriores = {v["licaoId"]: v for v in json.load(arquivo).get("videos", [])}

    pendentes = [
        r for r in roteiros
        if anteriores.get(r["licaoId"], {}).get("impressao") != impressao_digital(r, termos_por_licao[r["licaoId"]], versao)
    ]
    print(f"{len(roteiros)} lições, {len(pendentes)} para gerar com o MoneyPrinterTurbo {versao}")

    novos = {}
    falhas = []
    pasta_trilha = os.path.join(pasta_mpt, "storage", "bgm")
    os.makedirs(pasta_trilha, exist_ok=True)
    trilha_wav = os.path.join(pasta_trilha, "sbv-trilha.wav")
    musica = trilha(240)
    salvar_wav(trilha_wav, musica / max(1e-6, float(abs(musica).max())) * 0.8)
    for roteiro in pendentes:
        inicio = time.time()
        licao_id = roteiro["licaoId"]
        termos = termos_por_licao[licao_id]
        tarefa = str(uuid.uuid4())
        resultado = subprocess.run(comando(roteiro, termos, opcoes.fonte, trilha_wav, tarefa), cwd=pasta_mpt)
        if resultado.returncode != 0:
            falhas.append(licao_id)
            print(f"falhou {licao_id}", flush=True)
            continue
        arquivo = f"{licao_id}.mp4"
        caminho = os.path.join(opcoes.saida, arquivo)
        segundos = compactar(video_da_tarefa(pasta_mpt, tarefa), caminho)
        novos[licao_id] = {
            "licaoId": licao_id,
            "arquivo": arquivo,
            "bytes": os.path.getsize(caminho),
            "sha256": sha256_de_arquivo(caminho),
            "segundos": round(segundos, 1),
            "impressao": impressao_digital(roteiro, termos, versao),
        }
        print(f"ok {arquivo}: {segundos:.0f} s, {os.path.getsize(caminho) // 1024} KB, {time.time() - inicio:.0f} s para gerar", flush=True)

    ids = [r["licaoId"] for r in todos]
    videos = [novos.get(i) or anteriores.get(i) for i in ids]
    manifesto = {"gerador": f"MoneyPrinterTurbo {versao}", "fonte": opcoes.fonte, "voz": VOZ, "videos": [v for v in videos if v]}
    with open(os.path.join(opcoes.saida, "manifesto.json"), "w", encoding="utf-8") as arquivo:
        json.dump(manifesto, arquivo, ensure_ascii=False, indent=1)
    print(f"manifesto com {len(manifesto['videos'])} vídeos")
    if falhas:
        sys.exit(f"Falharam: {', '.join(falhas)}")


if __name__ == "__main__":
    principal()

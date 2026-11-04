import hashlib
import json
import os
import sys
import time
import urllib.request

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MANIFESTO = os.path.join(RAIZ, "scripts", "videos_reais.json")
DESTINO = os.path.join(RAIZ, "public", "videos")
AGENTE = "SBV-build/1.0 (https://github.com/joao2end/reserva-app)"


def hash_de(caminho: str) -> str:
    with open(caminho, "rb") as arquivo:
        return hashlib.sha256(arquivo.read()).hexdigest()


def baixar(video: dict) -> bool:
    caminho = os.path.join(DESTINO, video["arquivo"])
    if os.path.exists(caminho) and hash_de(caminho) == video["sha256"]:
        print(f"ok (já baixado) {video['arquivo']}")
        return True
    for tentativa in range(1, 4):
        try:
            pedido = urllib.request.Request(video["url"], headers={"User-Agent": AGENTE})
            with urllib.request.urlopen(pedido, timeout=120) as resposta:
                dados = resposta.read()
            if hashlib.sha256(dados).hexdigest() != video["sha256"]:
                print(f"hash diferente em {video['arquivo']} (tentativa {tentativa})")
                continue
            with open(caminho, "wb") as arquivo:
                arquivo.write(dados)
            print(f"ok {video['arquivo']} ({len(dados) // 1024} KB)")
            return True
        except Exception as falha:
            print(f"falhou {video['arquivo']} (tentativa {tentativa}): {falha}")
            time.sleep(5 * tentativa)
    return False


def main() -> int:
    opcional = "--opcional" in sys.argv
    os.makedirs(DESTINO, exist_ok=True)
    with open(MANIFESTO, encoding="utf-8") as arquivo:
        videos = json.load(arquivo)
    falhas = [video["arquivo"] for video in videos if not baixar(video)]
    if falhas:
        print("Não foi possível baixar: " + ", ".join(falhas))
        return 0 if opcional else 1
    print(f"{len(videos)} vídeos prontos em public/videos")
    return 0


if __name__ == "__main__":
    sys.exit(main())

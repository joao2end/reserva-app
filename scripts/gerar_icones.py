import os
import re
import sys

from playwright.sync_api import sync_playwright

RAIZ = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RES = os.path.join(RAIZ, "android", "app", "src", "main", "res")
SVG_ICONE = os.path.join(RAIZ, "node_modules", "@phosphor-icons", "core", "assets", "bold", "package-bold.svg")
CHROME = os.environ.get("CHROME_PATH", "/usr/bin/google-chrome")

DENSIDADES = {"mdpi": 1, "hdpi": 1.5, "xhdpi": 2, "xxhdpi": 3, "xxxhdpi": 4}


def caminho_do_icone() -> str:
    with open(SVG_ICONE, encoding="utf-8") as arquivo:
        return re.search(r'<path d="([^"]+)"', arquivo.read()).group(1)


def pagina_svg(tamanho: int, fundo: str, proporcao_icone: float, redondo: bool) -> str:
    raio = tamanho / 2 if redondo else 0
    lado = tamanho * proporcao_icone
    deslocamento = (tamanho - lado) / 2
    escala = lado / 256
    fundo_svg = f'<rect width="{tamanho}" height="{tamanho}" rx="{raio}" fill="{fundo}"/>' if fundo else ""
    return (
        f'<html><body style="margin:0;background:transparent">'
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{tamanho}" height="{tamanho}">{fundo_svg}'
        f'<path d="{caminho_do_icone()}" fill="#ffffff" transform="translate({deslocamento} {deslocamento}) scale({escala})"/>'
        f"</svg></body></html>"
    )


def principal():
    with sync_playwright() as p:
        navegador = p.chromium.launch(executable_path=CHROME, args=["--no-sandbox"])
        pagina = navegador.new_page()

        def desenhar(destino: str, tamanho: int, fundo: str, proporcao: float, redondo: bool = False):
            pagina.set_viewport_size({"width": tamanho, "height": tamanho})
            pagina.set_content(pagina_svg(tamanho, fundo, proporcao, redondo))
            pagina.screenshot(path=destino, omit_background=True)

        for densidade, fator in DENSIDADES.items():
            pasta = os.path.join(RES, f"mipmap-{densidade}")
            os.makedirs(pasta, exist_ok=True)
            desenhar(os.path.join(pasta, "ic_launcher.png"), round(48 * fator), "#000000", 0.62)
            desenhar(os.path.join(pasta, "ic_launcher_round.png"), round(48 * fator), "#000000", 0.56, redondo=True)
            desenhar(os.path.join(pasta, "ic_launcher_foreground.png"), round(108 * fator), "", 0.40)

        pagina.set_viewport_size({"width": 512, "height": 512})
        pagina.set_content(pagina_svg(512, "#000000", 0.62, False))
        pagina.screenshot(path=os.path.join(RAIZ, "public", "icone-512.png"))
        navegador.close()

    with open(os.path.join(RES, "values", "ic_launcher_background.xml"), "w", encoding="utf-8") as arquivo:
        arquivo.write('<?xml version="1.0" encoding="utf-8"?>\n<resources>\n    <color name="ic_launcher_background">#000000</color>\n</resources>\n')
    print("Ícones gerados em", RES)


if __name__ == "__main__":
    sys.exit(principal())

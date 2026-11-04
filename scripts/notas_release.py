import subprocess
import sys

IGNORAR = ("Co-Authored-By:", "Claude-Session:")


def git(*argumentos: str) -> str:
    return subprocess.run(["git", *argumentos], capture_output=True, text=True).stdout.strip()


def mudancas(faixa: str) -> list[tuple[str, list[str]]]:
    bruto = git("log", "--no-merges", "--reverse", "--format=%s%x1f%b%x1e", faixa)
    lista = []
    for registro in filter(None, (parte.strip() for parte in bruto.split("\x1e"))):
        titulo, _, corpo = registro.partition("\x1f")
        linhas = [linha for linha in corpo.splitlines() if not linha.startswith(IGNORAR)]
        paragrafos = [" ".join(bloco.split()) for bloco in "\n".join(linhas).split("\n\n") if bloco.strip()]
        lista.append((titulo.strip(), paragrafos))
    return lista


def principal(repositorio: str, versao: str) -> None:
    anterior = git("describe", "--tags", "--abbrev=0")
    faixa = f"{anterior}..HEAD" if anterior else "HEAD"
    print("## O que mudou\n")
    for titulo, paragrafos in mudancas(faixa):
        print(f"- **{titulo}**")
        for paragrafo in paragrafos:
            print(f"  {paragrafo}")
        print()
    print("## Como instalar\n")
    print("Baixe o arquivo **.apk** abaixo no celular Android e toque nele para instalar. Se já tiver o app, ele é atualizado sem perder os dados.")
    print("O arquivo **.aab**, quando aparece, é o pacote para enviar à Play Store.\n")
    if anterior:
        print(f"Tudo o que mudou desde {anterior}: {repositorio}/compare/{anterior}...v{versao}")


if __name__ == "__main__":
    principal(sys.argv[1], sys.argv[2])

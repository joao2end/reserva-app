import os
import subprocess
import sys
import time
from datetime import date

from playwright.sync_api import Page, expect, sync_playwright

RAIZ = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
PASTA_TELAS = sys.argv[1] if len(sys.argv) > 1 else os.path.join(RAIZ, "tests", "e2e", "telas")
BASE = "http://localhost:4173/"
CHROME = os.environ.get("CHROME_PATH", "/usr/bin/google-chrome")
HOJE = date.today()

resultados: list[tuple[str, bool, str]] = []
erros_console: list[str] = []


def cenario(nome):
    def decorador(funcao):
        def executar(pagina: Page):
            try:
                funcao(pagina)
                resultados.append((nome, True, ""))
            except Exception as falha:
                resultados.append((nome, False, str(falha).splitlines()[0]))
                pagina.screenshot(path=os.path.join(PASTA_TELAS, f"falha-{len(resultados):02d}.png"), full_page=True)
        return executar
    return decorador


def ir(pagina: Page, rota: str):
    pagina.goto(BASE + rota)
    pagina.reload()
    pagina.wait_for_load_state("networkidle")


def botao(pagina: Page, nome: str):
    return pagina.get_by_role("button", name=nome, exact=True)


def foto(pagina: Page, nome: str):
    pagina.screenshot(path=os.path.join(PASTA_TELAS, f"{nome}.png"), full_page=True)


def sem_rolagem_horizontal(pagina: Page):
    largura = pagina.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    if largura > 0:
        culpados = pagina.evaluate("""() => [...document.querySelectorAll('body *')]
            .filter((e) => e.getBoundingClientRect().right > document.documentElement.clientWidth + 1)
            .slice(-3).map((e) => e.tagName + ' ' + e.textContent.trim().slice(0, 30))""")
        raise AssertionError(f"rolagem horizontal de {largura}px em {pagina.url}: {culpados}")


def criar_pelo_assistente(pagina: Page, tempo: str, nome: str):
    ir(pagina, "#/criar")
    botao(pagina, "Próximo").click()
    pagina.get_by_text(tempo, exact=True).click()
    botao(pagina, "Próximo").click()
    botao(pagina, "Próximo").click()
    pagina.get_by_label("Nome do estoque").fill(nome)


def escolher_validade(pagina: Page, ano: int, mes: int):
    pagina.get_by_label("Vence quando?: mês").select_option(str(mes))
    pagina.get_by_label("Vence quando?: ano").select_option(str(ano))


@cenario("1. Início sem estoque explica como usar em 3 passos")
def inicio_vazio(pagina: Page):
    ir(pagina, "")
    expect(pagina.get_by_role("heading", name="SBV", exact=True)).to_be_visible()
    expect(pagina.get_by_role("heading", name="Como usar")).to_be_visible()
    expect(pagina.locator("ol li")).to_have_count(3)
    expect(pagina.get_by_role("link", name="Começar")).to_be_visible()
    foto(pagina, "01-inicio-vazio")


@cenario("2. Telas de estoque e compras exigem estoque criado")
def redireciona_sem_estoque(pagina: Page):
    for rota in ["#/compras", "#/estoque", "#/estoque/arroz"]:
        ir(pagina, rota)
        expect(pagina.locator("[data-teste=passo]")).to_have_text("Passo 1 de 4")


@cenario("3. Assistente impede avançar sem pessoas e sem alimentos")
def validacao_criacao(pagina: Page):
    ir(pagina, "#/criar")
    pagina.get_by_label("Adultos", exact=True).fill("0")
    pagina.get_by_label("Adultos", exact=True).blur()
    botao(pagina, "Próximo").click()
    expect(pagina.get_by_role("alert")).to_contain_text("pelo menos uma pessoa")
    expect(pagina.locator("[data-teste=passo]")).to_have_text("Passo 1 de 4")
    pagina.get_by_role("button", name="Aumentar Adultos").click()
    botao(pagina, "Próximo").click()
    botao(pagina, "Próximo").click()
    marcadas = pagina.locator("input[type=checkbox]:checked")
    while marcadas.count() > 0:
        marcadas.first.uncheck()
    botao(pagina, "Próximo").click()
    expect(pagina.get_by_role("alert")).to_contain_text("pelo menos um alimento")
    foto(pagina, "03-validacao")


@cenario("4. Botões + e − respeitam limites e campo vazio volta ao mínimo")
def campo_numero(pagina: Page):
    ir(pagina, "#/criar")
    campo = pagina.get_by_label("Crianças até 12 anos", exact=True)
    expect(pagina.get_by_role("button", name="Diminuir Crianças até 12 anos")).to_be_disabled()
    pagina.get_by_role("button", name="Aumentar Crianças até 12 anos").click()
    expect(campo).to_have_value("1")
    campo.fill("")
    campo.blur()
    expect(campo).to_have_value("0")
    campo.fill("99")
    campo.blur()
    expect(campo).to_have_value("30")
    expect(pagina.get_by_role("button", name="Aumentar Crianças até 12 anos")).to_be_disabled()


@cenario("5. Sair do assistente no passo 1 volta ao início")
def sair_do_assistente(pagina: Page):
    ir(pagina, "#/criar")
    botao(pagina, "Sair").click()
    expect(pagina.get_by_role("heading", name="SBV", exact=True)).to_be_visible()


@cenario("6. Criar estoque passo a passo: 2 adultos por 1 mês")
def criar_estoque(pagina: Page):
    ir(pagina, "#/criar")
    foto(pagina, "06-passo1")
    botao(pagina, "Próximo").click()
    pagina.get_by_text("1 mês", exact=True).click()
    foto(pagina, "06-passo2")
    botao(pagina, "Próximo").click()
    foto(pagina, "06-passo3")
    botao(pagina, "Próximo").click()
    pagina.get_by_label("Nome do estoque").fill("Casa El Niño")
    expect(pagina.get_by_text("240 litros")).to_be_visible()
    foto(pagina, "06-passo4")
    botao(pagina, "Criar meu estoque").click()
    expect(pagina.get_by_role("heading", name="Faltam 21 itens")).to_be_visible()
    expect(pagina.get_by_role("status")).to_contain_text("Estoque criado")
    expect(pagina.locator("[data-teste=compra-agua]")).to_contain_text("240 L")
    expect(pagina.locator("[data-teste=compra-arroz]")).to_contain_text("10 kg")
    foto(pagina, "06-compras")


@cenario("7. Comprei: água sai da lista e aparece o aviso de sucesso")
def comprar_agua(pagina: Page):
    ir(pagina, "#/compras")
    pagina.locator("[data-teste=compra-agua]").get_by_role("button", name="Comprei").click()
    expect(pagina.get_by_role("radio", name="Hoje")).to_be_checked()
    foto(pagina, "07-comprei")
    botao(pagina, "Guardar no estoque").click()
    expect(pagina.get_by_role("status")).to_contain_text("Guardado: 240 L de Água potável")
    expect(pagina.locator("[data-teste=compra-agua]")).to_have_count(0)
    expect(pagina.get_by_role("heading", name="Faltam 20 itens")).to_be_visible()
    pagina.get_by_role("button", name="Fechar aviso").click()
    expect(pagina.get_by_role("status")).to_have_text("")


@cenario("8. Compra com data futura é recusada")
def compra_data_futura(pagina: Page):
    ir(pagina, "#/compras")
    linha = pagina.locator("[data-teste=compra-feijao]")
    linha.get_by_role("button", name="Comprei").click()
    linha.get_by_text("Outro dia", exact=True).click()
    linha.get_by_label("Data da compra").fill(f"{HOJE.year + 1}-01-01")
    botao(pagina, "Guardar no estoque").click()
    expect(pagina.get_by_role("alert")).to_contain_text("futuro")
    botao(pagina, "Cancelar").click()
    expect(pagina.get_by_role("alert")).to_have_count(0)


@cenario("9. Item: comprar com mês/ano, alerta, usar com + e −, jogar fora")
def ciclo_do_item(pagina: Page):
    ir(pagina, "#/estoque/arroz")
    botao(pagina, "Comprei mais").click()
    proximo_mes = date(HOJE.year + (HOJE.month // 12), HOJE.month % 12 + 1, 1)
    escolher_validade(pagina, proximo_mes.year, proximo_mes.month)
    botao(pagina, "Guardar no estoque").click()
    expect(pagina.locator("[data-teste=tenho]")).to_have_text("10 kg")
    expect(pagina.locator("[data-teste=falta]")).to_have_text("0 kg")
    expect(pagina.locator("[data-teste=lote]")).to_contain_text("Vence em")
    foto(pagina, "09-item")
    botao(pagina, "Usei").click()
    expect(pagina.get_by_role("button", name="Diminuir Quanto usou?")).to_be_disabled()
    for _ in range(4):
        pagina.get_by_role("button", name="Aumentar Quanto usou?").click()
    expect(pagina.get_by_label("Quanto usou?", exact=True)).to_have_value("2.5")
    foto(pagina, "09-usei")
    botao(pagina, "Confirmar").click()
    expect(pagina.locator("[data-teste=tenho]")).to_have_text("7,5 kg")
    expect(pagina.get_by_role("status")).to_contain_text("usou 2,5 kg")
    botao(pagina, "Jogar fora").click()
    expect(pagina.get_by_role("dialog")).to_contain_text("Jogar fora este pacote?")
    foto(pagina, "09-confirmacao")
    botao(pagina, "Não, manter").click()
    expect(pagina.locator("[data-teste=lote]")).to_have_count(1)
    botao(pagina, "Jogar fora").click()
    botao(pagina, "Sim, jogar fora").click()
    expect(pagina.locator("[data-teste=lote]")).to_have_count(0)
    expect(pagina.locator("[data-teste=tenho]")).to_have_text("0 kg")


@cenario("10. Esc fecha a confirmação sem apagar")
def esc_cancela(pagina: Page):
    ir(pagina, "#/estoque/arroz")
    botao(pagina, "Comprei mais").click()
    botao(pagina, "Guardar no estoque").click()
    botao(pagina, "Jogar fora").click()
    pagina.keyboard.press("Escape")
    expect(pagina.get_by_role("dialog")).to_have_count(0)
    expect(pagina.locator("[data-teste=lote]")).to_have_count(1)
    botao(pagina, "Jogar fora").click()
    botao(pagina, "Sim, jogar fora").click()


@cenario("11. Início mostra o que falta, a água e o que usar primeiro")
def resumo_inicio(pagina: Page):
    ir(pagina, "#/estoque/feijao")
    botao(pagina, "Comprei mais").click()
    escolher_validade(pagina, HOJE.year, HOJE.month)
    botao(pagina, "Guardar no estoque").click()
    ir(pagina, "")
    expect(pagina.get_by_role("heading", name="Casa El Niño")).to_be_visible()
    expect(pagina.locator("[data-teste=faltam]")).to_contain_text("Falta comprar 19 itens")
    expect(pagina.locator("[data-teste=agua]")).to_contain_text("8 litros")
    expect(pagina.locator("[data-teste=dias-agua]")).to_have_text("A água guardada dá para 30 dias.")
    expect(pagina.get_by_role("heading", name="Use primeiro")).to_be_visible()
    expect(pagina.get_by_role("progressbar")).to_have_attribute("aria-valuenow", "10")
    foto(pagina, "11-inicio")


@cenario("12. Os dados continuam depois de fechar e abrir o app")
def persistencia(pagina: Page):
    pagina.reload()
    pagina.wait_for_load_state("networkidle")
    expect(pagina.get_by_role("heading", name="Casa El Niño")).to_be_visible()
    ir(pagina, "#/estoque")
    expect(pagina.get_by_text("VENCE LOGO")).to_be_visible()
    foto(pagina, "12-estoque")


@cenario("13. Mudar para 3 meses recalcula e mantém o que foi guardado")
def editar_estoque(pagina: Page):
    ir(pagina, "")
    pagina.get_by_role("link", name="Mudar pessoas ou tempo").click()
    expect(pagina.locator("[data-teste=passo]")).to_have_text("Passo 1 de 4")
    botao(pagina, "Próximo").click()
    pagina.get_by_text("3 meses", exact=True).click()
    botao(pagina, "Próximo").click()
    botao(pagina, "Próximo").click()
    expect(pagina.get_by_label("Nome do estoque")).to_have_value("Casa El Niño")
    botao(pagina, "Salvar alterações").click()
    expect(pagina.get_by_text("para 90 dias")).to_be_visible()
    ir(pagina, "#/compras")
    expect(pagina.locator("[data-teste=compra-agua]")).to_contain_text("480 L")
    expect(pagina.locator("[data-teste=compra-feijao]")).to_contain_text("12 kg")


@cenario("14. Locais de compra: adicionar, validar e remover com confirmação")
def locais(pagina: Page):
    ir(pagina, "#/locais")
    botao(pagina, "Adicionar local").click()
    expect(pagina.get_by_role("alert")).to_contain_text("nome do local")
    pagina.get_by_label("Nome do local").fill("Atacarejo do bairro")
    pagina.get_by_label("O que comprar lá").fill("Arroz e óleo em fardo")
    botao(pagina, "Adicionar local").click()
    expect(pagina.locator("[data-teste=local]")).to_have_count(1)
    expect(pagina.get_by_role("status")).to_contain_text("Local guardado")
    foto(pagina, "14-locais")
    botao(pagina, "Remover").click()
    botao(pagina, "Sim, remover").click()
    expect(pagina.locator("[data-teste=local]")).to_have_count(0)


@cenario("15. Guia: todas as seções abrem com conteúdo")
def guia(pagina: Page):
    ir(pagina, "#/guia")
    foto(pagina, "15-guia")
    for titulo in ["Por que se preparar", "Como armazenar", "Água", "Onde e como comprar", "Cuidados e segurança"]:
        ir(pagina, "#/guia")
        pagina.get_by_role("main").get_by_text(titulo, exact=True).click()
        expect(pagina.get_by_role("heading", level=1, name=titulo)).to_be_visible()
    expect(pagina.get_by_role("alert")).to_contain_text("botulismo")
    ir(pagina, "#/guia")
    for titulo in ["Instalações elétricas", "Reparos mecânicos", "Cultivo de alimentos", "Purificar a água"]:
        expect(pagina.get_by_role("main").get_by_text(titulo, exact=True)).to_have_count(0)
    ir(pagina, "#/guia/eletrica")
    expect(pagina.get_by_role("heading", level=1, name="Eletricista da casa")).to_be_visible()
    ir(pagina, "#/guia/purificar")
    expect(pagina.get_by_role("heading", level=1, name="Tratar água em casa")).to_be_visible()
    ir(pagina, "#/guia/socorros")
    pagina.locator("[data-teste=link-curso]").click()
    expect(pagina.get_by_role("heading", level=1, name="Primeiros socorros")).to_be_visible()
    ir(pagina, "#/guia")


@cenario("16. Rotas inválidas não quebram o app")
def rotas_invalidas(pagina: Page):
    ir(pagina, "#/qualquer/coisa")
    expect(pagina.get_by_role("heading", name="Casa El Niño")).to_be_visible()
    ir(pagina, "#/estoque/nao-existe")
    expect(pagina.get_by_text("Item não encontrado")).to_be_visible()
    ir(pagina, "#/guia/nao-existe")
    expect(pagina.get_by_text("Seção não encontrada")).to_be_visible()


@cenario("17. Navegação inferior marca a aba atual")
def navegacao(pagina: Page):
    for aba, titulo in [("Estoque", "Meu estoque"), ("Compras", None), ("Cursos", "Aprenda a fazer"), ("Guia", "O que saber"), ("Início", "Casa El Niño")]:
        pagina.get_by_role("navigation").get_by_role("link", name=aba).click()
        expect(pagina.get_by_role("navigation").get_by_role("link", name=aba)).to_have_attribute("aria-current", "page")
        if titulo:
            expect(pagina.get_by_role("heading", level=1, name=titulo)).to_be_visible()


@cenario("18. Letra muito grande: aplica, persiste e não quebra nenhuma tela em 360px")
def letra_grande(pagina: Page):
    ir(pagina, "")
    pagina.get_by_text("Muito grande", exact=True).click()
    expect(pagina.locator("html")).to_have_attribute("style", "zoom: 1.3;")
    pagina.reload()
    pagina.wait_for_load_state("networkidle")
    expect(pagina.locator("html")).to_have_attribute("style", "zoom: 1.3;")
    pagina.set_viewport_size({"width": 360, "height": 780})
    foto(pagina, "18-letra-grande")
    for rota in ["", "#/criar", "#/estoque", "#/estoque/arroz", "#/compras", "#/guia", "#/guia/armazenamento", "#/locais", "#/mochila", "#/familia", "#/cursos", "#/cursos/eletricista", "#/cursos/horta", "#/licao/agua-tratar", "#/licao/engasgo", "#/licao/eletrica-planejar", "#/licao/mecanica-bike-pneu", "#/licao/sem-geladeira"]:
        ir(pagina, rota)
        sem_rolagem_horizontal(pagina)
    ir(pagina, "#/compras")
    pagina.locator("[data-teste=compra-agua]").get_by_role("button", name="Comprei").click()
    sem_rolagem_horizontal(pagina)
    foto(pagina, "18-compra-letra-grande")
    pagina.set_viewport_size({"width": 412, "height": 915})
    ir(pagina, "")
    pagina.get_by_text("Normal", exact=True).click()
    expect(pagina.locator("html")).to_have_attribute("style", "zoom: 1;")


@cenario("19. Tela estreita (360px) sem rolagem horizontal na letra normal")
def tela_estreita(pagina: Page):
    pagina.set_viewport_size({"width": 360, "height": 780})
    for rota in ["", "#/criar", "#/estoque", "#/estoque/arroz", "#/compras", "#/guia", "#/guia/armazenamento", "#/locais", "#/mochila", "#/familia", "#/cursos", "#/cursos/eletricista", "#/cursos/horta", "#/licao/agua-tratar", "#/licao/engasgo", "#/licao/eletrica-planejar", "#/licao/mecanica-bike-pneu", "#/licao/sem-geladeira"]:
        ir(pagina, rota)
        sem_rolagem_horizontal(pagina)
    pagina.set_viewport_size({"width": 412, "height": 915})


@cenario("20. Tema escuro mantém contraste")
def tema_escuro(pagina: Page):
    pagina.emulate_media(color_scheme="dark")
    ir(pagina, "#/estoque")
    fundo = pagina.evaluate("getComputedStyle(document.body).backgroundColor")
    texto = pagina.evaluate("getComputedStyle(document.body).color")
    assert fundo == "rgb(0, 0, 0)" and texto == "rgb(255, 255, 255)", f"{fundo} / {texto}"
    foto(pagina, "20-escuro")
    pagina.emulate_media(color_scheme="light")


@cenario("21. Apagar tudo pede confirmação e volta ao início vazio")
def apagar_tudo(pagina: Page):
    ir(pagina, "#/criar")
    for _ in range(3):
        botao(pagina, "Próximo").click()
    botao(pagina, "Apagar tudo e recomeçar").click()
    botao(pagina, "Não, manter").click()
    expect(pagina.locator("[data-teste=passo]")).to_have_text("Passo 4 de 4")
    botao(pagina, "Apagar tudo e recomeçar").click()
    botao(pagina, "Sim, apagar tudo").click()
    expect(pagina.get_by_role("heading", name="SBV", exact=True)).to_be_visible()
    pagina.reload()
    expect(pagina.get_by_role("link", name="Começar")).to_be_visible()


@cenario("22. Mochila de saída: marcar, salvar e desmarcar tudo com confirmação")
def mochila(pagina: Page):
    ir(pagina, "#/guia/deslocamento")
    pagina.get_by_role("link", name="Marcar o que já tenho").click()
    expect(pagina.get_by_role("heading", level=1, name="Mochila de saída")).to_be_visible()
    progresso = pagina.locator("[data-teste=progresso-mochila]")
    expect(progresso).to_have_text("0 de 14 prontos")
    expect(botao(pagina, "Desmarcar tudo")).to_have_count(0)
    pagina.get_by_label("Rádio a pilha").check()
    pagina.get_by_label("Dinheiro trocado").check()
    expect(progresso).to_have_text("2 de 14 prontos")
    pagina.reload()
    pagina.wait_for_load_state("networkidle")
    expect(pagina.get_by_label("Rádio a pilha")).to_be_checked()
    expect(progresso).to_have_text("2 de 14 prontos")
    pagina.get_by_label("Dinheiro trocado").uncheck()
    expect(progresso).to_have_text("1 de 14 prontos")
    pagina.set_viewport_size({"width": 360, "height": 780})
    sem_rolagem_horizontal(pagina)
    foto(pagina, "22-mochila")
    pagina.set_viewport_size({"width": 412, "height": 915})
    botao(pagina, "Desmarcar tudo").click()
    botao(pagina, "Não, manter").click()
    expect(progresso).to_have_text("1 de 14 prontos")
    botao(pagina, "Desmarcar tudo").click()
    botao(pagina, "Sim, desmarcar").click()
    expect(progresso).to_have_text("0 de 14 prontos")
    ir(pagina, "#/guia")
    pagina.get_by_role("link", name="Minha mochila de saída").click()
    expect(pagina.get_by_label("Rádio a pilha")).not_to_be_checked()


@cenario("23. Telefones de emergência: botões de ligar no início e nos primeiros socorros")
def telefones_emergencia(pagina: Page):
    for rota in ["", "#/guia/socorros", "#/guia/deslocamento"]:
        ir(pagina, rota)
        emergencia = pagina.locator("[data-teste=emergencia]")
        expect(emergencia).to_be_visible()
        for numero in ["192", "193", "199", "190"]:
            expect(emergencia.locator(f'a[href="tel:{numero}"]')).to_have_count(1)
    ir(pagina, "#/guia/armazenamento")
    expect(pagina.locator("[data-teste=emergencia]")).to_have_count(0)
    pagina.set_viewport_size({"width": 360, "height": 780})
    ir(pagina, "#/guia/socorros")
    sem_rolagem_horizontal(pagina)
    foto(pagina, "23-telefones-socorros")
    pagina.set_viewport_size({"width": 412, "height": 915})


@cenario("24. Fumaça e queimadas: seção abre com alerta, telefones e cabe em 360px")
def fumaca(pagina: Page):
    ir(pagina, "#/guia")
    pagina.get_by_role("main").get_by_text("Fumaça e queimadas", exact=True).click()
    expect(pagina.get_by_role("heading", level=1, name="Fumaça e queimadas")).to_be_visible()
    expect(pagina.get_by_role("alert")).to_contain_text("193")
    expect(pagina.get_by_text("Use máscara PFF2 ou N95, bem justa no rosto.")).to_be_visible()
    expect(pagina.locator("[data-teste=emergencia]").locator('a[href="tel:193"]')).to_have_count(1)
    pagina.set_viewport_size({"width": 360, "height": 780})
    ir(pagina, "#/guia/fumaca")
    sem_rolagem_horizontal(pagina)
    foto(pagina, "24-fumaca")
    pagina.set_viewport_size({"width": 412, "height": 915})


@cenario("25. Calor forte: seção abre com alerta, telefones e cabe em 360px")
def calor(pagina: Page):
    ir(pagina, "#/guia")
    pagina.get_by_role("main").get_by_text("Calor forte", exact=True).click()
    expect(pagina.get_by_role("heading", level=1, name="Calor forte")).to_be_visible()
    expect(pagina.get_by_role("alert")).to_contain_text("192")
    expect(pagina.get_by_text("Beba água mesmo sem sede.")).to_be_visible()
    expect(pagina.locator("[data-teste=emergencia]").locator('a[href="tel:192"]')).to_have_count(1)
    pagina.set_viewport_size({"width": 360, "height": 780})
    ir(pagina, "#/guia/calor")
    sem_rolagem_horizontal(pagina)
    foto(pagina, "25-calor")
    pagina.set_viewport_size({"width": 412, "height": 915})


@cenario("26. Pacote vencido não conta no estoque e aparece em Venceu no início")
def vencido(pagina: Page):
    criar_pelo_assistente(pagina, "1 mês", "Casa Teste")
    botao(pagina, "Criar meu estoque").click()
    expect(pagina.get_by_role("heading", name="Faltam 21 itens")).to_be_visible()
    mes_passado = date(HOJE.year - (1 if HOJE.month == 1 else 0), (HOJE.month - 2) % 12 + 1, 1)
    ir(pagina, "#/estoque/feijao")
    botao(pagina, "Comprei mais").click()
    escolher_validade(pagina, mes_passado.year, mes_passado.month)
    botao(pagina, "Guardar no estoque").click()
    expect(pagina.locator("[data-teste=lote]")).to_contain_text("Vencido. Não conta no estoque.")
    expect(pagina.locator("[data-teste=tenho]")).to_have_text("0 kg")
    expect(pagina.locator("[data-teste=falta]")).to_have_text("6 kg")
    pagina.set_viewport_size({"width": 360, "height": 780})
    ir(pagina, "")
    vencidos = pagina.locator("[data-teste=vencidos]")
    expect(vencidos.get_by_role("heading", name="Venceu")).to_be_visible()
    expect(vencidos).to_contain_text("Feijão")
    expect(pagina.get_by_role("heading", name="Use primeiro")).to_have_count(0)
    sem_rolagem_horizontal(pagina)
    foto(pagina, "26-vencido")
    vencidos.get_by_role("link").first.click()
    expect(pagina.get_by_role("heading", level=1, name="Feijão")).to_be_visible()
    pagina.set_viewport_size({"width": 412, "height": 915})


@cenario("27. Telefone da família: validar, salvar, ligar, mudar e apagar com confirmação")
def contato_familia(pagina: Page):
    ir(pagina, "")
    emergencia = pagina.locator("[data-teste=emergencia]")
    expect(emergencia.locator("[data-teste=contato-familia]")).to_have_count(0)
    emergencia.get_by_role("link", name="Salvar telefone da família").click()
    expect(pagina.get_by_role("heading", level=1, name="Telefone da família")).to_be_visible()
    pagina.get_by_label("Nome").fill("Maria")
    pagina.get_by_label("Telefone com DDD").fill("1234")
    botao(pagina, "Salvar").click()
    expect(pagina.get_by_role("alert")).to_contain_text("Telefone inválido")
    pagina.get_by_label("Telefone com DDD").fill("(82) 99876-5432")
    botao(pagina, "Salvar").click()
    expect(pagina.get_by_role("status")).to_contain_text("Telefone da família salvo")
    contato = pagina.locator("[data-teste=contato-familia] a")
    expect(contato).to_have_attribute("href", "tel:82998765432")
    expect(contato).to_contain_text("(82) 99876-5432")
    pagina.reload()
    pagina.wait_for_load_state("networkidle")
    expect(contato).to_contain_text("Maria")
    ir(pagina, "#/guia/socorros")
    expect(pagina.locator("[data-teste=contato-familia] a")).to_have_attribute("href", "tel:82998765432")
    pagina.get_by_role("link", name="Mudar telefone da família").click()
    expect(pagina.get_by_label("Telefone com DDD")).to_have_value("(82) 99876-5432")
    botao(pagina, "Apagar telefone da família").click()
    botao(pagina, "Não, manter").click()
    expect(pagina.get_by_label("Nome")).to_have_value("Maria")
    botao(pagina, "Apagar telefone da família").click()
    botao(pagina, "Sim, apagar").click()
    expect(pagina.get_by_role("heading", level=1, name="Primeiros socorros")).to_be_visible()
    expect(pagina.locator("[data-teste=contato-familia]")).to_have_count(0)


@cenario("28. Cursos: aba própria, abrir curso e lição, ver animação, acertar o teste, concluir e salvar")
def curso(pagina: Page):
    ir(pagina, "#/guia")
    entrada = pagina.locator("[data-teste=entrada-curso]")
    expect(entrada).to_contain_text("0 de 25 lições concluídas")
    entrada.click()
    expect(pagina.get_by_role("heading", level=1, name="Aprenda a fazer")).to_be_visible()
    expect(pagina.get_by_role("navigation").get_by_role("link", name="Cursos")).to_have_attribute("aria-current", "page")
    expect(pagina.get_by_role("heading", level=2, name="Ofícios e consertos")).to_be_visible()
    for curso_id in ["eletricista", "encanador", "mecanica", "horta", "agua", "socorros", "comida"]:
        expect(pagina.locator(f"[data-teste=curso-{curso_id}]")).to_be_visible()
    foto(pagina, "28-cursos")
    pagina.locator("[data-teste=curso-eletricista]").click()
    expect(pagina.get_by_role("heading", level=1, name="Eletricista da casa")).to_be_visible()
    expect(pagina.get_by_text("Choque elétrico mata.")).to_be_visible()
    pagina.locator("[data-teste=licao-eletrica-planejar]").click()
    expect(pagina.get_by_role("heading", level=1, name="Planejar a rede elétrica de uma casa")).to_be_visible()
    botao(pagina, "Assistir o vídeo").first.click()
    expect(pagina.locator(".cena-d").first).to_be_visible()
    expect(pagina.get_by_role("navigation").get_by_role("link", name="Cursos")).to_have_attribute("aria-current", "page")
    pagina.get_by_role("link", name="Voltar ao curso").first.click()
    expect(pagina.get_by_role("heading", level=1, name="Eletricista da casa")).to_be_visible()
    ir(pagina, "#/cursos/socorros")
    expect(pagina.locator("[data-teste=progresso-curso]")).to_have_text("0 de 3 lições concluídas")
    pagina.locator("[data-teste=licao-rcp]").click()
    expect(pagina.get_by_role("heading", level=1, name="Parada cardíaca: massagem no peito")).to_be_visible()
    botao(pagina, "Assistir o vídeo").first.click()
    expect(botao(pagina, "Pausar")).to_be_visible()
    perguntas = pagina.locator("[data-teste=pergunta]")
    expect(perguntas).to_have_count(3)
    perguntas.nth(0).get_by_text("Está dormindo pesado", exact=True).click()
    expect(perguntas.nth(0).locator("[data-teste=resposta]")).to_contain_text("Ainda não")
    perguntas.nth(0).get_by_text("Pode ser parada cardíaca", exact=True).click()
    expect(perguntas.nth(0).locator("[data-teste=resposta]")).to_contain_text("Certo!")
    perguntas.nth(1).get_by_text("100 a 120 por minuto", exact=True).click()
    expect(pagina.locator("[data-teste=licao-concluida]")).to_have_count(0)
    perguntas.nth(2).get_by_text("Quando o socorro chegar ou a pessoa reagir", exact=True).click()
    expect(pagina.locator("[data-teste=placar]")).to_have_text("3 de 3 certas")
    expect(pagina.locator("[data-teste=licao-concluida]")).to_be_visible()
    pagina.set_viewport_size({"width": 360, "height": 780})
    sem_rolagem_horizontal(pagina)
    foto(pagina, "28-licao")
    pagina.set_viewport_size({"width": 412, "height": 915})
    expect(pagina.get_by_role("link", name="Próxima lição", exact=False)).to_have_count(0)
    ir(pagina, "#/licao/engasgo")
    pagina.get_by_role("link", name="Próxima lição: Parada cardíaca: massagem no peito").click()
    expect(pagina.get_by_role("heading", level=1, name="Parada cardíaca: massagem no peito")).to_be_visible()
    pagina.reload()
    pagina.wait_for_load_state("networkidle")
    ir(pagina, "#/cursos/socorros")
    expect(pagina.locator("[data-teste=progresso-curso]")).to_have_text("1 de 3 lições concluídas")
    expect(pagina.locator("[data-teste=licao-rcp]")).to_contain_text("Concluída")
    ir(pagina, "#/cursos")
    expect(pagina.locator("[data-teste=progresso-cursos]")).to_have_text("1 de 25 lições concluídas")
    ir(pagina, "#/curso/rcp")
    expect(pagina.get_by_role("heading", level=1, name="Parada cardíaca: massagem no peito")).to_be_visible()
    ir(pagina, "#/licao/nao-existe")
    expect(pagina.get_by_text("Lição não encontrada")).to_be_visible()
    ir(pagina, "#/cursos/nao-existe")
    expect(pagina.get_by_text("Curso não encontrado")).to_be_visible()


@cenario("29. Vídeo narrado para baixar e vídeos do YouTube na lição")
def video_narrado(pagina: Page):
    manifesto = '{"videos":[{"licaoId":"rcp","arquivo":"rcp.mp4","bytes":2202009,"segundos":48.5},{"licaoId":"engasgo","arquivo":"engasgo.mp4","bytes":1048576,"segundos":43}]}'
    pagina.route("**/videos-narrados.json", lambda rota: rota.fulfill(status=200, content_type="application/json", body=manifesto))
    ir(pagina, "#/licao/rcp")
    narrado = pagina.locator("[data-teste=video-narrado]")
    expect(narrado).to_be_visible()
    expect(narrado).to_contain_text("Aula em vídeo")
    expect(pagina.locator("[data-teste=baixar-video]")).to_have_text("Baixar para ver sem internet (2,1 MB)")
    expect(pagina.locator("[data-teste=assistir-agora]")).to_be_visible()
    expect(pagina.get_by_role("button", name="Assistir o vídeo")).to_have_count(0)
    expect(pagina.locator("[data-teste=parte-licao]").first).not_to_have_attribute("open", "")
    pagina.locator("[data-teste=parte-licao]").first.locator("summary").click()
    expect(pagina.locator("[data-teste=parte-licao]").first).to_have_attribute("open", "")
    expect(narrado).to_contain_text("Voz sintética Piper")
    youtube = pagina.locator("[data-teste=videos-youtube]")
    expect(youtube.get_by_role("link")).to_have_count(2)
    expect(youtube.get_by_role("link").first).to_have_attribute("href", "https://www.youtube.com/watch?v=_astzJ-IAiw")
    expect(youtube).to_contain_text("Ministério da Saúde · canal oficial")
    pagina.set_viewport_size({"width": 360, "height": 780})
    sem_rolagem_horizontal(pagina)
    foto(pagina, "29-video-narrado")
    pagina.set_viewport_size({"width": 412, "height": 915})
    ir(pagina, "#/cursos/socorros")
    lote = pagina.locator("[data-teste=baixar-videos-curso]")
    expect(lote).to_be_visible()
    expect(pagina.locator("[data-teste=videos-no-celular]")).to_have_text("0 de 2 vídeos no celular")
    expect(pagina.locator("[data-teste=baixar-todos]")).to_have_text("Baixar todos os vídeos (3,1 MB)")
    pagina.set_viewport_size({"width": 360, "height": 780})
    sem_rolagem_horizontal(pagina)
    foto(pagina, "29-baixar-todos")
    pagina.set_viewport_size({"width": 412, "height": 915})
    ir(pagina, "#/cursos/eletricista")
    expect(pagina.locator("[data-teste=baixar-videos-curso]")).to_have_count(0)
    ir(pagina, "#/licao/eletrica-seguranca")
    expect(pagina.locator("[data-teste=video-narrado]")).to_have_count(0)
    expect(pagina.locator("[data-teste=videos-youtube]")).to_be_visible()
    pagina.unroute("**/videos-narrados.json")


@cenario("30. Níveis das lições e acervo de sobrevivência")
def niveis_e_acervo(pagina: Page):
    ir(pagina, "#/cursos/eletricista")
    for nivel, primeira in [("facil", "eletrica-seguranca"), ("medio", "eletrica-tomada"), ("avancado", "eletrica-planejar")]:
        expect(pagina.locator(f"[data-teste=nivel-{nivel}]").locator(f"[data-teste=licao-{primeira}]")).to_be_visible()
    expect(pagina.get_by_role("heading", level=2, name="Nível fácil")).to_be_visible()
    ir(pagina, "#/cursos")
    expect(pagina.locator("[data-teste=curso-eletricista]")).to_contain_text("2 fácil · 3 médio · 2 avançado")
    ir(pagina, "#/licao/rcp")
    expect(pagina.locator("[data-teste=nivel-licao]")).to_contain_text("Nível avançado")
    ir(pagina, "#/guia")
    pagina.locator("[data-teste=entrada-acervo]").click()
    expect(pagina.get_by_role("heading", level=1, name="Acervo de sobrevivência")).to_be_visible()
    expect(pagina.get_by_role("navigation").get_by_role("link", name="Guia")).to_have_attribute("aria-current", "page")
    busca = pagina.locator("[data-teste=busca-acervo]")
    busca.fill("escorpiao")
    expect(pagina.locator("[data-teste^=guia-]")).to_have_count(1)
    busca.fill("palavra-que-nao-existe")
    expect(pagina.get_by_text("Nada encontrado. Tente outra palavra.")).to_be_visible()
    busca.fill("")
    pagina.locator("[data-teste=categoria-clima]").click()
    expect(pagina.locator("[data-teste=guia-enchente]")).to_be_visible()
    expect(pagina.locator("[data-teste=guia-remedios]")).to_have_count(0)
    pagina.set_viewport_size({"width": 360, "height": 780})
    sem_rolagem_horizontal(pagina)
    foto(pagina, "30-acervo")
    pagina.locator("[data-teste=guia-enchente]").click()
    expect(pagina.get_by_role("heading", level=1, name="Enchente e alagamento")).to_be_visible()
    expect(pagina.get_by_text("Não entre em água corrente")).to_be_visible()
    sem_rolagem_horizontal(pagina)
    foto(pagina, "30-guia-acervo")
    pagina.set_viewport_size({"width": 412, "height": 915})
    pagina.locator("[data-teste=ligacao-acervo]").first.click()
    expect(pagina.get_by_role("heading", level=1, name="Para onde se deslocar")).to_be_visible()
    ir(pagina, "#/acervo/nao-existe")
    expect(pagina.get_by_text("Guia não encontrado")).to_be_visible()


def principal():
    os.makedirs(PASTA_TELAS, exist_ok=True)
    servidor = subprocess.Popen(
        ["npx", "vite", "preview", "--port", "4173", "--strictPort"],
        cwd=RAIZ, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL,
    )
    time.sleep(4)
    try:
        with sync_playwright() as p:
            navegador = p.chromium.launch(executable_path=CHROME, args=["--no-sandbox"])
            pagina = navegador.new_page(viewport={"width": 412, "height": 915}, locale="pt-BR")
            expect.set_options(timeout=4000)
            pagina.on("pageerror", lambda erro: erros_console.append(str(erro)))
            pagina.on("console", lambda mensagem: erros_console.append(mensagem.text) if mensagem.type == "error" else None)
            for executar in [
                inicio_vazio, redireciona_sem_estoque, validacao_criacao, campo_numero, sair_do_assistente,
                criar_estoque, comprar_agua, compra_data_futura, ciclo_do_item, esc_cancela, resumo_inicio,
                persistencia, editar_estoque, locais, guia, rotas_invalidas, navegacao, letra_grande,
                tela_estreita, tema_escuro, apagar_tudo, mochila, telefones_emergencia, fumaca, calor,
                vencido, contato_familia, curso, video_narrado, niveis_e_acervo,
            ]:
                executar(pagina)
            navegador.close()
    finally:
        servidor.terminate()

    for nome, passou, motivo in resultados:
        print(f"{'PASSOU' if passou else 'FALHOU'}  {nome}{'' if passou else '  → ' + motivo}")
    if erros_console:
        print("ERROS NO CONSOLE:", *sorted(set(erros_console)), sep="\n  ")
    falhas = [r for r in resultados if not r[1]]
    print(f"\n{len(resultados) - len(falhas)}/{len(resultados)} cenários passaram")
    sys.exit(1 if falhas or erros_console else 0)


if __name__ == "__main__":
    principal()

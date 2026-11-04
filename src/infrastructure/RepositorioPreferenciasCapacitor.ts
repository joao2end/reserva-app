import { Preferences } from '@capacitor/preferences'
import { ehItemMochila } from '../domain/conteudo/mochila'
import { PREFERENCIAS_PADRAO, ehTamanhoTexto, type ContatoFamilia, type Preferencias } from '../domain/entidades/preferencias'
import { LIMITE_NOME, ehTelefone } from '../domain/regras/validacao'
import type { RepositorioPreferencias } from '../application/portas/RepositorioPreferencias'

const CHAVE = 'reserva:preferencias:v1'

function normalizarContato(valor: unknown): ContatoFamilia | null {
  if (typeof valor !== 'object' || valor === null) return null
  const { nome, telefone } = valor as Record<string, unknown>
  if (typeof nome !== 'string' || typeof telefone !== 'string') return null
  const nomeLimpo = nome.trim()
  if (!nomeLimpo || nomeLimpo.length > LIMITE_NOME || !ehTelefone(telefone)) return null
  return { nome: nomeLimpo, telefone }
}

export function normalizarPreferencias(bruto: string | null): Preferencias {
  try {
    const dados: unknown = bruto ? JSON.parse(bruto) : null
    const registro = typeof dados === 'object' && dados !== null ? (dados as Record<string, unknown>) : {}
    const tamanho = registro.tamanhoTexto
    const mochila = Array.isArray(registro.mochila) ? [...new Set(registro.mochila.filter(ehItemMochila))] : []
    return {
      tamanhoTexto: ehTamanhoTexto(tamanho) ? tamanho : PREFERENCIAS_PADRAO.tamanhoTexto,
      mochila,
      contatoFamilia: normalizarContato(registro.contatoFamilia),
    }
  } catch {
    return { ...PREFERENCIAS_PADRAO, mochila: [] }
  }
}

export class RepositorioPreferenciasCapacitor implements RepositorioPreferencias {
  async carregar(): Promise<Preferencias> {
    const { value } = await Preferences.get({ key: CHAVE })
    return normalizarPreferencias(value)
  }

  async salvar(preferencias: Preferencias): Promise<void> {
    await Preferences.set({ key: CHAVE, value: JSON.stringify(preferencias) })
  }
}

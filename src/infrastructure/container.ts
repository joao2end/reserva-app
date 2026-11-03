import { ServicoEstoque } from '../application/casos-de-uso/ServicoEstoque'
import { ServicoPreferencias } from '../application/casos-de-uso/ServicoPreferencias'
import { RepositorioPreferences } from './RepositorioPreferences'
import { RepositorioPreferenciasCapacitor } from './RepositorioPreferenciasCapacitor'
import { geradorAleatorio, relogioDoSistema } from './sistema'

export const relogio = relogioDoSistema
export const servicoEstoque = new ServicoEstoque(new RepositorioPreferences(), relogio, geradorAleatorio)
export const servicoPreferencias = new ServicoPreferencias(new RepositorioPreferenciasCapacitor())

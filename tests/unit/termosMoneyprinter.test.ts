import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'
import { LICOES } from '../../src/domain/conteudo/curso'

const termos: Record<string, string[]> = JSON.parse(readFileSync('scripts/videos/termos_moneyprinter.json', 'utf-8'))

describe('termos de busca do MoneyPrinterTurbo', () => {
  it('toda lição tem de 6 a 12 termos', () => {
    for (const licao of LICOES) {
      expect(termos[licao.id]?.length ?? 0, licao.id).toBeGreaterThanOrEqual(6)
      expect(termos[licao.id].length, licao.id).toBeLessThanOrEqual(12)
    }
  })

  it('não sobram termos de lição que não existe', () => {
    const ids = new Set(LICOES.map((licao) => licao.id))
    for (const id of Object.keys(termos)) expect(ids.has(id), id).toBe(true)
  })

  it('cada termo é curto, em inglês e sem repetir na mesma lição', () => {
    for (const [id, lista] of Object.entries(termos)) {
      expect(new Set(lista).size, id).toBe(lista.length)
      for (const termo of lista) {
        expect(termo, id).toMatch(/^[a-z0-9 ]+$/)
        expect(termo.split(' ').length, `${id}: ${termo}`).toBeLessThanOrEqual(5)
      }
    }
  })
})

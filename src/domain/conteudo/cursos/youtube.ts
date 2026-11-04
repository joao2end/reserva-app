export interface VideoYoutube {
  titulo: string
  canal: string
  id: string
  oficial: boolean
}

const VIDEOS_YOUTUBE: Record<string, VideoYoutube[]> = {
  'eletrica-seguranca': [{ titulo: 'Como funciona uma chave de teste?', canal: 'Ser Eletricista', id: 'K1RjMVuiPbI', oficial: false }],
  'eletrica-fios': [
    { titulo: 'Qual a diferença entre disjuntor, DR, IDR, DDR e DPS — aula completa', canal: 'Escola da Elétrica', id: 'Gfu-aHrrs-I', oficial: false },
  ],
  'eletrica-tomada': [
    { titulo: 'Como trocar tomada antiga para o modelo novo — na prática, sem errar!', canal: 'Wesley Santana Eletricista', id: '7xkQTRKwuss', oficial: false },
  ],
  'eletrica-lampada': [{ titulo: 'Como instalar uma lâmpada, passo a passo simples e objetivo', canal: 'Jonas instalador', id: 'fiO6PR0Al8Q', oficial: false }],
  'eletrica-chuveiro': [
    { titulo: 'Como trocar resistência do chuveiro Lorenzetti Advanced', canal: 'Cristiano Daniel', id: 'WqJAEm7F6wg', oficial: false },
  ],
  'eletrica-planejar': [{ titulo: 'Instalação completa: circuito de tomada e iluminação', canal: 'Elicarlos Elétrica', id: 'Dw8rvvzJQfE', oficial: false }],
  'encanador-vazamento': [{ titulo: 'Teste de vazamento', canal: 'Sabesp', id: 'HM9YwFIgyiI', oficial: true }],
  'encanador-torneira': [{ titulo: 'Como trocar o reparo da torneira que só fica pingando', canal: 'Testes e Dicas', id: 'XtMYIeYW_Yg', oficial: false }],
  'encanador-desentupir': [{ titulo: 'Como desentupir pia da cozinha em 3 minutos', canal: 'Hidráulica Fácil', id: 'xnM280ffPHs', oficial: false }],
  'mecanica-bike-pneu': [{ titulo: 'Como remendar a câmara da bicicleta', canal: 'Pedaleria', id: 'hgL5Z1tvYvA', oficial: false }],
  'mecanica-pneu-carro': [{ titulo: 'Como trocar pneu furado em 7 passos', canal: 'AutoPapo', id: 'tqJJrASSzFs', oficial: false }],
  'mecanica-revisao-carro': [{ titulo: 'Como conferir o nível do óleo do motor?', canal: 'AutoPapo', id: 'R5UK8zQnH3s', oficial: false }],
  'horta-canteiro': [{ titulo: 'Compostagem: como fazer?', canal: 'Embrapa', id: 'oVwhPelQ3ls', oficial: true }],
  'horta-plantar': [
    { titulo: 'Transplante de mudas de alface para canteiro ou vaso — passo a passo', canal: 'Variedades da Roça', id: 'nVku-geNdCI', oficial: false },
  ],
  'horta-agua': [{ titulo: 'Fazendo irrigação usando garrafa PET', canal: 'O Agrônomo de Vera', id: 'TNoWfKh7IhQ', oficial: false }],
  'agua-quanto': [{ titulo: 'Saiba como montar um kit de emergência', canal: 'Ministério da Integração e do Desenvolvimento Regional', id: 'UQSB3TlOVWs', oficial: true }],
  'agua-cisterna': [{ titulo: 'Boas práticas hídricas: captação da água da chuva em cisternas', canal: 'Embrapa', id: 'R5_5rPG6akE', oficial: true }],
  rcp: [
    { titulo: 'SAMU 192: o que fazer em caso de parada cardíaca?', canal: 'Ministério da Saúde', id: '_astzJ-IAiw', oficial: true },
    { titulo: 'RCP somente com as mãos', canal: 'American Heart Association', id: '3MDp487I7h4', oficial: true },
  ],
  engasgo: [
    { titulo: 'SAMU 192: adulto engasgado? Veja como realizar a manobra de Heimlich', canal: 'Ministério da Saúde', id: 'XkwcRbzK37U', oficial: true },
    { titulo: 'SAMU 192: o que fazer em caso de engasgo em crianças', canal: 'Ministério da Saúde', id: 'gwAgRYYw1n8', oficial: true },
  ],
  'sangramento-queimadura': [{ titulo: 'Queimaduras — Dicas de Saúde', canal: 'Drauzio Varella', id: 'nxX7XTpyVNY', oficial: false }],
  'pouco-gas': [{ titulo: '10 dicas para economizar o gás de cozinha', canal: 'Manual do Mundo', id: 'JGafRfs9cA0', oficial: false }],
}

export function videosYoutubeDaLicao(licaoId: string): VideoYoutube[] {
  return VIDEOS_YOUTUBE[licaoId] ?? []
}

export function licoesComYoutube(): string[] {
  return Object.keys(VIDEOS_YOUTUBE)
}

export function enderecoYoutube(video: VideoYoutube): string {
  return `https://www.youtube.com/watch?v=${video.id}`
}

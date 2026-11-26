import barbeariaImage from './assets/barbearia.png'
import cabelosImage from './assets/cabelos.png'
import depilacaoImage from './assets/depilacao.png'
import escovaTratamentosImage from './assets/escova-tratamento.png'
import manicurePedicureImage from './assets/manicure-pedirecure.png'
import mechasColoracaoImage from './assets/mechas.png'
import nailDesignImage from './assets/nail-design.png'
import outrosServicosImage from './assets/outros-servicos.png'

export type SalonService = {
  name: string
  description: string
  image: string
  imageAlt: string
  imageFit?: 'cover' | 'contain'
}

export const serviceCategories: SalonService[] = [
  { name: 'Cabelos', description: 'Cuidado e beleza para os cabelos.', image: cabelosImage, imageAlt: 'Serviço de cabelos no salão' },
  { name: 'Mechas e coloração', description: 'Opções para renovar o visual. Consulte a disponibilidade na unidade.', image: mechasColoracaoImage, imageAlt: 'Serviço de mechas e coloração' },
  { name: 'Escova e tratamentos', description: 'Cuidados capilares para diferentes momentos.', image: escovaTratamentosImage, imageAlt: 'Serviço de escova e tratamentos capilares' },
  { name: 'Manicure e pedicure', description: 'Cuidado para mãos e pés.', image: manicurePedicureImage, imageAlt: 'Serviço de manicure e pedicure' },
  { name: 'Nail design', description: 'Consulte estilos e opções disponíveis na unidade.', image: nailDesignImage, imageAlt: 'Serviço de nail design' },
  { name: 'Depilação', description: 'Atendimento profissional. Consulte a unidade escolhida.', image: depilacaoImage, imageAlt: 'Serviço de depilação' },
  { name: 'Barbearia', description: 'Consulte os serviços disponíveis na unidade.', image: barbeariaImage, imageAlt: 'Serviço de barbearia' },
  { name: 'Outros serviços', description: 'Há diversas outras opções de beleza na rede. Consulte a unidade para conhecer a disponibilidade.', image: outrosServicosImage, imageAlt: 'Outros serviços de beleza no salão', imageFit: 'contain' },
]


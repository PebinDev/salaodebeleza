export type ReviewKind = 'review' | 'summary' | 'owner-response' | 'visitor-update'

export type SalonReview = {
  id: string
  locationId: string
  author?: string
  rating?: number
  publishedAt?: string
  text: string
  kind: ReviewKind
  incomplete?: boolean
}

export const salonReviews: SalonReview[] = [
  // Cocó — resumos e avaliações individuais fornecidos pelo cliente.
  { id: 'coco-summary-1', locationId: 'coco', kind: 'summary', text: 'Excelente salão, ótimo atendimento, ambiente maravilhoso e super estacionamento.' },
  { id: 'coco-summary-2', locationId: 'coco', kind: 'summary', text: 'Minha primeira vez no Belíssima e simplesmente amei tudo.' },
  { id: 'coco-summary-3', locationId: 'coco', kind: 'summary', text: 'Uma senhora super.experiente e muito gente boa !.unha perfeita.' },
  { id: 'coco-cecilia-clark', locationId: 'coco', kind: 'review', author: 'Cecilia Clark', rating: 5, publishedAt: '1 semana atrás', incomplete: true, text: 'Fiz as mechas com o Roner no Belíssima do Cocó e adorei o resultado!! Excelente profissional! O trabalho foi realizado com muito capricho, técnica e atenção aos detalhes. Ele soube valorizar o meu cabelo, alcançando um resultado lindo, …' },
  { id: 'coco-diana-braz', locationId: 'coco', kind: 'review', author: 'Diana Braz', rating: 5, publishedAt: '2 semanas atrás', incomplete: true, text: 'Registrando aqui minha satisfação com o trabalho da cabelereira Bety, sempre muito atenciosa e delicada, sou cliente dela a algum tempo e sempre muito satisfeita com o resultado. Excelente profissional. Toop...' },

  // Maraponga.
  { id: 'maraponga-summary-1', locationId: 'maraponga', kind: 'summary', text: 'Entrega tudo no meu cabelo sempre!' },
  { id: 'maraponga-summary-2', locationId: 'maraponga', kind: 'summary', text: 'Faço minhas unhas com ela todos os sábados e sempre saio muito satisfeita.' },
  { id: 'maraponga-summary-3', locationId: 'maraponga', kind: 'summary', text: 'Estive no salão e o ambiente é maravilhoso, confortável e acolhedor.' },
  { id: 'maraponga-nikely-feitosa', locationId: 'maraponga', kind: 'review', author: 'Nikely Feitosa', rating: 5, publishedAt: '1 mês atrás', incomplete: true, text: 'Amo esse salão! É um lugar onde sempre sou muito bem recebida e saio de lá me sentindo ainda mais linda. Faço cabelo, unhas e todos os serviços são sempre feitos com muito carinho, cuidado e profissionalismo. …' },
  { id: 'maraponga-isadorah-dantas', locationId: 'maraponga', kind: 'review', author: 'Isadorah Dantas', rating: 5, publishedAt: '3 semanas atrás', incomplete: true, text: 'Gostaria de Parabenizar o trabalho do Marcos que sempre é muito gentil e profissional! As manicures Jessica, Patrícia e Katia são as melhores, além disso, o serviço de depilação com a Katia é espetacular. No que diz respeito a recepção, é …' },

  // Guararapes.
  { id: 'guararapes-summary-1', locationId: 'guararapes', kind: 'summary', text: 'Salão com ótima estrutura, limpo, profissionais competentes.' },
  { id: 'guararapes-summary-2', locationId: 'guararapes', kind: 'summary', text: 'Faço as unhas sempre aqui e sou fã do trabalho da Dheymar e Maria!!!' },
  { id: 'guararapes-summary-3', locationId: 'guararapes', kind: 'summary', text: 'Ótima recepção, produto de boa qualidade' },
  { id: 'guararapes-mc-wrnr', locationId: 'guararapes', kind: 'review', author: 'MC Wrnr', rating: 5, publishedAt: '1 ano atrás', text: 'Fernanda me fez minhas unhas de gel. Ela é profissional e meticulosa. E foi muito bom conversar com ela. Recomendo' },
  { id: 'guararapes-marilia-mota', locationId: 'guararapes', kind: 'review', author: 'Marília Mota', rating: 5, publishedAt: '8 meses atrás', text: 'Meu salão de toda semana. Muito prático, chego e faço a unha rapidinho, atendimento excelente. Todas as manicures são ótimas, Lane se garante e as demais também.' },
  { id: 'guararapes-cristiane-gurgel', locationId: 'guararapes', kind: 'review', author: 'Cristiane Gurgel', rating: 5, publishedAt: '1 ano atrás', text: 'Sempre sou bem atendida tanto na recepção como pelos profissionais de cabelos ( Dani)e de unhas. Especial elogio à manicure Claudia, que além de ser excelente tecnicamente, sempre me recebe com muita gentileza e educação. Recomendo!' },

  // Sul.
  { id: 'sul-summary-1', locationId: 'sul', kind: 'summary', text: 'É um salão de beleza bem equipado, com bons profissionais; mto clientela.' },
  { id: 'sul-summary-2', locationId: 'sul', kind: 'summary', text: 'Quem fez meu cabelo foi o Felipe um rapaz novo, na idade, apenas.' },
  { id: 'sul-summary-3', locationId: 'sul', kind: 'summary', incomplete: true, text: 'Minhas unhas sempre perfeitas... profissional nota mil!!' },
  { id: 'sul-visitor-update', locationId: 'sul', kind: 'visitor-update', text: 'Meu salão a anos com atendimento maravilhoso! Unha de qualidade com perfeição, Vânia minha querida que sempre atende com tanto carinho e excelência se torna uma terapia com sua positividade e amor. Equipe de depilação maravilhosa Juliette e Aline. Gratidão meninas por tanto carinho' },
  { id: 'sul-claudio-pimentel', locationId: 'sul', kind: 'review', author: 'Claudio Pimentel', rating: 5, publishedAt: '2 meses atrás', incomplete: true, text: 'Desde que cheguei a cidade, com meus filhos, sou cliente desta unidade do Espaço Belíssima. Alguns profissionais muito competentes, conquistaram a mim e meus filhos. …' },

  // Passaré.
  { id: 'passare-summary-1', locationId: 'passare', kind: 'summary', text: 'Ótimo atendimento, acomodação aconchegante, serviços de café e água.' },
  { id: 'passare-summary-2', locationId: 'passare', kind: 'summary', text: 'Indico demais o serviço de barbearia, todos os profissionais são excelentes.' },
  { id: 'passare-summary-3', locationId: 'passare', kind: 'summary', text: 'Marina arrasa no cabelo e capuccino top.' },
  { id: 'passare-juliana-bezerra', locationId: 'passare', kind: 'review', author: 'Juliana Bezerra', rating: 5, publishedAt: '5 meses atrás', text: 'Passando para elogiar essas maravilhosas, Erika e Odelia! Atendimento incrível, unhas impecáveis e um carinho que faz toda diferença. Vocês são maravilhosas 🩷✨' },
  { id: 'passare-ilena-bessa', locationId: 'passare', kind: 'review', author: 'Ilena Bessa', rating: 5, publishedAt: '7 meses atrás', incomplete: true, text: 'Maiara… Manicure EXCELENTE, cuidadosa e bem caprichosa! Só faço minha unha do pé com ela 🩷 Rayssa NAIL DESIGN!! Capricho e rapidez! Eu amo! Unha delicadas e discretas, como eu amo! A melhor!' },
]

export function reviewKindLabel(kind: ReviewKind) {
  if (kind === 'summary') return 'Resumo de avaliações do Google'
  if (kind === 'owner-response') return 'Resposta do proprietário'
  if (kind === 'visitor-update') return 'Atualização de visitante'
  return 'Avaliação de cliente'
}

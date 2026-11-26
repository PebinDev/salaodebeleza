export type SalonLocation = {
  id: string
  name: string
  neighborhood: string
  address: string
  postalCode: string
  phone: string
  phoneDigits: string
  rating: string
  reviewCount: number
  highlights: string
}

export const openingHours = 'Segunda a sábado, 08h às 19h'

export const locations: SalonLocation[] = [
  {
    id: 'maraponga', name: 'Maraponga', neighborhood: 'Maraponga · Parangaba',
    address: 'Av. Godofredo Maciel, 4035 - Parangaba, Fortaleza - CE', postalCode: '60711-495',
    phone: '(85) 2135-5544', phoneDigits: '558521355544', rating: '4,8', reviewCount: 137,
    highlights: 'Cabelo, manicure, depilação e atendimento acolhedor.',
  },
  {
    id: 'coco', name: 'Cocó', neighborhood: 'Cocó',
    address: 'Av. Eng. Santana Jr., 2790 - Cocó, Fortaleza - CE', postalCode: '60192-200',
    phone: '(85) 3051-2494', phoneDigits: '558530512494', rating: '4,9', reviewCount: 234,
    highlights: 'Cabelo, mechas, escova, manicure e estacionamento.',
  },
  {
    id: 'guararapes', name: 'Guararapes', neighborhood: 'Guararapes',
    address: 'R. Atilano de Moura, 320 - Guararapes, Fortaleza - CE', postalCode: '60810-180',
    phone: '(85) 3077-2004', phoneDigits: '558530772004', rating: '4,8', reviewCount: 140,
    highlights: 'Estrutura, limpeza, manicure e serviços de cabelo.',
  },
  {
    id: 'sul', name: 'Sul', neighborhood: 'Cidade dos Funcionários',
    address: 'R. Joãozito Arruda, 2200 - Cidade dos Funcionários, Fortaleza - CE', postalCode: '60824-075',
    phone: '(85) 3271-0843', phoneDigits: '558532710843', rating: '4,6', reviewCount: 353,
    highlights: 'Manicure, depilação, cabelo e variedade de profissionais.',
  },
  {
    id: 'passare', name: 'Passaré', neighborhood: 'Passaré · Serrinha',
    address: 'Rua XII, 200, lojas 04 a 07 - Serrinha, Fortaleza - CE', postalCode: '60744-780',
    phone: '(85) 3295-6990', phoneDigits: '558532956990', rating: '4,6', reviewCount: 319,
    highlights: 'Manicure, nail design, cabelo e barbearia.',
  },
]

export function whatsappUrl(location: SalonLocation) {
  const message = `Olá! Gostaria de informações sobre serviços e horários na unidade ${location.name} do SB Espaço de Beleza.`
  return `https://wa.me/${location.phoneDigits}?text=${encodeURIComponent(message)}`
}

export function mapUrl(location: SalonLocation) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${location.address}, ${location.postalCode}`)}`
}

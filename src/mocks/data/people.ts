import manBeardCyan from '@/assets/images/people/man-beard-cyan.webp'
import manBlueShirt from '@/assets/images/people/man-blue-shirt.webp'
import manGlassesHoodie from '@/assets/images/people/man-glasses-hoodie.webp'
import manGlassesSmile from '@/assets/images/people/man-glasses-smile.webp'
import manRedBeard from '@/assets/images/people/man-red-beard.webp'
import womanCurlySmile from '@/assets/images/people/woman-curly-smile.webp'
import womanLongHair from '@/assets/images/people/woman-long-hair.webp'
import womanRedhead from '@/assets/images/people/woman-redhead.webp'
import womanYellow from '@/assets/images/people/woman-yellow.webp'
import type { Author } from '@/types'

/** Recurring people used across posts and comments. */
export const people = {
  jeromeBell: { name: 'Jerome Bell', role: 'Marketing Specialist', avatar: manBeardCyan },
  annetteBlack: { name: 'Annette Black', role: 'Product Manager', avatar: womanYellow },
  marvinMcKinney: {
    name: 'Marvin McKinney',
    role: 'Senior UI/UX Designer',
    avatar: manGlassesHoodie,
  },
  ralphEdwards: { name: 'Ralph Edwards', role: 'Head of Marketing', avatar: manRedBeard },
  estherHoward: { name: 'Esther Howard', role: 'VP of Strategy', avatar: womanRedhead },
  janeCooper: { name: 'Jane Cooper', role: 'CEO of Ipsum Company', avatar: womanLongHair },
  albertFlores: { name: 'Albert Flores', role: 'Author', avatar: manBlueShirt },
  cameronWilliamson: {
    name: 'Cameron Williamson',
    role: 'Strategic Advisor',
    avatar: womanRedhead,
  },
  estherHowardAlt: { name: 'Esther Howard', avatar: womanCurlySmile },
  jeromeBellAlt: { name: 'Jerome Bell', role: 'Marketing Specialist', avatar: manGlassesSmile },
} satisfies Record<string, Author>

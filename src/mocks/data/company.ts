import manGlassesHoodie from '@/assets/images/people/man-glasses-hoodie.webp'
import manGlassesSmile from '@/assets/images/people/man-glasses-smile.webp'
import manGreyHair from '@/assets/images/people/man-grey-hair.webp'
import manPinkTshirt from '@/assets/images/people/man-pink-tshirt.webp'
import manSuit from '@/assets/images/people/man-suit.webp'
import womanBlondeGlasses from '@/assets/images/people/woman-blonde-glasses.webp'
import womanBrunette from '@/assets/images/people/woman-brunette.webp'
import womanCurly from '@/assets/images/people/woman-curly.webp'
import womanLongHair from '@/assets/images/people/woman-long-hair.webp'
import womanRedhead from '@/assets/images/people/woman-redhead.webp'
import type { Award, Client, TeamMember, Testimonial } from '@/types'

const socials = {
  facebook: 'https://facebook.com',
  instagram: 'https://instagram.com',
  twitter: 'https://twitter.com',
  linkedin: 'https://linkedin.com',
}

export const team: TeamMember[] = [
  { name: 'Jenny Wilson', role: 'Founder & CEO', photo: womanBlondeGlasses },
  { name: 'Ralph Edwards', role: 'Co-Founder', photo: manGreyHair },
  { name: 'Cameron Williamson', role: 'Strategic Advisor', photo: womanCurly },
  { name: 'Jerome Bell', role: 'Marketing Specialist', photo: manGlassesSmile },
  { name: 'Marvin McKinney', role: 'Product Manager', photo: manGlassesHoodie },
  { name: 'Esther Howard', role: 'VP of Strategy', photo: womanRedhead },
  { name: 'Darrell Steward', role: 'Senior Project Manager', photo: manSuit },
  { name: 'Jane Cooper', role: 'Principal Consultant', photo: womanLongHair },
].map((member, index) => ({ id: `t${index + 1}`, socials, ...member }))

export const testimonials: Testimonial[] = [
  {
    id: 'r1',
    quote:
      'Dolor, a eget elementum, integer nulla volutpat, nunc, sit. Quam iaculis varius mauris magna sem. Egestas sed sed suscipit dolor faucibus dui imperdiet at eget. Tincidunt imperdiet quis hendrerit aliquam feugiat neque cras sed. Dictum quam integer volutpat tellus, faucibus platea. Pulvinar turpis proin faucibus at mauris. Sagittis gravida vitae porta enim, nulla arcu fermentum massa. Tortor ullamcorper lacus. Pellentesque lectus adipiscing aenean volutpat tortor habitant.',
    author: { name: 'Ralph Edwards', role: 'Head of Marketing', avatar: manPinkTshirt },
    photo: manPinkTshirt,
    company: 'logo',
    rating: 5,
    socials,
  },
  {
    id: 'r2',
    quote:
      'Vestibulum nunc lectus auctor quis. Natoque lectus tortor lacus, eu. Nunc feugiat nisl maecenas nulla hac morbi. Vitae, donec facilisis sed nunc netus. Venenatis posuere faucibus enim est. Vel dignissim morbi blandit morbi tellus. Arcu ullamcorper quis enim.',
    author: { name: 'Annette Black', role: 'QA Engineer in Company Name', avatar: womanBrunette },
    photo: womanCurly,
    company: 'cubes',
    rating: 5,
    socials,
  },
  {
    id: 'r3',
    quote:
      'Mi semper risus ultricies orci pulvinar in at enim orci. Quisque facilisis porta dictum a vel eu. Et habitasse augue arcu mauris, risus. Ut orci, cursus nunc at hendrerit feugiat. Tellus placerat posuere vitae, dignissim ultricies eu, porttitor pulvinar sed.',
    author: { name: 'Jenny Wilson', role: 'Founder & CEO', avatar: womanBlondeGlasses },
    photo: womanBlondeGlasses,
    company: 'd-mark',
    rating: 5,
    socials,
  },
  {
    id: 'r4',
    quote:
      'Pellentesque laoreet neque ut dictumst fames scelerisque. In malesuada orci dapibus risus tellus, amet, ultrices sagittis a. Turpis vel tincidunt tristique maecenas cursus tortor, suscipit ut. Ullamcorper at faucibus dolor tortor suspendisse suscipit senectus convallis aliquam.',
    author: { name: 'Darrell Steward', role: 'CTO', avatar: manGreyHair },
    photo: manGreyHair,
    company: 'slash',
    rating: 4,
    socials,
  },
]

export const clients: Client[] = [
  { id: 'c1', name: 'Logo', logo: 'logo' },
  { id: 'c2', name: 'Logoipsum Cubes', logo: 'cubes' },
  { id: 'c3', name: 'Logoipsum', logo: 'logoipsum-outline' },
  { id: 'c4', name: 'Logoipsum D', logo: 'd-mark' },
  { id: 'c5', name: 'Logoipsum Slash', logo: 'slash' },
  { id: 'c6', name: 'Logoipsum Arrow', logo: 'arrow' },
  { id: 'c7', name: 'Logo Studio', logo: 'logo' },
  { id: 'c8', name: 'Logoipsum Labs', logo: 'cubes' },
]

export const awards: Award[] = [
  { id: 'a1', name: 'The Webby Awards', caption: '4x mobile of the day', logo: 'webby' },
  { id: 'a2', name: 'CSS Design Awards', caption: '1x Kudos', logo: 'cssda' },
  { id: 'a3', name: 'Awwwards', caption: '3x website of the day', logo: 'awwwards' },
  { id: 'a4', name: 'FWA', caption: '2x best website', logo: 'fwa' },
]

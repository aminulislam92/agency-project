import manRedBeard from '@/assets/images/people/man-red-beard.webp'
import manGlassesSmile from '@/assets/images/people/man-glasses-smile.webp'
import womanCurlySmile from '@/assets/images/people/woman-curly-smile.webp'
import womanRedhead from '@/assets/images/people/woman-redhead.webp'
import type { Comment } from '@/types'
import { posts } from './posts'

const MINUTE = 60 * 1000

/** Comments shown in the Blog Details design, attached to every post's thread. */
function threadFor(postSlug: string): Comment[] {
  return [
    {
      id: `${postSlug}-c1`,
      postSlug,
      parentId: null,
      author: { name: 'Esther Howard', avatar: womanCurlySmile },
      createdAt: new Date(Date.now() - 4 * MINUTE).toISOString(),
      text: 'Nibh enim porta ut augue felis, donec sit luctus. Quis ullamcorper dolor sit mauris. Hendrerit eu libero, eu tristique sodales ultrices etiam adipiscing. Donec viverra sodales arcu gravida nibh at. Neque lobortis quis porta integer et placerat lectus scelerisque. Velit egestas morbi faucibus at sed euismod. Tortor, eu ut id tincidunt leo placerat lacus.',
    },
    {
      id: `${postSlug}-c2`,
      postSlug,
      parentId: null,
      author: { name: 'Ralph Edwards', avatar: manRedBeard },
      createdAt: '2021-09-09T12:48:00.000Z',
      text: 'Eget amet, ac scelerisque tellus sed. Sapien duis sit neque pulvinar. Est sit aenean nisl etiam donec mattis ut diam. Luctus massa eu nunc aliquam viverra tempus, eu amet, luctus. Ac faucibus vestibulum eu lacus. Ullamcorper sem ultrices tincidunt pharetra?',
    },
    {
      id: `${postSlug}-c3`,
      postSlug,
      parentId: `${postSlug}-c2`,
      replyTo: 'Ralph Edwards',
      author: { name: 'Albert Flores', avatar: manGlassesSmile },
      createdAt: new Date(Date.now() - 16 * 60 * MINUTE).toISOString(),
      text: 'Vulputate malesuada amet, consequat ullamcorper. Orci, cras maecenas in sit purus pellentesque. Ridiculus blandit pellentesque eget arcu morbi nisl. Morbi volutpat adipiscing sapien sed ut tempor.',
    },
    {
      id: `${postSlug}-c4`,
      postSlug,
      parentId: null,
      author: { name: 'Cameron Williamson', avatar: womanRedhead },
      createdAt: '2021-03-24T08:20:00.000Z',
      text: 'Mattis id ut sed arcu metus elit faucibus condimentum aliquam. Nam adipiscing diam et suspendisse. Sagittis massa maecenas laoreet nulla amet nunc sagittis, pulvinar neque. Duis imperdiet ipsum suspendisse massa lectus habitasse. Id ante volutpat hendrerit augue parturient eget. Ac vitae posuere leo morbi vitae at lectus. Nibh neque quam quis amet mattis sit. Faucibus risus at sit tempus ut.',
    },
  ]
}

export const comments: Comment[] = posts.flatMap((post) => threadFor(post.slug))

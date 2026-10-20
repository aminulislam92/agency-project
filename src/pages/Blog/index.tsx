import { NewsletterSignup } from './sections/NewsletterSignup'
import { PostsGrid } from './sections/PostsGrid'

export default function BlogPage() {
  return (
    <>
      <title>Blog | Silicon</title>
      <meta
        name="description"
        content="Articles on design, development, marketing and startups from the Silicon digital agency team."
      />
      <PostsGrid />
      <NewsletterSignup />
    </>
  )
}

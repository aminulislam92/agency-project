import { Container } from '@/components/ui/Container'
import { ButtonLink } from '@/components/ui/Button'
import { BiHomeAlt } from 'react-icons/bi'

export default function NotFoundPage() {
  return (
    <main className="grid min-h-screen items-center bg-hero">
      <title>Page not found | Silicon</title>
      <meta name="robots" content="noindex" />
      <Container>
        <h1 className="text-display-2">Error 404</h1>
        <p className="mt-4 text-body-xl text-body">
          The page you are looking for was moved, removed or might never existed.
        </p>
        <ButtonLink
          to="/"
          className="mt-10"
          leftIcon={<BiHomeAlt aria-hidden className="size-5" />}
        >
          Go to homepage
        </ButtonLink>
      </Container>
    </main>
  )
}

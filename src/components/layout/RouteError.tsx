import { BiHomeAlt, BiRefresh } from 'react-icons/bi'
import { isRouteErrorResponse, useRouteError } from 'react-router'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'

/** Error boundary for unexpected render/loader errors. */
export function RouteError() {
  const error = useRouteError()
  const status = isRouteErrorResponse(error) ? error.status : undefined
  const message =
    status === 404
      ? 'The page you are looking for was moved, removed or might never existed.'
      : 'Something went wrong while loading this page.'

  if (import.meta.env.DEV) console.error(error)

  return (
    <main className="grid min-h-screen items-center bg-hero">
      <title>{status === 404 ? 'Page not found' : 'Error'} | Silicon</title>
      <Container>
        <h1 className="text-h1 md:text-display-3">{status ? `Error ${status}` : 'Oops!'}</h1>
        <p className="mt-4 max-w-xl text-body-xl text-body">{message}</p>
        <div className="mt-10 flex flex-wrap gap-4">
          <ButtonLink to="/" leftIcon={<BiHomeAlt aria-hidden className="size-5" />}>
            Go to homepage
          </ButtonLink>
          <Button
            variant="outline"
            leftIcon={<BiRefresh aria-hidden className="size-5" />}
            onClick={() => window.location.reload()}
          >
            Try again
          </Button>
        </div>
      </Container>
    </main>
  )
}

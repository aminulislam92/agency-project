import { Reveal } from '@/components/shared/Reveal'
import { TeamCard, TeamCardSkeleton } from '@/components/shared/TeamCard'
import { Container } from '@/components/ui/Container'
import { ErrorState } from '@/components/ui/ErrorState'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { useGetTeamQuery } from '@/services/companyApi'

export function Leadership() {
  const { data: team, isLoading, isError, refetch } = useGetTeamQuery()

  return (
    <section aria-labelledby="leadership-title" className="pt-20 lg:pt-28">
      <Container>
        <SectionHeading id="leadership-title" title="Our Leadership" />
        {isError && (
          <ErrorState
            className="mt-10"
            message="We couldn't load our team."
            onRetry={() => void refetch()}
          />
        )}
        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 md:grid-cols-3 lg:grid-cols-4 lg:gap-y-10">
          {isLoading &&
            Array.from({ length: 8 }, (_, index) => (
              <li key={index}>
                <TeamCardSkeleton />
              </li>
            ))}
          {team?.map((member, index) => (
            <Reveal as="li" key={member.id} delay={(index % 4) * 0.08}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}

import { Skeleton } from '@/components/ui/Skeleton'
import { cn } from '@/lib/cn'
import type { SocialLinks, TeamMember } from '@/types'
import { SocialButton, type SocialNetwork } from './SocialLinks'

const NETWORKS: (keyof SocialLinks & SocialNetwork)[] = [
  'facebook',
  'instagram',
  'twitter',
  'linkedin',
]

/** Team member: 306×320 photo, name + role; social links slide up over the photo on hover/focus. */
export function TeamCard({ member, className }: { member: TeamMember; className?: string }) {
  const links = NETWORKS.flatMap((network) => {
    const href = member.socials[network]
    return href ? [{ network, href }] : []
  })

  return (
    <article className={cn('group text-center', className)}>
      <div className="relative overflow-hidden rounded-lg bg-subtle">
        <img
          src={member.photo}
          alt={`Portrait of ${member.name}`}
          width={306}
          height={320}
          loading="lazy"
          decoding="async"
          className="aspect-[306/320] w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {links.length > 0 && (
          <ul
            aria-label={`${member.name} on social media`}
            className="absolute inset-x-0 bottom-0 hidden justify-center gap-2 bg-linear-to-t from-gray-900/60 to-transparent p-4 pt-10 transition-all duration-300 lg:flex lg:translate-y-full lg:opacity-0 lg:group-focus-within:translate-y-0 lg:group-focus-within:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
          >
            {links.map((link) => (
              <li key={link.network}>
                <SocialButton
                  network={link.network}
                  href={link.href}
                  size="sm"
                  label={`${member.name} on ${link.network}`}
                  className="border-transparent bg-white text-gray-800"
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <h3 className="mt-4 text-body-m font-semibold text-heading md:text-body-l">{member.name}</h3>
      <p className="mt-1 text-body-s text-muted">{member.role}</p>
      {/* Touch screens have no hover: show a compact row instead of the overlay */}
      {links.length > 0 && (
        <ul
          className="mt-3 flex justify-center gap-1 lg:hidden"
          aria-label={`${member.name} on social media`}
        >
          {links.map((link) => (
            <li key={link.network}>
              <SocialButton
                network={link.network}
                href={link.href}
                variant="subtle"
                size="xs"
                label={`${member.name} on ${link.network}`}
              />
            </li>
          ))}
        </ul>
      )}
    </article>
  )
}

export function TeamCardSkeleton() {
  return (
    <div aria-hidden className="text-center">
      <Skeleton className="aspect-[306/320] w-full" />
      <Skeleton className="mx-auto mt-4 h-5 w-32" />
      <Skeleton className="mx-auto mt-2 h-4 w-24" />
    </div>
  )
}

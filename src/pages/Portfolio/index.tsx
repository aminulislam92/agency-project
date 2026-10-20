import { NextLevelBanner } from './sections/NextLevelBanner'
import { ProjectsGrid } from './sections/ProjectsGrid'

export default function PortfolioPage() {
  return (
    <>
      <title>Portfolio | Silicon</title>
      <meta
        name="description"
        content="Selected web design, graphic design, branding, UI/UX and motion design work by the Silicon digital agency."
      />
      <ProjectsGrid />
      <NextLevelBanner />
    </>
  )
}

/**
 * Converts the raster images exported from Figma (design-reference/assets/images)
 * into compressed WebP files under src/assets/images with descriptive names.
 *
 *   npm run images
 *
 * maxWidth is ~2x the largest rendered size; images are never upscaled.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const SRC = path.resolve('design-reference/assets/images')
const OUT = path.resolve('src/assets/images')

/** [source (relative to SRC), destination (relative to OUT, no extension), maxWidth] */
const MAP = [
  // Projects / portfolio
  ['home-page--projects--image-416x856.jpg', 'projects/neon-body', 832],
  ['home-page--projects--image-416x416-2.jpg', 'projects/pop-art-heads', 832],
  ['home-page--projects--image-416x416.jpg', 'projects/blue-whale', 832],
  ['home-page--projects--image-856x416.jpg', 'projects/explosion', 1712],
  ['portfolio--portfolio--image-526x420.jpg', 'projects/astronaut-neon', 1052],
  ['portfolio--portfolio--image-526x420-2.jpg', 'projects/3d-shape', 1052],
  ['portfolio--portfolio--image-746x420.jpg', 'projects/sunglasses-head', 1492],
  ['portfolio--portfolio--image-746x420-2.jpg', 'projects/plaster-sculpture', 1492],
  ['portfolio--portfolio--image-746x420-3.jpg', 'projects/mannequin-hands', 1492],

  // Blog
  ['home-page--blog--image-526x264.jpg', 'blog/smartwatch', 1052],
  ['home-page--blog--image-306x240-2.jpg', 'blog/astronaut-ring', 832],
  ['home-page--blog--image-306x240.jpg', 'blog/laptop-gradient', 832],
  ['blog-card--image--image-387x300.jpg', 'blog/business-skyscraper', 832],
  ['blog-details--header--image-1920x700.jpg', 'blog/astronaut-cover', 1920],
  ['blog-details--post--image-966x500.jpg', 'blog/tablet-drawing', 1932],
  ['misc/081b9cba9a.jpg', 'blog/laptop-typing', 832],
  ['misc/2a935650e4.jpg', 'blog/girl-headphones', 832],
  ['misc/cc67f8df2a.jpg', 'blog/developer-code', 832],
  ['misc/efca0733eb.jpg', 'blog/hand-mouse', 832],
  ['misc/2b6e844f9c.jpg', 'blog/woman-laptop', 832],
  ['misc/a82460acb4.jpg', 'blog/phone-charger', 832],
  ['misc/9663be94cf.jpg', 'blog/white-keyboard', 832],
  ['misc/1869fa6cd1.jpg', 'blog/smartwatch-box', 832],

  // People
  ['about--team--image-306x320.jpg', 'people/woman-blonde-glasses', 612],
  ['about--team--image-306x320-2.jpg', 'people/man-grey-hair', 612],
  ['misc/7881100133.jpg', 'people/woman-curly', 612],
  ['misc/161776aa3d.jpg', 'people/man-red-beard', 400],
  ['misc/8404ddb164.jpg', 'people/man-glasses-smile', 400],
  ['misc/d3e56222ad.jpg', 'people/man-glasses-curly', 400],
  ['misc/dfa750491e.jpg', 'people/woman-redhead', 400],
  ['misc/d091bfec18.png', 'people/woman-curly-laptop', 400],
  ['home-page--testimonials--image-416x360.jpg', 'people/man-pink-tshirt', 832],
  ['about--testimonials--avatar-60x60.jpg', 'people/woman-brunette', 200],
  ['blog-details--header--avatar-60x60.jpg', 'people/man-blue-shirt', 200],
  ['blog-details--post--avatar-48x48.jpg', 'people/woman-long-hair', 200],
  ['comment--header--avatar-48x48.png', 'people/woman-curly-smile', 200],
  ['home-page--blog--avatar-48x48-2.jpg', 'people/woman-yellow', 200],
  ['home-page--blog--avatar-48x48-3.jpg', 'people/man-beard-cyan', 200],
  ['home-page--blog--avatar-48x48.jpg', 'people/man-glasses-hoodie', 200],
  ['service-details--content--avatar-26x26.jpg', 'people/woman-bubblegum', 120],
  ['service-details--content--avatar-26x26-2.jpg', 'people/man-green', 120],
  ['service-details--content--avatar-26x26-3.jpg', 'people/man-glasses-denim', 120],
  ['service-details--content--avatar-26x26-4.jpg', 'people/man-cyan', 120],
  ['service-details--content--avatar-29x29.jpg', 'people/man-suit', 120],

  // Misc illustrations
  ['home-page--competencies--image-200x200.png', 'misc/competency-laptop', 400],
  ['home-page--picture--image-1296x560.jpg', 'misc/creative-atmosphere', 1920],
  ['portfolio--banner--image-382x382.png', 'misc/banner-computer', 764],
  ['service-details--content--image-257x519.png', 'misc/phone-mockup', 514],
  ['service-details--what-we-offer--avatar-28x28.png', 'misc/memoji', 112],
  ['service-details--what-we-offer--avatar-35x35.png', 'misc/dashboard-logo', 140],
]

let before = 0
let after = 0

for (const [src, dest, maxWidth] of MAP) {
  const input = path.join(SRC, src)
  const output = path.join(OUT, `${dest}.webp`)
  await fs.mkdir(path.dirname(output), { recursive: true })

  const { size } = await fs.stat(input)
  const info = await sharp(input)
    .rotate()
    .resize({ width: maxWidth, withoutEnlargement: true })
    .webp({ quality: 80, effort: 6 })
    .toFile(output)

  before += size
  after += info.size
  console.log(
    `${dest.padEnd(32)} ${String(info.width).padStart(4)}x${String(info.height).padEnd(4)} ${(size / 1024).toFixed(0).padStart(6)} KB -> ${(info.size / 1024).toFixed(0).padStart(4)} KB`,
  )
}

console.log(
  `\nTotal: ${(before / 1024 / 1024).toFixed(2)} MB -> ${(after / 1024 / 1024).toFixed(2)} MB`,
)

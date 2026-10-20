/**
 * Side-by-side comparison of a screenshot with its design reference.
 * Left = design, right = build. Both scaled to 50%, split into viewable chunks.
 *
 *   node scripts/compare.mjs "design-reference/Home Page (B).png" screenshots/home-1920.png home [--chunk=1400]
 *
 * Output: screenshots/compare/<name>-NN.png
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const args = process.argv.slice(2)
const [designPath, buildPath, name = 'compare'] = args.filter((a) => !a.startsWith('--'))
const chunk = Number(args.find((a) => a.startsWith('--chunk='))?.split('=')[1] ?? 1400)
if (!designPath || !buildPath) {
  console.error('Usage: node scripts/compare.mjs <design.png> <build.png> <name>')
  process.exit(1)
}

const SCALE = 0.5
const GAP = 8
const outDir = 'screenshots/compare'
await fs.mkdir(outDir, { recursive: true })

const load = async (file) => {
  const meta = await sharp(file).metadata()
  const width = Math.round(meta.width * SCALE)
  const buffer = await sharp(file).resize({ width }).png().toBuffer()
  const { height } = await sharp(buffer).metadata()
  return { buffer, width, height }
}

const design = await load(designPath)
const build = await load(buildPath)
const totalHeight = Math.max(design.height, build.height)
const step = Math.round(chunk * SCALE)
const width = design.width + GAP + build.width

for (let top = 0, index = 0; top < totalHeight; top += step, index++) {
  const layers = []
  for (const [image, left] of [
    [design, 0],
    [build, design.width + GAP],
  ]) {
    const height = Math.min(step, image.height - top)
    if (height <= 0) continue
    const part = await sharp(image.buffer)
      .extract({ left: 0, top, width: image.width, height })
      .toBuffer()
    layers.push({ input: part, left, top: 0 })
  }
  const file = path.join(outDir, `${name}-${String(index).padStart(2, '0')}.png`)
  await sharp({
    create: { width, height: step, channels: 3, background: '#ff00ff' },
  })
    .composite(layers)
    .png()
    .toFile(file)
  console.log(file)
}
console.log(`design ${design.height / SCALE}px tall, build ${build.height / SCALE}px tall`)

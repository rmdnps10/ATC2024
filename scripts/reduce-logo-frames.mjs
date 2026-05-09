/**
 * 애니메이션 WebP 로고의 프레임 수를 절반으로 줄여 파일 크기를 줄임.
 * 25fps → 12fps (매 2프레임마다 1개 보존, 지속시간을 2배로 보정)
 *
 * 의존: sharp (npm install sharp), img2webp (brew install webp)
 */

import sharp from 'sharp'
import { execSync } from 'child_process'
import { mkdirSync, rmSync, existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dir = dirname(fileURLToPath(import.meta.url))
const PUBLIC = join(__dir, '../public/icon/logo/transition')

// atc-elephant, elephant-atc는 작아서 제외 (400KB대)
const TARGETS = [
  { name: 'atc2024-elephant', skip: 2 },    // 1.8MB → ~900KB
  { name: 'elephant-atc2024', skip: 2 },    // 2.5MB → ~1.2MB
]

const IMG2WEBP = '/opt/homebrew/bin/img2webp'

for (const { name, skip } of TARGETS) {
  const inputPath = join(PUBLIC, `${name}.bak.webp`)
  const outputPath = join(PUBLIC, `${name}.webp`)
  const tmpDir = `/tmp/logo_reduce_${name}`

  console.log(`\n▶ Processing ${name}.webp ...`)

  // webpmux로 총 프레임 수 파악 (sharp의 pixel limit 우회)
  const info = execSync(`webpmux -info "${inputPath}"`).toString()
  const totalFrames = parseInt(info.match(/Number of frames:\s*(\d+)/)?.[1] ?? '1', 10)
  console.log(`  Total frames: ${totalFrames}`)

  mkdirSync(tmpDir, { recursive: true })

  // 매 skip번째 프레임만 PNG로 추출 (composited full frame)
  const selected = []
  for (let i = 0; i < totalFrames; i += skip) {
    const outFile = join(tmpDir, `frame_${String(i).padStart(5, '0')}.png`)
    await sharp(inputPath, { page: i, limitInputPixels: false }).png().toFile(outFile)
    selected.push(outFile)
  }

  const keptFrames = selected.length
  console.log(`  Kept frames: ${keptFrames} (every ${skip} frames)`)

  // 2.5배 빠르게 재생: 원본 40ms → 32ms (원본보다 1.25배 빠름, 현재 80ms 대비 2.5배 빠름)
  const durationMs = 16
  const frameArgs = selected.map(f => `-d ${durationMs} ${f}`).join(' ')

  const tmpOutput = join(tmpDir, 'output.webp')
  const cmd = `${IMG2WEBP} -lossy -q 80 -loop 1 ${frameArgs} -o "${tmpOutput}"`
  execSync(cmd, { stdio: 'pipe' })

  execSync(`cp "${tmpOutput}" "${outputPath}"`)

  rmSync(tmpDir, { recursive: true })

  // 크기 비교
  const before = execSync(`stat -f%z "${inputPath}"`).toString().trim()
  const after = execSync(`stat -f%z "${outputPath}"`).toString().trim()
  const ratio = ((1 - after / before) * 100).toFixed(1)
  console.log(`  ${(before / 1024).toFixed(0)}KB → ${(after / 1024).toFixed(0)}KB (-${ratio}%)`)
}

console.log('\n✅ Done. Original files backed up as *.bak.webp')

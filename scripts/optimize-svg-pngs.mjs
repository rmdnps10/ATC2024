// SVG 내부에 base64 임베드된 PNG를 추출 → sharp로 WebP 재압축 → 재삽입
import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, extname } from 'path'
import sharp from 'sharp'

const SVG_DIR = new URL('../public/images/about', import.meta.url).pathname

async function optimizeSvg(filePath) {
  const content = readFileSync(filePath, 'utf-8')

  // base64 PNG 패턴 감지
  const match = content.match(/data:image\/png;base64,([^"']+)/)
  if (!match) {
    console.log(`⏭  ${filePath} — base64 PNG 없음, 스킵`)
    return
  }

  const originalBase64 = match[1]
  const originalBuffer = Buffer.from(originalBase64, 'base64')
  const originalSize = originalBuffer.length

  // sharp로 PNG → PNG (높은 압축) 재처리
  const optimizedBuffer = await sharp(originalBuffer)
    .png({ compressionLevel: 9, effort: 10 })
    .toBuffer()

  const optimizedBase64 = optimizedBuffer.toString('base64')
  const optimizedSize = optimizedBuffer.length
  const saving = (((originalSize - optimizedSize) / originalSize) * 100).toFixed(1)

  const newContent = content.replace(
    `data:image/png;base64,${originalBase64}`,
    `data:image/png;base64,${optimizedBase64}`
  )

  writeFileSync(filePath, newContent, 'utf-8')

  const fileName = filePath.split('/').pop()
  console.log(
    `✅ ${fileName}: ${(originalSize / 1024).toFixed(0)}KB → ${(optimizedSize / 1024).toFixed(0)}KB (-${saving}%)`
  )
}

const files = readdirSync(SVG_DIR)
  .filter(f => extname(f) === '.svg')
  .map(f => join(SVG_DIR, f))

console.log(`\n🔧 SVG 내 PNG 최적화 시작 (${files.length}개)\n`)

for (const file of files) {
  await optimizeSvg(file)
}

console.log('\n✨ 완료')

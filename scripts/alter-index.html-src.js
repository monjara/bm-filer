// todo vite build?
import * as fs from 'node:fs'
import * as readline from 'node:readline'

const isSrcFile = (f) => f.includes('main.tsx') && f.includes('loader')
const srcFile = fs.readdirSync('./dist/assets').find(isSrcFile)

fs.rename('./dist/index.html', './dist/index.bak.html', (err) => {
  if (err) {
    console.error(err)
    return
  }
})

const rs = fs.createReadStream('./dist/index.bak.html')
const ws = fs.createWriteStream('./dist/index.html')

const rl = readline.createInterface({
  input: rs,
  output: ws,
})

rl.on('line', (l) => {
  let line = l
  if (line.includes('main.tsx')) {
    line = line.replace('src/main.tsx', `assets/${srcFile}`)
  }
  ws.write(`${line}\n`)
})
rl.on('close', () => {
  ws.end()
  fs.unlinkSync('./dist/index.bak.html')
})

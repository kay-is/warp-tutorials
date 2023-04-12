import { mkdirSync, existsSync, writeFileSync } from "fs"
import { WarpFactory, LoggerFactory } from "warp-contracts"

LoggerFactory.INST.logLevel("error")

const walletName = process.argv[2]
const walletPath = `wallets/${walletName}.json`
if (existsSync(walletPath)) {
  console.error(`Wallet "${walletName}" already exists. Skipping!`)
  process.exit(0)
}

const warp = WarpFactory.forTestnet()
const wallet = await warp.generateWallet()

if (!existsSync("wallets")) mkdirSync("wallets")

writeFileSync(walletPath, JSON.stringify(wallet))
console.log(`Wallet "${walletName}" created`)

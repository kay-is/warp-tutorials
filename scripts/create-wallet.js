import { mkdirSync, existsSync, writeFileSync } from "fs"
import { WarpFactory, LoggerFactory } from "warp-contracts"

LoggerFactory.INST.logLevel("error")

const warp = WarpFactory.forTestnet()
const wallet = await warp.generateWallet()

if (!existsSync("wallets")) mkdirSync("wallets")

const walletName = process.argv[2]

writeFileSync(`wallets/${walletName}.json`, JSON.stringify(wallet))
console.log(`Wallet "${walletName}" created`)

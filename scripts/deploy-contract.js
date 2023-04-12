import { readFileSync, writeFileSync } from "fs"
import { WarpFactory, LoggerFactory } from "warp-contracts"
import { ArweaveSigner, DeployPlugin } from "warp-contracts-plugin-deploy"

LoggerFactory.INST.logLevel("error")

const walletName = process.argv[2]
const contractName = process.argv[3]

const src = readFileSync(contractName + "/contract.js", "utf-8")
const initState = readFileSync(contractName + "/initial-state.json", "utf-8")
const { jwk } = JSON.parse(readFileSync(`wallets/${walletName}.json`, "utf-8"))
const wallet = new ArweaveSigner(jwk)

const { contractTxId } = await WarpFactory.forTestnet()
  .use(new DeployPlugin())
  .deploy({ src, initState, wallet })

writeFileSync(contractName + "/contract-id", contractTxId)

console.log(`Contract "${contractName}" deployed with ID: ${contractTxId}`)

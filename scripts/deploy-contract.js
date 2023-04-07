import { readFileSync, writeFileSync } from "fs"
import { WarpFactory, LoggerFactory } from "warp-contracts"
import { DeployPlugin } from "warp-contracts-plugin-deploy"

LoggerFactory.INST.logLevel("error")

const walletName = process.argv[2]
const contractName = process.argv[3]

const { contractTxId } = await WarpFactory.forLocal(8888)
  .use(new DeployPlugin())
  .deploy({
    src: readFileSync(contractName + "/contract.js", "utf-8"),
    initState: readFileSync(contractName + "/initial-state.json", "utf-8"),
    wallet: JSON.parse(readFileSync(`wallets/${walletName}.json`, "utf-8")).jwk,
  })

writeFileSync(contractName + "/contract-id", contractTxId)

console.log(`Contract "${contractName}" deployed with ID: ${contractTxId}`)

import { readFileSync } from "fs"
import { WarpFactory, LoggerFactory } from "warp-contracts"

LoggerFactory.INST.logLevel("error")

const walletName = process.argv[2]
const contractName = process.argv[3]
const inputFunction = process.argv[4]
const inputContentOrId = process.argv[5]

const wallet = JSON.parse(readFileSync(`wallets/${walletName}.json`, "utf-8"))
const contractId = readFileSync(contractName + "/contract-id", "utf-8")

const contract = WarpFactory.forTestnet()
  .contract(contractId)
  .connect(wallet.jwk)

switch (inputFunction) {
  case "postMessage":
    await contract.writeInteraction({
      function: inputFunction,
      content: inputContentOrId,
    })
    break
  case "upvoteMessage":
    await contract.writeInteraction({
      function: inputFunction,
      id: inputContentOrId,
    })
    break
  case "downvoteMessage":
    await contract.writeInteraction({
      function: inputFunction,
      id: inputContentOrId,
    })
    break
}

if (inputFunction === "readMessage") {
  const { result } = await contract.viewState({
    function: inputFunction,
    id: inputContentOrId,
  })
  console.log(result)
} else {
  console.log((await contract.readState()).cachedValue)
}

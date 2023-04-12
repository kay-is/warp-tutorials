import { fileURLToPath } from "url"
import { createServer } from "vite"

const contractName = process.argv[2]

const __dirname = fileURLToPath(new URL(".", import.meta.url))

const server = await createServer({
  configFile: false,
  root: __dirname + "../" + contractName,
  server: { host: "0.0.0.0", port: 8080 },
})

await server.listen()

server.printUrls()

import { Client } from "pg"

export const lambdaHandler = async () => {
  const client = new Client({
    user: process.env.RDS_USER,
    host: process.env.RDS_HOST,
    database: process.env.RDS_DATABASE,
    password: process.env.RDS_PASSWORD,
    port: parseInt(process.env.RDS_PORT, 10),
  })
  client.connect()
  const query = "SELECT * FROM public.tile"
  try {
    const res = await client.query(query)
    return res
  } catch (err) {
    console.log(err)
  } finally {
    client.end()
  }
}

if (process?.argv?.indexOf("isTesting") !== -1) {
  try {
    ;(async () => {
      console.log(await lambdaHandler())
    })()
  } catch (err) {
    console.log("the Error", err)
    throw new Error(err)
  }
}

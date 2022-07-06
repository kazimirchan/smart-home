import type { NextApiRequest, NextApiResponse } from "next"
import axios from "axios"

export default async function getTableData(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "method not allowed",
      type: "error",
    })
  }

  const url = "http://0.0.0.0:3000/api/dataSample"
  await axios.get(url).then((resp) => {
    return res.status(200).json(resp.data)
  })
}

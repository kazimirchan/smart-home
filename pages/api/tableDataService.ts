
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const url = "http://0.0.0.0:3000/api/dataSample"
  axios.get(url).then((resp) => {
    res.status(200).json(resp.data)
  })
  
}

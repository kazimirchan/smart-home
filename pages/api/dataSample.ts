import type { NextApiRequest, NextApiResponse } from "next"

export default function getSample(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(400).json({
      message: "method not allowed",
      type: "error",
    })
  }
  return res.json({
    "table": [
      "name", "login"
    ],
    "data": [{
      "name": "Jane",
      "login": "Jane"
    },
      {
        "name": "Jane 2",
        "login": "Jane 2"
      }
    ]
  })
}

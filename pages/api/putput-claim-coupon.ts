import type { NextApiRequest, NextApiResponse } from 'next'
import { sign } from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'

type Data = {
  code: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const site_type = req.query.site_type || req.body.site_type || 'HDFILME.TV'
  const duration_type = req.query.duration_type || req.body.duration_type || '1_day'
    
  const data = await fetch('https://api.putput.net/api/shared/claim-coupon/', {
    'method': 'PUT',
    'headers': {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    'body': JSON.stringify({
      'couponToken': sign({
        duration_type,
        site_type,
        jti: uuidv4()
      }, 'hoan_an_cac')
    })
  })
  res.status(200).setHeader('Access-Control-Allow-Origin', '*').json(await data.json())
}

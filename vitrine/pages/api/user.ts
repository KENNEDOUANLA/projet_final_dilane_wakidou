// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios'
type Data = {
  name: string
}


export const loginRequest = (body:any) => {
  return axios.post('http://localhost:8000/api/login', body)
    .then( (res) => {
      console.log(res)
    })
    .catch( (err) => {
      console.log(err)
    })
}

export const checkRole = (body:any) => {
  return axios.post('http://localhost:8000/api/check-role', body)
    .then( (res) => {
      console.log(res)
    })
    .catch( (err) => {
      console.log(err)
    })
}

export const inscriptionRequest = (body:any) => {
  return axios.post('http://localhost:8000/api/inscription', body)
    .then( (res) => {
      return res
    })
    .catch( (err) => {
      return err
    })
}

export const valideUserRequest = (id:any) => 
  axios.post('http://localhost:8000/api/inscription/valide-user/', {id})
    .then( (res) => res.data)
    .catch( (err) => {
      console.log(err)
    })

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({ name: 'John Doe' })
}


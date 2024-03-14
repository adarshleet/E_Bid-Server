
import jwt from 'jsonwebtoken'
import { Bid } from '../models/bidModel.js'


export const createBid = async(req,res)=>{
    try {
        const {bidAmount,item} = req.body
        console.log(req.body)

        const {token} = req.headers
        const decoded = jwt.verify(token,process.env.JWT_KEY)
        console.log(decoded.id)

        const newBid = new Bid({
            bidAmount,
            item,
            user:decoded.id
        })

        await newBid.save()
        res.status(200).json(newBid)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
}
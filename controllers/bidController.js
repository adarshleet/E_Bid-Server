
import jwt from 'jsonwebtoken'
import { Bid } from '../models/bidModel.js'
import { Items } from '../models/itemsModel.js'
import { Types } from 'mongoose';


//creating a new bid by user
export const createBid = async (req, res) => {
    try {
        const { bidAmount, item } = req.body

        const { token } = req.headers
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        //check bid amount is greater than minimum amount
        const amountCheck = await Items.findOne({ _id: item, bidStartPrice: { $gte: bidAmount } })
        if (amountCheck) {
            return res.status(409).json({ error: 'Bid Amount should be greater than minimum amount' })
        }

        console.log(item)

        const result = await Bid.aggregate([
            { $match: { item: new Types.ObjectId(item) } },
            { $group: { _id: null, maxPrice: { $max: '$bidAmount' } } }
        ])
        const maxPrice = result[0]?.maxPrice

        if(bidAmount <= maxPrice){
            return res.status(409).json({ error: 'Please Bid an amount higher than top bid' })
        }

        const newBid = new Bid({
            bidAmount,
            item,
            user:decoded.id
        })

        await newBid.save()
        res.status(200).json(newBid)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error' })
    }
}



//user bid added items
export const userBids = async (req, res) => {
    try {
        const { token } = req.headers
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        const bids = await Bid.find({ user: decoded.id }).populate('item').populate('user')
        res.status(200).json(bids)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error' })
    }
}


//take user bid for an item
export const userBid = async(req,res)=>{
    try {
        const { token } = req.headers
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        const id = req.query.id

        const bid = await Bid.findOne({user:decoded.id,item:id})
        
        res.status(200).json(bid)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error' })
    }
}


//all bids of the product
export const allBids = async(req,res)=>{
    try {
        const id = req.query.id
        const bids = await Bid.find({item:id}).populate('item').populate('user')
        res.status(200).json(bids)

    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'internal server error' })
    }
}
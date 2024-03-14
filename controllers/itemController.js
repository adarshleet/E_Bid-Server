import jwt from 'jsonwebtoken'
import { Items } from "../models/itemsModel.js"



//add item for bidding
export const addItem = async(req,res)=>{
    try {
        const {itemName,bidStartPrice,bidStartDate,bidEndDate} = req.body

        const {token} = req.headers
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        const newItem = new Items({
            itemName,
            bidStartPrice,
            user:decoded.id
        })

        await newItem.save()

        res.status(200).json(newItem)


    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
}
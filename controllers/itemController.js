import jwt from 'jsonwebtoken'
import { Items } from "../models/itemsModel.js"
import schedule from 'node-schedule'



//add item for bidding
export const addItem = async(req,res)=>{
    try {
        const {itemName,bidStartPrice,bidStartDate,bidEndDate,type} = req.body
        const image = req.file

        const {token} = req.headers
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        const newItem = new Items({
            itemName,
            bidStartPrice,
            bidStartDate,
            bidEndDate,
            user:decoded.id,
            image,
            type
        })

        const item = await newItem.save()
        
        const startDateJob = schedule.scheduleJob(new Date(bidStartDate), async function(){
            await Items.findByIdAndUpdate(item._id,{$set:{status:'started'}})
        });

        const endDateJob = schedule.scheduleJob(new Date(bidEndDate), async function(){
            await Items.findByIdAndUpdate(item._id,{$set:{status:'Ended'}})
        });
        

        res.status(200).json(newItem)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
}



//user added items
export const userItems = async(req,res)=>{
    try {
        
        const {token} = req.headers
        const decoded = jwt.verify(token, process.env.JWT_KEY)

        const items = await Items.find({user:decoded.id})
        res.status(200).json(items)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
}



//items to show
export const itemsToShow =  async(req,res)=>{
    try {
        const {token} = req.headers
        let user
        if(token){
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            user = decoded.id || ''
        }

        const itemsToShow = await Items.find({user:{$ne:user}})
        res.status(200).json(itemsToShow)

    } catch (error) {
       
    }
}



//single items details
export const singleItem = async(req,res)=>{
    try {
        const id = req.query.id
        const item = await Items.findById(id).populate('user')
        res.status(200).json(item)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
}


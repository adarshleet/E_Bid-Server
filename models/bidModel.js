import mongoose from 'mongoose'

const bids =  new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Item'
    },
    bidAmount:{
        type:Number,
        required:true
    }
})


export const Bid = mongoose.model('Bid',bids)
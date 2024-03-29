import mongoose from 'mongoose'


const items = new mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    bidStartPrice:{
        type:Number,
        required:true
    },
    bidStartDate:{
        type:Date
    },
    bidEndDate:{
        type:Date
    },
    image:{
        type:Object
    },
    status:{
        type:String,
        default:'pending'
    },
    type:{
        type:String
    }
})


export const Items = mongoose.model('Item',items)
import express from 'express'
import { addItem, itemsToShow, singleItem, userItems } from '../controllers/itemController.js'
import { multerMid } from '../middlewares/multerMid.js'
import { protect } from '../middlewares/userAuth.js'

export const itemsRoute = express.Router()



itemsRoute.post('/create',protect,multerMid.single('image'),addItem)

itemsRoute.get('/userItems',protect,userItems)

itemsRoute.get('/itemsToShow',itemsToShow)

itemsRoute.get('/singleItem',singleItem)


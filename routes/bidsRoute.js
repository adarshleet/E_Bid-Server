import express from 'express'
import { allBids, createBid, userBid, userBids } from '../controllers/bidController.js'
import { protect } from '../middlewares/userAuth.js'

export const bidRoute = express.Router()

bidRoute.post('/createBid',protect,createBid)

bidRoute.get('/userBids',protect,userBids)

bidRoute.get('/userBid',protect,userBid)

bidRoute.get('/allBids',allBids)
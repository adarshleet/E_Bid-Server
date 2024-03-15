import express from 'express'
import { createBid, userBid, userBids } from '../controllers/bidController.js'

export const bidRoute = express.Router()

bidRoute.post('/createBid',createBid)

bidRoute.get('/userBids',userBids)

bidRoute.get('/userBid',userBid)
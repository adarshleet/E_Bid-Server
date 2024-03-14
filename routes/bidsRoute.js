import express from 'express'
import { createBid } from '../controllers/bidController.js'

export const bidRoute = express.Router()

bidRoute.post('/createBid',createBid)
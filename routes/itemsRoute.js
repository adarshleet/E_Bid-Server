import express from 'express'
import { addItem } from '../controllers/itemController.js'

export const itemsRoute = express.Router()



itemsRoute.post('/create',addItem)

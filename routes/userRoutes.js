import express from 'express'
import { signUp,login } from '../controllers/userController.js'


export const userRoute = express.Router()


userRoute.post('/signUp',signUp)

userRoute.post('/login',login)

import { User } from "../models/userModel.js"
import bcrypt from 'bcrypt'
import { createJwt } from "../config/jwtCreate.js"



export const signUp = async(req,res) => {
    try {
        let { name, email, password } = req.body

        const userFound = await User.findOne({ email })
        console.log(userFound)
        if (userFound) {
            return res.status(409).json({ error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password,10)
        password = hashedPassword
        const newUser = new User({ name, email,password });
        await newUser.save();

        res.status(201).json(newUser)

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
}


export const login = async(req,res)=>{
    try {
        const {email,password} = req.body

        const userFound = await User.findOne({email})
        if(userFound){
            const passwordCheck = await bcrypt.compare(password,userFound.password)
            if(!passwordCheck){
                return res.status(401).json({error:'Invalid email or password'})
            }
        }
        else{
            return res.status(401).json({error:'Invalid email or password'})
        }

        const token =  createJwt(userFound._id,'user')
        res.status(200).json({message:'Login successfull',token,user:userFound._id})

    } catch (error) {
        console.log(error)
        res.status(500).json({error:'internal server error'})
    }
}



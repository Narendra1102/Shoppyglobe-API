import bcrypt from 'bcrypt'
import userModel from '../model/user.model.js'
import jwt from 'jsonwebtoken'

//Register
export async function register(req,res){
    try{
        const {name,email,password}=req.body
        const data=await userModel.findOne({email})
        if(data){
            return res.status(409).json({msg:"User already exists"})
        }
        
        const newUser = await userModel.create({
            name,
            email,
            password: bcrypt.hashSync(password, 10)
        })
        return res.status(201).json({msg:"User registered successfully"})
    }
    catch(err){
        res.status(500).json({msg:"Error while registering user"})
    }
}


//Login
export async function login(req,res){
    try{
        const {email,password}=req.body
        const data=await userModel.findOne({email})
        if(!data){
            return res.status(409).json({msg:"User does not exists"})
        }
        else{
            let validPassword = bcrypt.compareSync(password, data.password);
            if(!validPassword){
                return res.status(403).json({msg:"Invalid Credentials"})
            }
            const token = jwt.sign({ id: data._id }, 'SECRETKEY',{ expiresIn: "1d" });
            
            
            return res.status(200).json({token})
        }
    }
    catch(err){
        res.status(500).json({msg:"Error while login user"})
    }
}
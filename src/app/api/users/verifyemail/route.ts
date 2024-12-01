
import { connect } from "@/dbconnection/dbconfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";

connect();


export async function POST(request: NextRequest) {
    try {

        const reqbody = await request.json() 
        const {token} = reqbody;
        console.log(token);

       const user = await User.findOne({verifyToken: token , verifyTokenExpiry: {$gt: Date.now()}})

       if(!user){
        return NextResponse.json({error: "invalid token"},{status:400})
       }
        user.isVerified = true
        user.verifyToken = undefined
        user.verifyTokenExpiry = undefined

        await user.save()

        return NextResponse.json({message: "email verified successfully",success : true},{status:500})
        
    } catch (error) {
        return NextResponse.json("Error "+error,{status:500})
    }
}



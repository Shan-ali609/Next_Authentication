import mongoose from "mongoose";


export async function connect() {
    try {
        mongoose.connect(process.env.MONGODB_URI!);
        const connection = mongoose.connection

        connection.on('connected', ()=>{
            console.log("mongodb connected successfully");           
        })
        connection.on('error', (error)=>{
            console.log(" db not connected , please make sure db is up and running" + error);
            process.exit();
            
        })
    } catch (error) {
        console.log("something went wrong to connect to db ");
        console.log(error);
        
    }
}
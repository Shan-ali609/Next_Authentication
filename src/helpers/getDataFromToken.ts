// import { NextRequest } from "next/server";
// import  Jwt  from "jsonwebtoken";


// export const getDataFromToken = (request: NextRequest)=>{

//     try {
//      const token =    request.cookies.get("token")?.value || " ";
//     const decodedtoken: any =   Jwt.verify(token , process.env.Token_SECRET!)

//          return decodedtoken.id
//     } catch (error) {
//         throw new Error("Error"+error)
//     }
// }

import { NextRequest } from "next/server";
import Jwt from "jsonwebtoken";


interface DecodedToken {
  id: string; 
}

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || " ";
    
    
    const decodedtoken = Jwt.verify(token, process.env.Token_SECRET!) as DecodedToken;

    return decodedtoken.id;
  } catch (error) {
    throw new Error("Error: " + (error instanceof Error ? error.message : "Unknown error"));
  }
};

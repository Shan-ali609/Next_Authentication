// import { connect } from "@/dbconnection/dbconfig";
// import User from "@/models/usermodel";
// import { NextRequest, NextResponse } from "next/server";
// import { getDataFromToken } from "@/helpers/getDataFromToken";

// connect();

// export async function POST(request: NextRequest) {

//    const userid=   await getDataFromToken(request)
//  const user =   User.findOne({_id:userid}).select("-password")
// //check if user not found if else condition
//    return NextResponse.json({
//     message : " user found",
//     data: user
//    })
// }


import { connect } from "@/dbconnection/dbconfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function POST(request: NextRequest) {
  try {
    // Get user ID from the token
    const userId = await getDataFromToken(request);

    // Find user by ID, excluding the password field
    const user = await User.findOne({ _id: userId }).select("-password");

    // Check if the user exists
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Return user data if found
    return NextResponse.json({
      message: "User found",
      data: user,
    });
  } catch (error) {
    // Handle any errors
    return NextResponse.json( "Error :"+ error , { status: 500 });
  }
}

// import { connect } from "@/dbconnection/dbconfig";
// import User from "@/models/usermodel";
// import { NextRequest, NextResponse } from "next/server";
// import bcryptjs from "bcryptjs";
// import jwt from "jsonwebtoken";

// connect();

// export async function POST(request: NextRequest) {
//     try {
//         // Correct the request body parsing
//         const reqbody = await request.json();
//         const { email, password } = reqbody;

//         // Find the user in the database
//         const user = await User.findOne({ email });
//         if (!user) {
//             return NextResponse.json({ error: "User does not exist" }, { status: 400 });
//         }

//         // Check if the password is valid
//         const validPassword = await bcryptjs.compare(password, user.password);
//         if (!validPassword) {
//             return NextResponse.json({ error: "Password does not match" }, { status: 400 });
//         }

//         // Generate token data and create a JWT token
//         const tokendata = {
//             id: user._id,
//             email: user.email,
//         };
//         const token = await jwt.sign(tokendata, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

//         // Create the response and set the cookie in it
//         const response = NextResponse.json({
//             message: "Logged in successfully",
//             success: true,
//         });
//         response.cookies.set("token", token, {
//             httpOnly: true,
//         });

//         return response;

//     } catch (error) {
//         return NextResponse.json("Error :"+error, { status: 500 });
//     }
// }
import { connect } from "@/dbconnection/dbconfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// Ensure the database connection is made
connect();

export async function POST(request: NextRequest) {
    try {
        // Parse the request body
        const reqbody = await request.json();
        const { email, password } = reqbody;

        // Ensure both email and password are provided
        if (!email || !password) {
            return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
        }

        // Log the incoming request body for debugging purposes
        console.log("Login request body:", reqbody);

        // Find the user in the database
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found:", email);
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        // Check if the password is valid
        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            console.log("Invalid password attempt for:", email);
            return NextResponse.json({ error: "Password does not match" }, { status: 400 });
        }

        // Log successful user authentication
        console.log("User authenticated:", user.email);

        // Generate token data and create a JWT token
        const tokendata = {
            id: user._id,
            email: user.email,
        };

        let token;
        try {
            token = jwt.sign(tokendata, process.env.Token_SECRET!, { expiresIn: "1d" });
        } catch (jwtError) {
            console.error("JWT signing failed:", jwtError);
            return NextResponse.json({ error: "Failed to sign JWT" }, { status: 500 });
        }

        // Create the response and set the cookie with the JWT token
        const response = NextResponse.json({
            message: "Logged in successfully",
            success: true,
        });
        
        // Set the token in an HTTP-only cookie
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production", // Ensures cookie is secure in production
            sameSite: "strict", // Optional, but recommended for added security
        });

        // Return the successful response
        return response;

    } catch (error) {
        // Log the error details for debugging
        console.error("Error during login:", error);

        // Return a generic error response to the client
        return NextResponse.json({ error: "Something went wrong. Please try again later." }, { status: 500 });
    }
}


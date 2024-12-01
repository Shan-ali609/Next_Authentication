import { connect } from "@/dbconnection/dbconfig";
import User from "@/models/usermodel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    // Parse request body JSON
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    // Hash the password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create a new user document
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    console.log(savedUser);
    const userid = savedUser._id
      console.log(userid)
    // Send verification email
    await sendEmail({ email, emailtype: "verify", userid: userid });

    return NextResponse.json({
      message: "User saved successfully",
      success: true,
      user: savedUser,
    });

  } catch (error) {
    return NextResponse.json("Error "+error , { status: 500 });
  }
}

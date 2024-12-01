// import nodemailer from "nodemailer";
// import User from "@/models/usermodel"
// import bcryptjs from "bcryptjs"
// export const sendEmail = async({email , emailtype , userid}:any)=>{
//     try {
//       const hashedtoken = await bcryptjs.hash(userid.toString(), 10);
//       console.log("mail", userid);
//       console.log("email type", emailtype);
//       console.log(typeof emailtype);
      
//       if(emailtype === "verify"){
//         await User.findByIdAndUpdate(userid, 
//       {   $set : {verifyToken : hashedtoken , verifyTokenExpiry : Date.now() + 3600000}
//     })
//       }else if(emailtype === "Reset") {
//         await User.findByIdAndUpdate(userid, 
//          {$set : { forgotPasswordToken : hashedtoken ,    forgotPasswordTokenExpiry : Date.now() + 3600000}
//         })
//       }



    
//           let transport = nodemailer.createTransport({
//           host: "sandbox.smtp.mailtrap.io",
//           port: 2525,
//           auth: {
//             user: "f0d0d449d926a2",//why this user here
//             pass: "e533f34a82df39"//same as user 
//           }
//           });

//           const mailoption = {
//             from: 'shan.softwareengineer007@gmail.com', 
//             to: email, 
//             subject: emailtype=== "verify" ? "verify your email" : " Reset password", 
//             html: `<p> click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${emailtype === "verify" ? "verify your email" : " Reset your password"}
//             or copy and paste the link below in your browser 
//             <br>
//             ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}
//             </p> `
//             ,
//           }
//         const mailResponse =await transport.sendMail(mailoption)
//         return mailResponse
//     } catch (error) {
//         throw new Error("Error :"+error)
//     }
// }


import nodemailer from "nodemailer";
import User from "@/models/usermodel";
import bcryptjs from "bcryptjs";

// Define a type for the email parameters
interface SendEmailParams {
  email: string;
  emailtype: "verify" | "Reset"; // Only allow "verify" or "Reset" as valid email types
  userid: string; // Assuming userid is a string, if it's an ObjectId, adjust accordingly
}

export const sendEmail = async ({ email, emailtype, userid }: SendEmailParams) => {
  try {
    // Ensure the userid is a string, in case it's passed as an ObjectId or other types
    const hashedtoken = await bcryptjs.hash(userid.toString(), 10);

    console.log("mail", userid);
    console.log("email type", emailtype);

    if (emailtype === "verify") {
      await User.findByIdAndUpdate(userid, {
        $set: {
          verifyToken: hashedtoken,
          verifyTokenExpiry: Date.now() + 3600000, // 1 hour from now
        },
      });
    } else if (emailtype === "Reset") {
      await User.findByIdAndUpdate(userid, {
        $set: {
          forgotPasswordToken: hashedtoken,
          forgotPasswordTokenExpiry: Date.now() + 3600000, // 1 hour from now
        },
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "f0d0d449d926a2", // Replace with your Mailtrap user
        pass: "e533f34a82df39", // Replace with your Mailtrap password
      },
    });

    const mailOption = {
      from: "shan.softwareengineer007@gmail.com",
      to: email,
      subject: emailtype === "verify" ? "Verify your email" : "Reset password",
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedtoken}">here</a> to ${
        emailtype === "verify" ? "verify your email" : "reset your password"
      } or copy and paste the link below in your browser: <br> ${process.env.DOMAIN}/verifyemail?token=${hashedtoken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOption);
    return mailResponse;
  } catch (error: unknown) {
    // Check if the error is an instance of Error to access the message
    if (error instanceof Error) {
      throw new Error("Error: " + error.message);
    }
    throw new Error("Unknown error occurred");
  }
};

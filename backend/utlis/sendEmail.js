const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        console.log("Checking SMTP connection...");

        await transporter.verify();

        console.log("SMTP Connected");

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            text,
        });

        console.log("Email sent successfully to:", to);

        return true;

    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = sendEmail;









// const nodemailer = require('nodemailer');
// const sendEmail =async(to,subject,text)=>{
//     try{
//         const transporter=nodemailer.createTransport({
//             service:'Gmail',
//             auth:{
//                 user:process.env.EMAIL_USER,
//                 pass:process.env.EMAIL_PASS
//             }
//         });
//         // const mailOption={
//         //     from: process.env.EMAIL_USER,
//         //     to,
//         //     subject,
//         //     text
//         // };
//         // await transporter.sendMail(mailOption);




//         await transporter.verify();
//         console.log("SMTP Connected");

//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             text
//         });

//         console.log("Email sent successfully");

//     }catch(error){
//         console.log('Error sending email:',error);
//     }
// };
// module.exports = sendEmail;
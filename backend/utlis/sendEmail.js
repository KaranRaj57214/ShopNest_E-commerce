const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async (to, subject, text) => {
    try {
        console.log("Sending email through Resend...");

        const { data, error } = await resend.emails.send({
            from: "ShopNest <onboarding@resend.dev>",
            to: [to],
            subject: subject,
            text: text
        });

        if (error) {
            console.error("Resend email error:", error);
            throw new Error(error.message);
        }

        console.log("Email sent successfully to:", to);
        console.log("Resend Email ID:", data.id);

        return true;

    } catch (error) {
        console.error("Error sending email:", error);
        throw error;
    }
};

module.exports = sendEmail;



// const nodemailer = require("nodemailer");

// const sendEmail = async (to, subject, text) => {
//     try {
//         const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: process.env.EMAIL_USER,
//                 pass: process.env.EMAIL_PASS,
//             },
//         });

//         console.log("Checking SMTP connection...");

//         await transporter.verify();

//         console.log("SMTP Connected");

//         await transporter.sendMail({
//             from: process.env.EMAIL_USER,
//             to,
//             subject,
//             text,
//         });

//         console.log("Email sent successfully to:", to);

//         return true;

//     } catch (error) {
//         console.error("Error sending email:", error);
//         throw error;
//     }
// };

// module.exports = sendEmail;










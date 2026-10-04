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









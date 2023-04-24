import nodemailer from "nodemailer";

export default async function reportEmail(req, res) {

    const { NEXT_PUBLIC_EMAIL_USERNAME, NEXT_PUBLIC_EMAIL_PASSWORD } = process.env;

    const { message } = req.body;

    let transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        secureConnection: false,
        port: 587,
        auth: {
            user: NEXT_PUBLIC_EMAIL_USERNAME,
            pass: NEXT_PUBLIC_EMAIL_PASSWORD,
        },
        tls: {
            ciphers: 'SSLv3'
        }
    });

    const emailContent = {
        from: NEXT_PUBLIC_EMAIL_USERNAME,
        to: NEXT_PUBLIC_EMAIL_USERNAME,
        subject: "Queer ESEA Events - Reported Event!",
        html: `
                <p><stron>Hey,</strong></p>
                <p><strong>An event has been reported:</strong></p>
                <p>${message}</p>
        `
    }

    if (req.method === "POST") {
        try {
            await transporter.sendMail(emailContent);
            return res.status(200).json({ error: "" })
        } catch (error) {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}
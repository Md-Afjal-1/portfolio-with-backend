// server.js
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// POST route to handle form data
app.post("/send", (req, res) => {
    const { name, email, message } = req.body;

    // Email sender setup
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "mdafjal123558888@gmail.com", // Replace with your Gmail
            pass: "your_app_password" // Use App Password, not Gmail password
        }
    });

    const mailOptions = {
        from: email,
        to: "mdafjal123558888@gmail.com", // Your email to receive message
        subject: "New Contact Form Submission",
        html: `<h3>New message received</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong><br>${message}</p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error sending email:", error);
            res.status(500).send("Something went wrong.");
        } else {
            console.log("Email sent: " + info.response);
            res.status(200).send("Email sent successfully.");
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

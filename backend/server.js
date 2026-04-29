

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");

const app = express();

const PORT = process.env.PORT || 5000;


// ================= MIDDLEWARE =================

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


// ================= STATIC FILES =================

app.use(express.static(path.join(__dirname, "public")));


// ================= HOME ROUTE =================

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});


// ================= CONTACT FORM ROUTE =================

app.post("/send", async (req, res) => {

    try {

        const { name, email, message } = req.body;

        // Gmail transporter

        const transporter = nodemailer.createTransport({

            service: "gmail",

            auth: {

                user: "mdafjal123558888@gmail.com",

                // Replace with your REAL Gmail App Password
                pass: "nmhr pdzm dncc roeb"

            }

        });


        // Mail content

        const mailOptions = {

            from: "mdafjal123558888@gmail.com",

            replyTo: email,

            to: "mdafjal123558888@gmail.com",

            subject: `New Contact Form Message From ${name}`,

            html: `

                <div style="font-family: Arial; padding:20px;">

                    <h2 style="color:#0275d8;">
                        New Portfolio Contact Message
                    </h2>

                    <hr>

                    <p>
                        <strong>Name:</strong> ${name}
                    </p>

                    <p>
                        <strong>Email:</strong> ${email}
                    </p>

                    <p>
                        <strong>Message:</strong>
                    </p>

                    <p>
                        ${message}
                    </p>

                </div>

            `

        };


        // Send mail

        await transporter.sendMail(mailOptions);


        console.log("Email sent successfully");


        res.status(200).json({

            success: true,

            message: "Email sent successfully"

        });

    } catch (error) {

        console.error("Email Error:", error);

        res.status(500).json({

            success: false,

            message: "Failed to send email"

        });

    }

});


// ================= START SERVER =================

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});


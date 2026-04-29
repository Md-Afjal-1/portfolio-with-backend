// ================= IMPORTS =================

const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const path = require("path");


// ================= APP =================

const app = express();

const PORT = process.env.PORT || 5000;


// ================= MIDDLEWARE =================

app.use(cors({
    origin: "*"
}));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


// ================= STATIC FILES =================

app.use(express.static(path.join(__dirname, "public")));


// ================= HOME ROUTE =================

app.get("/", (req, res) => {

    res.sendFile(path.join(__dirname, "public", "index.html"));

});


// ================= TEST ROUTE =================

app.get("/test", (req, res) => {

    res.send("Backend Working Successfully");

});


// ================= CONTACT FORM ROUTE =================

app.post("/send", async (req, res) => {

    try {

        const { name, email, message } = req.body;


        // ================= EMAIL TRANSPORTER =================

        const transporter = nodemailer.createTransport({

            host: "smtp.gmail.com",

            port: 465,

            secure: true,

            auth: {

                user: "mdafjal123558888@gmail.com",

                // Your Gmail App Password
                pass: "nmhr pdzm dncc roeb"

            }

        });


        // ================= EMAIL CONTENT =================

        const mailOptions = {

            from: "mdafjal123558888@gmail.com",

            replyTo: email,

            to: "mdafjal123558888@gmail.com",

            subject: `New Portfolio Message From ${name}`,

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


        // ================= SEND EMAIL =================

        await transporter.sendMail(mailOptions);


        console.log("Email Sent Successfully");


        res.status(200).json({

            success: true,

            message: "Email Sent Successfully"

        });

    } catch (error) {

        console.error("FULL ERROR:", error);


        res.status(500).json({

            success: false,

            error: error.message

        });

    }

});


// ================= START SERVER =================

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});


const nodemailer = require("nodemailer");
const asyncHandler = require("express-async-handler");


const sendEmail = asyncHandler(async (data, req, res) => {
  
  const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
           user: "amanithetop@gmail.com",
           pass: "vdplzwexiywhehsy"
        },
      });
      
      // async..await is not allowed in global scope, must use a wrapper
      async function main() {
        // send mail with defined transport object
        const info = await transporter.sendMail({
          from: '"Hay" "ahatk@gmail.com"', // sender address
          to: data.to, // list of receivers
          subject: data.subject, // Subject line
          text: data.text, // plain text body
          html: data.htm, // html body
        });
      
        console.log("Message sent: %s", info.messageId);
        // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
      }
      
      main().catch(console.error);



});

module.exports = sendEmail;
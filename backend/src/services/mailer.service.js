const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
dotenv.config()

class mailService{
    connection;
    constructor(){
        this.connection = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
              user: process.env.SMTP_USER, 
              pass: process.env.SMTP_PWD,
            },
          });
    }

    sendMail =  async (to, subject, content, attachments = null, cc= null, bcc= null) =>{
        try{
            let msg = {
                from: '"Admin" no-reply@admin.com',
                to: to, 
                subject: subject, 
                html: content,
               
            }
            if(attachments){
                msg.attachments = attachments
            }
            if(cc){
                msg.cc = cc;
            }
            if(bcc){
                msg.bcc= bcc;
            }

            let response = await this.connection.sendMail(msg)
            console.log(response)
            return true

        } catch(except){
            console.log("EmailException");
        }

    }

}

const mailSvc = new mailService()
module.exports = mailSvc
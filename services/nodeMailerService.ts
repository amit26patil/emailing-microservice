import EmailDeliveryServiceContract from "./contracts/emailDeliveryServiceContract";
import * as nodemailer from 'nodemailer';
import EmailRequest from "../models/emailRequest";
import { resolve } from "path";
export default class NodeMailerService extends EmailDeliveryServiceContract{
    transporter: any;
    constructor(){
        super();
        this.transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
              user: process.env.userName,
              pass: process.env.password,
            }
          });
    }
    public sendMail(emailRequest: EmailRequest):Promise<any> {
        let mailOptions = {
            from: process.env.from,
            to: emailRequest.to,
            cc:emailRequest.cc,
            bcc:emailRequest.bcc,
            subject: emailRequest.subject,
            text: emailRequest.body
          };
        return new Promise<any>((resolve, reject)=>{
            this.transporter.sendMail(mailOptions, function(err, data) {
                if (err) {
                  console.log("Error=>", err);
                  reject(err);
                  return;
                } 
                console.log("Email sent successfully");
                resolve(data);
            });
        })
       
    }

}


//Access for less secure apps has been turned on
  

  
const nodemailer = require("nodemailer");


class Mailer
{
    constructor(service, user, pass)
    {
        console.log("Mailer class...");
        this.service = service;
        this.user = user;
        this.pass = pass;
        this.options = null;

        this.transporter = nodemailer.createTransport({
            service: this.service,
            auth: {
                user: this.user,
                pass: this.pass
            }
        });
    }

    CreateMail(from, to, subject, text = null, file)
    {
        console.log("CReate mailer..");
        console.log(file);
        this.options = {
            from: from,
            to: to,
            subject: subject,
            text: text,
            attachments: [
                     {
                        filename: file.filename,
                        path: file.path
                     },
                   ]
        }
    }

    SendMail()
    {
        console.log("Send mail...");
        this.transporter.sendMail(this.options, (err, infos) => {

            console.log("sendmail...");
            console.log(infos);
            if(err)
                console.log(err);
            else
                console.log(infos.response);
        });
    }

}

module.exports = Mailer;

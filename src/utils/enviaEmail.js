import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import enviaEmailErro from '../utils/enviaEmailErro.js';
import { URL } from 'url';

dotenv.config()

// criar uma função asincrona para cadastrar um novo usuario
async function enviaemail(infoemail) { 
  // criar um transportador para enviar o email
  try {
    async function main() {
      let transporter = nodemailer.createTransport({
        host: process.env.HOST_SERVER_EMAIL,
        port: process.env.PORT_SSL_EMAIL,
        secure: false,
        auth: {
          user: process.env.API_SEND_EMAIL,
          pass: process.env.PASS_SEND_EMAIL,
        },
      });
      await transporter.sendMail(infoemail)

    }
    main().catch(console.error);

  }
  catch (err) {
    enviaEmailErro(err.message, new URL(import.meta.url).pathname, req)
    return res.status(500).json({ code: 500, message: err.message });
  }
}

export default enviaemail

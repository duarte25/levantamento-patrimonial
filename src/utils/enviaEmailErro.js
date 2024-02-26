import dotenv from "dotenv";
import enviaemail from "./enviaEmail.js";
import crypto from "crypto";


dotenv.config();

async function enviaEmailErro(err, pathname, req, res){
    try{
       
        const infoEmail = {
            // eslint-disable-next-line quotes
            from: '"Levantamento Patrimonial: Erro no servidor "'  + ' <'+(process.env.API_SEND_EMAIL)+'>',
            to: process.env.ADMIN_EMAIL,
            subject: "Envio de erro interno do servidor - #ID: " + crypto.randomBytes(6).toString("hex"),
            //text: "Erro Detectado \n\n " + "Erro interno do Servidor" + "\n\n" + "Atenciosamente,\n" + "Equipe de suporte" + "\n\n" + "Erro: " + err + "\n\n" + "Arquivo: " + pathname + "\n\n" + "Data e Hora: " + new Date(),
            // eslint-disable-next-line quotes
            html: "<p>Olá </p><p>Erro interno do Servidor <strong>" + "</strong></p><p>Atenciosamente,</p><p>Equipe de suporte</p><p>Erro: " + err + "</p><p>Arquivo: " + pathname + "</p><p>Data e Hora: " + new Date() + "</p>" + "<p>Requisição: " + req.method + "</p>" + "<p>URL: " + req.protocol + '://' + req.get('host') + req.originalUrl + "</p>"
          };
          enviaemail(infoEmail);
    

    }catch(err){
        return res.status(500).json({ code: 500, message: err.message });
    }
}

export default enviaEmailErro;

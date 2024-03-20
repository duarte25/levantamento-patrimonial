import fs from "fs";
import ImagemModel from "../models/Image.js";
import messages from "../utils/mensagens.js";

class ImagensControllers {


  static async enviarImagem(req, res, next) {
    if (!req.file) {
      return res.status(400).send({ codigo: 400, mensagem: messages.httpCodes[400]});
    }

    const arquivo = req.file;
    const usuarioId = req.user_id; // Id do usuario que está logado 



    if (!usuarioId) {
      return res.status(401).send({ codigo: 401, mensagem: messages.httpCodes[401] });
    }

    const imagem = new ImagemModel({
      id_imagem: arquivo.filename.split(".")[0],
      tipo_arquivo: arquivo.filename.split(".")[1],
      enviado_por: usuarioId, // Usa o ID do usuário em vez do objeto completo
      caminho: "/imagens/" + arquivo.filename,
    });

    try {
      await imagem.save();

      res.status(201).send({ codigo: 201, mensagem: messages.httpCodes[201], dados: imagem, });
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      return res.status(500).send({ codigo: 500, mensagem: messages.httpCodes[500] });
    }
  }
  static async mostrarImagem(req, res, next) {
    const { id } = req.params;

    const imagem = await ImagemModel.findOne({
      id_imagem: id
    });

    if (!imagem) {
      return res.status(404).send(messages.httpCodes[404]);
    }

    res.sendFile(imagem.caminho, { root: "." });
  }
  static async deletarImagem(req, res, next) {
    const { id } = req.params;

    const imagem = await ImagemModel.findOne({
      id_imagem: id
    });

    if (!imagem) {
      return res.status(404).send(messages.httpCodes[404]);
    }

    fs.unlink(
      `imagens/${imagem.id_imagem}.${imagem.tipo_arquivo}`,
      async (err) => {
        if (err) {
          console.error("Erro ao deletar imagem:", err);
          return res.status(500).send(messages.httpCodes[500]);
        } else {
          await imagem.deleteOne();
          res.send("Imagem deletada com sucesso");
        }
      }
    );
  }

  static async listarImagens(req, res, next) {
    try {
      const imagens = await ImagemModel.find();
      res.status(200).json(imagens);
    } catch (error) {
      res.status(500).json({ error: 500, message: messages.httpCodes[500]});
    }
  }
}

export default ImagensControllers;
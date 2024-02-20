// controller alterado por Luccas
import Item from "../models/Item.js"; // Corrigido aqui

export default class itensController {
  static CadastrarItens = async (req, res) => {
    try {
      const { nome, estado, descricao, inventario, setor, auditor, imagem } =
        req.body;

      const item = new Item({
        nome,
        estado,
        descricao,
        inventario,
        setor,
        auditor,
        imagem,
      });

      await item.save();
      res.status(200).json({ item, message: "Item cadastrado com sucesso" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };
}
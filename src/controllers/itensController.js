// controller alterado por Luccas
import Item from "../models/Item.js"; // Corrigido aqui

export default class itensController {
  static CadastrarItens = async (req, res) => {
    try {
      const { etiqueta, ativo, nome, estado, descricao, inventario, setor, auditor, imagem } =
        req.body;

      const item = new Item({
        etiqueta,
        ativo,
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

  static ListarItens = async (req, res) => {
    try {
      const item = await Item.find();
      res.json(item);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };

  static RemoverItens = async (req, res) => {
    try {
      const { id } = req.params;

      const item = await Item.findById(id);

      if (!item) {
        return res
          .status(404)
          .json({ error: true, code: 404, message: "Item não encontrado!" });
      }

      await item.deleteOne();

      res.status(200).json({ message: "Item removido com sucesso!" });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ error: true, code: 500, message: "Erro interno no servidor" });
    }
  };
}

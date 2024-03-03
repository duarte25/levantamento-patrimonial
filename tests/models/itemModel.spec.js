/* eslint-disable no-undef */
import mongoose from "mongoose";
import db from "../../src/config/db_config.js";
import Item from "../../src/models/Item.js";


describe("Modelo de Item", () => {
    let itemData = {};

    beforeAll(async () => {
        db.on("error", console.error.bind(console, "connection error:"));
        db.once("open", function () {
          console.log("Conectado ao banco de dados.");
        });
      });

    afterAll(async () => {
    // Desconectar após todos os testes
    await mongoose.connection.close();
    });

    it("Deve criar um novo Abastecimento", async () => {
        itemData = {
            _id: new mongoose.Types.ObjectId(),
            etiqueta: 1234,
            nao_tiquetado: false,
            encontrado: true,
            nome: "Computador Mac mini",
            estado: "Bem em condições de uso",
            ativo: "Ativo",
            ocioso: false,
            descricao: "Com desempenho avançado, grande variedade de portas e tamanho compacto",
            inventario: new mongoose.Types.ObjectId(),
            setor: new mongoose.Types.ObjectId(),
            auditor: new mongoose.Types.ObjectId(),
            responsavel: new mongoose.Types.ObjectId()
        };
        
        const item = new Item(itemData);
        const itemSaved = await item.save();

        expect(itemSaved._id).toBe(itemData._id);
        expect(itemSaved.etiqueta).toBe(itemData.etiqueta);
        expect(itemSaved.nao_tiquetado).toBe(itemData.nao_tiquetado);
        expect(itemSaved.encontrado).toBe(itemData.encontrado);
        expect(itemSaved.nome).toBe(itemData.nome);
        expect(itemSaved.estado).toBe(itemData.estado);
        expect(itemSaved.ativo).toBe(itemData.ativo);
        expect(itemSaved.ocioso).toBe(itemData.ocioso);
        expect(itemSaved.descricao).toBe(itemData.descricao);
        expect(itemSaved.inventario).toBe(itemData.inventario);
        expect(itemSaved.setor).toBe(itemData.setor);
        expect(itemSaved.auditor).toBe(itemData.auditor);
        expect(itemSaved.responsavel).toBe(itemData.responsavel);
        expect(itemSaved.createdAt).toBeTruthy();
        expect(itemSaved.updatedAt).toBeTruthy();
    
    });  

    it("Deve excluir um item pelo _id", async () => {

        const item = await Item.findByIdAndDelete(itemData._id);
    
        expect(item).toBeTruthy();
      });
});

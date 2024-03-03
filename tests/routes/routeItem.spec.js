// eslint-disable-next-line no-undef
import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import messages from "../../src/utils/mensagens.js";

describe("Item", () => {
    const req = request(app);
    let itemID;
    let setorID;
    let inventarioID;
    let usuarioID;

    // eslint-disable-next-line no-undef
    it("Deve retornar uma lista de itens", async () => {
        const dados = await req
            .get("/itens")
            .set("Accept", "aplication/json")
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de Criar ITEM ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve cadastrar um item", async () => {

        const resposta = await req
            .post("/itens")
            .send({
                etiqueta: 244,
                nao_tiquetado: false,
                encontrado: true,
                nome: "Refined Plastic Ball",
                estado: "Bem em condições de uso",
                ativo: "Inativo",
                ocioso: false,
                descricao: "radical",
                inventario: "65de780e1dfefb1e27eb2de7",
                setor: "65de780e1dfefb1e27eb2dd2",
                responsavel: "65de780e1dfefb1e27eb2d97",
                auditor: "65de780e1dfefb1e27eb2d97"
            })
            .set("Accept", "application/json")
            .expect(201);

        expect(resposta.body.message).toContain(messages.httpCodes[201]);

        itemID = resposta.body.data._id;
    });

    // Teste de Deletar ITEM ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve deletar um deslocamento", async () => {
        const resposta = await req
            .delete(`/itens/${itemID}`)
            .set("Accept", "application/json")
            .expect(200);

        expect(resposta.body.message).toContain(messages.httpCodes[200]);
    });


});
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
    let token;

    const userlogin = {
        email: "dev@gmail.com",
        senha: "Dev@1234"
    };

    // eslint-disable-next-line no-undef
    it("Deve autenticar o usuário e retornar um token", async () => {
        const resposta = await request(app)
            .post("/login")
            .send(userlogin)
            .set("Accept", "aplication/json")
            .expect(200);

        expect(resposta.body.token).toBeDefined();
        return token = resposta.body.token;
    });

    // eslint-disable-next-line no-undef
    async function obterSetor() {
        const res = await req
            .get("/setores")
            .set("Accept", "aplication/json")
            .expect(200);

        const setorSelecionado = res.body.data[0];
        expect(setorSelecionado).toBeDefined();
        expect(setorSelecionado._id).toBeDefined();

        return setorID = setorSelecionado._id;
    }

    // eslint-disable-next-line no-undef
    async function obterInventario() {
        const res = await req
            .get("/inventarios")
            .set("Accept", "aplication/json")
            .expect(200);

        const inventarioSelecionado = res.body.data[0];
        expect(inventarioSelecionado).toBeDefined();
        expect(inventarioSelecionado._id).toBeDefined();

        return inventarioID = inventarioSelecionado._id;
    }

    async function obterUsuario() {
        const res = await req
            .get("/usuarios")
            .set("Accept", "aplication/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        const usuarioSelecionado = res.body.data[0];
        expect(usuarioSelecionado).toBeDefined();
        expect(usuarioSelecionado._id).toBeDefined();

        return usuarioID = usuarioSelecionado._id;
    }

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

        setorID = obterSetor();
        inventarioID = obterInventario();
        usuarioID = obterUsuario();

        const resposta = await req
            .post("/itens")
            .send({
                etiqueta: 244,
                nao_tiquetado: false,
                encontrado: true,
                nome: "Refined Plastic Ball",
                estado: "Bem em condições de uso",
                ativo: "Ativo",
                ocioso: false,
                descricao: "radical",
                inventario: inventarioID,
                setor: setorID,
                responsavel: usuarioID,
                auditor: usuarioID
            })
            .set("Accept", "application/json")
            .expect(201);

        expect(resposta.body.message).toContain(messages.httpCodes[201]);

        itemID = resposta.body.data._id;
    });

    // Teste de Deletar ITEM ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve deletar um item", async () => {
        const resposta = await req
            .delete(`/itens/${itemID}`)
            .set("Accept", "application/json")
            .expect(200);

        expect(resposta.body.message).toContain(messages.httpCodes[200]);
    });


});
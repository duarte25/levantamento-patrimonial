import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import messages from "../../src/utils/mensagens.js";
import usuario from "../../src/models/Usuario.js";

describe("Rotas de Setor", () => {
    const req = request(app);
    let setorID;
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

    // Teste de listar SETOR ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve retornar uma lista de setores", async () => {
        const dados = await req
            .get("/setores")
            .set("Accept", "aplication/json")
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de criar SETOR ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve cadastrar um setor", async () => {

        const resposta = await req
            .post("/setores")
            .send({
                local: "Garagem (VLH - BLOCO A)",
                status: true
            })
            .set("Accept", "application/json")
            .expect(201);

        expect(resposta.body.message).toContain(messages.httpCodes[201]);

        setorID = resposta.body.data._id;
    });

    // Teste de atualizar SETOR ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve atualizar um setor pelo ID", async () => {
        const dados = await req
            .patch(`/setores/${setorID}`)
            .set("Accept", "application/json")
            .send({
                local: "Garagem (VLH - BLOCO B)",
                status: true
            });
        expect(200);
        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de listar por ID SETOR ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve retornar uma lista de setor por ID", async () => {
        const dados = await req
            .get(`/setores/${setorID}`)
            .set("Accept", "aplication/json")
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de deletar SETOR ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve deletar um setor", async () => {
        const resposta = await req
            .delete(`/setores/${setorID}`)
            .set("Accept", "application/json")
            .expect(200);

        expect(resposta.body.message).toContain(messages.httpCodes[200]);
    });
});
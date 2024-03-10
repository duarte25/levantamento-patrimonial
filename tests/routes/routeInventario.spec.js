import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import messages from "../../src/utils/mensagens.js";
import usuario from "../../src/models/Usuario.js";

describe("inventario", () => {
    const req = request(app);
    let inventarioID;
    let setorID = [];
    let usuarioID = [];
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
        for (let i = 0; i < 2; i++) {
            const res = await req
                .get("/setores")
                .set("Accept", "aplication/json")
                .expect(200);

            const setorSelecionado = res.body.data[i];
            expect(setorSelecionado).toBeDefined();
            expect(setorSelecionado._id).toBeDefined();
            setorID.push(setorSelecionado._id);
        }

        return setorID;
    }

    async function obterUsuario() {
        for (let i = 0; i < 3; i++) {
            const res = await req
                .get("/usuarios")
                .set("Accept", "aplication/json")
                .set("Authorization", `Bearer ${token}`)
                .expect(200);

            const usuarioSelecionado = res.body.data[i];
            expect(usuarioSelecionado).toBeDefined();
            expect(usuarioSelecionado._id).toBeDefined();
            usuarioID.push(usuarioSelecionado._id);
        }

        return usuarioID;
    }

    // eslint-disable-next-line no-undef
    it("Deve retornar uma lista de inventarios", async () => {
        const dados = await req
            .get("/inventarios")
            .set("Accept", "aplication/json")
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de Criar inventario ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve cadastrar um inventario", async () => {

        setorID = await obterSetor();
        usuarioID = await obterUsuario();

        const resposta = await req
            .post("/inventarios")
            .send({
                setores: [
                    {
                        _id: setorID[0]
                    },
                    {
                        _id: setorID[1]
                    }
                ],
                responsavel: usuarioID[0],
                auditores: [
                    {
                        _id: usuarioID[1]
                    },
                    {
                        _id: usuarioID[2]
                    },
                ],
                data_inicio: "2021-12-26"
            })
            .set("Accept", "application/json")
            .expect(201);

        expect(resposta.body.message).toContain(messages.httpCodes[201]);

        inventarioID = resposta.body.data._id;
    }, 10000);

    // Teste de Deletar inventario ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve deletar um inventario", async () => {
        const resposta = await req
            .delete(`/inventarios/${inventarioID}`)
            .set("Accept", "application/json")
            .expect(200);

        expect(resposta.body.message).toContain(messages.httpCodes[200]);
    });
});
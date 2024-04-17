import { describe, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import messages from "../../src/utils/mensagens.js";
import usuario from "../../src/models/Usuario.js";

describe("Rotas de Inventario", () => {
    const req = request(app);
    let inventarioID;
    let setorID = [];
    let usuarioID = [];
    let campusID = ""
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

        expect(resposta.body.token).toBeDefined();
        return token = resposta.body.token;
    });

    async function obterUsuario() {
        for (let i = 0; i < 4; i++) {
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

    async function criarcampus() {
        const res = await req
            .post("/campus")
            .set("Accept", "aplication/json")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Campus Teste da alvorada",
                cidade: "Teste d'Oeste"
            })
            .expect(201);

        const campus = res.body.data._id;
        expect(campus).toBeDefined();
        return campus;
    }


    async function apagarCampus() {
        const res = await req
            .delete(`/campus/${campusID}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200)
    }

    // Teste de listar de INVENTARIO ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve retornar uma lista de inventarios", async () => {
        const dados = await req
            .get("/inventarios")
            .set("Accept", "aplication/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de criar INVENTARIO ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve cadastrar um inventario", async () => {

        usuarioID = await obterUsuario();
        campusID = await criarcampus();

        const resposta = await req
            .post("/inventarios")
            .send({
                auditores: [
                    {
                        _id: usuarioID[1]
                    },
                    {
                        _id: usuarioID[2]
                    },
                ],
                campus: campusID,
                responsavel: usuarioID[3],
                data_inicio: "2024-01-02",
                data_fim: "2024-02-26"
            })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(201);

        expect(resposta.body.message).toContain(messages.httpCodes[201]);

        inventarioID = resposta.body.data._id;
    });

    // Teste de atualizar INVENTARIO ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve atualizar um inventario pelo ID", async () => {
        const dados = await req
            .patch(`/inventarios/${inventarioID}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send({
                auditores: [
                    {
                        _id: usuarioID[1]
                    },
                    {
                        _id: usuarioID[2]
                    },
                ],
                data_inicio: "2024-01-02",
                data_final: "2024-02-26"
            });
        expect(200);
        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de listar por ID INVENTARIO ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve retornar uma lista de inventario por ID", async () => {
        const dados = await req
            .get(`/inventarios/${inventarioID}`)
            .set("Accept", "aplication/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de deletar INVENTARIO ---------------------------------------------------
    // eslint-disable-next-line no-undef
    it("Deve deletar um inventario", async () => {
        const resposta = await req
            .delete(`/inventarios/${inventarioID}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(resposta.body.message).toContain(messages.httpCodes[200]);
        apagarCampus()
    });
});
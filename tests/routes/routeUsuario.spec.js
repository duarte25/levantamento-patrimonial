import { describe, expect, test, it } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import messages from "../../src/utils/mensagens.js";
import usuario from "../../src/models/Usuario.js";

describe("Rotas de Usuario", () => {
    const req = request(app);
    let usuarioID;
    let token;
    let campusID;

    const userlogin = {
        email: "dev@gmail.com",
        senha: "Dev@1234"
    };

    it("Deve autenticar o usuário e retornar um token", async () => {
        const resposta = await request(app)
            .post("/login")
            .send(userlogin)
            .set("Accept", "aplication/json")
            .expect(200);

        expect(resposta.body.token).toBeDefined();
        return token = resposta.body.token;
    });

    async function obterCampus() {
        const res = await req
            .get("/campus")
            .set("Accept", "aplication/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        const campusSelecionado = res.body.data[0];
        expect(campusSelecionado).toBeDefined();
        expect(campusSelecionado._id).toBeDefined();

        return campusSelecionado._id;
    }

    // Teste de listar USUARIO ---------------------------------------------------
    it("Deve retornar uma lista de usuarios", async () => {
        const dados = await req
            .get("/usuarios")
            .set("Accept", "aplication/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de criar USUARIO ---------------------------------------------------
    it("Deve cadastrar um usuario", async () => {
        
        campusID = await obterCampus();

        const resposta = await req
            .post("/usuarios")
            
            .send({
                nome: "Teste de Rota Usuario",
                cpf: "66217086026",
                email: "Teste68@live.com",
                senha: "Teste@22",
                campus: campusID,
                ativo: true,
            })
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(201);

        expect(resposta.body.message).toContain(messages.httpCodes[201]);

        usuarioID = resposta.body.data._id;
    });

    // Teste de atualizar USUARIO ---------------------------------------------------
    it("Deve atualizar um usuario pelo ID", async () => {
        const dados = await req
            .patch(`/usuarios/${usuarioID}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send({
                nome: "Teste de Rota Usuario",
                cpf: "66217086026",
                email: "Teste70@live.com",
                ativo: true,
            });
        expect(200);
        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de listar por ID USUARIO ---------------------------------------------------
    it("Deve retornar uma lista de usuario por ID", async () => {
        const dados = await req
            .get(`/usuarios/${usuarioID}`)
            .set("Accept", "aplication/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    // Teste de deletar USUARIO ---------------------------------------------------
    it("Deve deletar um usuario", async () => {
        const resposta = await req
            .delete(`/usuarios/${usuarioID}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(resposta.body.message).toContain(messages.httpCodes[200]);
    });
});
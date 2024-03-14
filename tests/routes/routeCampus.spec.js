
import { describe, expect, it } from "@jest/globals";
import request from "supertest";
import app from "../../src/app.js";
import messages from "../../src/utils/mensagens.js";
import faker from "faker-br";


const exemplo_campus = {
    nome: faker.name.findName(),
    cidade: faker.address.city(),
    ativo: true

};

describe("Campus", () => {
    const req = request(app);
    let campusID;
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

    it("Deve retornar uma lista de campus", async () => {
        const dados = await req
            .get("/campus")
            .set("Accept", "aplication/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    it("Deve cadastrar um campus", async () => {
        const resposta = await req
            .post("/campus")
            .send(exemplo_campus)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(201);

        expect(resposta.body.message).toContain(messages.httpCodes[201]);

        campusID = resposta.body.campus._id;
    });

    it("Deve deletar um campus", async () => {
        const resposta = await req
            .delete(`/campus/${campusID}`)
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .expect(200);

        expect(resposta.body.message).toContain(messages.httpCodes[200]);
    });

});



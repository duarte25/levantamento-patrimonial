
import {describe, expect, it} from "@jest/globals";
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

    it("Deve retornar uma lista de campus", async () => {
        const dados = await req
            .get("/campus")
            .set("Accept", "aplication/json")
            .expect(200);

        expect(dados.body.message).toEqual(messages.httpCodes[200]);
    });

    it("Deve cadastrar um campus", async () => {
        const resposta = await req
            .post("/campus")
            .send(exemplo_campus)
            .set("Accept", "application/json")
            .expect(201);

            console.log(resposta.body);

        expect(resposta.body.message).toContain(messages.httpCodes[201]);

        campusID = resposta.body.campus._id;
        console.log(resposta.body.campus._id);
    });

    it("Deve deletar um campus", async () => {
        const resposta = await req
            .delete(`/campus/${campusID}`)
            .set("Accept", "application/json")
            .expect(200);

        expect(resposta.body.message).toContain(messages.httpCodes[200]);
    });

});



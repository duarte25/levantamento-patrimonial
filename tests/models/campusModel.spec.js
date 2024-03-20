import mongoose from "mongoose";
import db from "../../src/config/db_config.js";
import Campus from "../../src/models/Campus.js";


describe("Modelo de Campus", () => {
    let campusData = {};

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

    it("Deve criar um novo Campus", async () => {
        campusData = {
            _id: new mongoose.Types.ObjectId(),
            nome: "Campus Vilhena - teste",
            cidade: "Vilhena",
            ativo: true
        };

        const campus = new Campus(campusData);
        const campusSaved = await campus.save();

        expect(campusSaved._id).toBe(campusData._id);
        expect(campusSaved.nome).toBe(campusData.nome);
        expect(campusSaved.cidade).toBe(campusData.cidade);
        expect(campusSaved.ativo).toBe(campusData.ativo);
        expect(campusSaved.createdAt).toBeTruthy();
        expect(campusSaved.updatedAt).toBeTruthy();

    });



    it("Deve listar todos os campus", async () => {
        const campus = await Campus.find();

        expect(campus.length).toBeGreaterThan(0);
    });

    it("Deve listar um campus pelo _id", async () => {
        const campus = await Campus.findOne({ nome: "Campus Vilhena - teste" });

        expect(campus.nome).toBe("Campus Vilhena - teste");
    });

    it("Deve atualizar um campus pelo _id", async () => {
        const campus = await Campus.findOne({ nome: "Campus Vilhena - teste" });
        campus.nome = "Campus Vilhena - teste2";
        const campusUpdated = await campus.save();

        expect(campusUpdated.nome).toBe("Campus Vilhena - teste2");
    });

    it("Deve excluir um campus pelo _id", async () => {
        const campus = await Campus.findOne({ nome: "Campus Vilhena - teste2" });
        const campusDeleted = await Campus.deleteOne({ _id: campus._id });

        expect(campusDeleted.deletedCount).toBe(1);
    });
});
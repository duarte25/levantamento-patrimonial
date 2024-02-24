import express from "express";
import AuthController from "../controllers/AuthController.js";
import AuthValidate from "../validations/authValidation.js";
import AuthValidate from "../services/validation/authValidation.js";

const router = express.Router()

router
    .post("/login", AuthValidate.loginValidate, AuthController.logar)

export default router
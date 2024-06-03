import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import { generateHash, validateHash } from "../utils/BcryptUtils";


class AuthController {
    constructor() { }

    async signUp(req: Request, res: Response) {
        const body = req.body;
        console.log(body);

        if (!body.email || !body.name || !body.password) {
            res.json({
                status: "error",
                message: "Falta parâmetros",
            });
            return;
        }

        const hashPassword = await generateHash(body.password);

        if (!hashPassword) {
            res.json({
                status: "error",
                message: "Erro ao criptografar senha ...",
            });
        }

        try {
            const newuser = await AuthService.signUp({
                name: body.name,
                email: body.email,
                password: hashPassword as string
            });
            res.json({
                status: "ok",
                newuser: newuser,
            });
        } catch (error) {
            res.json({
                status: "error",
                message: error,
            });
        }
    }

    async signIn(req: Request, res: Response) {
        const body = req.body;
        console.log(body);

        if (!body.email || !body.password) {
            res.json({
                status: "error",
                message: "Falta parâmetros",
            });
            return;
        }

        const hashPassword = await generateHash(body.password);

        if (!hashPassword) {
            res.json({
                status: "error",
                message: "Erro ao criptografar senha ...",
            });
        }

        try {
            const user = await AuthService.signIn(body.password);
           if(user?.password){
            const canAcess = await validateHash(body.password, user?.password)
            if(canAcess){
                res.json({

                })
            }
           }
        } catch (error) {
            res.json({
                status: "error",
                message: error,
            });
        }

    }

    async signOut() {

    }
}
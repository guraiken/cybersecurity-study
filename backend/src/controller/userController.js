import db from "../config/database.js"
import validarCPF from "../utils/validarCpf.js"

class UserController{
    constructor() {}

    async createUser(req, res) {
        const {nome, email, cpf, senha, logradouro, numero, bairro, estado, cidade} = req.body
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if(!nome || typeof nome != "string" || nome.trim().length < 3 ) {
            return res.status(400).json({message: `Nome inválido. Este campo é obrigatório`, success: false})
        }

        if(!emailRegex.test(email)){
            return res.status(400).json({message: `Email inválido. Este campo é obrigatório, verifique a formatação`, success: false})
        }

        if(!cpf || typeof cpf != "string") {
            return res.status(400).json({message: `CPF inválido. Este campo é obrigatório`, success: false})
        } 
        if(!senha) {
            return res.status(400).json({message: "SENHA inválida. Este campo é obrigatório.", success: false})
        } else {
            if(senha.length < 8 || senha.length > 32) {
                return res.status(400).json({
                    message: "Senha inválida.",
                    success: false
                })
            }
        }

        if(!validarCPF(cpf)) {
            return res.status(400).json({
                message: "CPF inválido",
                success: false
            })
        }

        const cpfLimpo = cpf.replace(/\D/g, "")

        const nomeSanitizado = nome.trim().replace(/\s+/g, "")

        try {
            const sql = 'INSERT INTO usuario (nome, email, senha, cpf) VALUES (?, ?, ?, ?)'
            const valores = [nomeSanitizado, email, senha, cpfLimpo]

            const [result] = await db.execute(sql, valores)

            if(result.affectedRows === 0) {
                return res.status(400).json({
                    message: "Não foi possível inserir os dados do usuário.",
                    success: false
                })
            }

            return res.status(201).json({message: "Usuário criado com sucesso.", success: true})
        }
        catch {
            res.status(500).json({message: "Erro interno"})
        }
    }
}

export const userController = new UserController()
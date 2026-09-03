import { useState } from "react"
import { create } from "../../services/user"

const FormUser = () => {

    const [form, setForm] = useState({
        nome: "",
        cpf: "",
        email: "",
        senha: ""
    })

    const [errors, setErrors] = useState({})

    const handleChange = (e) => {
        const {name, value} = e.target;

        setForm({
            ...form,
            [name]: value
        });
    }

    const validateInput = ({value, howLength, error, ...rules}) => {
        let erro = ""

        if(!value || value.trim().length < howLength ? rules : "") {
            erro = error
            return erro
        }

    }

    const validateForm = () => {
        const newErrors = {};

        //nome
        if(!form.nome || form.nome.trim().length < 3) {
            newErrors.nome = "O campo nome não pode ser vazio e deve ter no mínimo 3 caracteres"   
        }

        //cpf
        if(!form.cpf || form.cpf.trim().length < 11) {
            newErrors.cpf = "O campo CPF não pode ser vazio e deve ter 11 caracteres"   
        }

        if(!form.email || !form.email.includes('@')) {
            newErrors.email = "O campo email não pode ser vazio e deve incluir um @ no domínio"   
        }
        
        if(!form.senha || form.senha.trim().length > 32 || form.senha.trim().length < 8) {
            newErrors.senha = "O campo senha não pode ser vazio e deve ter entre 8 e 32 caracteres"
        }

        setErrors({...newErrors})

        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(!validateForm()) return

        try {
            const result = await create(form)
            console.log("Result: ", result)
        } catch (error) {
            console.error("Ocorreu um erro ao enviar a requisição")
        }
    }

  return (
    <div>
        <h1>Cadastro usuário</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="nome">Nome</label>
                <input 
                    type="text" 
                    name="nome" 
                    id="nome" 
                    value={form.nome}
                    onChange={handleChange}
                    placeholder="Digite seu nome completo"
                />
            </div>
            {form.nome && <div>
                <p style={{color: '#f00'}}>{errors.nome}</p>
            </div>}
            <div>
                <label htmlFor="cpf">CPF</label>
                <input 
                    type="text" 
                    name="cpf" 
                    id="cpf" 
                    value={form.cpf}
                    onChange={handleChange}
                    placeholder="Digite seu CPF"
                />
            </div>
            {form.cpf && <div>
                <p style={{color: '#f00'}}>{errors.cpf}</p>
            </div>}
            <div>
                <label htmlFor="email">Email</label>
                <input 
                    type="email" 
                    name="email" 
                    id="email" 
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Digite seu email"
                />
            </div>
            {form.email && <div>
                <p style={{color: '#f00'}}>{errors.email}</p>
            </div>}
            <div>
                <label htmlFor="senha">Senha:</label>
                <input 
                    type="password" 
                    name="senha" 
                    id="senha" 
                    value={form.senha}
                    onChange={handleChange}
                    placeholder="Digite sua senha de 8 a 32 caracteres"
                />
            </div>
            {form.senha && <div>
                <p style={{color: '#f00'}}>{errors.senha}</p>
            </div>}
            <button type="submit">Cadastrar</button>
        </form>
    </div>
  )
}

export default FormUser
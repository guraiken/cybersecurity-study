const inputValidation = (req, res, next) => {
    const inputs = req.body

        for (i in inputs) {   
            const value = inputs[i]

            if(!value || typeof value != "string" || value.trim().length < 3 ) {
                return res.status(400).json({message: `[${key}] inválido. Este campo é obrigatório`, success: false})
            } 
        
            next()
        }
}

export default inputValidation
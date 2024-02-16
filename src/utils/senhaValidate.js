export default function senhaValidate(senha, erros) {
        const maisculas = /[A-Z]/
        const minusculas = /[a-z]/
        const numeros = /[0-9]/
        const especial = /[!|@|#|$|%|^&|*|(|)|_|-|=|+|:|;]/

        senha = String(senha)

        if (senha.length < 8) {
            erros.push("A senha deve conter no mínimo 8 caracteres!")
        }

        if (!maisculas.test(senha)) {
            erros.push("A senha precisa conter ao menos 1 letra maiúscula!")
        }

        if (!minusculas.test(senha)) {
            erros.push("A senha precisa conter ao menos 1 letra minúscula!")
        }

        if (!numeros.test(senha)) {
            erros.push("A senha precisa conter ao menos 1 número!")
        }

        if (!especial.test(senha)) {
            erros.push("A senha deve conter ao menos 1 caractere especial!")
        }
}
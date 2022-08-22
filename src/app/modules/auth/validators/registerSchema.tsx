import * as Yup from 'yup';
import { validateCpfCnpj } from "../../../helpers/DocumentHelper";

const registerSchema = Yup.object().shape({
	document: Yup.string()
		.test(
			"test-invalid-document",
			"Informe um CPF/CNPJ válido",
			(cpf) => validateCpfCnpj(cpf || "")
		)
		.required("Informe o CPF/CNPJ"),
	password: Yup.string()
		.min(8, "Senha muito curta")
		.required("Informe uma senha"),
    passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password'), null], "As senhas não conferem")
		.required("Confirme sua senha"),
	email: Yup.string()
		.email("Informe um e-mail válido")
		.required("Informe o e-mail"),
	terms: Yup.bool().oneOf([true], "Você precisa aceitar os termos de uso"),
	privacy: Yup.bool().oneOf([true], "Você precisa aceitar a política de privacidade")
});

export default registerSchema;

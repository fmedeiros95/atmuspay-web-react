import { validateCpfCnpj } from "../../../helpers/DocumentHelper";
import Validator from "../../../helpers/ValidatorHelper";

const loginSchema = Validator.object().shape({
	document: Validator.string().test(
		'test-invalid-document',
		'Informme um CPF/CNPJ válido',
		(cpf) => validateCpfCnpj(cpf || '')
	).required('Informe o CPF/CNPJ'),
	password: Validator.string()
		.required('Informe a senha')
});

export default loginSchema;

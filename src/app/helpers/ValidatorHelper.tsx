/* eslint-disable no-useless-escape */
import * as Yup from 'yup';

// CPF validation
Yup.addMethod(Yup.string, 'cpf', (message) => {
	return Yup.string()
		.matches(/^\d{3}\.\d{3}\.\d{3}\-\d{2}$/, message)
		.required(message);
});

// CPNJ validation
Yup.addMethod(Yup.string, 'cnpj', (message) => {
	return Yup.string()
		.matches(/^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, message)
		.required(message);
});


export default Yup;

import { applyMask, onlyDigits } from "./UtilsHelper";

// Is a valid CPF?
const validateCpf = (document: string): boolean => {
	const documentValue = onlyDigits(document).substring(0, 11)

	// Validar se tem tamanho 11 ou se é uma sequência de digitos repetidos
	if (documentValue.length !== 11 || documentValue.match(/(\d)\1{10}/)) return false;

    const cpf = documentValue.split('').map(el => +el)
    const rest = (count: any) => (
		cpf.slice(0, count-12)
			.reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10
	) % 11 % 10

	return rest(10) === cpf[9] && rest(11) === cpf[10];
}

// Is a valid CNPJ?
const validateCnpj = (document: string): boolean => {
	const documentValue = onlyDigits(document).substring(0, 14);

	// Validar se tem tamanho 14 ou se é uma sequência de digitos repetidos
	if (documentValue.length !== 14 || documentValue.match(/(\d)\1{13}/)) return false;

	// Cálculo validador
	const calc = (x: number) => {
		const slice = documentValue.slice(0, x)
		let factor = x - 7
		let sum = 0

		for (let i = x; i >= 1; i--) {
			const n: any = slice[x - i]
			sum += n * factor--
			if (factor < 2) factor = 9
		}

		const result = 11 - (sum % 11)

		return result > 9 ? 0 : result
	}

	// Separa os 2 últimos dígitos de verificadores
	const digits: string = documentValue.slice(12);

	const digit0 = calc(12).toString();
	const digit1 = calc(13).toString();

	return digit0 === digits[0] && digit1 === digits[1];
}

// Detect if the document is CPF or CNPJ and validate the document
const validateCpfCnpj = (document: string): boolean => {
	const documentValue: string = onlyDigits(document).substring(0, 14);
	const documentType = documentValue.length === 11 ? 'cpf' : 'cnpj';

	return documentType === 'cpf' ? validateCpf(documentValue): validateCnpj(documentValue);
}

// Format CPF
const formatCpf = (cpf: string): string => {
	const cpfValue: string = onlyDigits(cpf).substring(0, 11);
	return applyMask(cpfValue, "999.999.999-99");
};

// Format CNPJ
const formatCnpj = (cnpj: string): string => {
	const cnpjValue: string = onlyDigits(cnpj).substring(0, 14);
	return applyMask(cnpjValue, "99.999.999/9999-99");
};

// Detect if the document is CPF or CNPJ and apply the mask
const formatCpfCnpj = (document: string): string => {
	const documentValue: string = onlyDigits(document).substring(0, 14);
	const documentType = documentValue.length === 11 ? 'cpf' : 'cnpj';
	return applyMask(documentValue, documentType === 'cpf' ? '999.999.999-99' : '99.999.999/9999-99');
}

export {
	formatCpf,
	formatCnpj,
	formatCpfCnpj,

	validateCpf,
	validateCnpj,
	validateCpfCnpj
}

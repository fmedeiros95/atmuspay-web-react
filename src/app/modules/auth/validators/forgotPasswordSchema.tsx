import Validator from "../../../helpers/ValidatorHelper";

const forgotPasswordSchema = Validator.object().shape({
	  email: Validator.string()
	  	.email('Informe um e-mail válido')
	  	.required("Informe seu e-mail")
});

export default forgotPasswordSchema;

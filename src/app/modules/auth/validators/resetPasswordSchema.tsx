import * as Yup from 'yup';

const resetPasswordSchema = Yup.object().shape({
    password: Yup.string()
		.min(8, "A senha deve ter no mínimo 8 caracteres")
		.required("Informe uma senha"),
    passwordConfirm: Yup.string()
		.oneOf([Yup.ref('password'), null], "As senhas não conferem")
		.required("Confirme sua senha")
});

export default resetPasswordSchema;

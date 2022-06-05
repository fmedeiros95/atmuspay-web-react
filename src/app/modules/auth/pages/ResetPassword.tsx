import * as Yup from 'yup';
import { useFormik } from "formik";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import useLayout from '../../../hooks/useLayout';
import toast from 'react-hot-toast';
import authService from "../../../services/AuthService";
import clsx from 'clsx';

const resetPasswordSchema = Yup.object().shape({
	token: Yup.string()
		.required('Token de recuperação de senha não informado'),
	password: Yup.string()
		.required('Informe a senha')
		.min(8, 'A senha deve ter no mínimo 8 caracteres'),
	passwordConfirm: Yup.string()
		.required('Informe a confirmação da senha')
		.oneOf([Yup.ref('password'), null], 'As senhas não conferem'),
});

const ResetPassword = (): JSX.Element => {
	const { token } = useParams();
	const { toggleLoading } = useLayout();

	const formResetPassword = useFormik({
		initialValues: {
			token: token || '',
			password: '',
			passwordConfirm: ''
		},
		validationSchema: resetPasswordSchema,
		onSubmit: async (values) => {
			toggleLoading(true);

			try {
				const { data } = await authService.resetPassword(values.token, values.password, values.passwordConfirm);

				toast.success(data.message.message);
			} catch (err: any) {
				console.log(err);
			} finally {
				toggleLoading(false);
			}
		}
	});


	return (
		<>
			<PageTitle
				title="Redefinir Senha"
				subtitle="Informe seu e-mail e nós lhe enviaremos um e-mail com instruções para redefinir sua senha."
			/>

			{/* Form */}
			<form className="form-horizontal" onSubmit={formResetPassword.handleSubmit} noValidate>
				<div className="mb-3">
					<label htmlFor="password" className="form-label">Senha</label>
					<input
						placeholder="Sua nova senha"
						{...formResetPassword.getFieldProps('password')}
						className={clsx(
							"form-control",
							{"is-invalid": formResetPassword.touched.password && formResetPassword.errors.password},
							{"is-valid": formResetPassword.touched.password && !formResetPassword.errors.password}
						)}
						type="password"
						id="password"
						name="password"
						autoComplete="off"
					/>
					{formResetPassword.touched.password && formResetPassword.errors.password && (
						<div className="d-block invalid-feedback">{ formResetPassword.errors.password }</div>
					)}
				</div>
				<div className="mb-3">
					<label htmlFor="passwordConfirm" className="form-label">Confirmar Senha</label>
					<input
						placeholder="Confirme sua nova senha"
						{...formResetPassword.getFieldProps('passwordConfirm')}
						className={clsx(
							"form-control",
							{"is-invalid": formResetPassword.touched.passwordConfirm && formResetPassword.errors.passwordConfirm},
							{"is-valid": formResetPassword.touched.passwordConfirm && !formResetPassword.errors.passwordConfirm}
						)}
						type="password"
						id="passwordConfirm"
						name="passwordConfirm"
						autoComplete="off"
					/>
					{formResetPassword.touched.passwordConfirm && formResetPassword.errors.passwordConfirm && (
						<div className="d-block invalid-feedback">{ formResetPassword.errors.passwordConfirm }</div>
					)}
				</div>

				<div className="text-center d-grid">
					<button className="btn btn-primary waves-effect waves-light" type="submit">Redefinir senha</button>
				</div>
			</form>

			{/* Footer */}
			<footer className="footer footer-alt">
				<p className="text-muted">
					Lembrou sua senha? <Link to="/auth/login" className="text-muted"><b>Acesse sua conta</b></Link>
				</p>
			</footer>
		</>
	);
}

export default ResetPassword;

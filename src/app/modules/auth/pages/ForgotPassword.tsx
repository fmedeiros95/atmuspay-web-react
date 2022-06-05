import * as Yup from 'yup';
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import useLayout from "../../../hooks/useLayout";
import authService from "../../../services/AuthService";
import PageTitle from "../components/PageTitle";
import toast from 'react-hot-toast';
import clsx from 'clsx';

const forgotPasswordSchema = Yup.object().shape({
	email: Yup.string()
		.email('Informe um e-mail válido')
		.required('Informe seu e-mail')
});

const ForgotPassword = (): JSX.Element => {
	const { toggleLoading } = useLayout();

	const formForgotPassword = useFormik({
		initialValues: {
			email: ''
		},
		validationSchema: forgotPasswordSchema,
		onSubmit: async (values) => {
			toggleLoading(true);

			try {
				const { data } = await authService.forgotPassword(values.email);

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
				title="Esqueceu a senha?"
				subtitle="Informe seu e-mail e nós lhe enviaremos um e-mail com instruções para redefinir sua senha."
			/>

			{/* Form */}
			<form className="form-horizontal" onSubmit={formForgotPassword.handleSubmit} noValidate>
				<div className="mb-3">
					<label htmlFor="emailaddress" className="form-label">E-mail</label>
					<input
						placeholder='Digite seu e-mail'
						{...formForgotPassword.getFieldProps('email')}
						className={clsx(
							'form-control',
							{'is-invalid': formForgotPassword.touched.email && formForgotPassword.errors.email},
							{'is-valid': formForgotPassword.touched.email && !formForgotPassword.errors.email}
						)}
						type='text'
						id="email"
						name='email'
						autoComplete='off'
					/>
					{formForgotPassword.touched.email && formForgotPassword.errors.email && (
						<div className="invalid-feedback">{ formForgotPassword.errors.email }</div>
					)}
				</div>

				<div className="text-center d-grid">
					<button className="btn btn-primary" type="submit">Redefinir senha</button>
				</div>
			</form>

			{/* Footer */}
			<footer className="footer footer-alt">
				<p className="text-muted">
					Lembrou sua senha? <Link to="/auth/login" className="text-muted"><b>Acesse sua conta</b></Link>
				</p>
			</footer>
		</>
	)
};

export default ForgotPassword;

import Swal from 'sweetalert2';
import { useFormik } from "formik";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useLayout from "../../../hooks/useLayout";
import authService from "../../../services/AuthService";
import PageTitle from "../components/PageTitle";
import forgotPasswordSchema from '../validators/forgotPasswordSchema';
import { Button, Form } from 'react-bootstrap';

const ForgotPassword = (): JSX.Element => {
	const navigate: NavigateFunction = useNavigate();
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

				Swal.fire({
					title: data.message.title,
					text: data.message.message,
					icon: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false
				}).then(() => {
					formForgotPassword.resetForm();

					navigate('/auth/login');
				});
			} finally {
				toggleLoading(false);
			}
		}
	});
	return <>
		<PageTitle
			title="Esqueceu a senha?"
			subtitle="Informe seu e-mail e nós lhe enviaremos um e-mail com instruções para redefinir sua senha."
		/>

		<Form onSubmit={formForgotPassword.handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="email">E-mail:</Form.Label>
				<Form.Control
					placeholder="seu.email@exemplo.com.br"
					{...formForgotPassword.getFieldProps('email')}
					isInvalid={formForgotPassword.touched.email && !!formForgotPassword.errors.email}
					isValid={formForgotPassword.touched.email && !formForgotPassword.errors.email}
					type="text"
					id="email"
					name="email"
				/>
				{formForgotPassword.touched.email && formForgotPassword.errors.email && (
					<Form.Control.Feedback type="invalid">{formForgotPassword.errors.email}</Form.Control.Feedback>
				)}
			</Form.Group>

			<div className="text-center d-grid">
				<Button variant="primary" type="submit">Redefinir senha</Button>
			</div>
		</Form>

		<footer className="footer footer-alt">
			<p className="text-muted">
				Lembrou sua senha? <Link to="/auth/login" className="text-muted ms-1"><b>Acesse sua conta</b></Link>
			</p>
		</footer>
	</>;
};

export default ForgotPassword;

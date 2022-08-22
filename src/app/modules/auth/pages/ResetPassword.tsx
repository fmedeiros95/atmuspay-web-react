import { useFormik } from "formik";
import { NavigateFunction, useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import PageTitle from "../components/PageTitle";
import useLayout from '../../../hooks/useLayout';
import authService from "../../../services/AuthService";
import InputPassword from '../../../components/InputPassword';
import Swal from 'sweetalert2';
import resetPasswordSchema from '../validators/resetPasswordSchema';
import { Button, Form } from "react-bootstrap";

const ResetPassword = (): JSX.Element => {
	const { token } = useParams();
	const { toggleLoading } = useLayout();
	const navigate: NavigateFunction = useNavigate();

	const formResetPassword = useFormik({
		initialValues: {
			password: '',
			passwordConfirm: ''
		},
		validationSchema: resetPasswordSchema,
		onSubmit: async (values) => {
			toggleLoading(true);

			try {
				const { data } = await authService.resetPassword(
					token || '',
					values.password,
					values.passwordConfirm
				);

				Swal.fire({
					title: data.message.title,
					text: data.message.message,
					icon: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false
				}).then(() => {
					formResetPassword.resetForm();

					navigate('/auth/login');
				});
			} finally {
				toggleLoading(false);
			}
		}
	});


	return <>
		<PageTitle
			title="Redefinir Senha"
			subtitle="Informe seu e-mail e nós lhe enviaremos um e-mail com instruções para redefinir sua senha."
		/>

		<Form onSubmit={formResetPassword.handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="password">Nova Senha:</Form.Label>
				<InputPassword
					placeholder="••••••••"
					{...formResetPassword.getFieldProps('password')}
					isInvalid={formResetPassword.touched.password && !!formResetPassword.errors.password}
					isValid={formResetPassword.touched.password && !formResetPassword.errors.password}
					id="password"
					name="password"
				/>
				{formResetPassword.touched.password && formResetPassword.errors.password && (
					<Form.Control.Feedback type="invalid">{formResetPassword.errors.password }</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label htmlFor="passwordConfirm">Confirmar Nova Senha:</Form.Label>
				<InputPassword
					placeholder="••••••••"
					{...formResetPassword.getFieldProps('passwordConfirm')}
					isInvalid={formResetPassword.touched.passwordConfirm && !!formResetPassword.errors.passwordConfirm}
					isValid={formResetPassword.touched.passwordConfirm && !formResetPassword.errors.passwordConfirm}
					id="passwordConfirm"
					name="passwordConfirm"
				/>
				{formResetPassword.touched.passwordConfirm && formResetPassword.errors.passwordConfirm && (
					<Form.Control.Feedback type="invalid">{formResetPassword.errors.passwordConfirm }</Form.Control.Feedback>
				)}
			</Form.Group>

			<div className="text-center d-grid">
				<Button type="submit" variant="primary">Redefinir senha</Button>
			</div>
		</Form>

		<footer className="footer footer-alt">
			<p className="text-muted">
				Lembrou sua senha? <Link to="/auth/login" className="text-muted ms-1"><b>Acesse sua conta</b></Link>
			</p>
		</footer>
	</>;
}

export default ResetPassword;

import { useFormik } from "formik";
import Swal from "sweetalert2";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import InputPassword from "../../../components/InputPassword";
import PageTitle from "../components/PageTitle";
import useLayout from "../../../hooks/useLayout";
import registerSchema from "../validators/registerSchema";
import InputDocument from "../../../components/InputDocument";
import authService from "../../../services/AuthService";
import { Button, Col, Form, Row } from "react-bootstrap";

const Register = () => {
	const navigate: NavigateFunction = useNavigate();
	const { toggleLoading } = useLayout();

	const formRegister = useFormik({
		initialValues: {
			document: '',
			email: '',
			password: '',
			passwordConfirm: '',
			terms: false,
			privacy: false
		},
		validationSchema: registerSchema,
		onSubmit: async (values) => {
			toggleLoading(true);

			try {
				const { data } = await authService.register({
					document: values.document,
					email: values.email,
					password: values.password,
					passwordConfirm: values.passwordConfirm,
					terms: values.terms,
					privacy: values.privacy
				});

				Swal.fire({
					title: data.message.title,
					text: data.message.message,
					icon: 'success',
					confirmButtonText: 'Ok',
					allowOutsideClick: false,
				}).then(() => {
					navigate("/auth/login");
				});
			} finally {
				toggleLoading(false);
			}
		}
	});

	const handleDocument = (e: React.ChangeEvent<HTMLInputElement>, value: string, normalizedValue: string) => {
		formRegister.setFieldValue('document', normalizedValue);
	};

	return <>
		<PageTitle
			title="Cadastre-se"
			subtitle="Não tem uma conta? Crie sua conta, leva menos de um minuto."
		/>

		<Form className="form-horizontal" onSubmit={formRegister.handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label htmlFor="document">CPF/CNPJ:</Form.Label>
				<InputDocument
					placeholder="000.000.000-00"
					{...formRegister.getFieldProps('document')}
					isInvalid={formRegister.touched.document && !!formRegister.errors.document}
					isValid={formRegister.touched.document && !formRegister.errors.document}
					type="text"
					id="document"
					name="document"
					onChange={handleDocument}
				/>
				{formRegister.touched.document && formRegister.errors.document && (
					<Form.Control.Feedback type="invalid">{formRegister.errors.document}</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-3">
				<Form.Label htmlFor="email">E-mail:</Form.Label>
				<Form.Control
					placeholder="seu.email@exemplo.com.br"
					{...formRegister.getFieldProps('email')}
					isInvalid={formRegister.touched.email && !!formRegister.errors.email}
					isValid={formRegister.touched.email && !formRegister.errors.email}
					type="text"
					id="email"
					name="email"
				/>
				{formRegister.touched.email && formRegister.errors.email && (
					<Form.Control.Feedback type="invalid">{formRegister.errors.email}</Form.Control.Feedback>
				)}
			</Form.Group>

			<Row>
				<Form.Group as={Col} md={6} className="mb-3">
					<Form.Label htmlFor="password">Senha:</Form.Label>
					<InputPassword
						placeholder="••••••••"
						{...formRegister.getFieldProps('password')}
						isInvalid={formRegister.touched.password && !!formRegister.errors.password}
						isValid={formRegister.touched.password && !formRegister.errors.password}
						id="password"
						name="password"
					/>
					{formRegister.touched.password && formRegister.errors.password && (
						<Form.Control.Feedback type="invalid">{formRegister.errors.password}</Form.Control.Feedback>
					)}
				</Form.Group>

				<Form.Group as={Col} md={6} className="mb-3">
					<Form.Label htmlFor="passwordConfirm">Confirmar senha:</Form.Label>
					<InputPassword
						placeholder="••••••••"
						{...formRegister.getFieldProps('passwordConfirm')}
						isInvalid={formRegister.touched.passwordConfirm && !!formRegister.errors.passwordConfirm}
						isValid={formRegister.touched.passwordConfirm && !formRegister.errors.passwordConfirm}
						id="passwordConfirm"
						name="passwordConfirm"
					/>
					{formRegister.touched.passwordConfirm && formRegister.errors.passwordConfirm && (
						<Form.Control.Feedback type="invalid">{formRegister.errors.passwordConfirm}</Form.Control.Feedback>
					)}
				</Form.Group>
			</Row>

			<Form.Group className="mb-3">
				<Form.Check
					{...formRegister.getFieldProps('terms')}
					isInvalid={formRegister.touched.terms && !!formRegister.errors.terms}
					isValid={formRegister.touched.terms && !formRegister.errors.terms}
					label="Li e concordo com os termos de uso."
					id="terms"
				/>

				<Form.Check
					{...formRegister.getFieldProps('privacy')}
					isInvalid={formRegister.touched.privacy && !!formRegister.errors.privacy}
					isValid={formRegister.touched.privacy && !formRegister.errors.privacy}
					label="Li e concordo com a política de privacidade."
					id="privacy"
				/>
			</Form.Group>

			<div className="d-grid">
				<Button type="submit" variant="success">
					Finalizar Cadastro
				</Button>
			</div>
		</Form>

		<footer className="footer footer-alt">
			<p className="text-muted">
				Já tem conta? <Link to="/auth/login" className="text-muted ms-1"><b>Acesse sua conta</b></Link>
			</p>
		</footer>
	</>;
}
export default Register;

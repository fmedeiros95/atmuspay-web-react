import { useFormik } from "formik";
import toast from "react-hot-toast";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import authService from "../../../services/AuthService";
import userService from "../../../services/UserService";
import PageTitle from "../components/PageTitle";
import useLayout from '../../../hooks/useLayout';
import InputPassword from '../../../components/InputPassword';
import InputDocument from '../../../components/InputDocument';
import loginSchema from "../validators/loginSchema";
import { Button, Form } from 'react-bootstrap';

const Login = () => {
	const navigate: NavigateFunction = useNavigate();

	const { saveToken, setCurrentUser } = useAuth();
	const { toggleLoading } = useLayout();

	const formLogin = useFormik({
		initialValues: {
			document: '',
			password: ''
		},
		validationSchema: loginSchema,
		onSubmit: async (values) => {
			toggleLoading(true);

			try {
				const login = await authService.login(values.document, values.password);
				saveToken(login.data.token);

				const user = await userService.get();
				setCurrentUser(user.data.user);

				toast.success(login.data.message.message);

				navigate("/account/dashboard");
			} catch (error: any) {
				saveToken(undefined);
				setCurrentUser(undefined);
			} finally {
				toggleLoading(false);
			}
		}
	});

	const handleDocument = (e: React.ChangeEvent<HTMLInputElement>, value: string, normalizedValue: string) => {
		formLogin.setFieldValue('document', normalizedValue);
	};

	return <>
		<PageTitle
			title="Minha Conta"
			subtitle="Informe seus dados para acessar a sua conta."
		/>

		<Form className="form-horizontal" onSubmit={formLogin.handleSubmit}>
			<Form.Group className="mb-3">
				<Form.Label htmlFor='document'>CPF/CNPJ:</Form.Label>
				<InputDocument
					placeholder="000.000.000-00"
					{...formLogin.getFieldProps('document')}
					isInvalid={formLogin.touched.document && formLogin.errors.document}
					isValid={formLogin.touched.document && !formLogin.errors.document}
					type="text"
					id="document"
					name="document"
					onChange={handleDocument}
				/>
				{formLogin.touched.document && formLogin.errors.document && (
					<Form.Control.Feedback type="invalid">{formLogin.errors.document}</Form.Control.Feedback>
				)}
			</Form.Group>

			<Form.Group className="mb-3">
				<Link to="/auth/forgot-password" className="text-muted float-end">
					<small>Esqueceu sua senha?</small>
				</Link>
				<Form.Label htmlFor="password">Senha:</Form.Label>
				<InputPassword
					placeholder="Sua senha..."
					{...formLogin.getFieldProps('password')}
					isInvalid={formLogin.touched.password && formLogin.errors.password}
					isValid={formLogin.touched.password && !formLogin.errors.password}
					id="password"
					name="password"
				/>
				{formLogin.touched.password && formLogin.errors.password && (
					<Form.Control.Feedback type="invalid" className="d-block">{formLogin.errors.password}</Form.Control.Feedback>
				)}
			</Form.Group>

			<div className="text-center d-grid">
				<Button type="submit" variant="primary">Acessar</Button>
			</div>
		</Form>

		<footer className="footer footer-alt">
			<p className="text-muted">
				Não tem uma conta? <Link to="/auth/register" className="text-muted ms-1"><b>Cadastre-se</b></Link>
			</p>
		</footer>
	</>
}
export default Login;

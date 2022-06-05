import * as Yup from 'yup';
import { useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import authService from "../../../services/AuthService";
import userService from "../../../services/UserService";
import PageTitle from "../components/PageTitle";
import clsx from 'clsx';

import useLayout from '../../../hooks/useLayout';

const loginSchema = Yup.object().shape({
	username: Yup.string()
		.required('Informe o nome de usuário'),
	password: Yup.string()
		.required('Informe a senha')
});

const Login = () => {
	const navigate: NavigateFunction = useNavigate();
	const [ seePassword, setSeePassword ] = useState(false);

	const { saveToken, setCurrentUser } = useAuth();
	const { toggleLoading } = useLayout();

	const formLogin = useFormik({
		initialValues: {
			username: '',
			password: ''
		},
		validationSchema: loginSchema,
		onSubmit: async (values) => {
			toggleLoading(true);

			try {
				const login = await authService.login(values.username, values.password);
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

	return <>
		<PageTitle
			title="Minha Conta"
			subtitle="Informe seus dados para acessar a sua conta."
		/>
		{/* form */}
		<form className="form-horizontal" onSubmit={formLogin.handleSubmit} noValidate>
			<div className="mb-3">
				<label className="form-label" htmlFor="username">Usuário</label>
				<input
					placeholder='@atmusPay'
					{...formLogin.getFieldProps('username')}
					className={clsx(
						'form-control',
						{'is-invalid': formLogin.touched.username && formLogin.errors.username},
						{'is-valid': formLogin.touched.username && !formLogin.errors.username}
					)}
					type='text'
					id="username"
					name='username'
					autoComplete='off'
				/>
				{formLogin.touched.username && formLogin.errors.username && (
					<div className="invalid-feedback">{ formLogin.errors.username }</div>
				)}
			</div>
			<div className="mb-3">
				<Link to="/auth/forgot-password" className="text-muted float-end">
					<small>Esqueceu sua senha?</small>
				</Link>
				<label className="form-label" htmlFor="password">Senha</label>
				<div className="input-group input-group-merge">
					<input
						placeholder="Sua senha..."
						{...formLogin.getFieldProps('password')}
						className={clsx(
							"form-control",
							{"is-invalid": formLogin.touched.password && formLogin.errors.password},
							{"is-valid": formLogin.touched.password && !formLogin.errors.password}
						)}
						type={ seePassword ? "text" : "password" }
						id="password"
						name="password"
						autoComplete="off"
					/>
					<div className="input-group-text" style={{ cursor: 'pointer' }} onClick={() => setSeePassword(!seePassword)}>
						<span className={`fa fa-fw ${seePassword ? 'fa-eye-slash' : 'fa-eye'}`}></span>
					</div>
				</div>
				{formLogin.touched.password && formLogin.errors.password && (
					<div className="d-block invalid-feedback">{ formLogin.errors.password }</div>
				)}
			</div>
			<div className="text-center d-grid">
				<button className="btn btn-primary" type="submit">Acessar</button>
			</div>
		</form>
		{/* end form */}

		{/* Footer */}
		<footer className="footer footer-alt">
			<p className="text-muted">
				Não tem uma conta?
				<Link to="/auth/register" className="text-muted ms-1">
					<b>Cadastre-se</b>
				</Link>
			</p>
		</footer>
	</>
}
export default Login;

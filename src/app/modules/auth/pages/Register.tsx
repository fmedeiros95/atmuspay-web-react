import { Link } from "react-router-dom";
import ComingSoon from "../../../components/ComingSoon";
import PageTitle from "../components/PageTitle";

const Register = () => {
	const maintenance = true;

	return <>
		{!maintenance ? (
			<>
				<PageTitle
					title="Cadastre-se"
					subtitle="Não tem uma conta? Crie sua conta, leva menos de um minuto"
				/>

				{/* Form */}
			</>
		) : <ComingSoon noBtn={ true } />}


		{/* Footer */}
		<footer className="footer footer-alt">
			<p className="text-muted">
				Já tem conta? <Link to="/auth/login" className="text-muted ms-1"><b>Acesse sua conta</b></Link>
			</p>
		</footer>
	</>
}
export default Register;

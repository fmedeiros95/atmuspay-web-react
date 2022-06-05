import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import logoDark from "../../../images/logo-light.png";
import logoLight from "../../../images/logo-light-2.png";

const Auth = () => {
	useEffect(() => {
		document.body.className = "auth-fluid-pages pb-0";
	}, []);

	return (
		<>
			<div className="auth-fluid">
				{/* Auth fluid left content */}
				<div className="auth-fluid-form-box">
					<div className="align-items-center d-flex h-100">
						<div className="card-body">
							{/* Logo */}
							<div className="auth-brand text-center text-lg-start">
								<div className="auth-logo">
									<Link to="/" className="logo logo-dark text-center">
										<span className="logo-lg">
											<img src={logoDark} alt="Logo" height="54" />
										</span>
									</Link>

									<Link to="/" className="logo logo-light text-center">
										<span className="logo-lg">
											<img src={logoLight} alt="Logo" height="54" />
										</span>
									</Link>
								</div>
							</div>

							<Outlet />
						</div>{/* end card-body */}
					</div>{/* end .align-items-center.d-flex.h-100 */}
				</div>{/* end auth-fluid-form-box */}

				{/* Auth fluid right content */}
				<div className="auth-fluid-right text-center">
					<div className="auth-user-testimonial">
						<h2 className="mb-3 text-white">I love the color!</h2>
						<p className="lead">
							<i className="mdi mdi-format-quote-open"></i> I've been using your theme from the previous developer for our web app,
							once I knew new version is out, I immediately bought with no hesitation.
							Great themes, good documentation with lots of customization available and sample app that really fit our need. <i className="mdi mdi-format-quote-close"></i>
						</p>
						<h5 className="text-white">
							- Fadlisaad (Ubold Admin User)
						</h5>
					</div>{/* end auth-user-testimonial */}
				</div>
				{/* end Auth fluid right content */}
			</div>
			{/* end auth-fluid */}
		</>
	);
}

export default Auth;

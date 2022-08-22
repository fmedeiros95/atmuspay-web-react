import clsx from "clsx";
import { Link, useNavigate } from "react-router-dom";

import logoIcon from "../../../../../images/logo-sm-light.png";
import logoDark from "../../../../../images/logo-light.png";
import logoLight from "../../../../../images/logo-light-2.png";

import flagBrazil from "../../../../../images/flags/brazil.jpg";

import useAuth from "../../../../hooks/useAuth";
import useLayout from "../../../../hooks/useLayout";
import { userAvatar, userFullName } from "../../../../helpers/UtilsHelper";
import { Container } from "react-bootstrap";
import SimpleBar from 'simplebar-react';

const Navbar = (): JSX.Element => {
	const nav = useNavigate();
	const { currentUser, logout } = useAuth();
	const { isMenuOpen, toggleMenu } = useLayout();

	const doLogout = (): void => {
		logout();
		nav("/auth");
	};

	const doToggleMenu = (): void => {
		toggleMenu(!isMenuOpen);
	};

	return (<>
		{/* <Navbar></Navbar> */}
		<div className="navbar-custom">
			<Container>
				<ul className="list-unstyled topnav-menu float-end mb-0">
					{ (currentUser?.admin.is_active && <li>
						<Link to="/admin/dashboard" className="nav-link arrow-none text-white text-uppercase">
							<b>Administração</b>
						</Link>
					</li>) }
					<li className="dropdown d-none d-lg-inline-block topbar-dropdown">
						<span className="nav-link dropdown-toggle arrow-none waves-effect waves-light" style={{ cursor: "pointer" }} data-bs-toggle="dropdown">
							<img src={flagBrazil} alt="Português do Brasil" height="16" />
						</span>
						<div className="dropdown-menu dropdown-menu-end">
							<span className="dropdown-item">
								<img src={flagBrazil} alt="Italy" className="me-1" height="12" />
								<span className="align-middle">Português do Brasil</span>
							</span>
						</div>
					</li>
					<li className="dropdown notification-list topbar-dropdown">
						<span className="nav-link dropdown-toggle nav-user me-0 waves-effect waves-light" style={{ cursor: "pointer" }} data-bs-toggle="dropdown">
							<img src={ userAvatar(currentUser?.avatar) } alt="" className="rounded" />
							<span className="pro-user-name ms-1">
								{ userFullName(currentUser?.name || '') } <i className="mdi mdi-chevron-down"></i>
							</span>
						</span>
						<div className="dropdown-menu dropdown-menu-end profile-dropdown">
							<div className="dropdown-header noti-title">
								<h6 className="text-overflow m-0">Bem-vindo!</h6>
							</div>
							<Link to="/account/user/profile" className="dropdown-item notify-item">
								<i className="fas fa-user fa-fw"></i>
								<span>Meus dados</span>
							</Link>
							<Link to="/account/user/address" className="dropdown-item notify-item">
								<i className="fas fa-map fa-fw"></i>
								<span>Meu endereço</span>
							</Link>
							<Link to="/account/user/address" className="dropdown-item notify-item">
								<i className="fas fa-wallet fa-fw"></i>
								<span>Minha carteira</span>
							</Link>
							<Link to="/account/api" className="dropdown-item notify-item">
								<i className="fas fa-key fa-fw"></i>
								<span>Chaves API</span>
							</Link>

							<div className="dropdown-divider"></div>
							<span className="dropdown-item notify-item" style={{ cursor: "pointer" }} onClick={() => doLogout()}>
								<i className="fe-log-out fa-fw"></i>
								<span>Desconectar</span>
							</span>
						</div>
					</li>
				</ul>

				{/* LOGO */}
				<div className="logo-box">
					<Link to="/" className="logo logo-dark text-center">
						<span className="logo-sm">
							<img src={ logoIcon } alt="" height="22" />
						</span>
						<span className="logo-lg">
							<img src={ logoDark } alt="" height="50" />
						</span>
					</Link>

					<Link to="/" className="logo logo-light text-center">
						<span className="logo-sm">
							<img src={ logoIcon } alt="" height="50" />
						</span>
						<span className="logo-lg">
							<img src={ logoLight } alt="" height="50" />
						</span>
					</Link>
				</div>

				{/* Mobile menu toggle (Horizontal Layout) */}
				<ul className="list-unstyled topnav-menu topnav-menu-left m-0">
					<li>
						<span
							className={clsx(
								"navbar-toggle nav-link",
								{ "open": isMenuOpen }
							)}
							onClick={ () => doToggleMenu() }
						>
							<div className="lines">
								<span></span>
								<span></span>
								<span></span>
							</div>
						</span>
					</li>
				</ul>
			</Container>
		</div>
	</>);
}

export default Navbar;

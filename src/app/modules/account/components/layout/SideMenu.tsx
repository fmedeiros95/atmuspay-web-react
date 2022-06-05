import { Link } from 'react-router-dom';
import userImage from '../../../../images/users/user-6.jpg'
import useAuth from '../../../../hooks/useAuth';

const SideMenu = (): JSX.Element => {
	const { currentUser } = useAuth();

	return (
		<div className="left-side-menu">
			<div className="h-100">
				{/* User box */}
				<div className="user-box text-center">
					<img src={userImage} alt="user-img" title="Mat Helme" className="rounded-circle avatar-md" />
					<span className="text-dark h5 mt-2 mb-1 d-block">{ currentUser?.name }</span>
					<p className="text-muted">{ currentUser?.email?.email }</p>
				</div>

				{/* Sidemenu */}
				<div id="sidebar-menu">
					<ul id="side-menu">
						<li className="menu-title">Menu Principal</li>
						<li>
							<Link to="/account/dashboard">
								<i className="fe-airplay"></i>
								<span>Dashboards</span>
							</Link>
						</li>
						<li>
							<a href="#sidebarPlans" data-bs-toggle="collapse" data-bs-target="#sidebarPlans">
								<i className="fe-package"></i>
								<span>Meu Plano</span>
							</a>
							<div className="collapse" id="sidebarPlans">
								<ul className="nav-second-level">
									<li>
										<a href="index.html">Adquirir/Upgrade</a>
									</li>
									<li>
										<a href="dashboard-2.html">Plano de Carreira</a>
									</li>
								</ul>
							</div>
						</li>
						<li>
							<a href="#sidebarWallet" data-bs-toggle="collapse" data-bs-target="#sidebarWallet">
								<i className="dripicons-wallet"></i>
								<span>Minha Carteira</span>
							</a>
							<div className="collapse" id="sidebarWallet">
								<ul className="nav-second-level">
									<li>
										<a href="index.html">Extrato Detalhado</a>
									</li>
									<li>
										<a href="dashboard-2.html">Plano de Carreira</a>
									</li>
								</ul>
							</div>
						</li>
					</ul>
				</div>
			</div>
		</div>
	)
}

export default SideMenu;

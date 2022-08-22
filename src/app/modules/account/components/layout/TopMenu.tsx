import clsx from "clsx";
import { Link } from "react-router-dom";
import useLayout from "../../../../hooks/useLayout";

const TopMenu = (): JSX.Element => {
	const { isMenuOpen } = useLayout();

	return (
		<>
			<div className="topnav">
				<div className="container">
                    <nav className="navbar navbar-light navbar-expand-lg topnav-menu">
                        <div
							className={clsx(
								"collapse navbar-collapse justify-content-centers",
								{ "show": isMenuOpen }
							)}
						>
							<ul className="navbar-nav d-nones">
								<li className="nav-item">
                                    <Link to="/account/dashboard" className="nav-link">
                                        <i className="fe-airplay me-1"></i>
										Dashboard
                                    </Link>
                                </li>
								<li className="nav-item dropdown">
                                    <span className="nav-link dropdown-toggle arrow-none" id="topnav-dashboard" role="button" data-bs-toggle="dropdown">
                                        <i className="fe-upload me-1"></i>
										Adicionar Saldo
										<div className="arrow-down"></div>
                                    </span>
                                    <div className="dropdown-menu">
										<Link to="/account/deposit/pix" className="dropdown-item">
											<i className="mdi mdi-qrcode me-1"></i> Depósito via PIX
										</Link>
										<Link to="/account/deposit/boleto" className="dropdown-item">
											<i className="mdi mdi-barcode me-1"></i> Depósito por Boleto
										</Link>
                                    </div>
                                </li>
								<li className="nav-item dropdown">
                                    <span className="nav-link dropdown-toggle arrow-none" id="topnav-dashboard" role="button" data-bs-toggle="dropdown">
                                        <i className="fe-download me-1"></i>
										Transferências
										<div className="arrow-down"></div>
                                    </span>
                                    <div className="dropdown-menu">
										<Link to="/account/transfer/account" className="dropdown-item">
											<i className="mdi mdi-account-switch me-1"></i> Entre Contas
										</Link>
										<Link to="/account/transfer/account" className="dropdown-item">
											<i className="mdi mdi-bank-transfer-in me-1"></i> Retirada DOC/TED
										</Link>
                                    </div>
                                </li>
								<li className="nav-item">
                                    <Link to="/account/transactions" className="nav-link">
                                        <i className="fe-list me-1"></i>
										Movimentações
                                    </Link>
                                </li>
								<li className="nav-item dropdown">
                                    <span className="nav-link dropdown-toggle arrow-none" id="topnav-dashboard" role="button" data-bs-toggle="dropdown">
                                        <i className="fe-dollar-sign me-1"></i>
										Serviços
										<div className="arrow-down"></div>
                                    </span>
                                    <div className="dropdown-menu">
										<Link to="/account/services/recharge-mobile" className="dropdown-item">
											<i className="fas fa-mobile-alt fa-fw me-1"></i> Recarga de Celular
										</Link>
										<Link to="/account/services/recharge-others" className="dropdown-item">
											<i className="fas fa-credit-card fa-fw me-1"></i> Outras Recargas
										</Link>
                                    </div>
                                </li>
								<li className="nav-item">
                                    <Link to="/account/cards" className="nav-link">
                                        <i className="mdi mdi-cards me-1"></i>
										Cartões
                                    </Link>
                                </li>
							</ul>
						</div>
					</nav>
				</div>
			</div>
		</>
	)
}

export default TopMenu;

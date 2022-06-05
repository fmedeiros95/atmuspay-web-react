import { useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import useLayout from "../../../../hooks/useLayout";
import WidgetCurrency from "../../components/WidgetCurrency";

const DepositPix = (): JSX.Element => {
	const { currentUser } = useAuth();
	const { setPageTitle } = useLayout();

	useEffect(() => {
		setPageTitle("Depósito via PIX");
	}, [ setPageTitle ]);

	return (
		<>
			<div className="row">
				<div className="col-md-12 col-xl-4">
					<div className="card card-body">
						<h5 className="card-title">Ao continuar você está ciente que:</h5>
						<p className="text-justify mb-0">
							<b>1 -</b> A chave gerada tem validade de 1 dia.<br />
							<b>2 -</b> Você não dele pagar após a validade!<br />
							<b>3 -</b> Temos um prazo de compensação de até 1 hora
						</p>
					</div>

					<div className="card card-body">
						<form action="#">
							<div className="form-group mb-3">
								<label htmlFor="amount" className="form-label">
									Qual a quantia que deseja adicionar?
								</label>
								<input type="text" id="amount" className="form-control" name="amount" />
							</div>
							<button type="submit" className="btn btn-block btn-success float-end">
								Gerar PIX
							</button>
						</form>
					</div>
				</div>
				<div className="col-md-12 col-xl-8">
					<div className="row">
						<div className="col-md-12 col-xl-6">
							<WidgetCurrency
								color="success"
								icon="fe-dollar-sign"
								value={ currentUser?.balance.balance }
								name="Disponível na conta"
							/>
						</div>
						<div className="col-md-12 col-xl-6">
							<WidgetCurrency
								color="warning"
								icon="fe-dollar-sign"
								value={ 0 }
								name="Pendente"
							/>
						</div>
					</div>

					<div className="card ribbon-box">
						<div className="card-body">
							<div className="ribbon ribbon-primary float-start text-uppercase">
								<i className="mdi mdi-format-list-text me-1"></i>
								Meus depósitos
							</div>
							<div className="ribbon-content">
								<div className="table-responsive">
									<table className="table table-borderless table-hover table-nowrap table-centered m-0">
										<thead className="table-light">
											<tr>
												<th className="text-center text-uppercase">Data</th>
												<th className="text-center text-uppercase" style={
													{ width: "10%" }
												}>Autenticação</th>
												<th className="text-center text-uppercase">Vencimento</th>
												<th className="text-center text-uppercase">Status</th>
												<th className="text-center text-uppercase">Valor</th>
												<th></th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="text-center">
													<div>20:15:46</div>
													<div>04/06/2022</div>
												</td>
												<td className="text-center text-truncate">e113f3fa-9fc9-4d54-b4f9-80a8309df5b0</td>
												<td className="text-center">20/10/2020</td>
												<td className="text-center text-uppercase text-success">Processada</td>
												<td className="text-center">R$ 100,00</td>
												<td className="text-center">
													<button type="button" className="btn btn-sm btn-primary">
														<i className="mdi mdi-qrcode-scan"></i>
													</button>
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default DepositPix;

/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import financeService from "../../../../services/FinanceService";
import TransferToUser from './types/TransferToUser';
import TransferFromUser from './types/TransferFromUser';
import useLayout from '../../../../hooks/useLayout';

const TransactionsList = (props?: any): JSX.Element => {
	const [ page, setPage ] = useState(1);
	const [ pages, setPages ] = useState(1);
	const [ transactions, setTransactions ] = useState<any[]>([]);

	const { toggleLoading } = useLayout()

	const getTransactions = async () => {
		try {
			toggleLoading(true);

			const { data } = await financeService.getTransactions();
			setTransactions(data.list);
			setPages(data.pageNumbers);
		} catch (err) {
			console.error(err);
		} finally {
			toggleLoading(false);
		}
	};

	const nextPage = async () => {
		if (page < pages) {
			setPage(page + 1);
			getTransactions();
		}
	};

	const prevPage = async () => {
		if (page > 1) {
			setPage(page - 1);
			getTransactions();
		}
	};

	useEffect(() => {
		getTransactions();

		// eslint-disable-next-line
	}, []);

	return (
		<>
			{ (props?.filters && <div className="d-flex justify-content-center justify-content-md-end">
				<form className="d-flex align-items-center mb-3">
					<div className="input-group input-group-sm">
						<select className="form-control form-control-sm">
							<option value="" selected>Filtrar por...</option>

							<option value="credit.ticket.recharge">Depósito via boleto</option>
							<option value="credit.pix.recharge">Depósito via PIX</option>
							<option value="transfer.to.user">Pagamento enviado</option>
							<option value="transfer.from.user">Pagamento recebido</option>
							<option value="withdrawal.bank">Retirada bancária</option>

							<option value="rate.ticket.recharge">Tarifa de depósito via boleto</option>
							<option value="rate.withdrawal.bank">Tarifa retirada bancária</option>
						</select>

						<button type="button" className="btn btn-blue">
							<i className="fa fa-filter fa-fw" />
						</button>
					</div>
				</form>
			</div>) }
			<div className="card ribbon-box">
				<div className="card-body">
					<div className="ribbon ribbon-primary float-start text-uppercase">
						<i className="mdi mdi-format-list-text me-1"></i>
						{ props?.title ?? 'Movimentações' }
					</div>
					<div className="ribbon-content">
						<div className="table-responsive">
							<table className="table table-borderless table-hover table-nowrap table-centered m-0">
								<thead className="table-light">
									<tr>
										<th className="text-center text-uppercase" colSpan={ 2 }>Informações</th>
										<th className="text-center text-uppercase">Movimentação</th>
										<th className="text-center text-uppercase">Autenticação</th>
										<th className="text-center text-uppercase">Status</th>
										<th className="text-center text-uppercase">Valor</th>
									</tr>
								</thead>
								<tbody>
									{transactions.map((transaction, key) => {
										return (
											(transaction?.type === 'transfer.to.user' && <TransferToUser key={ key } transaction={ transaction } />) ||
											(transaction?.type === 'transfer.from.user' && <TransferFromUser key={ key } transaction={ transaction } />)
										)
									})}
								</tbody>
							</table>
						</div>
					</div>
					{ (pages > 1 && <div className="float-end mt-2">
						<div className="btn-group">
							<button type="button" className="btn btn-secondary btn-sm" onClick={prevPage} disabled={page === 1}>
								<i className="mdi mdi-arrow-left" />
							</button>
							<button type="button" className="btn btn-secondary btn-sm" onClick={nextPage} disabled={page === pages}>
								<i className="mdi mdi-arrow-right" />
							</button>
						</div>
					</div>) }
				</div>
			</div>
		</>
	);
};

export default TransactionsList;

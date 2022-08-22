/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState } from 'react';
import financeService from "../../../../services/FinanceService";
import TransferToUser from './types/TransferToUser';
import TransferFromUser from './types/TransferFromUser';
import useLayout from '../../../../hooks/useLayout';
import { Button, ButtonGroup, Card, Table } from 'react-bootstrap';

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
			setPages(data.pages);
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
			<Card className="ribbon-box">
				<Card.Body>
					<div className="ribbon ribbon-primary float-start text-uppercase">
						<i className="mdi mdi-format-list-text me-1"></i>
						{ props?.title ?? 'Movimentações' }
					</div>
					<div className="ribbon-content">
						<Table responsive borderless hover className="table-nowrap table-centered m-0">
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
								{ transactions.map((transaction, key) => {
									return (
										(transaction?.type === 'transfer.to.user' && <TransferToUser key={ key } transaction={ transaction } />) ||
										(transaction?.type === 'transfer.from.user' && <TransferFromUser key={ key } transaction={ transaction } />)
									)
								}) }

								{ !transactions.length && <tr>
									<td colSpan={ 6 } className="text-center">
										<div className="text-muted">Nenhuma transação encontrada.</div>
									</td>
								</tr> }
							</tbody>
						</Table>
					</div>
					{ (pages > 1 && <div className="float-end mt-2">
						<ButtonGroup aria-label="Basic example">
							<Button variant="secondary" size="sm" onClick={prevPage} disabled={page === 1}>
								<i className="mdi mdi-arrow-left" />
							</Button>
							<Button variant="secondary" size="sm" onClick={nextPage} disabled={page === pages}>
								<i className="mdi mdi-arrow-right" />
							</Button>
						</ButtonGroup>
					</div>) }
				</Card.Body>
			</Card>
		</>
	);
};

export default TransactionsList;

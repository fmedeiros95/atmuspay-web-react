import { useEffect, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { currencyFormat, dateFormat } from "../../../../../helpers/UtilsHelper";
import useLayout from "../../../../../hooks/useLayout";
import financeService from "../../../../../services/FinanceService";

const DepositList = ({
	type,
	title
}: {
	type: string
	title?: string
}): JSX.Element => {
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [ page, setPage ] = useState(1);
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const [ pages, setPages ] = useState(1);
	const [ deposits, setDeposits ] = useState<any[]>([]);

	const { toggleLoading } = useLayout()

	const getDeposits = async () => {
		try {
			toggleLoading(true);

			const { data } = await financeService.getDeposits(type);
			setDeposits(data.list);
			setPages(data.pageNumbers);
		} catch (err) {
			console.error(err);
		} finally {
			toggleLoading(false);
		}
	}

	useEffect(() => {
		getDeposits();

		// eslint-disable-next-line
	}, []);


	return <Card className="ribbon-box">
		<Card.Body>
			<div className="ribbon ribbon-primary float-start text-uppercase">
				<i className="mdi mdi-format-list-text me-1"></i>
				{ title || `Meus depósitos` }
			</div>
			<div className="ribbon-content">
				<Table responsive borderless hover className="table-nowrap table-centered m-0">
					<thead className="table-light">
						<tr>
							<th className="text-center text-uppercase">Data</th>
							<th className="text-center text-uppercase">Autenticação</th>
							<th className="text-center text-uppercase">Vencimento</th>
							<th className="text-center text-uppercase">Status</th>
							<th className="text-center text-uppercase">Valor</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{deposits.map((deposit: any) => <tr>
							<td className="text-center">
								<div>{dateFormat(deposit.created_at, 'dataCurta')}</div>
								<div>{dateFormat(deposit.created_at, 'horaCompleta')}</div>
							</td>
							<td className="text-center text-truncate">{deposit.id}</td>
							<td className="text-center">{ dateFormat(deposit.due_at, 'dataCurta') }</td>
							<td className="text-center text-uppercase text-success">
								{deposit.status}
							</td>
							<td className="text-center">{currencyFormat(deposit.value)}</td>
							<td className="text-center">
								<button type="button" className="btn btn-sm btn-primary">
									<i className="mdi mdi-qrcode-scan" />
								</button>
							</td>
						</tr>)}

						{!deposits.length && <tr>
							<td colSpan={6} className="text-center">
								<div className="text-muted">Nenhum depósito encontrado</div>
							</td>
						</tr>}
					</tbody>
				</Table>
			</div>
		</Card.Body>
	</Card>;
}

export default DepositList;

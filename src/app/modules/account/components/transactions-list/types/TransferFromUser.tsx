import clsx from 'clsx';
import { currencyFormat, dateFormat, userAvatar } from '../../../../../helpers/UtilsHelper';
import { transactionStatus, transactionType } from '../../../../../helpers/TransactionHelper';

const TransferFromUser = ({ transaction }: any): JSX.Element => (
	<tr>
		<td style={{ width: '36px' }}>
		<img src={ userAvatar(transaction?.transfer?.send_from?.user) } alt="user-avatar" className="rounded avatar-sm" />
		</td>
		<td>
			<h5 className="m-0 fw-normal">
				{transaction?.transfer?.send_from?.name}
			</h5>
			<p className="mb-0 text-muted">
				<small>@{transaction?.transfer?.send_from?.user}</small>
			</p>
		</td>
		<td className="text-center text-uppercase">
			{ transactionType(transaction.type) }
		</td>
		<td className="text-center">{ transaction?._id }</td>
		<td className="text-center text-uppercase text-success">
			{ transactionStatus(transaction.status) }
		</td>
		<td className="text-end">
			<div className={ clsx(
				{ 'text-success': transaction.value > 0 },
				{ 'text-danger': transaction.value < 0 }
			) }>{ currencyFormat(transaction.value) }</div>
			<div>{ dateFormat(transaction.created_at, 'diaHoraCurto') }</div>
		</td>
	</tr>
);

export default TransferFromUser;

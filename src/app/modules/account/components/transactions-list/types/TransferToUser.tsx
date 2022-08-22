import clsx from 'clsx';
import { currencyFormat, dateFormat, userAvatar } from '../../../../../helpers/UtilsHelper';
import { transactionStatus, transactionType } from '../../../../../helpers/TransactionHelper';
import { formatCpfCnpj } from '../../../../../helpers/DocumentHelper';

const TransferToUser = ({transaction}: any): JSX.Element => (
	<tr>
		<td style={{width: '36px'}}>
			<img src={userAvatar(transaction?.transfer?.send_to?.avatar)} alt="user-avatar" className="rounded avatar-sm" />
		</td>
		<td>
			<h5 className="m-0 fw-normal">
				{transaction?.transfer?.send_to?.name}
			</h5>
			<p className="mb-0 text-muted">
				<small>{formatCpfCnpj(transaction?.transfer?.send_to?.document?.document)}</small>
			</p>
		</td>
		<td className="text-center text-uppercase">
			{transactionType(transaction.type)}
		</td>
		<td className="text-center">{transaction?.id}</td>
		<td className="text-center text-uppercase text-success">
			{transactionStatus(transaction.status)}
		</td>
		<td className="text-end">
			<div className={clsx(
				{'text-success': transaction.value > 0},
				{'text-danger': transaction.value < 0}
			)}>{currencyFormat(transaction.value)}</div>
			<div>{dateFormat(transaction.created_at, 'diaHoraCurto')}</div>
		</td>
	</tr>
);

export default TransferToUser;

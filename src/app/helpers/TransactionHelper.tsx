const transactionType = (value: string): string => {
	switch (value) {
		case 'withdrawal.bank':
			return 'TED bancária';
		case 'rate.withdrawal.bank':
			return 'Tarifa TED bancária';
		case 'transfer.to.user':
			return 'Pagto. enviado';
		case 'transfer.from.user':
			return 'Pagto. recebido';
		case 'credit.ticket.recharge':
			return 'Depósito via boleto';
		case 'debit.rate.ticket.recharge':
			return 'Tarifa de depósito via boleto';
		case 'debit.manual':
			return 'Débito Manual';
		case 'transfer.from.credit.card':
			return 'Depósito via cartão de crédito'
		case 'debit.monthly.payment':
			return 'Mensalidade da Conta'
		case 'credit.ticket.invoice':
			return 'Cobrança via boleto';
		case 'debit.rate.ticket.invoice':
			return 'Tarifa de cobrança via boleto';
		case 'debit.rate.ticket.invoice.emission':
			return 'Taxa de emissão de boleto de cobrança';
		case 'debit.recharge.cellphone':
			return 'Recarga telefônica';
		case 'debit.service.pin':
			return 'Gift card';
		case 'credit.withdrawal.return':
			return 'Retirada devolvida';
		case 'lock.user.value':
			return 'Valor Bloqueado';
		case 'unlock.user.value':
			return 'Valor Desbloqueado';
		default:
			return value;
	}
}

const transactionStatus = (value: string): string => {
	switch (value) {
		case 'processed':
			return 'Processada';
		case 'pending':
			return 'Pendente';
		case 'error':
			return 'Erro';
		case 'generated-file':
			return 'Processando';
		case 'processing':
			return 'Processando';
		case 'reversed':
			return 'Estornada';
		case 'canceled':
			return 'Cancelada';
		default:
			return value;
	}
}

export {
	transactionType,
	transactionStatus
}

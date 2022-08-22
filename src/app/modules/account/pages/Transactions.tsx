import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useLayout from "../../../hooks/useLayout";
import TransactionsList from "../components/transactions-list/TransactionsList";
import WidgetBalance from "../components/WidgetBalance";

const Transactions = (): JSX.Element => {
	const { currentUser } = useAuth();
	const { setPageTitle } = useLayout();

	useEffect(() => {
		setPageTitle("Movimentações");
	}, [ setPageTitle ]);

	return <>
		<WidgetBalance balance={ currentUser?.balance } />
		<TransactionsList filters={ true } />
	</>;
}

export default Transactions;

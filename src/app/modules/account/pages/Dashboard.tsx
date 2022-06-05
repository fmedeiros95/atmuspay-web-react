import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useLayout from "../../../hooks/useLayout";
import TransactionsList from "../components/transactions-list/TransactionsList";
import WidgetBalance from "../components/WidgetBalance";

const Dashboard = (): JSX.Element => {
	const { currentUser } = useAuth();
	const { setPageTitle } = useLayout();

	useEffect(() => {
		setPageTitle("Dashboard");
	}, [ setPageTitle ]);

	return (
		<>
			<WidgetBalance balance={ currentUser?.balance } />
			<TransactionsList title="Movimentação do dia" />
		</>
	);
};

export default Dashboard

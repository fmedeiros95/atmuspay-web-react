import { Routes, Route, Navigate } from 'react-router-dom';
import Account from './Account';
import PageNotFound from './pages/PageNotFound';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import DepositPix from './pages/deposit/DepositPix';
import DepositBoleto from './pages/deposit/DepositBoleto';
import TransferAccount from './pages/transfer/TransferAccount';
import TransferBank from './pages/transfer/TransferBank';
import RechargeMobile from './pages/services/RechargeMobile';
import RechargeOthers from './pages/services/RechargeOthers';
import Cards from './pages/Cards';
import ComingSoon from '../../components/ComingSoon';

const AccountRoutes = (): JSX.Element => (
	<Routes>
		<Route element={<Account />}>
			<Route path="/" element={<Navigate to="dashboard" />} />
			<Route path="dashboard" element={<Dashboard />} />
			<Route path="deposit">
				<Route path="pix" element={<DepositPix />} />
				<Route path="boleto" element={<DepositBoleto />} />
			</Route>
			<Route path="transfer">
				<Route path="account" element={<TransferAccount />} />
				<Route path="bank" element={<TransferBank />} />
			</Route>
			<Route path="transactions" element={<Transactions />} />
			<Route path="services">
				<Route path="recharge-mobile" element={<RechargeMobile />} />
				<Route path="recharge-others" element={<RechargeOthers />} />
			</Route>
			<Route path="cards" element={<Cards />} />
			<Route path="user" element={<ComingSoon />} />
			<Route path="api" element={<ComingSoon />} />
			<Route path="*" element={<PageNotFound />} />
		</Route>
	</Routes>
);

export default AccountRoutes;

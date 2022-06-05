import WidgetCurrency from "./WidgetCurrency";

const WidgetBalance = ({ balance }: any): JSX.Element => {
	return (
		<div className="row">
			<div className="col-md-12 col-xl-4">
				<WidgetCurrency
					color="success"
					icon="fe-dollar-sign"
					value={ balance?.balance }
					name="Disponível na conta"
				/>
			</div>
			<div className="col-md-6 col-xl-4">
				<WidgetCurrency
					color="warning"
					icon="fe-dollar-sign"
					value={ balance?.balance_future }
					name="A receber"
				/>
			</div>
			<div className="col-md-6 col-xl-4">
				<WidgetCurrency
					color="primary"
					icon="fe-dollar-sign"
					value={ balance?.balance + balance?.balance_future }
					name="Total"
				/>
			</div>
		</div>
	);
};

export default WidgetBalance;

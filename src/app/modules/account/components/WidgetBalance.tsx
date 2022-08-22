import { Col, Row } from "react-bootstrap";
import WidgetCurrency from "./WidgetCurrency";

const WidgetBalance = ({ balance }: any): JSX.Element => {
	return <Row>
		<Col md={ 12 } xl={ 4 }>
			<WidgetCurrency
				color="success"
				icon="fe-dollar-sign"
				value={ balance?.balance }
				name="Disponível na conta"
			/>
		</Col>
		<Col md={ 12 } xl={ 4 }>
			<WidgetCurrency
				color="warning"
				icon="fe-dollar-sign"
				value={ balance?.balance_future }
				name="A receber"
			/>
		</Col>
		<Col md={ 12 } xl={ 4 }>
			<WidgetCurrency
				color="primary"
				icon="fe-dollar-sign"
				value={ balance?.balance + balance?.balance_future }
				name="Total"
			/>
		</Col>
	</Row>;
};

export default WidgetBalance;

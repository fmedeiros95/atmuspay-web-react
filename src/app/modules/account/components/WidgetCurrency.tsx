import { Card, Col, Row } from "react-bootstrap";
import CountUp from 'react-countup';

const WidgetCurrency = (
	{ color, icon, value, name }: any
): JSX.Element => {
	return <Card className="widget-rounded-circle">
		<Card.Body>
			<Row>
				<Col xs={ 6 }>
					<div className={ `avatar-lg rounded-circle bg-soft-${color} border-${color} border` }>
						<i className={ `${icon} font-22 avatar-title text-${color}` }></i>
					</div>
				</Col>
				<Col xs={ 6 }>
					<div className="text-end">
						<h3 className="text-dark mt-1">
							<span>
								<CountUp
									separator="."
									decimals={2}
									decimal=","
									prefix="R$ "
									duration={1}
									end={value / 100}
								/>
							</span>
						</h3>
						<p className="text-muted mb-1 text-truncate text-uppercase">{ name }</p>
					</div>
				</Col>
			</Row>
		</Card.Body>
	</Card>;
}

export default WidgetCurrency;

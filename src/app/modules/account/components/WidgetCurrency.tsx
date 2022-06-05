import { currencyFormat } from "../../../helpers/UtilsHelper";

const WidgetCurrency = (
	{ color, icon, value, name }: any
): JSX.Element => {
	return (<>
		<div className="widget-rounded-circle card">
			<div className="card-body">
				<div className="row">
					<div className="col-6">
						<div className={ `avatar-lg rounded-circle bg-soft-${color} border-${color} border` }>
							<i className={ `${icon} font-22 avatar-title text-${color}` }></i>
						</div>
					</div>
					<div className="col-6">
						<div className="text-end">
							<h3 className="text-dark mt-1">{ currencyFormat(value) }</h3>
							<p className="text-muted mb-1 text-truncate text-uppercase">{ name }</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	</>)
}

export default WidgetCurrency;

import Swal from 'sweetalert2';
import { useFormik } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import InputCurrency from "../../../../components/InputCurrency";
import useAuth from "../../../../hooks/useAuth";
import useLayout from "../../../../hooks/useLayout";
import WidgetCurrency from "../../components/WidgetCurrency";
import validatorHelper from "../../../../helpers/ValidatorHelper";
import DepositList from "./components/DepositList";
import { currencyFormat } from "../../../../helpers/UtilsHelper";
import financeService from "../../../../services/FinanceService";

const depositSchema = validatorHelper.object().shape({
	// Amount: R$ 0,00
	amount: validatorHelper.number()
		.min(10, "O valor mínimo de depósito é de R$ 10,00")
		.max(10000, "O valor máximo de depósito é de R$ 10.000,00")
		.required("Informe o valor do depósito")
});

const DepositPix = (): JSX.Element => {
	const { currentUser } = useAuth();
	const { setPageTitle, toggleLoading } = useLayout();

	useEffect(() => {
		setPageTitle("Depósito via PIX");
	}, [ setPageTitle ]);

	const formDeposit = useFormik({
		initialValues: {
			amount: 0,
		},
		validationSchema: depositSchema,
		onSubmit: async (values) => {
			// Confirmar solicitação de depósito
			Swal.fire({
				icon: 'warning',
				title: 'Confirmar depósito',
				html: `Deseja confirmar o depósito de ${currencyFormat(values.amount * 100)}?`,
				showCancelButton: true,
				confirmButtonColor: '#0eac5d',
				cancelButtonColor: '#f35d5d',
				confirmButtonText: 'Sim, confirmar!',
				cancelButtonText: 'Cancelar',
				allowOutsideClick: false,
			}).then(async (result: any) => {
				if (result.isConfirmed) {
					toggleLoading(true);

					try {
						const login = await financeService.makeDeposit('pix', {
							amount: values.amount * 100
						});

						toast.success(login.data.message.message);
					} catch (err: any) {
						console.error(err);
					} finally {
						toggleLoading(false);
					}
				}
			})
		}
	});


	const handleChange = (e: any, value: any, normalizedValue: any) => {
		e.preventDefault();

		formDeposit.setFieldValue("amount", normalizedValue);
	};

	return <Row>
		<Col md={12} xl={4}>
			<Card>
				<Card.Body>
					<h5 className="card-title">Ao realizar um depósito, você esta ciente que:</h5>
					<ul className="list-unstyled">
						<li>• Lorem ipsum dolor sit amet</li>
						<li>• Consectetur adipiscing elit</li>
						<li>• Integer molestie lorem at massa</li>
						<li>• Facilisis in pretium nisl aliquet</li>
					</ul>
				</Card.Body>
			</Card>

			<Card>
				<Card.Body>
					<Form onSubmit={formDeposit.handleSubmit}>
						<Form.Group className="mb-3">
							<Form.Label htmlFor="amount">Valor do depósito:</Form.Label>
							<InputCurrency
								placeholder="R$ 0,00"
								{...formDeposit.getFieldProps('amount')}
								isInvalid={formDeposit.touched.amount && !!formDeposit.errors.amount}
								isValid={formDeposit.touched.amount && !formDeposit.errors.amount}
								type="text"
								id="amount"
								name="amount"
								onChange={ handleChange }
							/>
							{formDeposit.touched.amount && formDeposit.errors.amount && (
								<Form.Control.Feedback type="invalid">{formDeposit.errors.amount}</Form.Control.Feedback>
							)}
						</Form.Group>
						<Button type="submit" variant="success" className="float-end">
							Gerar PIX
						</Button>
					</Form>
				</Card.Body>
			</Card>
		</Col>

		<Col md={12} xl={8}>
			<Row>
				<Col md={12} xl={6}>
					<WidgetCurrency
						color="success"
						icon="fe-dollar-sign"
						value={ currentUser?.balance.balance }
						name="Disponível na conta"
					/>
				</Col>
				<Col md={12} xl={6}>
					<WidgetCurrency
						color="warning"
						icon="fe-dollar-sign"
						value={ 0 }
						name="Pendente"
					/>
				</Col>
			</Row>

			<DepositList type={ `pix` } title={ `Depósitos via PIX` } />
		</Col>
	</Row>;
}

export default DepositPix;

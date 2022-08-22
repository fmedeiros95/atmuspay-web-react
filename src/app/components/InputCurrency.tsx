import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { currencyFormat, normalizeValue } from "../helpers/UtilsHelper";

const InputCurrency = ({
	value,
	onChange,
	decimals = 2,
	currency = "BRL",
	...props
}: {
	value: string | number;
	onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string, normalizedValue: number) => void;
	decimals?: number;
	currency?: string;
	[key: string]: any;
}): JSX.Element => {
	const [ inputValue, setInputValue ] = useState<string>("0");

	useEffect(() => {
		// Accept only digits and convert to number and format to currency
		const safeValue: number = Number(inputValue.replace(/\D/g, ""));
		const formattedValue = currencyFormat(safeValue, currency, decimals);

		setInputValue(formattedValue);

		// eslint-disable-next-line
	}, [ currency, decimals, inputValue ]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;

		const safeValue: number = Number(value.replace(/\D/g, ""));
		const formattedValue = currencyFormat(safeValue, currency, decimals);

		setInputValue(value);

		onChange(e, formattedValue, normalizeValue(formattedValue, decimals));
	}

	return <Form.Control
		{ ...props }
		value={ inputValue }
		onChange={ handleChange }
	/>;
}

export default InputCurrency;

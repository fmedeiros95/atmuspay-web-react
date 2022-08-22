import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { formatCpfCnpj } from "../helpers/DocumentHelper";
import { onlyDigits } from "../helpers/UtilsHelper";

const InputDocument = ({
	value,
	onChange,
	...props
}: {
	value?: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string, normalizedValue: string) => void;
	[key: string]: any;
}): JSX.Element => {
	const [ inputValue, setInputValue ] = useState<string>(value || "");

	useEffect(() => {
		const formattedValue = formatCpfCnpj(inputValue);
		setInputValue(formattedValue);

		// eslint-disable-next-line
	}, [ inputValue ]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedValue = formatCpfCnpj(e.target.value);

		setInputValue(e.target.value);
		onChange(e, formattedValue, onlyDigits(formattedValue));
	}

	return <Form.Control
		{ ...props }
		value={ inputValue }
		onChange={ handleChange }
	/>;
};

export default InputDocument;

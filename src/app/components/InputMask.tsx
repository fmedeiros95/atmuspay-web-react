import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { applyMask, onlyDigits } from "../helpers/UtilsHelper";

const InputMask = ({
	value,
	mask,
	onChange,
	...props
}: {
	value?: string;
	mask: string;
	onChange: (event: React.ChangeEvent<HTMLInputElement>, value: string, normalizedValue: string) => void;
	[key: string]: any;
}): JSX.Element => {
	const [ inputValue, setInputValue ] = useState<string>(value || "");

	useEffect(() => {
		const formattedValue = applyMask(onlyDigits(inputValue).slice(0, onlyDigits(mask).length), mask);
		setInputValue(formattedValue);

		// eslint-disable-next-line
	}, [ inputValue ]);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const formattedValue = applyMask(onlyDigits(e.target.value).slice(0, onlyDigits(mask).length), mask);

		setInputValue(e.target.value);
		onChange(e, formattedValue, onlyDigits(formattedValue));
	}

	return <Form.Control
		{ ...props }
		value={ inputValue }
		onChange={ handleChange }
	/>;

}

export default InputMask;

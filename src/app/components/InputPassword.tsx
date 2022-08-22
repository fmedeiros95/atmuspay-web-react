import { useState } from "react";
import { Form, InputGroup } from "react-bootstrap";

const InputPassword = ({
	...props
}: {
	[key: string]: any;
}): JSX.Element => {
	const [ seePassword, setSeePassword ] = useState(false);

	return <InputGroup className="input-group-merge">
		<Form.Control
			{ ...props }
			type={ seePassword ? "text" : "password" }
			placeholder="••••••••"
		/>
		<InputGroup.Text style={{ cursor: 'pointer' }} onClick={() => setSeePassword(!seePassword)}>
			<i className={`fa fa-fw ${seePassword ? 'fa-eye-slash' : 'fa-eye'}`} />
		</InputGroup.Text>
	</InputGroup>
}

export default InputPassword;

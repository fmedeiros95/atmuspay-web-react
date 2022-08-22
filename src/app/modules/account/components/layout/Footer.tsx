import { Col, Container, Row } from "react-bootstrap";

const Footer = (): JSX.Element => (
	<footer className="footer">
		<Container>
			<Row>
				<Col md={6}>
					&copy;2022 - <b>AtmusPay</b> | Todos os direitos reservados
				</Col>
				<Col md={6}>
					<div className="text-md-end footer-links d-none d-sm-block">
						<a href="https://google.com" target="_blank" rel="noreferrer">Documentação</a>
					</div>
				</Col>
			</Row>
		</Container>
	</footer>
);

export default Footer;

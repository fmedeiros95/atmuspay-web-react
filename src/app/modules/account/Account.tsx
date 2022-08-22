import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import useLayout from "../../hooks/useLayout";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import TopMenu from "./components/layout/TopMenu";
import PageTitleBox from "./components/PageTitleBox";

const Account = (): JSX.Element => {
	const location = useLocation();
	const { pageTitle } = useLayout();

	const data = [{
		title: "Account"
	}];

	// find and remove account from array
	const index = data.findIndex(item => item.title === pageTitle);
	if (index > -1) {
		data.splice(index, 1);
	}


	useEffect(() => {
		document.body.className = "";
	}, [ location ]);

	return (
		<div id="wrapper">
			<Navbar />
			<TopMenu />

			<div className="content-page">
				<div className="content">
					<Container>
						<PageTitleBox title={ pageTitle } />
						<Outlet />
					</Container>
				</div>

				<Footer />
			</div>
		</div>
	);
}

export default Account;

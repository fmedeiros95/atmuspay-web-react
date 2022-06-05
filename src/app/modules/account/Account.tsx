import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import useLayout from "../../hooks/useLayout";

import Footer from "./components/layout/Footer";
import Navbar from "./components/layout/Navbar";
import TopMenu from "./components/layout/TopMenu";
import PageTitleBox from "./components/PageTitleBox";

const Account = (): JSX.Element => {
	const location = useLocation();
	const { pageTitle } = useLayout();

	useEffect(() => {
		document.body.className = "";
		console.log(location);
	}, [ location ]);

	return (
		<div id="wrapper">
			<Navbar />
			<TopMenu />

			<div className="content-page">
				<div className="content">
					<div className="container">
						<PageTitleBox title={ pageTitle } />
						<Outlet />
					</div>
				</div>

				<Footer />
			</div>
		</div>
	);
}

export default Account;

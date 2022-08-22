const PageTitleBox = (
	props?: any
): JSX.Element => {
	return <div className="page-title-box">
		{/* <div className="page-title-right"></div> */}
		<h4 className="page-title">{ props?.title }</h4>
	</div>;
}

export default PageTitleBox;

const PageTitle = ({ title, subtitle }: any): JSX.Element => (
	<>
		<h4 className="mt-0">{ title }</h4>
		<p className="text-muted mb-4">{ subtitle }</p>
	</>
);

export default PageTitle;

import useLayout from '../../hooks/useLayout';
import style from './Loader.module.scss';

const Loader = (): JSX.Element => {
	const { loading } = useLayout();

	return (loading ?
		<div className={ style.loader }>
			<div className={ style.spinner } />
		</div> : <></>
	);
}
export default Loader;

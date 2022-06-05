import { createContext, Dispatch, SetStateAction, useState } from "react";

type LayoutContextProps = {
	isMenuOpen: boolean;
	toggleMenu: Dispatch<SetStateAction<boolean>>;
	loading: boolean;
	toggleLoading: Dispatch<SetStateAction<boolean>>;

	pageTitle: string;
	setPageTitle: Dispatch<SetStateAction<string>>;
}

const LayoutContext = createContext<LayoutContextProps>({
	isMenuOpen: false,
	toggleMenu: () => {},
	loading: false,
	toggleLoading: () => {},
	pageTitle: "",
	setPageTitle: () => {}
});

const LayoutProvider = ({ children }: any): JSX.Element => {
	const [ isMenuOpen, toggleMenu ] = useState<any>(false);
	const [ loading, toggleLoading ] = useState<any>(false);
	const [ pageTitle, setPageTitle ] = useState<string>("");

	return (
		<LayoutContext.Provider value={{ isMenuOpen, toggleMenu, loading, toggleLoading, pageTitle, setPageTitle }}>
			{ children }
		</LayoutContext.Provider>
	)
}

export {
	LayoutContext,
	LayoutProvider
};

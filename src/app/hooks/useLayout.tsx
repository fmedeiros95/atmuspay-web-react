import { useContext } from "react";
import { LayoutContext } from "../contexts/LayoutContext";

const useLayout = () => {
	return useContext(LayoutContext)
}

export default useLayout;

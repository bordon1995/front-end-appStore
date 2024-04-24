import { useContext } from "react";
import AppProvaiderContext from "../context/AppProvaider";

const useApp = () => {
  return useContext(AppProvaiderContext);
};

export default useApp;

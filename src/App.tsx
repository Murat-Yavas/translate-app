import { useEffect } from "react";
import "./App.css";
import Translate from "./components/Translate/Translate";
import { getLanguages } from "./redux/apiCall";
import { useAppDispatch } from "./redux/store";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getLanguages(dispatch);
  }, [dispatch]);

  return (
    <>
      <Translate />
    </>
  );
}

export default App;

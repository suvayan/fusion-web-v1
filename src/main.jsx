import "./index.css";
import {Suspense} from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import {Provider} from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import {store, persistor} from "./store";
import CustomToastContainer from "./components/toastify/Toastify";
import PageLoader from "@/components/loader/PageLoader";


const root = createRoot(document.querySelector("#root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Suspense fallback={<PageLoader />}>
        <App />
      </Suspense>
      <CustomToastContainer />
    </PersistGate>
  </Provider>,
)

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QuerWrapper } from "./shared/queryWrapper";
import store from "./feature/store";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QuerWrapper>
        <App />
        <ToastContainer position="top-right" autoClose={3000} />
      </QuerWrapper>
    </Provider>
  </StrictMode>,
);

import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { CardProvider } from "./context/CardContext";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CardProvider>
    <App />
  </CardProvider>
);

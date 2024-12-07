import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js"

import App from "./App.tsx";
import './index.css'
import { Provider } from "./provider.tsx";
import "@/styles/globals.css";



ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <BrowserRouter>
      <Provider>
        <App />
      </Provider>
    </BrowserRouter>
);

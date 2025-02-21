import { Provider } from "react-redux";
import "./App.css";
import { AppRouter } from "./routes/app-route";
import axios from "axios";
import { environment } from "./environments/environment";
import { store } from "./store";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function App() {

  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration (in ms)
      once: true, // Animation will only happen once
    });
  }, []);

  // Set up Axios default configuration
  axios.defaults.baseURL = `${environment.apiPort}`;
  axios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("userToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  return (
    <div>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </div>
  );
}

export default App;

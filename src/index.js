import react from "react";
import reactDom from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import store from "./app/store";
import { AuthContextProvider } from "./context/AuthContext";

//

reactDom.render(
  <Provider store={store}>
    <AuthContextProvider>
      <App />
    </AuthContextProvider>
  </Provider>,
  document.getElementById("root")
);

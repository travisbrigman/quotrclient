import { Route, Redirect } from "react-router-dom";
import { ResponsiveContext } from "grommet";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { Home } from "./components/Home";

export const App = () => {
  return (
    <ResponsiveContext.Consumer>
          {(size) => (<>
        <Route exact path="/home" render={(props, size) => <Home {...props} />} />

        <Route
          path="/login"
          render={(props) => {
            if (localStorage.getItem("quotr_user_id")) {
              return <Redirect to="/home" />;
            } else {
              return <Login {...props} />;
            }
          }}
        />

        <Route
          path="/register"
          render={(props) => {
            if (localStorage.getItem("quotr_user_id")) {
              return <Redirect to="/home" />;
            } else {
              return <Register {...props} />;
            }
          }}
        />
        </>)}
    </ResponsiveContext.Consumer>
  );
}


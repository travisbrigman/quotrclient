
import { Route, Redirect } from "react-router-dom";
import { App } from "./App";
import { Login } from "./components/auth/Login";
import { Register } from "./components/auth/Register";
import { AppRoot } from "./components/Structure/AppRoot";
import { UserProvider } from "./components/Users/UserProvider";



export const Quotr = () => {


return (
<>

<UserProvider>
      <Route
        render={() => {
          if (localStorage.getItem("quotr_user_id")) {
            return (
              <>
                {/* <Route render={(props) => <App {...props} />} /> */}
                <Route render={(props) => <AppRoot {...props} />} />
              </>
            );
          } else {
            return <Redirect to="/login" />;
          }
        }}
      />
    </UserProvider>
<Route
path="/login"
render={(props) => {
  if (localStorage.getItem("quotr_user_id")) {
    return <Redirect to="/" />;
  } else {
    return <Login {...props} />;
  }
}}
/>

<Route
path="/register"
render={(props) => {
  if (localStorage.getItem("quotr_user_id")) {
    return <Redirect to="/" />;
  } else {
    return <Register {...props} />;
  }
}}
/>
</>
)

}



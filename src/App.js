import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import UserStoreProvider from "./context/UserContext";

function App() {
  return (
    <div className="App">
      <UserStoreProvider>
       <Router>
        <NavBar />
         <Switch>
        <Route path="/" exact>
            <HomePage />
        </Route>
        <Route path="/login">
            <LoginPage />
        </Route>  
        </Switch>
       </Router>
      </UserStoreProvider>
    </div>
  );
}

export default App;

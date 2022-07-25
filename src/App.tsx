import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./Routes/Home";
import Header from "./Routes/Components/Header";


function App() {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path={["/", "/userSearch", "/userSearch/:nickName"]}> 
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

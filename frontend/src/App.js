import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from './components/LoginForm'
import Apartement from './components/Appartement';
import AddAppartement from './components/AddAppartement'
import UpdateAppartement from './components/UpdateAppartement'



function App()
{
  return (
    <div className="App">

      <>
        <BrowserRouter>
          <Switch>

            <Route exact path="/">
              <LoginPage />
            </Route>
            <Route exact path="/apartement" component={Apartement} />
            {/* Nested Routes for Apartement */}
            <Route exact path="/apartement/add" component={AddAppartement} />
            <Route exact path="/apartement/update/:apartmentId/:etage/:number/:owner" component={UpdateAppartement} />

          </Switch>
        </BrowserRouter>
      </>

    </div>
  );
}

export default App;

import { BrowserRouter, Switch, Route } from "react-router-dom";
import LoginPage from './components/LoginForm'
import  Apartement from './components/Appartement';



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

            <Route exact path="/apartement">
              <Apartement/>
            </Route>
          </Switch>


        </BrowserRouter>
      </>

    </div>
  );
}

export default App;

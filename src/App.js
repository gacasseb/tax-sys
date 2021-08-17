import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { message } from 'antd';

import Layout from './components/Layout';
import Pessoa from './views/Pessoa';
import Empresa from './views/Empresa';
import Rendimento from './views/Rendimento';
import ConsultarRendimento from './views/ConsultarRendimento';
import ConsultarEmpresa from './views/ConsultarEmpresa';

function App() {
  return (
    <BrowserRouter>
      <Switch>
          <Layout>
              <Route exact path='/pessoa'>
                <Pessoa></Pessoa>
              </Route>
              <Route exact path='/empresa'>
                <Empresa></Empresa>
              </Route>
              <Route exact path='/rendimento'>
                <Rendimento></Rendimento>
              </Route>
              <Route exact path='/consultar-rendimento'>
                <ConsultarRendimento></ConsultarRendimento>
              </Route>
              <Route exact path='/consultar-empresa'>
                <ConsultarEmpresa></ConsultarEmpresa>
              </Route>
          </Layout>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

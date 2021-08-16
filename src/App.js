import './App.css';
import 'antd/dist/antd.css';

import { message } from 'antd'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <a onClick={ _ => message.success('alou!')}>Entrou!</a>
      </header>
    </div>
  );
}

export default App;

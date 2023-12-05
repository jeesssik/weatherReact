import logo from './logo.svg';
import './App.css';
import Main from './screen/main';
//importo el provider mdel context
import ClimaProvider from './context/ClimaContext';


function App() {
  return (
    <div className="App">
      <ClimaProvider>
        <Main/>
      </ClimaProvider>
    </div>
  );
}

export default App;

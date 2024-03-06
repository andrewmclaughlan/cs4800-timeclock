import './App.css';
import { MainScreen } from './mainscreen.jsx';
import { channels } from './shared/constants.js';
const { ipcRenderer } = window.require('electron');
function App() {
  const getData = () => ipcRenderer.send(channels.GET_DATA, {product: 'test'})
  return (
    <div className="App">
      <MainScreen />
      <button onClick={getData}>Test</button>
    </div>
  );
}

export default App;

import './App.css';
import Home from './components/Home';

function App() {
  const test = () =>{
    fetch('http://localhost:5000/test')
    .then((response) => response.json())
    .then((data) => console.log(data))
  }
  return (
    <div className="App">
      <div className="headerSection">
        <div>
          <h1>Google Big Query/ Snow Flake connector</h1> 
        </div>
      </div>

      <Home />
    </div>
  );
}

export default App;




// login url:  https://kebstfb-ue47928.snowflakecomputing.com
// user name: venkateshmorishetti
// password: Chintu@97

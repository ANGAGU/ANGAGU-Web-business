import {ProductPage} from './page/index'
import {Route, Link} from 'react-router-dom';
import './App.css';


function App() {
  return (
    <div className="App">
      <Link to="/product">product</Link>
      <Route path="/product" component={ProductPage}></Route>
    </div>
  );
}

export default App;

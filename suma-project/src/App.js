import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import UserList from './UserList';
import UserCreate from './UserCreate';
import UserDetails from './UserDetails';

function App() {
  return (
    <div className="App">
      <h1>  </h1>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<UserList/>}></Route>
    <Route path='/user/create' element={<UserCreate/>}></Route>
    <Route path='/user/details/:userid' element={<UserDetails/>}></Route>

  </Routes>
  </BrowserRouter>
    </div>
  );
}

export default App;

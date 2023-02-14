import './App.css';
import { Nav } from './components/Nav';
import Footer from './components/Footer'; 
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import {SignUp} from './components/SignUp';
import { PrivateComponent } from './components/PrivateComponent';
import { Login } from './components/Login';
import { AddProduct } from './components/AddProduct';
import {ProductList} from './components/ProductList'
import { UpdateProduct } from './components/UpdateProduct';
function App() {
  return (
    <div>
      <BrowserRouter>
      <Nav/>
      <Footer/>
      <Routes> 
      <Route element={<PrivateComponent/>}>
      <Route path='/' element={<ProductList/>}/>
      <Route path='/add' element={<AddProduct/>}/>
      <Route path='/update/:id' element={<UpdateProduct/>}/>
      <Route path='/logout' element={<h1>Logout</h1>}/>
      <Route path='/profile' element={<h1>Profile</h1>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/signup' element={<SignUp/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

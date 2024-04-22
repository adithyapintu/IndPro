import './App.css';
import Product from './Components/Product';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ProductForm from './Components/ProductForm';
import EditForm from './Components/EditForm';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element = {<Product />} />
        <Route path="/addproduct" element = {<ProductForm />} />
        <Route path="/editproduct" element = {<EditForm />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

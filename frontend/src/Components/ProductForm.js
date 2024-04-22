import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../index.css';

const initialFormState = {
  name: '',
  description: '',
  price: ''
};
export default function ProductForm({ onSubmit, initialData }) {
  const [formData, setFormData] = useState(initialFormState);
  const [error, setError] = useState('');
  const [showError, setShowError] = useState('none');
  const navigate = useNavigate();

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const validateFormData = () => {
    if(formData.name === '' || formData.description === '' || formData.price === ''){
      setError("All fields are mandatory.");
      setShowError('block');
      return false;
    }
    else if(formData.price <= 0){
      setError("Price should be greater than 0.");
      setShowError('block');
      return false;
    }
    else{
      setShowError('none');
      return true;
    }
  }

  const createProduct = async () => {
    if(!validateFormData()){
      return;
    }
    try{
      let response = await fetch('http://localhost:5021/api/products/',
        {
          method: 'POST',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(formData)
        }
      );
      if(response && response.status === 200){
        navigate('/');
      }
      else{
        alert("Error creating product. Please try again.");
      }
    }
    catch(error){
      alert("Error creating product. Please try again.");
    }
  };

  return (
    <div className="product-form">
      <h1>Add Product</h1>
      <h5 style={{display: showError}}>{error}</h5>
      <form >
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <div className='buttons'>
          <button className='button' type="button" onClick={() => navigate('/')}>Home</button>
          <button className='button' type="button" onClick={() => createProduct()}>Create</button>
        </div>
      </form>
    </div>
  );
}
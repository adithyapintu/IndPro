import React, { useEffect, useState } from 'react'
import ListProducts from './ListProducts';
import { useNavigate } from 'react-router-dom';

export default function Product() {
    
    const [products, setProducts] = useState([]);
    
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts();
    }, []);

    async function fetchProducts() {
        try{
            let response = await fetch('http://localhost:5021/api/products/',
                { 
                    method: 'GET',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(response){
                response = await response.json();
                setProducts(response);
            }
        }
        catch(err){
            alert("Error fetching products. Please try again.");
            setProducts([]);
        }
    }

    function editProduct(product) {
        navigate('/editproduct', {state: {product}});
    }

    async function deleteProduct(id){
        try{
            let response = await fetch(`http://localhost:5021/api/products/${id}`,
                { 
                    method: 'DELETE',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
            if(response.status === 204){
                fetchProducts();
            }
        }
        catch(err){
            alert("Error deleting product. Please try again.");
            fetchProducts();
        }
    }

    return (
      <div className="App">
        <h1>Product List</h1>
        <button className="button" onClick={() => {navigate('/addproduct')}}>Add Product</button>
        {products?.length ? 
        <ListProducts deleteProduct={deleteProduct} products={products} editProduct = {editProduct}/>
        : <h3>No products found</h3>}
      </div>
    );
}

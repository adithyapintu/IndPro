import React from 'react'
import '../index.css'

export default function ListProducts({ deleteProduct, products, editProduct }) {
    return (
      <div className="product-grid">
        {products.map(product => (
          <div key={product.id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <div className="buttons">
              <button className="button" onClick={() => {editProduct(product)}}>Edit</button>
              <button className="button" onClick={() => {deleteProduct(product.id)}}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    );
}

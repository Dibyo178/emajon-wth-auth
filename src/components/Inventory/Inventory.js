import React from 'react';
import fakeData from '../../fakeData';

const Inventory = () => {
    const handleAddProduct= ()=>{
        const product={};
        fetch("https://serene-crag-56062.herokuapp.com/addProduct",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(product)
        })
    }
    return (
        <div>
            <form action="">
                <p><span>name:</span><input type="text"/></p>
                <p><span>price:</span><input type="text"/></p>
                <p><span>quantity:</span><input type="text"/></p>
                <p><span>upload image:</span><input type="file"/></p>
            <button onClick={handleAddProduct}>Add Product</button>
            </form>
        </div>
    );
};

export default Inventory;
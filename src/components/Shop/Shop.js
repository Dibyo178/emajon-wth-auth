import React, { useEffect } from 'react';
// import fakeData from '../../fakeData';
import { useState } from 'react';
import './Shop.css';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';
import { addToDatabaseCart, getDatabaseCart } from '../../utilities/databaseManager';
import { Link } from 'react-router-dom';
import logo from '../../images/loading.gif';

const Shop = () => {
    // const first10 = fakeData.slice(0,10);
    const [products, setProducts] = useState([]);
    
    const [cart, setCart] = useState([]);
    const [search,setSearch] = useState('');
    
    document.title="Shop"

    useEffect(()=>{

        fetch('https://serene-crag-56062.herokuapp.com/products?search='+search)
        .then(res=>res.json())
        .then(data=>{setProducts(data)
             alert(data.length)
            
        })

    },[search])
    
    useEffect(()=>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);
    // console.log(products,productKeys);
    //     if(products.length>0){
    //     const previousCart = productKeys.map( existingKey => {
    //         const product = products.find( pd => pd.key === existingKey);
    //         product.quantity = savedCart[existingKey];
    //         return product;
    //     } )
    //     setCart(previousCart);
    //     }
    fetch('https://serene-crag-56062.herokuapp.com/productByKeys',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },

        body:JSON.stringify(productKeys)
    })
    .then(res=>res.json())
    .then(data=>setCart(data));

    }, [])

      const handleSearch= event=>{
          console.log('click')
          setSearch(event.target.value);
      }

    const handleAddProduct = (product) =>{
        const toBeAddedKey = product.key;
        const sameProduct = cart.find(pd => pd.key === toBeAddedKey);
        let count = 1;
        let newCart;
        if(sameProduct){
            count = sameProduct.quantity + 1;
            sameProduct.quantity = count;
            const others = cart.filter(pd => pd.key !== toBeAddedKey);
            newCart = [...others, sameProduct];
        }
        else{
            product.quantity = 1;
            newCart = [...cart, product];
        }
        setCart(newCart);
        addToDatabaseCart(product.key, count);
    }

    return (
        <div className="twin-container">
            <div className="product-container">
                <input type="text" onBlur={handleSearch} placeholder='search' className='product-search'/>
                {
                    products.length===0 && <img src={logo} alt=""/>
                }
                

               {

                    products.map(pd => <Product 
                        key={pd.key}
                        showAddToCart={true}
                        handleAddProduct = {handleAddProduct}
                        product={pd}
                        ></Product>)
                }
            </div>
            <div className="cart-container">
               <Cart cart={cart}>
                    <Link to="/review">
                        <button className="main-button">Review Order</button>
                    </Link>
               </Cart>
            </div>
            
        </div>
    );
};

export default Shop;
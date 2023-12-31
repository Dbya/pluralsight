import React, { useEffect, useState } from "react";
import "./App.css";
import Footer from "./Footer";
import Header from "./Header";
import { getProducts } from "./services/productService";


export default function App() {
  const[size,setSize]=useState("")
  const[products,setProducts]=useState([])
  const[loading,setLoading]=useState(true)

    useEffect(()=>{
   async function dbya(){ await getProducts("shoes").then((response)=> setProducts(response)).catch((e)=>e).finally(()=> setLoading(false))
}
dbya();
},[])
    console.log("p",products)


  function renderProduct(p) {
    return (
      <div key={p.id} className="product">
        <a href="/">
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </a>
      </div>
    );
  }
   const filteredproduct= size ? products.filter((p)=>p.skus.find((s)=> s.size === parseInt(size))) : products

 if(loading) <h2>Loading....</h2>
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <section id="filters">
            <label htmlFor="size">Filter by Size:</label>{" "}
            <select id="size" value={size} onChange={(e)=> { 
             
              setSize(e.target.value)
            }}  >
              <option value="">All sizes</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
            </select>
          </section>
       
          {size && <h2> We found {filteredproduct.length} item of size {size} </h2> }
          <section id="products">
            {filteredproduct.map(renderProduct)}
          </section>
        </main>
      </div>
      <Footer />
    </>
  );
}

import { useEffect, useState } from "react";

//imporing React icons
import { FaRegTrashAlt } from "react-icons/fa";
import { GrUpdate } from "react-icons/gr";

//axios allows us to make requests to the backend
import axios from "axios";

const ProductList = () => {
  // State where the LIST of prudcts is stored
  const [list, setList] = useState([]);
  // This useEffect we will use as many times as necessary to render the value that we have in our API
  useEffect(() => {
    // The logic of this useEffect is that every time there is a change in the list state, render the component to update the information.
    const getProducts = async () => {
      const res = await axios.get("http://localhost:8080/api/products");
      // In setList we store what we receive from data
      setList(res.data);
    };
    getProducts();
  }, []);

  //The logic to delete the product through an id

  return (
    <div className="row">
      {/* We tell our state variable to iterate with map */}
      {list.map((lista) => (
        <div className="col-md-4 p-2" key={lista}>
          <div className="card">
            <img alt="mobileModel" variant="top" src={lista.carImg} />
            <div className="card-header">
              <h5>Name: {lista.carTitle}</h5>
            </div>
            <div className="card-body">
              <p>Price: {lista.carPrice}$</p>
            </div>

            <div className="card-footer d-flex">
              <div className="card-body">
                <button className="btn btn-outline-success">Show more</button>
              </div>
              <div className="card-body d-flex justify-content-around">
                <button className="btn btn-outline-dark ">
                  <FaRegTrashAlt />
                </button>
                <button className="btn btn-outline-dark ">
                  <GrUpdate />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

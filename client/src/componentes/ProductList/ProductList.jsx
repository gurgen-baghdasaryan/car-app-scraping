import { useEffect, useState } from "react";

//imporing React icons
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

//axios allows us to make requests to the backend
import "./ProductList.css";
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
    <div className="product">
      {/* We tell our state variable to iterate with map */}
      {list.map((lista, index) => (
        <div className="ProductList" key={index}>
          <Card sx={{ maxWidth: 345 }}>
            <CardMedia component="img" alt="car" src={lista.carImg} />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {lista.carTitle}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {lista.carPrice}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Share</Button>
              <Button size="small">Learn More</Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default ProductList;

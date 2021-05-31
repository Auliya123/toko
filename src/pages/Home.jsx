import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import axios from "axios";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  backgroundImage: {
    background: `url(https://images.unsplash.com/photo-1568315508263-15e2d1a6a0c4?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzN8fHNjZW5lcnklMjBibGFja3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60)`,
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundColor: "black",
    height: "55vh",
  },
  title: {
    color: "white",
    padding: "100px 50px 10px",
  },
  description: {
    color: "white",
    paddingLeft: "50px",
  },
  cards: {
    display: "flex",
    direction: "column",
    padding: 20,
    justifyContent: "center",
  },
  card: {
    maxWidth: "345px",
    margin: 10,
  },
});

export default function Home() {
  const [products, setProducts] = useState(null);
  useEffect(() => {
    async function fetchAPI() {
      let response = await axios(
        "https://bef24022-6b78-4a50-b1c8-ca326d8c9347.mock.pstmn.io/api/v1/products"
      );
      response = await response.data;
      setProducts(response);
    }
    fetchAPI();
  }, []);

  const classes = useStyles();
  // console.log(`products`, products.data[0].name);
  return (
    <div>
      <div className={classes.backgroundImage}>
        <div>
          <h1 className={classes.title}>Toko Jam</h1>
          <p className={classes.description}>
            Jam terbaru dengan kualitas terbaik seIndonesia. Yuk miliki jam mu
            sekarang !!!
          </p>
        </div>
      </div>
      <div className={classes.cards}>
        {products === null ? (
          <div>Loading</div>
        ) : (
          products.data.map((product) => {
            return (
              <Card className={classes.card} key={product.id}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    alt={product.name}
                    height="200"
                    image={product.images}
                    title={product.name}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">
                      {product.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      component="p"
                    >
                      Rp.
                      {product.price}
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Link to={`/detail/${product.id}`}>
                    <Button size="small" color="primary">
                      Check More
                    </Button>
                  </Link>
                </CardActions>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}

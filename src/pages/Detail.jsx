import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { makeStyles, Button, TextField } from "@material-ui/core";
import { connect } from "react-redux";

const useStyles = makeStyles({
  body: {
    display: "flex",
  },
  detail: {
    marginTop: 150,
    marginLeft: 100,
  },
});

const Detail = (props) => {
  console.log(`props`, props);
  const classes = useStyles();
  const { productId } = useParams();
  console.log(`product_id`, productId);
  const [product, setProduct] = useState(null);
  useEffect(() => {
    async function fetchAPI() {
      let response = await axios(
        `https://bef24022-6b78-4a50-b1c8-ca326d8c9347.mock.pstmn.io/api/v1/products?id=${productId}`
      );
      response = await response.data;
      setProduct(response);
    }
    fetchAPI();
  }, [productId]);
  console.log(`product`, product);
  return (
    <div style={{ padding: 50 }}>
      {product === null ? (
        <div>Loading....</div>
      ) : (
        <div className={classes.body}>
          <div>
            <img src={product.image} alt={product.name} />
          </div>
          <div className={classes.detail}>
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <h2>Rp. {product.price}</h2>
            <br />
            <span>
              <Button
                variant="contained"
                size="large"
                onClick={props.handleMinus}
              >
                -
              </Button>
              <TextField
                style={{ width: 70 }}
                size="small"
                variant="outlined"
                value={props.counter}
              />
              <Button
                color="primary"
                variant="contained"
                size="large"
                onClick={props.handlePlus}
              >
                +
              </Button>{" "}
              {product.stock} Stocks
            </span>
            <br />
          </div>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    counter: state.totalOrder,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePlus: () => dispatch({ type: "HANDLE_PLUS" }),
    handleMinus: () => dispatch({ type: "HANDLE_MINUS" }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Form,
  Image,
  ListGroup,
  Row,
} from 'react-bootstrap';
import Rating from '../components/Ratings';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import { getErrorMessage } from '../utils/getErrorMessage';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useDispatch } from 'react-redux';
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
  const { id: productId } = useParams();
  const dispatch = useDispatch();
  const {
    data: product,
    isLoading,
    error,
  } = useGetProductDetailsQuery(productId ?? '');
  const [qty, setQty] = useState(1);

  const addToCartHandler = () => {
    if (!product) return;
    dispatch(addToCart({ ...product, qty }));
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{getErrorMessage(error)}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={product?.image} alt={product?.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{product?.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={product.rating}
                  text={`${product?.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>${product.price}</ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Select
                          value={qty}
                          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                            setQty(Number(e?.target?.value))
                          }
                        >
                          {[...Array(product.countInStock).keys()].map(
                            (stock) => (
                              <option key={stock + 1} value={stock + 1}>
                                {stock + 1}
                              </option>
                            ),
                          )}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Button
                    className="btn-block"
                    type="button"
                    disabled={product.countInStock === 0}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;

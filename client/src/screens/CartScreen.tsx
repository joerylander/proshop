import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { CartState, Product } from '../types';
import {
  Button,
  Col,
  Form,
  Image,
  ListGroup,
  ListGroupItem,
  Row,
} from 'react-bootstrap';
import Message from '../components/Message';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../slices/cartSlice';

const CartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state: { cart: CartState }) => state.cart);

  const addToCartHandler = async (product: Product, qty: number) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = async (id: string) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <Message variant="info">
            You cart is empty <Link to="/">Go back</Link>
          </Message>
        ) : (
          <ListGroup variant="flush">
            {cartItems.map((item) => (
              <ListGroupItem key={item._id}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link to={`/product/${item._id}`}>{item.name} </Link>
                  </Col>
                  <Col md={2}>{item.price}</Col>
                  <Col md={2}>
                    <Form.Select
                      value={item.qty}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((stock) => (
                        <option key={stock + 1} value={stock + 1}>
                          {stock + 1}
                        </option>
                      ))}
                    </Form.Select>
                  </Col>
                  <Col md={2}>
                    <Button
                      type="button"
                      variant="light"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash />
                    </Button>
                  </Col>
                </Row>
              </ListGroupItem>
            ))}
          </ListGroup>
        )}
      </Col>

      <Col md={4}>
        <ListGroup>
          <ListGroup.Item>
            <h2>
              Subtotal ({cartItems.reduce((acc, curr) => acc + curr.qty, 0)})
              items
            </h2>
            ${' '}
            {cartItems
              .reduce((acc, curr) => acc + curr.qty * curr.price, 0)
              .toFixed(2)}
          </ListGroup.Item>
          <ListGroup.Item>
            <Button
              type="button"
              className="btn-block"
              disabled={!cartItems.length}
              onClick={checkoutHandler}
            >
              Proceed to checkout
            </Button>
          </ListGroup.Item>
        </ListGroup>
      </Col>
    </Row>
  );
};

export default CartScreen;

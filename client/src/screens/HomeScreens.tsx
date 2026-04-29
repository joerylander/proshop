import { Row, Col } from 'react-bootstrap';
import products from '../products';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';

const HomeScreens = () => {
  return (
    <>
      <h1>Latest products</h1>
      <Row>
        {products.map((product: Product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreens;

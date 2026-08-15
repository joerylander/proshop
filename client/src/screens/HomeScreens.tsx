import { Row, Col } from 'react-bootstrap';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import { getErrorMessage } from '../utils/getErrorMessage';
import Loader from '../components/Loader';
import Message from '../components/Message';

const HomeScreens = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{getErrorMessage(error)}</Message>
      ) : (
        <>
          <h1>Latest products</h1>
          <Row>
            {products ? (
              products.map((product: Product) => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  <ProductCard product={product} />
                </Col>
              ))
            ) : (
              <h2>No products was found...</h2>
            )}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreens;

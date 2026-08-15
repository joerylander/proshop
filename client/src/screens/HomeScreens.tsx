import { Row, Col } from 'react-bootstrap';
import type { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useGetProductsQuery } from '../slices/productsApiSlice';
import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const HomeScreens = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError,
  ): string => {
    if ('status' in error) {
      // FetchBaseQueryError: servern svarade med felstatus, eller nätverks-/parsningsfel
      if ('data' in error) {
        const data = error.data as { message?: string } | undefined;
        return data?.message ?? JSON.stringify(error.data);
      }
      return error.error; // FETCH_ERROR | TIMEOUT_ERROR | PARSING_ERROR
    }
    // SerializedError (fel kastat i klienten)
    return error.message ?? 'Something went wrong';
  };
  return (
    <>
      {isLoading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <div className="">{getErrorMessage(error)}</div>
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

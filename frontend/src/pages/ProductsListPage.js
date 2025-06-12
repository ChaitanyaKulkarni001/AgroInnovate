// src/pages/ProductsListPage.js

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsList } from '../actions/productActions';
import Message from '../components/Message';
import { Spinner, Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import { useHistory } from 'react-router-dom';
import { CREATE_PRODUCT_RESET } from '../constants';
import { useTranslation } from 'react-i18next';

function ProductsListPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  // Extract searchTerm from URL query string
  let searchTerm = history.location.search; // e.g. "?search=abc"

  const productsListReducer = useSelector((state) => state.productsListReducer);
  const { loading, error, products = [] } = productsListReducer;

  useEffect(() => {
    dispatch(getProductsList());
    dispatch({ type: CREATE_PRODUCT_RESET });
  }, [dispatch]);

  const showNothingMessage = () => {
    return (
      <div className="text-center mt-4">
        {!loading && (
          // Wrap the static message in t()
          <Message variant="info">{t('nothing_to_show')}</Message>
        )}
      </div>
    );
  };

  // Compute searchTermLower: extract after '=' if present, else empty
  const searchLower = React.useMemo(() => {
    if (!searchTerm) return '';
    // history.location.search is like "?search=foo"; if key differs, adjust accordingly
    // Here we assume "?search=foo"
    const param = searchTerm.startsWith('?') ? searchTerm.slice(1) : searchTerm;
    const [key, value] = param.split('=');
    if (value) {
      return value.toLowerCase();
    }
    return '';
  }, [searchTerm]);

  // Filter products by name (case-insensitive)
  const filteredProducts = React.useMemo(() => {
    if (!Array.isArray(products)) return [];
    if (!searchLower) return products;
    return products.filter((item) =>
      item.name?.toLowerCase().includes(searchLower)
    );
  }, [products, searchLower]);

  return (
    <div
      className="container py-4"
      style={{ backgroundColor: '#e6f5e6', minHeight: '100vh' }}
    >
      {error && <Message variant="danger">{error}</Message>}

      {loading && (
        <div className="d-flex align-items-center mb-4">
          {/* Wrap "Getting Products" in t() */}
          <h5 className="mb-0 text-success">{t('getting_products')}</h5>
          {/* Note: if you're using Bootstrap 4, keep className="ml-3"; if Bootstrap 5, use "ms-3" */}
          <Spinner animation="border" variant="success" className="ml-3" />
        </div>
      )}

      <Row className="g-4">
        {filteredProducts.length === 0
          ? showNothingMessage()
          : filteredProducts.map((product) => (
              <Col key={product.id ?? product._id} sm={12} md={6} lg={4} xl={3}>
                <div
                  className="p-3 bg-light rounded shadow-sm border border-success h-100"
                  style={{ backgroundColor: '#fafff5' }}
                >
                  <Product product={product} />
                </div>
              </Col>
            ))}
      </Row>
    </div>
  );
}

export default ProductsListPage;

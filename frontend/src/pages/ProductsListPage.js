// src/pages/ProductsListPage.js

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsList } from '../actions/productActions';
import Message from '../components/Message';
import { Spinner, Row, Col, Form, Button } from 'react-bootstrap';
import Product from '../components/Product';
import { useHistory } from 'react-router-dom';
import { CREATE_PRODUCT_RESET } from '../constants';
import { useTranslation } from 'react-i18next';

function ProductsListPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { t } = useTranslation();

  const [category, setCategory] = useState('');
  const [cropType, setCropType] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

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

  const applyFilters = (e) => {
    e && e.preventDefault();
    dispatch(getProductsList({
      category: category || undefined,
      crop_type: cropType || undefined,
      min_price: minPrice || undefined,
      max_price: maxPrice || undefined,
      search: searchLower || undefined,
    }));
  };

  return (
    <div
      style={{ backgroundColor: '#e6f5e6', minHeight: '100vh', paddingTop: '1.5rem', paddingBottom: '2rem' }}
    >
      <div className="container" style={{ maxWidth: '1400px' }}>
        {error && <Message variant="danger">{error}</Message>}

        <div className="mb-4 p-3 bg-white border rounded shadow-sm">
          <Form onSubmit={applyFilters} className="row g-3 align-items-end">
            <div className="col-sm-6 col-md-3">
              <Form.Label style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Category</Form.Label>
              <Form.Control 
                as="select" 
                value={category} 
                onChange={(e)=>setCategory(e.target.value)} 
                style={{ fontSize: '0.9rem', cursor: 'pointer' }}
              >
                <option value="">All Categories</option>
                <option value="Grains">Grains</option>
                <option value="Vegetables">Vegetables</option>
                <option value="Fruits">Fruits</option>
                <option value="Dairy">Dairy</option>
                <option value="Poultry">Poultry</option>
                <option value="Feed">Feed</option>
                <option value="Grocery">Grocery</option>
                <option value="Seeds">Seeds</option>
                <option value="Fertilizers">Fertilizers</option>
                <option value="Tools">Tools & Equipment</option>
                <option value="Organic">Organic Products</option>
                <option value="Spices">Spices</option>
              </Form.Control>
            </div>
            <div className="col-sm-6 col-md-3">
              <Form.Label style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Crop Type</Form.Label>
              <Form.Control placeholder="Crop Type" value={cropType} onChange={(e)=>setCropType(e.target.value)} style={{ fontSize: '0.9rem' }} />
            </div>
            <div className="col-sm-6 col-md-2">
              <Form.Label style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Min Price</Form.Label>
              <Form.Control placeholder="Min Price" value={minPrice} onChange={(e)=>setMinPrice(e.target.value)} style={{ fontSize: '0.9rem' }} />
            </div>
            <div className="col-sm-6 col-md-2">
              <Form.Label style={{ fontSize: '0.9rem', marginBottom: '0.3rem' }}>Max Price</Form.Label>
              <Form.Control placeholder="Max Price" value={maxPrice} onChange={(e)=>setMaxPrice(e.target.value)} style={{ fontSize: '0.9rem' }} />
            </div>
            <div className="col-sm-12 col-md-2">
              <Button type="submit" variant="success" style={{ width: '100%', fontSize: '0.9rem', padding: '0.5rem' }}>Apply</Button>
            </div>
          </Form>
        </div>

        {loading && (
          <div className="d-flex align-items-center mb-4">
            {/* Wrap "Getting Products" in t() */}
            <h5 className="mb-0 text-success">{t('getting_products')}</h5>
            {/* Note: if you're using Bootstrap 4, keep className="ml-3"; if Bootstrap 5, use "ms-3" */}
            <Spinner animation="border" variant="success" className="ml-3" />
          </div>
        )}

        <Row className="g-3">
          {filteredProducts.length === 0
            ? showNothingMessage()
            : filteredProducts.map((product) => (
                <Col key={product.id ?? product._id} xs={12} sm={6} md={6} lg={4} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
        </Row>
      </div>
    </div>
  );
}

export default ProductsListPage;

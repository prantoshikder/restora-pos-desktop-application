import { Form, Input } from 'antd';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const CartTop = () => {
  return (
    <div className="form-content">
      <div className="banner-card">
        <Row className="search-food-wrapper justify-content-md-center">
          <Col lg={6}>
            <Form.Item
              label="Category name"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: 'Category name is required',
                },
              ]}
            >
              <Input
                placeholder="Category Name"
                size="large"
                // value={categories.categoryName}
                // onChange={(e) =>
                //   setCategories({ ...categories, categoryName: e.target.value })
                // }
              />
            </Form.Item>
          </Col>
          <Col lg={6}>
            <Form.Item
              label="Category name"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: 'Category name is required',
                },
              ]}
            >
              <Input
                placeholder="Category Name"
                size="large"
                // value={categories.categoryName}
                // onChange={(e) =>
                //   setCategories({ ...categories, categoryName: e.target.value })
                // }
              />
            </Form.Item>
          </Col>
        </Row>
        <Row className="search-food-wrapper justify-content-md-center">
          <Col lg={4}>
            <Form.Item
              label="Category name"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: 'Category name is required',
                },
              ]}
            >
              <Input
                placeholder="Category Name"
                size="large"
                // value={categories.categoryName}
                // onChange={(e) =>
                //   setCategories({ ...categories, categoryName: e.target.value })
                // }
              />
            </Form.Item>
          </Col>
          <Col lg={4}>
            <Form.Item
              label="Category name"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: 'Category name is required',
                },
              ]}
            >
              <Input
                placeholder="Category Name"
                size="large"
                // value={categories.categoryName}
                // onChange={(e) =>
                //   setCategories({ ...categories, categoryName: e.target.value })
                // }
              />
            </Form.Item>
          </Col>
          <Col lg={4}>
            <Form.Item
              label="Category name"
              name="categoryName"
              rules={[
                {
                  required: true,
                  message: 'Category name is required',
                },
              ]}
            >
              <Input
                placeholder="Category Name"
                size="large"
                // value={categories.categoryName}
                // onChange={(e) =>
                //   setCategories({ ...categories, categoryName: e.target.value })
                // }
              />
            </Form.Item>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default CartTop;

'use client';

import { useState } from 'react';
import styles from './add.module.css';

export default function AddOrderPage() {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    deliveryAddress: '',
    items: [{ name: '', quantity: 1, price: 0 }],
    status: 'pending'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setFormData(prev => ({ ...prev, items: newItems }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [...prev.items, { name: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length > 1) {
      const newItems = formData.items.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, items: newItems }));
    }
  };

  const calculateTotal = () => {
    return formData.items.reduce((total, item) => {
      return total + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const orderData = {
      ...formData,
      id: Date.now(),
      total: calculateTotal(),
      orderDate: new Date().toISOString().split('T')[0]
    };
    
    console.log('New Order:', orderData);
    // Here you would typically send the data to your API
    alert('Order created successfully!');
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Add New Order</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>Customer Information</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="customerName">Customer Name *</label>
            <input
              type="text"
              id="customerName"
              name="customerName"
              value={formData.customerName}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerEmail">Customer Email *</label>
            <input
              type="email"
              id="customerEmail"
              name="customerEmail"
              value={formData.customerEmail}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="customerPhone">Customer Phone *</label>
            <input
              type="tel"
              id="customerPhone"
              name="customerPhone"
              value={formData.customerPhone}
              onChange={handleInputChange}
              required
              className={styles.input}
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="deliveryAddress">Delivery Address *</label>
            <textarea
              id="deliveryAddress"
              name="deliveryAddress"
              value={formData.deliveryAddress}
              onChange={handleInputChange}
              required
              rows="3"
              className={styles.textarea}
            />
          </div>
        </div>

        <div className={styles.section}>
          <h2>Order Items</h2>
          
          {formData.items.map((item, index) => (
            <div key={index} className={styles.itemRow}>
              <div className={styles.itemInputs}>
                <div className={styles.formGroup}>
                  <label>Item Name *</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleItemChange(index, 'name', e.target.value)}
                    required
                    className={styles.input}
                    placeholder="Product or service name"
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Quantity *</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                    required
                    className={styles.input}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label>Price *</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.price}
                    onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                    required
                    className={styles.input}
                  />
                </div>
              </div>

              {formData.items.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeItem(index)}
                  className={styles.removeButton}
                >
                  Remove
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addItem}
            className={styles.addItemButton}
          >
            Add Item
          </button>
        </div>

        <div className={styles.section}>
          <h2>Order Summary</h2>
          
          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>Total Items:</span>
              <span>{formData.items.length}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Total Amount:</span>
              <span className={styles.total}>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="status">Order Status</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              className={styles.select}
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            Create Order
          </button>
          <button type="button" className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './orders.module.css';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    // Simulate loading orders data
    setTimeout(() => {
      const mockOrders = [
        {
          id: 1,
          customerName: 'John Doe',
          customerEmail: 'john@example.com',
          customerPhone: '+1234567890',
          total: 129.97,
          status: 'pending',
          orderDate: '2024-01-15',
          items: [
            { name: 'Product 1', quantity: 2, price: 29.99 },
            { name: 'Product 2', quantity: 1, price: 49.99 }
          ]
        },
        {
          id: 2,
          customerName: 'Jane Smith',
          customerEmail: 'jane@example.com',
          customerPhone: '+1234567891',
          total: 89.98,
          status: 'completed',
          orderDate: '2024-01-14',
          items: [
            { name: 'Product 3', quantity: 1, price: 89.98 }
          ]
        },
        {
          id: 3,
          customerName: 'Bob Johnson',
          customerEmail: 'bob@example.com',
          customerPhone: '+1234567892',
          total: 199.95,
          status: 'processing',
          orderDate: '2024-01-13',
          items: [
            { name: 'Product 4', quantity: 3, price: 49.99 },
            { name: 'Product 5', quantity: 1, price: 49.98 }
          ]
        }
      ];
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.id.toString().includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#ffc107';
      case 'processing': return '#17a2b8';
      case 'shipped': return '#007bff';
      case 'completed': return '#28a745';
      case 'cancelled': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusText = (status) => {
    return status.charAt(0).toUpperCase() + status.slice(1);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading orders...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles.headerContent}>
          <h1>Orders Management</h1>
          <Link href="/orders/add" className={styles.addButton}>
            Add New Order
          </Link>
        </div>
      </div>

      <div className={styles.filters}>
        <div className={styles.searchBox}>
          <input
            type="text"
            placeholder="Search by customer name, email, or order ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.statusFilter}>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className={styles.filterSelect}
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className={styles.stats}>
        <div className={styles.statCard}>
          <h3>Total Orders</h3>
          <p>{orders.length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Pending</h3>
          <p>{orders.filter(o => o.status === 'pending').length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Completed</h3>
          <p>{orders.filter(o => o.status === 'completed').length}</p>
        </div>
        <div className={styles.statCard}>
          <h3>Total Revenue</h3>
          <p>${orders.reduce((sum, order) => sum + order.total, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className={styles.ordersList}>
        {filteredOrders.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No orders found matching your criteria.</p>
          </div>
        ) : (
          filteredOrders.map(order => (
            <div key={order.id} className={styles.orderCard}>
              <div className={styles.orderHeader}>
                <div className={styles.orderInfo}>
                  <h3>Order #{order.id}</h3>
                  <p className={styles.customerInfo}>
                    {order.customerName} • {order.customerEmail}
                  </p>
                  <p className={styles.orderDate}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </p>
                </div>
                <div className={styles.orderStatus}>
                  <span 
                    className={styles.statusBadge}
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {getStatusText(order.status)}
                  </span>
                </div>
              </div>

              <div className={styles.orderDetails}>
                <div className={styles.itemsList}>
                  {order.items.map((item, index) => (
                    <div key={index} className={styles.item}>
                      <span className={styles.itemName}>{item.name}</span>
                      <span className={styles.itemQuantity}>x{item.quantity}</span>
                      <span className={styles.itemPrice}>${item.price}</span>
                    </div>
                  ))}
                </div>
                <div className={styles.orderTotal}>
                  <strong>Total: ${order.total.toFixed(2)}</strong>
                </div>
              </div>

              <div className={styles.orderActions}>
                <Link href={`/orders/edit/${order.id}`} className={styles.editButton}>
                  Edit Order
                </Link>
                <button className={styles.viewButton}>
                  View Details
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 
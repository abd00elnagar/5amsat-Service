'use client';

import { useState, useEffect } from 'react';
import styles from './categories.module.css';
import { getAllCategories, createCategory, deleteCategory } from '@/lib/data_services';
import { MdDeleteOutline } from 'react-icons/md';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '' });
  const [error, setError] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  useEffect(() => {
    async function fetchCategories() {
      setLoading(true);
      try {
        const cats = await getAllCategories();
        setCategories(cats);
      } catch (err) {
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createCategory({ name: formData.name });
      const cats = await getAllCategories();
      setCategories(cats);
      setFormData({ name: '' });
      setShowAddModal(false);
    } catch (err) {
      setError('Failed to add category');
    }
  };

  const handleDelete = async (categoryId) => {
    setConfirmDeleteId(categoryId);
  };

  const confirmDelete = async () => {
    if (confirmDeleteId) {
      try {
        await deleteCategory(confirmDeleteId);
        setCategories(categories.filter(cat => cat.id !== confirmDeleteId));
        setConfirmDeleteId(null);
      } catch (err) {
        setError('Failed to delete category');
        setConfirmDeleteId(null);
      }
    }
  };

  const cancelDelete = () => setConfirmDeleteId(null);

  return (
    <div className={styles.modernContainer}>
      <div className={styles.headerRow}>
        <h1 className={styles.title}>Categories</h1>
        <button
          className={styles.fab}
          onClick={() => setShowAddModal(true)}
          title="Add Category"
        >
          +
        </button>
      </div>
      {error && <div className={styles.error}>{error}</div>}
      {loading ? (
        <div className={styles.loading}>Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className={styles.emptyMsg}>No categories found. Click + to add one.</div>
      ) : (
        <div className={styles.grid}>
          {categories.map(cat => (
            <div key={cat.id} className={styles.card}>
              <div className={styles.cardContent}>
                <span className={styles.cardName}>{cat.name}</span>
              </div>
              <button
                className={styles.deleteBtn}
                onClick={() => handleDelete(cat.id)}
                title="Delete"
                aria-label="Delete category"
              >
                <MdDeleteOutline size={35} color="#888" />
              </button>
            </div>
          ))}
        </div>
      )}
      {showAddModal && (
        <div className={styles.modalOverlay} onClick={() => setShowAddModal(false)}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Category Name *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={e => setFormData({ name: e.target.value })}
                  required
                  className={styles.input}
                  autoFocus
                />
              </div>
              <div className={styles.formActions}>
                <button type="submit" className={styles.saveButton}>Add</button>
                <button type="button" className={styles.cancelButton} onClick={() => setShowAddModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
      {confirmDeleteId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Confirm Deletion</h3>
            <p>Are you sure you want to delete this category?</p>
            <div className={styles.formActions}>
              <button className={styles.saveButton} onClick={confirmDelete}>Yes, Delete</button>
              <button className={styles.cancelButton} onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
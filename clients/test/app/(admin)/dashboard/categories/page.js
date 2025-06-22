'use client';

import { useState, useEffect } from 'react';
import styles from './categories.module.css';
import { getAllCategories, createCategory, deleteCategory } from '@/lib/data_services';
import { MdDeleteOutline, MdAdd } from 'react-icons/md';

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
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Categories</h1>
        <button
          className={styles.addButton}
          onClick={() => setShowAddModal(true)}
        >
          <MdAdd /> Add Category
        </button>
      </div>

      {error && <div className={styles.error}>{error}</div>}
      
      {loading ? (
        <div className={styles.loading}>Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className={styles.empty}>No categories found</div>
      ) : (
        <div className={styles.grid}>
          {categories.map(cat => (
            <div key={cat.id} className={styles.card}>
              <span>{cat.name}</span>
              <button
                onClick={() => handleDelete(cat.id)}
                className={styles.deleteButton}
                title="Delete"
              >
                <MdDeleteOutline size={25}/>
              </button>
            </div>
          ))}
        </div>
      )}

      {showAddModal && (
        <div className={styles.modal} onClick={() => setShowAddModal(false)}>
          <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
            <h2>Add Category</h2>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={formData.name}
                onChange={e => setFormData({ name: e.target.value })}
                placeholder="Category name"
                required
                autoFocus
              />
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowAddModal(false)}>Cancel</button>
                <button type="submit">Add</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {confirmDeleteId && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Delete Category</h2>
            <p>Are you sure?</p>
            <div className={styles.modalActions}>
              <button onClick={cancelDelete}>Cancel</button>
              <button onClick={confirmDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 
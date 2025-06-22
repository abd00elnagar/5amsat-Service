'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './categories.module.css';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true
  });

  useEffect(() => {
    // Simulate loading categories
    setTimeout(() => {
      setCategories([
        {
          id: 1,
          name: 'Electronics',
          description: 'Electronic devices and gadgets',
          image: '/images/electronics.jpg',
          isActive: true,
          productCount: 15,
          createdAt: '2024-01-10'
        },
        {
          id: 2,
          name: 'Clothing',
          description: 'Fashion and apparel items',
          image: '/images/clothing.jpg',
          isActive: true,
          productCount: 23,
          createdAt: '2024-01-08'
        },
        {
          id: 3,
          name: 'Home & Garden',
          description: 'Home improvement and garden supplies',
          image: '/images/home.jpg',
          isActive: false,
          productCount: 8,
          createdAt: '2024-01-05'
        }
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (editingCategory) {
      // Update existing category
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData }
          : cat
      ));
      setEditingCategory(null);
    } else {
      // Add new category
      const newCategory = {
        id: Date.now(),
        ...formData,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
    }
    
    setFormData({ name: '', description: '', image: '', isActive: true });
    setShowAddForm(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description,
      image: category.image,
      isActive: category.isActive
    });
    setShowAddForm(true);
  };

  const handleDelete = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== categoryId));
    }
  };

  const toggleCategoryStatus = (categoryId) => {
    setCategories(categories.map(cat => 
      cat.id === categoryId 
        ? { ...cat, isActive: !cat.isActive }
        : cat
    ));
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>Loading categories...</div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Category Management</h1>
        <div className={styles.headerActions}>
          <Link href="/categories/add" className={styles.addButton}>
            Add Category
          </Link>
          <button 
            className={styles.inlineAddButton}
            onClick={() => {
              setShowAddForm(true);
              setEditingCategory(null);
              setFormData({ name: '', description: '', image: '', isActive: true });
            }}
          >
            Quick Add
          </button>
        </div>
      </div>

      {showAddForm && (
        <div className={styles.formContainer}>
          <h2>{editingCategory ? 'Edit Category' : 'Add New Category'}</h2>
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="name">Category Name *</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows="3"
                className={styles.textarea}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className={styles.input}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({...formData, isActive: e.target.checked})}
                  className={styles.checkbox}
                />
                Active Category
              </label>
            </div>

            <div className={styles.formActions}>
              <button type="submit" className={styles.saveButton}>
                {editingCategory ? 'Update Category' : 'Add Category'}
              </button>
              <button 
                type="button" 
                onClick={() => {
                  setShowAddForm(false);
                  setEditingCategory(null);
                  setFormData({ name: '', description: '', image: '', isActive: true });
                }}
                className={styles.cancelButton}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className={styles.categoriesList}>
        {categories.length === 0 ? (
          <div className={styles.noCategories}>No categories found</div>
        ) : (
          categories.map(category => (
            <div key={category.id} className={styles.categoryCard}>
              <div className={styles.categoryImage}>
                {category.image ? (
                  <img src={category.image} alt={category.name} />
                ) : (
                  <div className={styles.placeholderImage}>
                    <span>No Image</span>
                  </div>
                )}
              </div>

              <div className={styles.categoryInfo}>
                <div className={styles.categoryHeader}>
                  <h3>{category.name}</h3>
                  <span className={`${styles.status} ${category.isActive ? styles.active : styles.inactive}`}>
                    {category.isActive ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <p className={styles.description}>{category.description}</p>
                
                <div className={styles.categoryStats}>
                  <span className={styles.stat}>
                    <strong>{category.productCount}</strong> products
                  </span>
                  <span className={styles.stat}>
                    Created: {category.createdAt}
                  </span>
                </div>
              </div>

              <div className={styles.categoryActions}>
                <button
                  onClick={() => toggleCategoryStatus(category.id)}
                  className={`${styles.actionButton} ${styles.toggleButton}`}
                >
                  {category.isActive ? 'Deactivate' : 'Activate'}
                </button>
                <Link
                  href={`/categories/edit/${category.id}`}
                  className={`${styles.actionButton} ${styles.editButton}`}
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleEdit(category)}
                  className={`${styles.actionButton} ${styles.quickEditButton}`}
                >
                  Quick Edit
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className={`${styles.actionButton} ${styles.deleteButton}`}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
} 
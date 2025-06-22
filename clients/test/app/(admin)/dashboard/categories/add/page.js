'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './add.module.css';

export default function AddCategoryPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    isActive: true
  });
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const newCategory = {
        id: Date.now(),
        ...formData,
        productCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      
      console.log('New Category:', newCategory);
      // Here you would typically send the data to your API
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Category created successfully!');
      router.push('/categories');
    } catch (error) {
      alert('Error creating category: ' + error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Add New Category</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.section}>
          <h2>Category Information</h2>
          
          <div className={styles.formGroup}>
            <label htmlFor="name">Category Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className={styles.input}
              placeholder="Enter category name"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows="4"
              className={styles.textarea}
              placeholder="Enter category description"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Image URL</label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleInputChange}
              className={styles.input}
              placeholder="https://example.com/image.jpg"
            />
            <small className={styles.helpText}>
              Optional: Provide a URL for the category image
            </small>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className={styles.checkbox}
              />
              Active Category
            </label>
            <small className={styles.helpText}>
              Active categories will be visible to customers
            </small>
          </div>
        </div>

        <div className={styles.formActions}>
          <button 
            type="submit" 
            className={styles.submitButton}
            disabled={saving}
          >
            {saving ? 'Creating...' : 'Create Category'}
          </button>
          <button 
            type="button" 
            onClick={() => router.back()}
            className={styles.cancelButton}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
} 
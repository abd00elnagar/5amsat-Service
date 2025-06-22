import React from 'react';
import styles from './CategoryFilter.module.css';

export default function CategoryFilter({ categories = [], selectedCategory, onCategoryChange }) {
  return (
    <div className={styles.filterContainer}>
      <select 
        className={styles.select}
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
} 
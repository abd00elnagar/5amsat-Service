'use client';

import { useState } from 'react';
import styles from './FilterSection.module.css';

export default function FilterSection({ onSearch, onCategoryChange }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Hardcoded categories for now - can be made dynamic later
  const categories = [
    { id: 'Electronics', name: 'Electronics' },
    { id: 'Clothing', name: 'Clothing' },
    { id: 'Accessories', name: 'Accessories' },
    { id: 'Footwear', name: 'Footwear' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch({ query: searchQuery, category: selectedCategory });
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onSearch({ query: searchQuery, category });
  };

  return (
    <div className={styles.filterSection}>
      <form onSubmit={handleSearch} className={styles.searchForm}>
        <div className={styles.searchInputContainer}>
          <svg
            className={styles.searchIcon}
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className={styles.searchInput}
          />
          
          {searchQuery && (
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSearch({ query: '', category: selectedCategory });
              }}
              className={styles.clearButton}
              aria-label="Clear search"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        <select 
          className={styles.categorySelect}
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        
        <button type="submit" className={styles.searchButton}>
          Search
        </button>

      </form>
    </div>
  );
} 
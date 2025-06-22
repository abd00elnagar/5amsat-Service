# Feature Removal Guide

This guide explains how to safely remove specific features from the codebase. Each section details the files and code blocks that need to be removed or modified.

## Filter Bar Feature
To remove the search and filter bar:

1. Files to Remove:
   ```bash
   rm -rf clients/test/app/components/FilterSection.jsx
   rm -rf clients/test/app/components/FilterSection.module.css
   ```

2. Component Changes:
   - In `clients/test/app/(user)/page.js`:
     ```jsx
     // Remove the FilterSection import
     import FilterSection from '../components/FilterSection';

     // Remove the filters state
     const [filters, setFilters] = useState({ query: '', category: '' });

     // Remove the handleSearch function
     const handleSearch = (newFilters) => {
       setFilters(newFilters);
       setPage(1);
       fetchProducts(1, newFilters);
     };

     // Remove the FilterSection component
     <FilterSection onSearch={handleSearch} />
     ```

   - In `clients/test/lib/data_services.js`:
     ```js
     // Remove search and category parameters from getAllProducts
     export async function getAllProducts({ page = 1, limit = 20, random = false, search = '', category = '' } = {}) {
       // Remove these filter conditions
       if (search) {
         query = query.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
       }

       if (category) {
         query = query.eq('category', category);
       }

       // Also remove from count query
       if (search) {
         countQuery = countQuery.or(`name.ilike.%${search}%,description.ilike.%${search}%`);
       }

       if (category) {
         countQuery = countQuery.eq('category', category);
       }
     }
     ```

3. Testing:
   - Verify product listing works without filters
   - Test pagination still works correctly
   - Ensure random product ordering still functions

## Color Variants Feature
To remove the color variants feature:

1. Database Changes:
   ```sql
   -- Remove the colors column from products table
   ALTER TABLE products DROP COLUMN colors;
   ```

2. Component Changes:
   - In `clients/test/app/components/ProductCard.jsx`:
     ```jsx
     // Remove the colors state and parsing
     const colors = product.colors ? 
       (typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors) 
       : null;
     
     // Remove the color dots section
     {colors && Object.keys(colors).length > 0 && (
       <div className={styles.colorDots}>
         {Object.keys(colors).map((color) => (
           <div
             key={color}
             className={styles.colorDot}
             style={{ backgroundColor: color }}
             title={`Available in ${color}`}
           />
         ))}
       </div>
     )}
     ```

   - In `clients/test/app/components/ProductCard.module.css`:
     ```css
     /* Remove these style blocks */
     .colorDots {
       position: absolute;
       bottom: 12px;
       left: 12px;
       display: flex;
       gap: 6px;
       z-index: 2;
     }

     .colorDot {
       width: 12px;
       height: 12px;
       border-radius: 50%;
       border: 2px solid white;
       box-shadow: 0 2px 4px rgba(0,0,0,0.1);
     }
     ```

   - In `clients/test/app/(user)/products/[id]/page.js`:
     ```jsx
     // Remove the state
     const [selectedColor, setSelectedColor] = useState(null);
     
     // Remove the color parsing and image selection logic
     const colors = product.colors ? 
       (typeof product.colors === 'string' ? JSON.parse(product.colors) : product.colors) 
       : null;
     const currentImage = selectedColor && colors ? colors[selectedColor] : product.image;
     
     // Remove the color buttons section
     {colors && Object.keys(colors).length > 0 && (
       <div className={styles.colorSection}>
         <span className={styles.colorLabel}>Available Colors:</span>
         <div className={styles.colorButtons}>
           {Object.entries(colors).map(([color, imageUrl]) => (
             <button
               key={color}
               className={`${styles.colorButton} ${selectedColor === color ? styles.selected : ''}`}
               style={{ backgroundColor: color }}
               onClick={() => setSelectedColor(color === selectedColor ? null : color)}
               title={`View ${color} variant`}
             />
           ))}
         </div>
       </div>
     )}
     ```

   - In `clients/test/app/(user)/products/[id]/page.module.css`:
     ```css
     /* Remove these style blocks */
     .colorSection { ... }
     .colorLabel { ... }
     .colorButtons { ... }
     .colorButton { ... }
     ```

3. Form Changes:
   - In `clients/test/app/(admin)/dashboard/add/page.js`:
     - Remove color input fields and related state
     - Remove color handling from form submission

   - In `clients/test/app/(admin)/dashboard/edit/[id]/page.js`:
     - Remove color input fields and related state
     - Remove color handling from form submission

## Category Filter Feature
To remove the category filtering:

1. Files to Remove:
   ```bash
   rm -rf bricks/category/
   ```

2. Database Changes:
   ```sql
   -- Remove category-related columns
   ALTER TABLE products DROP COLUMN category;
   ```

3. Component Changes:
   - In `ProductCard.jsx`:
     ```jsx
     // Remove category badge
     {product.category && (
       <span className={styles.categoryBadge}>{product.category}</span>
     )}
     ```

   - In `ProductCard.module.css`:
     ```css
     /* Remove these styles */
     .categoryBadge { ... }
     ```

   - In product details page:
     ```jsx
     // Remove category display
     {product.category && (
       <div className={styles.infoItem}>
         <span className={styles.infoLabel}>Category</span>
         <span className={styles.category}>{product.category}</span>
       </div>
     )}
     
     // Remove related products by category section
     {hasRelatedProducts && (
       <>
         <h2 className={styles.relatedTitle}>More from {product.category}</h2>
         ...
       </>
     )}
     ```

4. Form Changes:
   - Remove category field from add product form
   - Remove category field from edit product form

5. API Changes:
   - Remove category filtering from product queries
   - Remove category from product creation/update endpoints

## WhatsApp Integration Feature
To remove the WhatsApp chat button integration:

1. Files to Remove:
   ```bash
   rm -rf bricks/whatsapp/WhatsAppButton.jsx
   rm -rf bricks/whatsapp/WhatsAppButton.module.css
   rm -rf bricks/whatsapp/README.md
   ```

2. Component Changes:
   - In any files where WhatsAppButton is used (e.g., product detail pages, contact pages):
     ```jsx
     // Remove the WhatsAppButton import
     import WhatsAppButton from '@/bricks/whatsapp/WhatsAppButton';

     // Remove the WhatsAppButton component usage
     <WhatsAppButton 
       phoneNumber="your-phone-number" 
       message="Hello! I'm interested in your services." 
     />
     ```

   - Remove any environment variables related to WhatsApp:
     ```env
     WHATSAPP_PHONE_NUMBER=
     WHATSAPP_DEFAULT_MESSAGE=
     ```

3. Testing:
   - Verify pages that previously had WhatsApp buttons still render correctly
   - Check that contact functionality works through alternative methods
   - Test responsive design where WhatsApp button was previously placed
   - Ensure no broken layouts where the button was removed

## General Notes
After removing any feature:

1. Data Cleanup:
   - Back up the database before making changes
   - Update any existing product data to remove related fields

2. Code Cleanup:
   - Remove any unused imports
   - Clean up any related environment variables
   - Update types/interfaces if using TypeScript
   - Remove any unused dependencies from package.json

3. Testing:
   - Test product listing pages
   - Test product detail pages
   - Test admin forms
   - Test related products functionality
   - Verify database queries still work
   - Test responsive design on all screen sizes
   - Test navigation and routing

4. Documentation:
   - Update API documentation if present
   - Update README.md to reflect removed features
   - Document the changes in git commit messages
   - Update any configuration files if needed

Remember to test the application thoroughly after removing each feature to ensure no regressions or broken functionality.

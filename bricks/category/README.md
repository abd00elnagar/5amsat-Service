# Category Management Brick

This brick provides simple, robust category management for the Khamsat Service website. It is designed to be modular and integrates seamlessly with the rest of the system.

---

## Features
- List all categories
- Add new categories
- Delete categories by unique id (uuid)
- Fully compatible with Supabase and the products brick (products reference category by name)

---

## Supabase Table Schema

```
sql
create table categories (
  id uuid primary key default gen_random_uuid(),
  name text not null unique
);
```
- Only `id` (uuid) and `name` (string, unique) are used.
- Deletion and updates are always by `id`.

---

## Data Structure

```js
{
  id: string,   // uuid
  name: string  // unique category name
}
```

---

## Integration Guide

### Prerequisites
- Supabase project set up
- The `categories` table created as above
- The `base-site` and `bricks` folders are present in your project

### Installation & Usage
1. **Add the Brick**
   - Place the `category` brick folder inside your `bricks/` directory.
   - Ensure the data service (`data_services.js`) is available and imported where needed.

2. **Database Setup**
   - Run the SQL schema above in your Supabase SQL editor.

3. **Using the Data Service**
   - Import the functions from `bricks/category/data_services.js`:
     ```js
     import { getAllCategories, createCategory, deleteCategory } from 'bricks/category/data_services';
     ```
   - **Get all categories:**
     ```js
     const categories = await getAllCategories();
     ```
   - **Create a category:**
     ```js
     await createCategory({ name: 'Electronics' });
     ```
   - **Delete a category by id:**
     ```js
     await deleteCategory('uuid-of-category');
     ```

4. **Frontend Integration**
   - Use the data service functions in your admin dashboard or wherever you need category management.
   - When creating or editing a product, use the category `name` as the value to store in the product's `category` field.
   - When deleting a category, always use its `id` to avoid accidental deletion of categories with the same name.

---

## Example: Adding Category Management to a Page

```js
import { getAllCategories, createCategory, deleteCategory } from 'bricks/category/data_services';

// List categories
const categories = await getAllCategories();

// Add a new category
await createCategory({ name: 'Books' });

// Delete a category by id
await deleteCategory('uuid-here');
```

---

## Notes
- The product brick expects the category as a string (name), not a foreign key.
- Always use the category `id` for deletion.
- The brick is designed to be plug-and-play and can be integrated into any Next.js or React admin dashboard.

---

## Environment Variables
No special environment variables are required for this brick. All configuration is handled via Supabase and your app's environment.

---

## Support
For questions or integration help, contact the Khamsat Service development team.

---

## How to Add This Brick

1. **Copy the Brick**  
   Place the `category` folder inside your `bricks/` directory.

2. **Copy and Merge Data Service**  
   - Open `bricks/category/data_services.js`.
   - Copy the functions you need and **merge them into your main `base-site/lib/data_services.js`**.  
     (Do not overwrite; add or merge the functions.)

3. **Copy Route Folders**  
   - Copy the `add/` and any other route folders from `bricks/category/` to the appropriate place in your main `app/` directory (e.g., `base-site/app/(admin)/dashboard/categories/`).

4. **Copy Components (if any)**  
   - If there are reusable components, copy them to your main components folder.

5. **Update Navigation (if needed)**  
   - Add links to the new category routes in your admin dashboard navigation. 
# Orders Management Brick

This brick provides robust order management for the Khamsat Service website. It is modular and integrates seamlessly with the rest of the system.

---

## Features
- List all orders
- Add new orders
- Edit and update orders
- Delete orders by unique id (uuid)
- Fully compatible with Supabase and the products/category bricks

---

## Supabase Table Schema

```
sql
create table orders (
  id uuid primary key default gen_random_uuid(),
  products jsonb not null, -- array of { name, orderedQuantity, pricePerOne, total }
  date timestamptz not null,
  title text not null,
  totalPrice numeric not null,
  state text not null check (state in ('Done', 'Processing'))
);
```
- Only the fields above are used.
- Deletion and updates are always by `id`.

---

## Data Structure

```js
{
  id: string, // uuid
  products: [
    { name: string, orderedQuantity: number, pricePerOne: number, total: number }
  ],
  date: string, // ISO date
  title: string,
  totalPrice: number,
  state: 'Done' | 'Processing'
}
```

---

## Integration Guide

### Prerequisites
- Supabase project set up
- The `orders` table created as above
- The `base-site` and `bricks` folders are present in your project

### Installation & Usage
1. **Add the Brick**
   - Place the `orders` brick folder inside your `bricks/` directory.
   - Ensure the data service (`data_services.js`) is available and imported where needed.

2. **Database Setup**
   - Run the SQL schema above in your Supabase SQL editor.

3. **Using the Data Service**
   - Import the functions from `bricks/orders/data_services.js`:
     ```js
     import { getAllOrders, getOrderById, createOrder, updateOrder, deleteOrder } from 'bricks/orders/data_services';
     ```
   - **Get all orders:**
     ```js
     const orders = await getAllOrders();
     ```
   - **Get order by id:**
     ```js
     const order = await getOrderById('uuid-of-order');
     ```
   - **Create an order:**
     ```js
     await createOrder({
       products: [
         { name: 'Product A', orderedQuantity: 2, pricePerOne: 10, total: 20 }
       ],
       date: new Date().toISOString(),
       title: 'Order for John Doe',
       totalPrice: 20,
       state: 'Processing'
     });
     ```
   - **Update an order:**
     ```js
     await updateOrder('uuid-of-order', {
       products: [
         { name: 'Product A', orderedQuantity: 3, pricePerOne: 10, total: 30 }
       ],
       date: new Date().toISOString(),
       title: 'Order for John Doe',
       totalPrice: 30,
       state: 'Done'
     });
     ```
   - **Delete an order by id:**
     ```js
     await deleteOrder('uuid-of-order');
     ```

4. **Frontend Integration**
   - Use the data service functions in your admin dashboard or wherever you need order management.
   - When creating an order, build the `products` array as shown above.
   - When deleting an order, always use its `id`.

---

## Example: Adding Order Management to a Page

```js
import { getAllOrders, createOrder, deleteOrder } from 'bricks/orders/data_services';

// List orders
const orders = await getAllOrders();

// Add a new order
await createOrder({
  products: [
    { name: 'Product A', orderedQuantity: 2, pricePerOne: 10, total: 20 }
  ],
  date: new Date().toISOString(),
  title: 'Order for John Doe',
  totalPrice: 20,
  state: 'Processing'
});

// Delete an order by id
await deleteOrder('uuid-here');
```

---

## Notes
- The orders brick expects the `products` field as a JSON array of product details.
- Always use the order `id` for deletion and updates.
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
   Place the `orders` folder inside your `bricks/` directory.

2. **Copy and Merge Data Service**  
   - Open `bricks/orders/data_services.js`.
   - Copy the functions you need and **merge them into your main `base-site/lib/data_services.js`**.  
     (Do not overwrite; add or merge the functions.)

3. **Copy Route Folders**  
   - Copy the `add/`, `edit/`, and any other route folders from `bricks/orders/` to the appropriate place in your main `app/` directory (e.g., `base-site/app/(admin)/dashboard/orders/`).

4. **Copy Components (if any)**  
   - If there are reusable components, copy them to your main components folder.

5. **Update Navigation (if needed)**  
   - Add links to the new order routes in your admin dashboard navigation. 
# Search Bar Brick

This brick provides a comprehensive search functionality for the Khamsat Service website.

## Features

- Debounced search input
- Search suggestions/autocomplete
- Clear button functionality
- Responsive design
- Keyboard navigation support
- Customizable styling

## Usage

```jsx
import SearchBar from './components/SearchBar';

// Basic usage
<SearchBar onSearch={(query) => console.log('Searching for:', query)} />

// With suggestions
<SearchBar 
  onSearch={(query) => handleSearch(query)}
  suggestions={['Product 1', 'Product 2', 'Service A']}
/>

// With custom placeholder and debounce
<SearchBar 
  placeholder="Search for services..."
  onSearch={handleSearch}
  debounceMs={500}
  className="custom-search-bar"
/>
```

## Props

- `onSearch` (function, required): Callback function called when search is triggered
- `placeholder` (string, optional): Placeholder text for the input. Defaults to "Search products..."
- `suggestions` (array, optional): Array of suggestion strings for autocomplete
- `className` (string, optional): Additional CSS classes
- `debounceMs` (number, optional): Debounce delay in milliseconds. Defaults to 300

## Features

- **Debounced Search**: Prevents excessive API calls while typing
- **Autocomplete**: Shows filtered suggestions based on input
- **Clear Button**: Allows users to quickly clear the search input
- **Keyboard Navigation**: Full keyboard support for accessibility
- **Responsive Design**: Adapts to different screen sizes
- **Focus Management**: Proper focus handling and click-outside detection

## Environment Variables

- `NEXT_PUBLIC_SEARCH_PLACEHOLDER`: Default search placeholder text
- `NEXT_PUBLIC_SEARCH_DEBOUNCE_MS`: Default debounce delay

## Installation

This brick is automatically integrated when selected in the website builder.

## How to Add This Brick

1. **Copy the Brick**  
   Place the `searchbar` folder inside your `bricks/` directory.

2. **Copy Components**  
   - Copy `SearchBar.jsx` and `SearchBar.module.css` from `bricks/searchbar/` to your main components folder (e.g., `base-site/app/components/`) if you want to use them globally.

3. **Import and Use the Component**  
   ```jsx
   import SearchBar from '@/app/components/SearchBar';
   ```

4. **Customize (Optional)**  
   - Pass suggestions, placeholder, debounceMs, or className as props.
   - Adjust the CSS module for your theme.

5. **Environment Variables (Optional)**  
   - Set `NEXT_PUBLIC_SEARCH_PLACEHOLDER` and `NEXT_PUBLIC_SEARCH_DEBOUNCE_MS` in `.env.local` for defaults.

6. **No Backend or Route Changes Needed**  
   This brick is frontend-only and plug-and-play. 
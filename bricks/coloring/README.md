# Coloring Buttons Brick

This brick provides color selection functionality for the Khamsat Service website.

## Features

- Interactive color selection buttons
- Visual feedback for selected colors
- Hover effects and animations
- Customizable color palette
- Selected color display
- Responsive design

## Usage

```jsx
import ColoringButtons from './components/ColoringButtons';

// Basic usage
<ColoringButtons 
  selectedColor={selectedColor}
  onColorSelect={setSelectedColor}
/>

// With custom colors
<ColoringButtons 
  colors={['#FF0000', '#00FF00', '#0000FF', '#FFFF00']}
  selectedColor={selectedColor}
  onColorSelect={setSelectedColor}
/>

// With labels
<ColoringButtons 
  selectedColor={selectedColor}
  onColorSelect={setSelectedColor}
  showLabels={true}
  className="custom-coloring"
/>
```

## Props

- `colors` (array, optional): Array of color hex values. Defaults to a standard color palette
- `selectedColor` (string, optional): Currently selected color
- `onColorSelect` (function, optional): Callback function when a color is selected
- `className` (string, optional): Additional CSS classes
- `showLabels` (boolean, optional): Whether to show labels. Defaults to false

## Features

- **Visual Selection**: Clear indication of selected color with checkmark
- **Hover Effects**: Smooth animations and visual feedback
- **Customizable Palette**: Easy to customize with different color sets
- **Selected Color Display**: Shows the currently selected color with preview
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: Proper ARIA labels and keyboard support

## Default Colors

The default color palette includes:
- Red (#FF0000)
- Green (#00FF00)
- Blue (#0000FF)
- Yellow (#FFFF00)
- Magenta (#FF00FF)
- Cyan (#00FFFF)

## Environment Variables

- `NEXT_PUBLIC_DEFAULT_COLORS`: Comma-separated list of default colors

## Installation

This brick is automatically integrated when selected in the website builder.

## How to Add This Brick

1. **Copy the Brick**  
   Place the entire `coloring` folder inside your project's `bricks/` directory.

2. **Copy Components**  
   - Copy `ColoringButtons.jsx` and `ColoringButtons.module.css` from `bricks/coloring/` to your main components folder (e.g., `base-site/app/components/`) if you want to use them globally.

3. **Import and Use the Component**  
   ```jsx
   import ColoringButtons from '@/app/components/ColoringButtons';
   ```

4. **Customize (Optional)**  
   - Pass custom color arrays, labels, or class names as props.
   - Adjust the CSS module for your theme.

5. **Environment Variables (Optional)**  
   - Set `NEXT_PUBLIC_DEFAULT_COLORS` in your `.env.local` for a custom default palette.

6. **No Backend or Route Changes Needed**  
   This brick is frontend-only and plug-and-play. 
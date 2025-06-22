# WhatsApp Integration Brick

This brick provides WhatsApp integration functionality for the Khamsat Service website.

## Features

- WhatsApp contact button component
- Customizable phone number and message
- Hover effects and animations
- Responsive design

## Usage

```jsx
import WhatsAppButton from './components/WhatsAppButton';

// Basic usage
<WhatsAppButton phoneNumber="+1234567890" />

// With custom message
<WhatsAppButton 
  phoneNumber="+1234567890" 
  message="Hello! I'm interested in your services."
/>

// With custom styling
<WhatsAppButton 
  phoneNumber="+1234567890" 
  className="custom-whatsapp-button"
/>
```

## Props

- `phoneNumber` (string, required): The WhatsApp phone number to contact
- `message` (string, optional): Default message to send. Defaults to "Hello! I'm interested in your services."
- `className` (string, optional): Additional CSS classes

## Environment Variables

- `NEXT_PUBLIC_WHATSAPP_PHONE`: Default WhatsApp phone number
- `NEXT_PUBLIC_WHATSAPP_MESSAGE`: Default WhatsApp message

## Installation

This brick is automatically integrated when selected in the website builder. 

## How to Add This Brick

1. **Copy the Brick**  
   Place the `whatsapp` folder inside your `bricks/` directory.

2. **Copy Components**  
   - Copy `WhatsAppButton.jsx` and `WhatsAppButton.module.css` from `bricks/whatsapp/` to your main components folder (e.g., `base-site/app/components/`) if you want to use them globally.

3. **Import and Use the Component**  
   ```jsx
   import WhatsAppButton from '@/app/components/WhatsAppButton';
   ```

4. **Customize (Optional)**  
   - Set a default message or custom class name.
   - Adjust the CSS module for your theme.

5. **Environment Variables (Optional)**  
   - Set `NEXT_PUBLIC_WHATSAPP_PHONE` and `NEXT_PUBLIC_WHATSAPP_MESSAGE` in `.env.local` for defaults.

6. **No Backend or Route Changes Needed**  
   This brick is frontend-only and plug-and-play. 
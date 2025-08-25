# AgriCommerce

A React-based e-commerce platform for agricultural products, designed for Indian farmers and agricultural businesses.

## Features

- Browse agricultural products (seeds, pesticides, etc.)
- Search functionality
- Category filtering
- Shopping cart management
- Responsive design for all devices

## Project Structure

```
├── public/
│   └── index.html          # HTML template
├── src/
│   ├── components/         # UI components
│   │   ├── ui/             # Base UI components
│   │   ├── FertilizersSection.jsx
│   │   ├── PesticidesSection.jsx
│   │   └── SeedsSection.jsx
│   ├── AgriCommerce.jsx    # Main application component
│   ├── AgriCommerce.css    # Main styles
│   ├── SimpleAgriCommerce.jsx  # Simplified version
│   ├── StyledAgriCommerce.jsx  # Styled version with enhanced UI
│   ├── index.js            # Application entry point
│   └── index.css           # Global styles
└── package.json            # Project dependencies and scripts
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```
   git clone https://github.com/yourusername/agricommerce.git
   ```

2. Install dependencies
   ```
   npm install
   ```

3. Start the development server
   ```
   npm start
   ```

4. Open your browser to `http://localhost:3000`

### Deployment to GitHub Pages

1. Update the `homepage` field in `package.json` with your GitHub username:
   ```
   "homepage": "https://yourusername.github.io/agricommerce"
   ```

2. Install GitHub Pages dependency:
   ```
   npm install --save-dev gh-pages
   ```

3. Deploy to GitHub Pages:
   ```
   npm run deploy
   ```

## Technologies Used

- React
- CSS
- Lucide React (icons)
- Framer Motion (animations)

## License

MIT

## Acknowledgments

- Images sourced from Unsplash
- Icons from Lucide React

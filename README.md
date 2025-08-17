# Lux Experience Web App

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm (v9+ recommended)

### Installation
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install

# Project Setup & Folder Structure 

## 1. Initialize Project
- Initialize Vite Project with React + TypeScript
- Install Required Dependencies

## 2. Setup Redux
- Setup Redux Store
- Wrap app with the Redux `Provider` in `src/main.tsx`

## 3. Routing & Styling
- Setup React Router inside `App.tsx`
- Configure SCSS under `styles/main.scss` as global SCSS file

---

# API Integration: Get Films List

## 1. Setup
- Install Axios for fetching API data
- Add interfaces under `types/index.tsx`:
  - `Film` interface
  - Films interface for API response (for 3 categories)

## 2. Redux Implementation
- Add films slice under store:
  - Fetch data from API
  - Save response in Redux state
- Create:
  - `appClient` file under `src/services` (reusable axios instance)
  - `filmAPI` for API calls in Redux slice
- Customize film slice to handle different categories for carousel

---

# Key Components

## Header
- Dynamic & reusable for different pages

## Carousel & Film Card
**Implementation Steps:**
1. Create basic structure:
   - Category title
   - Films array (using defined interface)
2. Create `FilmCard` component (used in carousel map loop):
   - Shows: title, image, short description
   - Click to view more details
3. Add SCSS files for both components
4. DRY Code:
   - Reusable `Carousel` and `FilmCard` components
5. Dynamic rendering:
   - Use `categories array` to map through categories
   - Avoid repetitive code
6. Add Navigation Arrows:
   - Horizontal scroll functionality
   - State handler + styling
7. Add loading skeletons during data fetch

## Skeletons
- For film card and details (shown during loading)

## Navigator
- Contains 2 buttons:
  - Back to home
  - Go to wishlist
- Shows buttons conditionally based on current page

---

# Pages

## Home Page
- Shows:
  - Header title
  - Navigator component
  - Carousel/FilmCards for each category
- Uses different endpoint URLs for each category

## Film Details Page
1. Page Structure:
   - Shows clicked film's details
   - New Redux state for clicked film details
   - Styled components
   - Loading skeleton during fetch

2. Features:
   - Genre utils function (finds first film category by ID for styling)
   - Film details includes:
     - Image, title, overview
     - Wishlist button
     - Extra info: release date, rating, status, tagline, adults

3. Wishlist Functionality:
   - Handle add/remove from wishlist
   - Redux slice with add/remove functions
   - Persist to localStorage
   - Navigation and toast notifications

## Wishlist Page
- Displays film cards from wishlist
- Redux state + localStorage persistence
- Maintains data until user removes from UI

---

# Implementation Steps

## 1. Package Installation
Install the required Express.js package and its TypeScript types.

## 2. Server Entry Creation
Create a new server entry file that will:
- Handle SSR rendering using ReactDOM's `renderToString`
- Wrap your application with Redux Provider and StaticRouter
- Capture the initial Redux state

## 3. Express Server Setup
Configure an Express server that will:
- Integrate with Vite's middleware
- Serve your SSR-rendered application
- Inject the preloaded Redux state into the HTML template

## 4. Client-Side Hydration
Modify your existing client entry to:
- Hydrate the app instead of rendering from scratch
- Pick up the server-injected Redux state
- Initialize the store with the preloaded state

## 5. HTML Template Modification
Update your main HTML file to include:
- Placeholder for SSR-rendered content
- Slot for preloaded state injection

## 6. Build Script Updates
Add new scripts to `package.json` for:
- Building both client and server bundles
- Previewing the SSR application
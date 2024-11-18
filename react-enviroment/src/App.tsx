// src/App.tsx

import 'bootstrap';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ChatApp from './ChatApp';
import Navbar from './components/Navbar';
import { AuthProvider } from './contexts/authContext/AuthProvider';
import About from './pages/About';
import Brands from './pages/Brands';
import FragrancePage from './pages/FragrancePage';
import Fragrances from './pages/Fragrances';
import Home from './pages/Home';
import Notes from './pages/Notes';
import TestPage from './pages/TestPage';
import YourListsPage from './pages/YourListsPage';

// App Component
// This component serves as the root component for the entire application. It includes routing and authentication context setup.
function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        {/* Routes define the different paths in the application and the corresponding components to render. */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fragrances" element={<Fragrances />} />
          <Route path="/brands" element={<Brands />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/about" element={<About />} />
          <Route path="/your-lists" element={<YourListsPage />} />
          <Route path="/testpage" element={<TestPage />} />
          <Route path="/fragrance/:id" element={<FragrancePage />} />
        </Routes>
      </Router>
      {/* ChatApp component renders a chat feature for user interaction */}
      <ChatApp />
    </AuthProvider>
  );
}

export default App;

/*
Documentation Summary:
- `App` is the root component of the application, responsible for setting up routing and the authentication context.
- The `AuthProvider` wraps the entire application to provide user authentication state.
- `Router` is used to define different application paths using `Routes` and `Route` components.
- The navigation bar (`Navbar`) is rendered at the top of all pages.
- The `ChatApp` component provides an interactive chat feature for users, rendered outside of routing to be available on all pages.
- The available routes include paths such as `/fragrances`, `/brands`, `/notes`, `/about`, `/your-lists`, and a dynamic route `/fragrance/:id` for individual fragrance details.
*/
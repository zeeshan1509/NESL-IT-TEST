
import { AuthProvider, useAuthContext } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import FeedPage from './pages/FeedPage';

function AppContent() {
  const { token } = useAuthContext();
  return token ? <FeedPage /> : <LoginPage />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

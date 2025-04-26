import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { getAuthData } from './utils/token';
import Navbar from './components/nav/Navbar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';

function App() {
    const { token } = getAuthData();

    return (
        <BrowserRouter>
            <Navbar />
            <Routes>
                <Route
                    path="/login"
                    element={token ? <Navigate to="/home" /> : <LoginPage />}
                />
                <Route
                    path="/register"
                    element={token ? <Navigate to="/home" /> : <RegisterPage />}
                />
                <Route
                    path="/home"
                    element={token ? <HomePage /> : <Navigate to="/login" />}
                />
                <Route path="*" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
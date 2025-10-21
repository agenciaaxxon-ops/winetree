import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinktreePage from './pages/LinktreePage';
import AdminMetricsPage from './pages/AdminMetricsPage';
import LoginPage from './pages/LoginPage'; // Importando a página de login
import ProtectedRoute from './components/ProtectedRoute'; // Importando o guardião

function App() {
    return (
        <Router>
            <main>
                <Routes>
                    {/* Rota pública para a página de links */}
                    <Route path="/" element={<LinktreePage />} />

                    {/* Rota pública para a página de login */}
                    <Route path="/login" element={<LoginPage />} />

                    {/* Rota protegida para a página de métricas */}
                    <Route path="/admin" element={<ProtectedRoute />}>
                        {/* O Outlet dentro de ProtectedRoute renderizará este elemento */}
                        <Route index element={<AdminMetricsPage />} />
                    </Route>

                    {/* Você pode adicionar uma rota de "Não encontrado" (404) aqui se desejar */}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
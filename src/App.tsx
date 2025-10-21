import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LinktreePage from './pages/LinktreePage';
import AdminMetricsPage from './pages/AdminMetricsPage'; // Importando a nova página

function App() {
    return (
        <Router>
            <main>
                <Routes>
                    {/* Rota para a página de links (página inicial) */}
                    <Route path="/" element={<LinktreePage />} />

                    {/* Rota para a página de métricas */}
                    <Route path="/admin" element={<AdminMetricsPage />} />

                    {/* Você pode adicionar uma rota de "Não encontrado" (404) aqui se desejar */}
                    {/* <Route path="*" element={<NotFoundPage />} /> */}
                </Routes>
            </main>
        </Router>
    );
}

export default App;
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import GrammarPage from './pages/GrammarPage.jsx';
import ReadingPage from './pages/ReadingPage.jsx';
import SpeechPage from './pages/SpeechPage.jsx';
import ProfilePage from "./pages/ProfilePage.jsx";


function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/grammar" element={<GrammarPage />} />
                <Route path="/reading" element={<ReadingPage />} />
                <Route path="/speech" element={<SpeechPage />} />
                <Route path="/Profile" element={<ProfilePage />} />
            </Routes>
        </>
    );
}

export default App;



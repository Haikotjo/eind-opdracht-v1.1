import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Modal from 'react-modal';
import AuthContextProvider, {AuthContext} from "./context/AuthContext";
import './styles/App.scss'
import {SavedProvider} from "./context/SavedContext";
import {DarkModeProvider} from "./context/DarkModeContext";


Modal.setAppElement('#root');
function App() {
    return (
            <Router>
                {/* AuthContextProvider facilitates sharing of authentication data within the application */}
                <AuthContextProvider>
                    <SavedProvider>
                    <DarkModeProvider>
                    <Routes />
                    </DarkModeProvider>
                    </SavedProvider>
                </AuthContextProvider>
            </Router>
    );
}

export default App;
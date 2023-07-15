import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Modal from 'react-modal';
import AuthContextProvider, {AuthContext} from "./context/AuthContext";
import './styles/App.scss'
import {SavedProvider} from "./context/SavedContext";


Modal.setAppElement('#root');
function App() {
    return (
            <Router>
                <AuthContextProvider>
                    <SavedProvider>
                    <Routes />
                    </SavedProvider>
                </AuthContextProvider>
            </Router>
    );
}

export default App;





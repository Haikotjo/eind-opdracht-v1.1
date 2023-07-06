import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Modal from 'react-modal';
import AuthContextProvider, {AuthContext} from "./context/AuthContext";
import './styles/App.scss'
import {CssBaseline} from "@mui/material";

Modal.setAppElement('#root');
function App() {
    return (
        <Router>
            <CssBaseline />
            <AuthContextProvider>
                <Routes />
            </AuthContextProvider>
        </Router>
    );
}
export default App;
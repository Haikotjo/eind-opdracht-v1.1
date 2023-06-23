import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import Modal from 'react-modal';
import AuthContextProvider, {AuthContext} from "./context/AuthContext";

Modal.setAppElement('#root');
function App() {
    return (
        <Router>
            <AuthContextProvider>
                <Routes />
            </AuthContextProvider>
        </Router>
    );
}
export default App;





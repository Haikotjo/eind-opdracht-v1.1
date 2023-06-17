import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './NavBar/NavBar';
import Routes from './Routes';
import Modal from 'react-modal';

Modal.setAppElement('#root');
function App() {
    return (
        <Router>
            <Routes />
        </Router>
    );
}
export default App;
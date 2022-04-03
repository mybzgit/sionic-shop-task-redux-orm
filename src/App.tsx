import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/navigation/Footer';
import Header from './components/navigation/Header';
import SelectProductPopup from './components/products/SelectProductPopup';
import Cart from './pages/Cart';
import Main from './pages/Main';
import Order from './pages/Order';
import OrderHistory from './pages/OrderHistory';

function App() {
    return (
        <div className="App">
            <div className="header">
                <Header />
            </div>
            <div className="sidebar">Реклама и акции</div>
            <div className="main">
                <Routes>
                    <Route path="/" element={<Main />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order" element={<Order />} />
                    <Route path="/history" element={<OrderHistory />} />
                </Routes>
            </div>
            <div className="footer">
                <Footer />
            </div>
        </div>
    );
}

export default App;

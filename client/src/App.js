
import './App.css';
// import Navbar from './components/Navbar';

import {Routes,Route} from 'react-router-dom'

import Navbar from './components/Navbar';
import Home from './components/Home'
import FarmerRegister from './components/FarmerRegister'
import FarmerLogin from './components/FarmerLogin'
import BuyerRegister from './components/BuyerRegister';
import BuyerLogin from './components/BuyerLogin';
import BuyerDashboard from './components/BuyerDashboard';
import FarmerDashboard from './components/FarmerDashboard';
import Products from './components/Products';
import Requirement from './components/Requirement';
import About from './components/About';
import Contact from './components/Contact';
import ProductDetails from './components/ProductDetails';
import BuyerDetailsPage from './components/BuyerDetailsPage';
import RequirementDetails from './components/RequirementDetails';
import PrivacyPolicy from './components/PrivacyPolicy';
import Disclaimer from './components/Disclaimer';
import Footer from './components/Footer';
import MarketPrices from './components/MarketPrices';

function App() {
  return (
    <div className="App">
          <Navbar/>
      
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route path='/farmer-register' element={<FarmerRegister/>}/>
          <Route path='/farmer-login' element={<FarmerLogin/>}/>
          <Route path='/buyer-register' element={<BuyerRegister/>}/>
          <Route path='/buyer-login' element={<BuyerLogin/>}/>
          <Route path='/buyer-dashboard' element={<BuyerDashboard/>} />
          <Route path='/farmer-dashboard' element={<FarmerDashboard/>}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/requirements' element={<Requirement/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/buyer-details/:requirementId" element={<BuyerDetailsPage />} />
          <Route path="/requirement/:id" element={<RequirementDetails />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path='/footer' element={<Footer/>}/>
          <Route path='/market-prices' element={<MarketPrices/>}/>
        </Routes>
      
  
     {/* <Home/> */}
    </div>
  );
}

export default App;









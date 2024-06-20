import './App.css';

import Header from './Components/HeadSection';
import Footer from './Components/Footer';
import { Outlet } from "react-router-dom";
import StoreListProvider from './Store/store-list';

function App() {
  return (
    <StoreListProvider>
      <div className='appContainer'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </StoreListProvider>
  );
}

export default App;

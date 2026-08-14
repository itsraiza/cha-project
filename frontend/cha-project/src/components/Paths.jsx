import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SobreNos from "../pages/SobreNos";
import GiftPage from "../pages/GiftPage";
import MessagePage from "../pages/MessagePage";
import { Toaster } from "react-hot-toast";
import ScrollToTop from "./ScrollToTop";

const Pahts = () => {
    return ( 
        <>
           <BrowserRouter>
           <Toaster position="top-right" autoClose={4000}/>
           <ScrollToTop />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/sobrenos" element={<SobreNos />} />
                <Route path="/presentes" element={<GiftPage />} />
                <Route path="/recados" element={<MessagePage />} />
            </Routes>
         </BrowserRouter>
        </>
     );
}
 
export default Pahts;
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginRegister from './pages/LoginRegister';
import Gallery from './pages/Gallery'; // السطر ده عشان نستدعي صفحة المعرض
import Upload from './pages/Upload';
import PhotoDetail from './pages/PhotoDetail';
import Home from'./pages/Home';
import About from './pages/About';

/**
 * المكون الرئيسي للتطبيق.
 * يحتوي على شريط التنقل (Navbar) ونظام التوجيه (Routes).
 */
function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* الصفحة الرئيسية */}
        <Route path="/" element={<Home/>} />
        
        {/* صفحة تسجيل الدخول */}
        <Route path="/login" element={<LoginRegister />} />
        
        {/* صفحة المعرض */}
        <Route path="/gallery" element={<Gallery />} />
         <Route path="/upload" element={<Upload/>} />
         <Route path="/Photos/:id" element={<PhotoDetail/>} />
         <Route path="/about" element={<About/>}/>
         
         
      </Routes>
    </div>
  )
}

export default App;
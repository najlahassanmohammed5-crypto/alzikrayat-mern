import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  // بننظر هل فيه مستخدم مسجل في الـ LocalStorage ولا لأ
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();

  // دالة تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem('user'); // مسح بيانات المستخدم
    navigate('/login'); // توجيهه لصفحة الدخول
    window.location.reload(); // عمل تحديث عشان الشريط يتحدث
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">الذكريات</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">الرئيسية</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/gallery">المعرض</Link>
            </li>
            <li className="nav-item">
  <Link className="nav-link" to="/about">عن الموقع</Link>
</li>
            <li className="nav-item">
              <Link className="nav-link" to="/upload">رفع صورة</Link>
            </li>
            
            {/* لو فيه مستخدم مسجل، نظهر اسمه وزرار الخروج */}
            {user ? (
              <>
                <li className="nav-item">
                  <span className="nav-link text-light fw-bold">Hi {user.firstName}</span>
                </li>
                <li className="nav-item">
                  <button onClick={handleLogout} className="btn btn-outline-danger btn-sm mt-1 ms-2">تسجيل خروج</button>
                </li>
              </>
            ) : (
              /* لو ماف مستخدم، نظهر زرار تسجيل الدخول */
              <li className="nav-item">
                <Link className="nav-link" to="/login">تسجيل الدخول</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
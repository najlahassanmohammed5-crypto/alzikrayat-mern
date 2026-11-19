import { Link } from 'react-router-dom';

function Home() {
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="container mt-5">
      <div className="p-5 mb-4 bg-light rounded-3 shadow-sm text-center">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold mb-3">مرحباً بك في تطبيق الذكريات</h1>
          <p className="col-md-8 fs-4 mx-auto text-muted mb-4">
            احتفظ بأجمل لحظاتك وصورك في مكان واحد، وشاركها مع أصدقائك بكل سهولة وأمان.
          </p>
          
          <div className="d-flex justify-content-center gap-3">
            <Link to="/gallery" className="btn btn-primary btn-lg px-4">
              تصفح المعرض
            </Link>
            {user ? (
              <Link to="/upload" className="btn btn-success btn-lg px-4">
                رفع صورة جديدة
              </Link>
            ) : (
              <Link to="/login" className="btn btn-outline-secondary btn-lg px-4">
                تسجيل الدخول
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
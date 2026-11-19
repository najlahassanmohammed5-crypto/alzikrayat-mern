import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Gallery() {
  // حالة لتخزين قائمة الصور
  const [photos, setPhotos] = useState([]);
  // حالة لمعرفة ما إذا كانت البيانات قيد التحميل
  const [loading, setLoading] = useState(true);
  // حالة لتخزين أي رسائل خطأ
  const [error, setError] = useState('');
  
  // حالة للتحكم في نمط عرض المعرض (شبكة أو قائمة)
  const [viewMode, setViewMode] = useState('grid'); 

  // دالة لجلب الصور من الخادم عند تحميل الصفحة
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/photos');
        setPhotos(response.data);
        setLoading(false);
      } catch (err) {
        setError('حدث خطأ أثناء جلب الصور');
        setLoading(false);
      }
    };
    fetchPhotos();
  }, []);

  // عرض رسالة التحميل إذا كانت البيانات لم تصل بعد
  if (loading) return <div className="text-center mt-5"><h3>جاري التحميل...</h3></div>;
  // عرض رسالة الخطأ في حال فشل جلب البيانات
  if (error) return <div className="alert alert-danger mt-5">{error}</div>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>معرض الصور</h2>
        
        {/* أزرار للتبديل بين نمط الشبكة ونمط القائمة */}
        <div className="btn-group">
          <button 
            className={`btn btn-sm ${viewMode === 'grid' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setViewMode('grid')}
          >
            شبكة (Grid)
          </button>
          <button 
            className={`btn btn-sm ${viewMode === 'list' ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => setViewMode('list')}
          >
            قائمة (List)
          </button>
        </div>
      </div>
      
      {/* التحقق مما إذا كان المعرض فارغاً أم لا */}
      {photos.length === 0 ? (
        <div className="text-center mt-5">
          <h4>لا توجد صور حتى الآن</h4>
          <Link to="/upload" className="btn btn-primary mt-3">ارفع أول صورة</Link>
        </div>
      ) : (
        <div className="row">
          {photos.map((photo) => (
            <div 
              key={photo._id} 
              // تحديد حجم العمود بناءً على نمط العرض المختار
              className={viewMode === 'grid' ? 'col-md-4 mb-4' : 'col-12 mb-3'}
            >
              <div className={`card h-100 shadow-sm ${viewMode === 'list' ? 'flex-row' : ''}`}>
                <img 
                  src={`http://localhost:3000/uploads/${photo.fileName}`} 
                  className={`card-img-top ${viewMode === 'list' ? 'col-md-4' : ''}`}
                  alt={photo.title}
                  style={{ 
                    height: viewMode === 'grid' ? '200px' : '150px', 
                    objectFit: 'cover' 
                  }}
                />
                <div className={`card-body ${viewMode === 'list' ? 'col-md-8' : ''}`}>
                  <h5 className="card-title">{photo.title}</h5>
                  <p className="card-text text-muted">
                    بواسطة: {photo.userId?.firstName} {photo.userId?.lastName}
                  </p>
                  <Link to={`/photos/${photo._id}`} className="btn btn-outline-primary btn-sm">
                    عرض التفاصيل
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Gallery;
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Upload() {
  // حالات تخزين بيانات النموذج وحالة الطلب
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image,setImage]=useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // التحقق من تسجيل دخول المستخدم عند فتح الصفحة
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/login');
    }
  }, [navigate]);

  // حفظ ملف الصورة المختار في الحالة
  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  // إرسال بيانات الصورة والملف إلى السيرفر عبر FormData
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      setError('يجب تسجيل الدخول أولاً');
      return;
    }

    const formData = new FormData();
    formData.append('image', image);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('userId', user._id);

    setLoading(true);
    try {
      await axios.post('http://localhost:3000/api/photos', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setMessage('تم رفع الصورة بنجاح!');
      setTimeout(() => navigate('/gallery'), 1500);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء الرفع');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">رفع صورة جديدة</h2>

              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">عنوان الصورة</label>
                  <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} required />
                </div>
                <div className="mb-3">
                  <label className="form-label">الوصف (اختياري)</label>
                  <textarea className="form-control" onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label">اختر الصورة</label>
                  <input 
                    type="file" 
                    className="form-control" 
                    accept="image/jpeg, image/png, image/gif"
                    onChange={handleFileChange} 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={loading}>
                  {loading ? 'جاري الرفع...' : 'رفع الصورة'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Upload;

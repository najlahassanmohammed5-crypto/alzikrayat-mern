import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function PhotoDetail() {
  const { id } = useParams(); // بنجيب الـ ID بتاع الصورة من الرابط
  const navigate = useNavigate();
  
  const [photo, setPhoto] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState('');

  // جلب بيانات الصورة والتعليقات عند تحميل الصفحة
  // جلب بيانات الصورة والتعليقات عند تحميل الصفحة
  useEffect(() => {
    const fetchData = async () => {
      try {
        const photoRes = await axios.get(`http://localhost:3000/api/photos/${id}`);
        setPhoto(photoRes.data);
      } catch (err) {
        console.error('Error fetching photo:', err);
        setError('حدث خطأ أثناء جلب بيانات الصورة');
        return;
      }

      try {
        const commentsRes = await axios.get(`http://localhost:3000/api/photos/${id}/comments`);
        setComments(commentsRes.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
        setComments([]);
      }
    };
    fetchData();
  }, [id]);

  // دالة إضافة تعليق جديد
  const handleAddComment = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem('user'));
    
    if (!user) {
      alert('يجب تسجيل الدخول أولاً');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3000/api/photos/${id}/comments`, {
        userId: user._id,
        comment: newComment
      });
      
      // تحديث التعليقات فوراً من غير ما نعمل Refresh
      setComments([...comments, response.data.comment]);
      setNewComment('');
    } catch (err) {
      alert('حدث خطأ أثناء إضافة التعليق');
    }
  };

  // دالة حذف الصورة
  const handleDelete = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;

    if (window.confirm('هل أنت متأكد من حذف الصورة؟')) {
      try {
        await axios.delete(`http://localhost:3000/api/photos/${id}`, {
          data: { userId: user._id }
        });
        navigate('/gallery'); // نرجع للمعرض بعد الحذف
      } catch (err) {
        alert(err.response?.data?.message || 'حدث خطأ أثناء الحذف');
      }
    }
  };

  if (error) return <div className="container mt-5 alert alert-danger">{error}</div>;
  if (!photo) return <div className="container mt-5 text-center">جاري التحميل...</div>;

  // التحقق إذا كان المستخدم الحالي هو صاحب الصورة
  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isOwner = currentUser && photo.userId._id === currentUser._id;

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-8">
          <img 
            src={`http://localhost:3000/uploads/${photo.fileName}`} 
            alt={photo.title} 
            className="img-fluid rounded shadow"
            style={{ width: '100%', maxHeight: '600px', objectFit: 'contain', backgroundColor: '#f8f9fa' }}
          />
        </div>
        
        <div className="col-md-4">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="card-title">{photo.title}</h3>
              <p className="text-muted">
                بواسطة: {photo.userId.firstName} {photo.userId.lastName}
              </p>
              <p>{photo.description}</p>
              
              {/* زرار الحذف يظهر فقط لصاحب الصورة */}
              {isOwner && (
                <button onClick={handleDelete} className="btn btn-danger w-100 mb-3">
                  حذف الصورة
                </button>
              )}
            </div>
          </div>

          {/* قسم التعليقات */}
          <div className="card mt-3 shadow">
            <div className="card-header bg-dark text-white">التعليقات</div>
            <div className="card-body" style={{ maxHeight: '300px', overflowY: 'auto' }}>
              {comments.length === 0 ? (
                <p className="text-muted">لا توجد تعليقات حتى الآن.</p>
              ) : (
                comments.map((c) => (
                  <div key={c._id} className="mb-2 border-bottom pb-2">
                    <strong>{c.userId.firstName} {c.userId.lastName}: </strong>
                    <span>{c.comment}</span>
                  </div>
                ))
              )}
            </div>
            <div className="card-footer">
              <form onSubmit={handleAddComment}>
                <div className="input-group">
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="أضف تعليقاً..." 
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    required
                  />
                  <button type="submit" className="btn btn-primary">نشر</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PhotoDetail;
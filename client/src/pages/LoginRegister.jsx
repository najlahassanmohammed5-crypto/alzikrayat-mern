import { useState } from 'react';
import axios from 'axios';

/**
 * صفحة تسجيل الدخول وإنشاء حساب جديد.
 * تقوم بإرسال البيانات إلى الـ API الخاص بالسيرفر.
 */
function LoginRegister() {
  const [isLogin, setIsLogin] = useState(true);
  
  // حالة لتخزين بيانات الفورم
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  // حالة لتخزين الأخطاء أو رسائل النجاح
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // دالة لتحديث البيانات عند الكتابة في الحقول
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // دالة للتعامل مع إرسال الفورم
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    try {
      if (isLogin) {
        // طلب تسجيل الدخول
        const response = await axios.post('http://localhost:3000/api/auth/login', {
          email: formData.email,
          password: formData.password
        });
        setMessage(response.data.message);
        // هنا ممكن نخزن بيانات المستخدم في الـ LocalStorage ونوجهه للصفحة الرئيسية
        localStorage.setItem('user', JSON.stringify(response.data.user));
        window.location.href = '/'; // توجيه للصفحة الرئيسية بعد النجاح
        
      } else {
        // طلب إنشاء حساب جديد
        const response = await axios.post('http://localhost:3000/api/auth/register', formData);
        setMessage(response.data.message);
        setIsLogin(true); // تحويل المستخدم لصفحة تسجيل الدخول بعد إنشاء الحساب
      }
    } catch (err) {
      // عرض الخطأ اللي جاي من السيرفر
      setError(err.response?.data?.message || 'حدث خطأ، يرجى المحاولة مرة أخرى');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-5">
          <div className="card shadow">
            <div className="card-body p-4">
              <h2 className="text-center mb-4">
                {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
              </h2>

              {/* عرض رسائل النجاح أو الخطأ */}
              {message && <div className="alert alert-success">{message}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleSubmit}>
                {!isLogin && (
                  <>
                    <div className="mb-3">
                      <label className="form-label">الاسم الأول</label>
                      <input type="text" name="firstName" className="form-control" onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">الاسم الأخير</label>
                      <input type="text" name="lastName" className="form-control" onChange={handleChange} required />
                    </div>
                  </>
                )}

                <div className="mb-3">
                  <label className="form-label">البريد الإلكتروني</label>
                  <input type="email" name="email" className="form-control" onChange={handleChange} required />
                </div>

                <div className="mb-3">
                  <label className="form-label">كلمة المرور</label>
                  <input type="password" name="password" className="form-control" onChange={handleChange} required />
                </div>

                <button type="submit" className="btn btn-primary w-100 mb-3">
                  {isLogin ? 'دخول' : 'إنشاء الحساب'}
                </button>
              </form>

              <div className="text-center">
                <button 
                  className="btn btn-link text-decoration-none" 
                  onClick={() => {
                    setIsLogin(!isLogin);
                    setError('');
                    setMessage('');
                  }}
                >
                  {isLogin ? 'ليس لديك حساب؟ إنشاء حساب جديد' : 'لديك حساب بالفعل؟ تسجيل الدخول'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
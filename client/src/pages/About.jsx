function About() {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-sm p-4">
            <h2 className="text-center mb-4 text-primary">من نحن</h2>
            <p className="fs-5 lh-lg text-muted">
              "الذكريات" هو تطبيق ويب لمشاركة الصور والتعليق عليها، تم تطويره كمشروع 
              لمقرر تقنيات الويب المتقدمة بجامعة السودان للعلوم والتكنولوجيا.
            </p>
            <p className="fs-5 lh-lg text-muted">
              يهدف التطبيق إلى توفير بيئة بسيطة وآمنة للمستخدمين لرفع صورهم 
              ومشاركة لحظاتهم المميزة مع الآخرين، مع ضمان الخصوصية وحماية الملكية 
              لكل صورة.
            </p>
            <p className="fs-5 lh-lg text-muted">
              تم بناء هذا التطبيق باستخدام أحدث التقنيات (MERN Stack)، 
              حيث يعتمد على React.js في الواجهة الأمامية، و Node.js و Express.js 
              في الخادم، وقاعدة بيانات MongoDB.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
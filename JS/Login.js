    // ========== STORAGE (simulated DB) ==========
    function getUsers() {
        return JSON.parse(localStorage.getItem('verdict_users') || '[]');
    }
    function saveUsers(users) {
        localStorage.setItem('verdict_users', JSON.stringify(users));
    }
 
    // ========== OTP STATE ==========
    let generatedOTP = '';
    let countdownTimer = null;
 
    // ========== TAB SWITCH ==========
    function switchTab(tab) {
        document.querySelectorAll('.tab-btn').forEach((b, i) => {
            b.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register'));
        });
        document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
        document.getElementById(tab + '-panel').classList.add('active');
        clearAlerts();
    }
 
    function clearAlerts() {
        document.querySelectorAll('.alert').forEach(a => a.classList.remove('show'));
    }
 
    // ========== TOGGLE PASSWORD ==========
    function togglePass(id, btn) {
        const inp = document.getElementById(id);
        const icon = btn.querySelector('i');
        if (inp.type === 'password') {
            inp.type = 'text';
            icon.className = 'fa-solid fa-eye-slash';
        } else {
            inp.type = 'password';
            icon.className = 'fa-solid fa-eye';
        }
    }
 
    // ========== PASSWORD STRENGTH ==========
    function checkStrength(val) {
        const bars = [document.getElementById('s1'), document.getElementById('s2'), document.getElementById('s3'), document.getElementById('s4')];
        const txt = document.getElementById('strength-text');
        bars.forEach(b => b.style.background = 'rgba(255,255,255,0.08)');
 
        if (!val) { txt.textContent = ''; return; }
 
        let score = 0;
        if (val.length >= 6) score++;
        if (val.length >= 10) score++;
        if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
        if (/[^A-Za-z0-9]/.test(val)) score++;
 
        const colors = ['#ff4d4d', '#f0b429', '#3AADFC', '#22c55e'];
        const labels = ['Weak', 'Fair', 'Good', 'Strong'];
        for (let i = 0; i < score; i++) bars[i].style.background = colors[score - 1];
        txt.textContent = labels[score - 1] || '';
        txt.style.color = colors[score - 1] || '';
    }
 
    // ========== LOGIN ==========
    function handleLogin() {
        const email = document.getElementById('login-email').value.trim();
        const pass = document.getElementById('login-password').value;
        const btn = document.querySelector('#login-panel .submit-btn');
 
        clearAlerts();
 
        if (!email || !pass) {
            showAlert('login-error', 'login-error-msg', 'Please fill in all fields.');
            return;
        }
 
        btn.classList.add('loading');
 
        setTimeout(() => {
            btn.classList.remove('loading');
            const users = getUsers();
            const user = users.find(u => u.email === email && u.password === pass);
 
            if (user) {
                showToast('success', `<i class="fa-solid fa-popcorn"></i>`, `Welcome back, ${user.name}! 🎬`);
                setTimeout(() => { window.location.href = 'Home.html'; }, 1800);
            } else {
                showAlert('login-error', 'login-error-msg', 'Invalid email or password. Try again.');
                shakeBtn(btn);
            }
        }, 1200);
    }
 
    // ========== REGISTER STEP 1 ==========
    function handleRegister() {
        const name = document.getElementById('reg-name').value.trim();
        const email = document.getElementById('reg-email').value.trim();
        const pass = document.getElementById('reg-password').value;
        const confirm = document.getElementById('reg-confirm').value;
        const btn = document.querySelector('#reg-step-1 .submit-btn');
 
        clearAlerts();
 
        if (!name || !email || !pass || !confirm) {
            showAlert('reg-error', 'reg-error-msg', 'All fields are required.');
            return;
        }
        if (!isValidEmail(email)) {
            showAlert('reg-error', 'reg-error-msg', 'Enter a valid email address.');
            return;
        }
        if (pass.length < 6) {
            showAlert('reg-error', 'reg-error-msg', 'Password must be at least 6 characters.');
            return;
        }
        if (pass !== confirm) {
            showAlert('reg-error', 'reg-error-msg', 'Passwords do not match.');
            return;
        }
 
        const users = getUsers();
        if (users.find(u => u.email === email)) {
            showAlert('reg-error', 'reg-error-msg', 'This email is already registered. Please login.');
            return;
        }
 
        btn.classList.add('loading');
 
        setTimeout(() => {
            btn.classList.remove('loading');
            sendOTP(email, name);
        }, 1000);
    }
 
    
    // ========== BACK TO DETAILS ==========
    function goBackToDetails() {
        document.getElementById('reg-step-2').style.display = 'none';
        document.getElementById('reg-step-1').style.display = 'block';
        document.getElementById('step-1').classList.remove('done');
        document.getElementById('step-1').classList.add('active');
        document.getElementById('step-1').querySelector('.step-circle').innerHTML = '1';
        document.getElementById('step-2').classList.remove('active');
        clearInterval(countdownTimer);
    }
 
    // ========== SOCIAL LOGIN ==========
    function socialLogin(provider) {
        showToast('info', '<i class="fa-solid fa-circle-info"></i>', `${provider} login coming soon!`);
    }
 
    // ========== HELPERS ==========
    function isValidEmail(e) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
    }
 
    function showAlert(alertId, msgId, msg) {
        const el = document.getElementById(alertId);
        document.getElementById(msgId).textContent = msg;
        el.classList.add('show');
    }
 
    function shakeBtn(btn) {
        btn.style.animation = 'none';
        btn.style.transform = 'translateX(-6px)';
        setTimeout(() => { btn.style.transform = 'translateX(6px)'; }, 100);
        setTimeout(() => { btn.style.transform = 'translateX(0)'; }, 200);
    }
 
    function showToast(type, icon, msg) {
        const toast = document.getElementById('toast');
        const ic = document.getElementById('toast-icon');
        const ms = document.getElementById('toast-msg');
        toast.className = 'toast';
        ic.innerHTML = icon;
        ms.textContent = msg.replace(/<[^>]*>/g, '');
        ms.innerHTML = msg;
        toast.classList.add(type + '-toast', 'show');
        setTimeout(() => toast.classList.remove('show'), 3500);
    }

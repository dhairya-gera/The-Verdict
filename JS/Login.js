const getUsers = () => JSON.parse(localStorage.getItem('verdict_users') || '[]');
const saveUsers = (users) => localStorage.setItem('verdict_users', JSON.stringify(users));

function switchTab(tab) {
    const isLogin = tab === 'login';
    
    document.querySelectorAll('.tab-btn').forEach(btn => {
        const isLoginBtn = btn.innerText.includes('Login');
        btn.classList.toggle('active', (isLogin && isLoginBtn) || (!isLogin && !isLoginBtn));
    });

    document.getElementById('login-panel').classList.toggle('active', isLogin);
    document.getElementById('register-panel').classList.toggle('active', !isLogin);
    
    document.querySelectorAll('.alert').forEach(a => a.classList.remove('show'));
    
    if (!isLogin) {
        document.getElementById('reg-step-1').style.display = 'block';
        document.getElementById('reg-step-3').style.display = 'none';
        document.getElementById('step-1').classList.add('active');
        document.getElementById('step-1').classList.remove('done');
        document.getElementById('step-1').querySelector('.step-circle').innerHTML = '1';
        document.getElementById('step-3').classList.remove('active');
    }
}

function checkStrength(val) {
    const bars = ['s1', 's2', 's3', 's4'].map(id => document.getElementById(id));
    const text = document.getElementById('strength-text');
    bars.forEach(b => b.style.background = 'rgba(255,255,255,0.08)');
    
    if (!val) { text.textContent = ''; return; }
    
    let score = 0;
    if (val.length >= 6) score++;
    if (val.length >= 10) score++;
    if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
    if (/[^A-Za-z0-9]/.test(val)) score++;
    
    const colors = ['#ff4d4d', '#f0b429', '#3AADFC', '#22c55e'];
    const labels = ['Weak', 'Fair', 'Good', 'Strong'];
    
    text.textContent = labels[score - 1] || '';
    text.style.color = colors[score - 1] || '';
}

function handleLogin() {
    const email = document.getElementById('login-email').value.trim();
    const pass = document.getElementById('login-password').value;
    const btn = document.querySelector('#login-panel .submit-btn');

    if (!email || !pass) return showAlert('login-error', 'Please fill all fields.');

    btn.classList.add('loading');

    setTimeout(() => {
        btn.classList.remove('loading');
        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === pass);

        if (user) {
            showToast('success', '<i class="fa-solid fa-clapperboard"></i>', `Welcome back, ${user.name}!`);
            setTimeout(() => window.location.href = 'Home.html', 1500);
        } else {
            showAlert('login-error', 'Invalid email or password.');
        }
    }, 1000);
}

function handleRegister() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const passwords = document.querySelectorAll('#register-panel input[type="password"]');
    const pass = passwords[0].value;
    const confirmPass = passwords[1].value;
    const btn = document.querySelector('#reg-step-1 .submit-btn');

    if (!name || !email || !pass || !confirmPass) return showAlert('reg-error', 'All fields are required.');
    
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(name)) return showAlert('reg-error', 'Name should only contain letters.');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return showAlert('reg-error', 'Please enter a valid email.');

    if (pass.length < 6) return showAlert('reg-error', 'Password must be at least 6 characters.');
    
    if (pass !== confirmPass) return showAlert('reg-error', 'Passwords do not match.');

    const users = getUsers();
    if (users.find(u => u.email === email)) return showAlert('reg-error', 'Email already registered.');

    btn.classList.add('loading');

    setTimeout(() => {
        btn.classList.remove('loading');
        users.push({ name, email, password: pass });
        saveUsers(users);

        document.getElementById('reg-step-1').style.display = 'none';
        document.getElementById('reg-step-3').style.display = 'block';
        document.getElementById('welcome-name').textContent = name;
        
        const step1 = document.getElementById('step-1');
        step1.classList.replace('active', 'done');
        step1.querySelector('.step-circle').innerHTML = '<i class="fa-solid fa-check"></i>';
        document.getElementById('step-3').classList.add('active');
    }, 1200);
}

function showAlert(id, msg) {
    const alertBox = document.getElementById(id);
    const msgSpan = alertBox.querySelector('span');
    msgSpan.textContent = msg;
    alertBox.classList.add('show');
}

function showToast(type, icon, msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-icon').innerHTML = icon;
    document.getElementById('toast-msg').innerHTML = msg;
    toast.className = `toast ${type}-toast show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}
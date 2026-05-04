const getUsers = () => JSON.parse(localStorage.getItem('verdict_users') || '[]');
const saveUsers = (users) => localStorage.setItem('verdict_users', JSON.stringify(users));
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach((btn, i) => {
        btn.classList.toggle('active', (i === 0 && tab === 'login') || (i === 1 && tab === 'register'));
    });
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.getElementById(`${tab}-panel`).classList.add('active');
    document.querySelectorAll('.alert').forEach(a => a.classList.remove('show'));
}
function togglePass(id, btn) {
    const input = document.getElementById(id);
    const icon = btn.querySelector('i');
    const isPass = input.type === 'password';
    
    input.type = isPass ? 'text' : 'password';
    icon.className = isPass ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
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
    for (let i = 0; i < score; i++) bars[i].style.background = colors[score - 1];
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
            showToast('success', '🎬', `Welcome back, ${user.name}!`);
            setTimeout(() => window.location.href = 'Home.html', 1500);
        } else {
            showAlert('login-error', 'Invalid email or password.');
        }
    }, 1000);
}
function handleRegister() {
    const name = document.getElementById('reg-name').value.trim();
    const email = document.getElementById('reg-email').value.trim();
    const pass = document.getElementById('reg-password').value;
    const btn = document.querySelector('#reg-step-1 .submit-btn');
    if (!name || !email || !pass) return showAlert('reg-error', 'All fields are required.');
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
        document.getElementById('step-1').classList.replace('active', 'done');
        document.getElementById('step-1').querySelector('.step-circle').innerHTML = '✓';
        document.getElementById('step-3').classList.add('active');
    }, 1200);
}
function showAlert(id, msg) {
    const alertBox = document.getElementById(id);
    alertBox.querySelector('span').textContent = msg;
    alertBox.classList.add('show');
}
function showToast(type, icon, msg) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-icon').innerHTML = icon;
    document.getElementById('toast-msg').innerHTML = msg;
    toast.className = `toast ${type}-toast show`;
    setTimeout(() => toast.classList.remove('show'), 3000);
}
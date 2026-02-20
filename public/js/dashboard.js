const API_BASE = window.location.origin + '/api';

document.addEventListener('DOMContentLoaded', () => {
    checkAuthentication();
    setupLogoutButtons();
});

async function checkAuthentication() {
    const token = localStorage.getItem('token');
    if (!token) {
        redirectToLogin();
        return;
    }

    try {
        const response = await fetch(`${API_BASE}/auth/me`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (data.success) {
            updateDashboardUI(data.data.user);
        } else {
            console.error('Failed to fetch user data:', data.message);
            redirectToLogin();
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        redirectToLogin();
    }
}

function updateDashboardUI(user) {
    const userNameElement = document.getElementById('userName');
    const userEmailElement = document.getElementById('userEmail');
    const userAvatarElement = document.querySelector('.user-avatar');

    if (userNameElement) {
        userNameElement.textContent = `Hello, ${user.name.split(' ')[0]}!`;
    }
    if (userEmailElement) {
        userEmailElement.textContent = user.email;
    }
    if (userAvatarElement && user.name) {
        const initials = user.name.split(' ').map(n => n[0]).join('').toUpperCase();
        userAvatarElement.src = `https://via.placeholder.com/80x80/6366f1/FFFFFF?text=${initials}`;
        userAvatarElement.alt = `${user.name} Avatar`;
    }
    // You can further populate dashboard stats/tasks here if task management was implemented.
}

function setupLogoutButtons() {
    const logoutBtnNav = document.getElementById('logoutBtnNav');
    const logoutBtnSidebar = document.getElementById('logoutBtnSidebar');

    if (logoutBtnNav) {
        logoutBtnNav.addEventListener('click', handleLogout);
    }
    if (logoutBtnSidebar) {
        logoutBtnSidebar.addEventListener('click', handleLogout);
    }
}

function handleLogout() {
    localStorage.removeItem('token');
    // localStorage.removeItem('user'); // If you stored user data
    redirectToLogin();
}

function redirectToLogin() {
    window.location.href = '/login.html';
}
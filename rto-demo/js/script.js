// Page Navigation
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
}

// Generate random ID
function generateId(prefix) {
    return prefix + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Generate random date (next 7-30 days)
function generateFutureDate() {
    const today = new Date();
    const futureDate = new Date(today.getTime() + (Math.random() * 23 + 7) * 24 * 60 * 60 * 1000);
    return futureDate.toLocaleDateString('en-IN');
}

// Mock venues
const venues = [
    'RTO Office, Sector 15, Delhi',
    'Regional Transport Office, MG Road, Mumbai',
    'RTO Complex, Brigade Road, Bangalore',
    'Transport Bhawan, Park Street, Kolkata',
    'RTO Office, Anna Salai, Chennai'
];

const testCenters = [
    'Automated Test Track - Zone A',
    'Driving Test Center - Zone B',
    'RTO Test Facility - Main Campus',
    'Licensed Test Ground - East Wing'
];

// Login Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const aadhaar = document.getElementById('aadhaar').value;
            const password = document.getElementById('password').value;
            
            if (aadhaar.length === 12 && password.length > 0) {
                alert('Login Successful! (Demo Mode)');
                showPage('home');
            } else {
                alert('Please enter valid Aadhaar number (12 digits) and password');
            }
        });
    }

    // LLR Form Handler
    const llrForm = document.getElementById('llrForm');
    if (llrForm) {
        llrForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const cov = document.getElementById('cov-llr').value;
            const name = document.getElementById('name-llr').value;
            const dob = document.getElementById('dob-llr').value;
            
            if (cov && name && dob) {
                // Check age eligibility
                const birthDate = new Date(dob);
                const today = new Date();
                const age = today.getFullYear() - birthDate.getFullYear();
                
                if (age < 18) {
                    alert('You must be at least 18 years old to apply for LLR');
                    return;
                }
                
                // Generate mock data
                document.getElementById('test-date').textContent = generateFutureDate();
                document.getElementById('exam-id').textContent = generateId('EXAM');
                document.getElementById('venue').textContent = venues[Math.floor(Math.random() * venues.length)];
                
                // Show result
                document.getElementById('llr-result').style.display = 'block';
                llrForm.style.display = 'none';
            } else {
                alert('Please fill all required fields');
            }
        });
    }

    // DL Form Handler
    const dlForm = document.getElementById('dlForm');
    if (dlForm) {
        dlForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const llrNumber = document.getElementById('llr-number').value;
            const cov = document.getElementById('cov-dl').value;
            
            if (llrNumber && cov) {
                // Generate mock data
                document.getElementById('dl-test-date').textContent = generateFutureDate();
                document.getElementById('time-slot').textContent = ['09:00 AM - 10:00 AM', '11:00 AM - 12:00 PM', '02:00 PM - 03:00 PM'][Math.floor(Math.random() * 3)];
                document.getElementById('test-center').textContent = testCenters[Math.floor(Math.random() * testCenters.length)];
                document.getElementById('booking-id').textContent = generateId('BOOK');
                
                // Show result
                document.getElementById('dl-result').style.display = 'block';
                dlForm.style.display = 'none';
            } else {
                alert('Please fill all required fields');
            }
        });
    }

    // Vehicle Registration Form Handler
    const vehicleForm = document.getElementById('vehicleForm');
    if (vehicleForm) {
        vehicleForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const cov = document.getElementById('vehicle-cov').value;
            const company = document.getElementById('vehicle-company').value;
            const model = document.getElementById('vehicle-model').value;
            const engine = document.getElementById('engine-number').value;
            const chassis = document.getElementById('chassis-number').value;
            
            if (cov && company && model && engine && chassis) {
                // Generate mock application ID
                document.getElementById('app-id').textContent = generateId('VR');
                
                // Show result
                document.getElementById('vehicle-result').style.display = 'block';
                vehicleForm.style.display = 'none';
            } else {
                alert('Please fill all required fields');
            }
        });
    }

    // Status Check Form Handler
    const statusForm = document.getElementById('statusForm');
    if (statusForm) {
        statusForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const aadhaar = document.getElementById('status-aadhaar').value;
            const password = document.getElementById('status-password').value;
            
            if (aadhaar.length === 12 && password.length > 0) {
                // Show status result
                document.getElementById('status-result').style.display = 'block';
                statusForm.style.display = 'none';
            } else {
                alert('Please enter valid Aadhaar number and password');
            }
        });
    }
});

// Toggle Status Function (for demo)
function toggleStatus() {
    const statuses = ['approved', 'pending', 'rejected'];
    const statusElements = ['llr-status', 'dl-status', 'vehicle-status'];
    
    statusElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        const currentStatus = element.className.split(' ')[1];
        const currentIndex = statuses.indexOf(currentStatus);
        const nextIndex = (currentIndex + 1) % statuses.length;
        const nextStatus = statuses[nextIndex];
        
        element.className = `status ${nextStatus}`;
        element.textContent = nextStatus.charAt(0).toUpperCase() + nextStatus.slice(1);
    });
}

// Admin Functions
function approveApplication(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('.status');
    statusCell.className = 'status approved';
    statusCell.textContent = 'Approved';
    
    const actionsCell = button.parentElement;
    actionsCell.innerHTML = '<button disabled>Processed</button>';
    
    // Update stats
    updateStats();
}

function rejectApplication(button) {
    const row = button.closest('tr');
    const statusCell = row.querySelector('.status');
    statusCell.className = 'status rejected';
    statusCell.textContent = 'Rejected';
    
    const actionsCell = button.parentElement;
    actionsCell.innerHTML = '<button disabled>Processed</button>';
    
    // Update stats
    updateStats();
}

function updateStats() {
    const pendingCount = document.querySelectorAll('.status.pending').length;
    const approvedToday = Math.floor(Math.random() * 5) + 15; // Random number for demo
    
    document.querySelector('.stat-card:nth-child(1) .stat-number').textContent = pendingCount;
    document.querySelector('.stat-card:nth-child(2) .stat-number').textContent = approvedToday;
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
});
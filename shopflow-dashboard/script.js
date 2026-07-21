// Initialize Charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeCharts();
    addInteractions();
});

// Chart Configuration
function initializeCharts() {
    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: true,
                labels: {
                    color: '#a1a1aa',
                    font: {
                        family: 'Inter',
                        size: 12
                    }
                }
            }
        }
    };

    // Sales Overview Chart (Line Chart)
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    
    // Create gradient for sales chart
    const salesGradient = salesCtx.createLinearGradient(0, 0, 0, 400);
    salesGradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
    salesGradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
    
    new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            datasets: [{
                label: 'Revenue',
                data: [4200, 5800, 4900, 6200, 5400, 7100, 6800],
                borderColor: '#6366f1',
                backgroundColor: salesGradient,
                borderWidth: 3,
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#6366f1',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 5,
                pointHoverRadius: 7,
                pointHoverBackgroundColor: '#6366f1',
                pointHoverBorderColor: '#fff',
                pointHoverBorderWidth: 3
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                x: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#a1a1aa'
                    }
                },
                y: {
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    },
                    ticks: {
                        color: '#a1a1aa',
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            },
            plugins: {
                ...commonOptions.plugins,
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 46, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#a1a1aa',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return '$' + context.parsed.y.toLocaleString();
                        }
                    }
                }
            }
        }
    });

    // Category Breakdown Chart (Doughnut Chart)
    const categoryCtx = document.getElementById('categoryChart').getContext('2d');
    
    new Chart(categoryCtx, {
        type: 'doughnut',
        data: {
            labels: ['Electronics', 'Wearables', 'Accessories', 'Home', 'Other'],
            datasets: [{
                data: [35, 25, 20, 15, 5],
                backgroundColor: [
                    '#6366f1',
                    '#8b5cf6',
                    '#06b6d4',
                    '#10b981',
                    '#f59e0b'
                ],
                borderColor: 'rgba(26, 26, 46, 0.8)',
                borderWidth: 2,
                hoverOffset: 10
            }]
        },
        options: {
            ...commonOptions,
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        color: '#a1a1aa',
                        font: {
                            family: 'Inter',
                            size: 11
                        },
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(26, 26, 46, 0.95)',
                    titleColor: '#fff',
                    bodyColor: '#a1a1aa',
                    borderColor: 'rgba(255, 255, 255, 0.1)',
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });

    // Mini charts for metric cards
    createMiniChart('revenueChart', [65, 78, 82, 85, 92, 95, 100], '#10b981');
    createMiniChart('ordersChart', [70, 75, 80, 78, 85, 88, 92], '#6366f1');
    createMiniChart('customersChart', [60, 68, 75, 82, 88, 95, 100], '#8b5cf6');
    createMiniChart('productsChart', [90, 92, 91, 93, 92, 94, 95], '#f59e0b');
}

// Create mini sparkline charts for metric cards
function createMiniChart(elementId, data, color) {
    const ctx = document.getElementById(elementId).getContext('2d');
    
    const gradient = ctx.createLinearGradient(0, 0, 0, 60);
    gradient.addColorStop(0, color + '40');
    gradient.addColorStop(1, color + '00');
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.map((_, i) => i),
            datasets: [{
                data: data,
                borderColor: color,
                backgroundColor: gradient,
                borderWidth: 2,
                fill: true,
                tension: 0.4,
                pointRadius: 0,
                pointHoverRadius: 0
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            },
            scales: {
                x: {
                    display: false
                },
                y: {
                    display: false
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

// Add interactive features
function addInteractions() {
    // Filter buttons interaction
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Animate chart update
            const chartCard = this.closest('.chart-card');
            chartCard.style.opacity = '0.5';
            setTimeout(() => {
                chartCard.style.opacity = '1';
            }, 300);
        });
    });

    // Navigation items interaction
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            navItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Search bar focus effect
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    searchInput.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });

    // Table row click animation
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    tableRows.forEach(row => {
        row.addEventListener('click', function() {
            this.style.background = 'var(--bg-card)';
            setTimeout(() => {
                this.style.background = '';
            }, 300);
        });
    });

    // Product item click animation
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // Notification button click
    const notificationBtn = document.querySelector('.notification-btn');
    notificationBtn.addEventListener('click', function() {
        this.querySelector('.badge').style.animation = 'none';
        setTimeout(() => {
            this.querySelector('.badge').style.animation = 'ping 2s infinite';
        }, 10);
        
        // Show notification dropdown (placeholder)
        alert('🔔 Notifications:\n• New order #ORD-006\n• Low stock alert: Wireless Headphones\n• Customer review received');
    });

    // User profile click
    const userProfile = document.querySelector('.user-profile');
    userProfile.addEventListener('click', function() {
        alert('👤 User Menu:\n• Profile\n• Settings\n• Logout');
    });

    // View All buttons
    const viewAllBtns = document.querySelectorAll('.view-all-btn');
    viewAllBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.closest('.table-card, .products-card');
            const title = section.querySelector('h3').textContent;
            alert(`📋 Viewing all ${title}`);
        });
    });

    // Upgrade button
    const upgradeBtn = document.querySelector('.btn-upgrade');
    upgradeBtn.addEventListener('click', function() {
        alert('✨ Upgrade to Pro:\n• Advanced Analytics\n• Unlimited Products\n• Priority Support\n• Custom Branding\n\nStarting at $29/month');
    });

    // Metric cards click
    const metricCards = document.querySelectorAll('.metric-card');
    metricCards.forEach(card => {
        card.addEventListener('click', function() {
            const metric = this.querySelector('.metric-title').textContent;
            const value = this.querySelector('.metric-value').textContent;
            alert(`📊 ${metric}: ${value}\n\nDetailed analytics coming soon!`);
        });
    });

    // Add staggered animation to metric cards on load
    const metricCardsArray = Array.from(metricCards);
    metricCardsArray.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.nav-item, .metric-card, .product-item, .filter-btn, .view-all-btn');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
        });
    });
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'N' for notifications
    if (e.key === 'n' || e.key === 'N') {
        document.querySelector('.notification-btn').click();
    }
    
    // Press '/' to focus search
    if (e.key === '/') {
        e.preventDefault();
        document.querySelector('.search-bar input').focus();
    }
    
    // Press 'Escape' to blur search
    if (e.key === 'Escape') {
        document.querySelector('.search-bar input').blur();
    }
});

// Add loading state simulation for demo
function simulateLoading() {
    const elements = document.querySelectorAll('.metric-card, .chart-card, .table-card, .products-card');
    elements.forEach(el => {
        el.classList.add('loading');
        setTimeout(() => {
            el.classList.remove('loading');
        }, 1000 + Math.random() * 1000);
    });
}

// Run loading simulation on page load
window.addEventListener('load', simulateLoading);

// Add real-time update simulation
setInterval(() => {
    const revenueValue = document.querySelector('.metric-card:first-child .metric-value');
    const currentRevenue = parseInt(revenueValue.textContent.replace(/[$,]/g, ''));
    const newRevenue = currentRevenue + Math.floor(Math.random() * 100);
    revenueValue.textContent = '$' + newRevenue.toLocaleString();
    
    // Flash effect
    revenueValue.style.color = '#10b981';
    setTimeout(() => {
        revenueValue.style.color = '';
    }, 500);
}, 10000);

console.log('🛍️ ShopFlow Dashboard initialized successfully!');
console.log('💡 Keyboard shortcuts: "/" to search, "N" for notifications, "Esc" to close');

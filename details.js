// Tab Functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons/contents
        tabBtns.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Show corresponding content
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Accordion Functionality
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // Close all items
        document.querySelectorAll('.accordion-item').forEach(i => {
            i.classList.remove('active');
        });
        
        // Open clicked item if it was closed
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Enrollment Button
const enrollBtn = document.querySelector('.btn-enroll');
enrollBtn.addEventListener('click', () => {
    // In a real app, this would redirect to checkout
    alert('Redirecting to checkout...');
    // window.location.href = '/checkout';
});

// Wishlist Button
const wishlistBtn = document.querySelector('.btn-outline');
wishlistBtn.addEventListener('click', function() {
    this.innerHTML = this.innerHTML.includes('fa-heart') ?
        '<i class="fas fa-heart"></i> Wishlisted' :
        '<i class="far fa-heart"></i> Wishlist';
    
    this.classList.toggle('wishlisted');
});

// Related Courses (Would normally fetch from API)
const relatedCourses = [
    {
        title: "Advanced JavaScript Concepts",
        instructor: "Vignesh",
        rating: 4.9,
        students: "32,450",
        price: 14.99,
        image: "images/js.jpg"
    },
    {
        title: "Advanced Digital Marketing",
        instructor: "Rana Naidu",
        rating: 3.9,
        students: "32,450",
        price: 14.99,
        image: "images/Dig.jpg"
    },
    {
        title: "Agile software Development",
        instructor: "Nikhil kumar",
        rating: 4.7,
        students: "32,450",
        price: 14.99,
        image: "images/Agile.jpg"
    },
    // Add 2-3 more courses
];

function renderRelatedCourses() {
    const container = document.querySelector('.courses-grid');
    container.innerHTML = relatedCourses.map(course => `
        <div class="course-card">
            <img src="${course.image}" alt="${course.title}">
            <div class="course-content">
                <h3>${course.title}</h3>
                <p class="instructor">By ${course.instructor}</p>
                <div class="meta">
                    <span><i class="fas fa-star"></i> ${course.rating}</span>
                    <span><i class="fas fa-user-graduate"></i> ${course.students}</span>
                </div>
                <div class="price">$${course.price}</div>
            </div>
        </div>
    `).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderRelatedCourses();
    
    // Set first accordion item as open by default
    document.querySelector('.accordion-item').classList.add('active');
});
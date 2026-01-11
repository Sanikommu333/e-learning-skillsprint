// Course Data (Would normally come from API)
const courses = [
    {
        id: 1,
        title: "Complete Web development Course 2025",
        category: "development",
        level: "beginner",
        rating: 4.8,
        students: 15420,
        duration: "8 Weeks",
        price: 89.99,
        discountPrice: 12.99,
        badge: "Bestseller",
        image: "images/web1.jpg",
        instructor: "Vijay kumar"
    },
    {
        id: 1,
        title: "Complete Data science Course 2025",
        category: "development",
        level: "beginner",
        rating: 4.8,
        students: 15420,
        duration: "12 Weeks",
        price: 78.99,
        discountPrice: 12.99,
        badge: "Bestseller",
        image: "images/data.jpg",
        instructor: "Mahesh "
    },
    {
        id: 1,
        title: "Complete Devops Course 2023",
        category: "development",
        level: "beginner",
        rating: 4.5,
        students: 15420,
        duration: "8 Weeks",
        price: 65.99,
        discountPrice: 12.99,
        badge: "Bestseller",
        image: "images/devops.jpg",
        instructor: "John "
    },{
        id: 1,
        title: "Complete Software Testing Course 2025",
        category: "development",
        level: "beginner",
        rating: 4.8,
        students: 15420,
        duration: "8 Weeks",
        price: 88.99,
        discountPrice: 12.99,
        badge: "Bestseller",
        image: "images/QA.jpg",
        instructor: "Jonas Schmedtmann"
    },{
        id: 2,
        title: "Complete JavaScript Course 2025",
        category: "development",
        level: "beginner",
        rating: 4.8,
        students: 15420,
        duration: "8 Weeks",
        price: 89.99,
        discountPrice: 12.99,
        badge: "Bestseller",
        image: "images/js.jpg",
        instructor: "Jonas Schmedtmann"
    },
    // Add 11 more courses...
];

// DOM Elements
const coursesGrid = document.getElementById('coursesGrid');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const categoryFilter = document.getElementById('categoryFilter');
const levelFilter = document.getElementById('levelFilter');
const sortBy = document.getElementById('sortBy');
const prevPage = document.getElementById('prevPage');
const nextPage = document.getElementById('nextPage');
const pageNumbers = document.getElementById('pageNumbers');

// Pagination
let currentPage = 1;
const coursesPerPage = 6;

// Render Courses
function renderCourses() {
    // Filtering
    let filtered = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(
            searchInput.value.toLowerCase()
        );
        const matchesCategory = categoryFilter.value === 'all' || 
            course.category === categoryFilter.value;
        const matchesLevel = levelFilter.value === 'all' || 
            course.level === levelFilter.value;
        
        return matchesSearch && matchesCategory && matchesLevel;
    });

    // Sorting
    switch(sortBy.value) {
        case 'rating':
            filtered.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filtered.sort((a, b) => b.id - a.id);
            break;
        default: // 'popular'
            filtered.sort((a, b) => b.students - a.students);
    }

    // Pagination
    const totalPages = Math.ceil(filtered.length / coursesPerPage);
    const startIdx = (currentPage - 1) * coursesPerPage;
    const paginated = filtered.slice(startIdx, startIdx + coursesPerPage);

    // Render
    coursesGrid.innerHTML = paginated.length > 0 ? 
        paginated.map(course => `
            <div class="course-card">
                <img src="${course.image}" alt="${course.title}">
                ${course.badge ? `<span class="course-badge">${course.badge}</span>` : ''}
                <div class="course-content">
                    <h3>${course.title}</h3>
                    <p class="instructor">By ${course.instructor}</p>
                    <div class="meta">
                        <span><i class="fas fa-star"></i> ${course.rating}</span>
                        <span><i class="fas fa-user-graduate"></i> ${course.students.toLocaleString()}</span>
                        <span><i class="fas fa-clock"></i> ${course.duration}</span>
                    </div>
                    <div class="price">
                        <span class="current">$${course.discountPrice}</span>
                        <span class="original">$${course.price}</span>
                    </div>
                </div>
            </div>
        `).join('') : 
        `<div class="no-results">
            <i class="fas fa-search"></i>
            <h3>No courses found</h3>
            <p>Try adjusting your search or filters</p>
        </div>`;

    // Update pagination
    updatePagination(filtered.length);
}

// Update Pagination UI
function updatePagination(totalCourses) {
    const totalPages = Math.ceil(totalCourses / coursesPerPage);
    
    prevPage.disabled = currentPage === 1;
    nextPage.disabled = currentPage === totalPages;
    
    pageNumbers.innerHTML = '';
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.className = i === currentPage ? 'active' : '';
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderCourses();
        });
        pageNumbers.appendChild(pageBtn);
    }
}

// Event Listeners
searchBtn.addEventListener('click', () => {
    currentPage = 1;
    renderCourses();
});

[categoryFilter, levelFilter, sortBy].forEach(filter => {
    filter.addEventListener('change', () => {
        currentPage = 1;
        renderCourses();
    });
});

prevPage.addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderCourses();
    }
});

nextPage.addEventListener('click', () => {
    const totalPages = Math.ceil(courses.length / coursesPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderCourses();
    }
});

// Initialize
document.addEventListener('DOMContentLoaded', renderCourses);
document.addEventListener("DOMContentLoaded", function() {
    const loginLink = document.getElementById("loginLink");
    const signupLink = document.getElementById("signupLink");
    const adminLink = document.getElementById("adminLink");
    const loginForm = document.getElementById("loginForm");
    const signupForm = document.getElementById("signupForm");
    const adminPanel = document.getElementById("adminPanel");

    loginLink.addEventListener("click", function(event) {
        event.preventDefault();
        loginForm.classList.remove("hidden");
        signupForm.classList.add("hidden");
        adminPanel.classList.add("hidden");
    });

    signupLink.addEventListener("click", function(event) {
        event.preventDefault();
        signupForm.classList.remove("hidden");
        loginForm.classList.add("hidden");
        adminPanel.classList.add("hidden");
    });

    adminLink.addEventListener("click", function(event) {
        event.preventDefault();
        adminPanel.classList.remove("hidden");
        loginForm.classList.add("hidden");
        signupForm.classList.add("hidden");
    });
    // Fetch list of courses from the backend and dynamically generate course cards
fetch('/courses')
.then(response => response.json())
.then(courses => {
    const courseContainer = document.querySelector('.course-container');
    courses.forEach(course => {
        // Dynamically create and append course cards to the course container
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card');
        // Add course details to the course card
        courseCard.innerHTML = `
            <div class="course-card-content">
                <div class="course-title">${course.title}</div>
                <div class="course-description">${course.description}</div>
                <div class="course-price">Price: ${course.price}</div>
                <button class="buy-button" onclick="buyCourse('${course._id}')">Buy Course</button>
                <button class="view-articles-button" onclick="viewArticles('${course._id}')">View Articles</button>
            </div>
        `;
        courseContainer.appendChild(courseCard);
    });
})
.catch(error => console.error('Error fetching courses:', error));

// Function to handle buying a course
function buyCourse(courseId) {
fetch(`/courses/${courseId}/buy`, { method: 'POST' })
    .then(response => {
        if (response.ok) {
            alert('Course purchased successfully!');
        } else {
            alert('Failed to purchase course. Please try again.');
        }
    })
    .catch(error => console.error('Error buying course:', error));
}

// Function to handle viewing articles for a course
function viewArticles(courseId) {
fetch(`/courses/${courseId}/articles`)
    .then(response => response.json())
    .then(articles => {
        // Display articles in a modal, sidebar, or another container
        console.log(articles);
        alert('Articles: ' + JSON.stringify(articles));
    })
    .catch(error => console.error('Error fetching articles:', error));
}

});

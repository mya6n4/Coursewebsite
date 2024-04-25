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

// Global variable to store the blog being edited
let editingBlogId = null;

// Function to fetch all blogs and display them
const fetchBlogs = async () => {
    try {
        const response = await fetch('http://localhost:3000/blogs');
        const blogs = await response.json();
        displayBlogs(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
    }
};

// Function to display the blogs on the page
const displayBlogs = (blogs) => {
    const blogsList = document.getElementById('blogs-list');
    blogsList.innerHTML = ''; // Clear existing blogs

    blogs.forEach(blog => {
        const blogItem = document.createElement('div');
        blogItem.classList.add('blog-item');
        blogItem.innerHTML = `
            <h3>${blog.title}</h3>
            <p><strong>Author:</strong> ${blog.author}</p>
            <p><strong>Category:</strong> ${blog.category}</p>
            <p>${blog.content}</p>
            <button class="btn" onclick="deleteBlog(${blog.id})">Delete</button>
            <button class="btn" onclick="editBlog(${blog.id})">Edit</button>
        `;
        blogsList.appendChild(blogItem);
    });
};

// Function to create a new blog post
const createBlog = async (e) => {
    e.preventDefault();

    const author = document.getElementById('author').value;
    const title = document.getElementById('title').value;
    const category = document.getElementById('category').value;
    const content = document.getElementById('content').value;

    const newBlog = { author, title, category, content };

    try {
        const response = await fetch('http://localhost:3000/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBlog),
        });

        if (response.ok) {
            fetchBlogs(); // Refresh the list of blogs
            document.getElementById('create-blog-form').reset(); // Clear form
        } else {
            console.error('Error creating blog');
        }
    } catch (error) {
        console.error('Error creating blog:', error);
    }
};

// Function to edit a blog
const editBlog = (id) => {
    // Set the editingBlogId to the blog being edited
    editingBlogId = id;

    // Get the blog details from the backend
    fetch(`http://localhost:3000/blogs/${id}`)
        .then(response => response.json())
        .then(blog => {
            // Populate the edit form with blog data
            document.getElementById('edit-author').value = blog.author;
            document.getElementById('edit-title').value = blog.title;
            document.getElementById('edit-category').value = blog.category;
            document.getElementById('edit-content').value = blog.content;

            // Show the edit form and hide the create form
            document.getElementById('create-blog-section').style.display = 'none';
            document.getElementById('edit-blog-section').style.display = 'block';
        })
        .catch(error => console.error('Error fetching blog for edit:', error));
};

// Function to update a blog
const updateBlog = async (e) => {
    e.preventDefault();

    const author = document.getElementById('edit-author').value;
    const title = document.getElementById('edit-title').value;
    const category = document.getElementById('edit-category').value;
    const content = document.getElementById('edit-content').value;

    const updatedBlog = { author, title, category, content };

    try {
        const response = await fetch(`http://localhost:3000/blogs/${editingBlogId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBlog),
        });

        if (response.ok) {
            fetchBlogs(); // Refresh the list of blogs
            cancelEdit(); // Hide the edit form
        } else {
            console.error('Error updating blog');
        }
    } catch (error) {
        console.error('Error updating blog:', error);
    }
};

// Function to cancel editing and show the create form again
const cancelEdit = () => {
    document.getElementById('create-blog-section').style.display = 'block';
    document.getElementById('edit-blog-section').style.display = 'none';
    document.getElementById('edit-blog-form').reset(); // Clear form
};

// Function to delete a blog
const deleteBlog = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/blogs/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            fetchBlogs(); // Refresh the list of blogs
        } else {
            console.error('Error deleting blog');
        }
    } catch (error) {
        console.error('Error deleting blog:', error);
    }
};

// Initialize by fetching all blogs when the page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchBlogs();

    // Attach the createBlog function to the form submit event
    document.getElementById('create-blog-form').addEventListener('submit', createBlog);

    // Attach the updateBlog function to the edit form submit event
    document.getElementById('edit-blog-form').addEventListener('submit', updateBlog);

    // Attach the cancelEdit function to the cancel button
    document.getElementById('cancel-edit-btn').addEventListener('click', cancelEdit);
});

const BASE_URL = 'https://jsonplaceholder.typicode.com';

async function fetchUsers() {
    try {
        const response = await fetch(`${BASE_URL}/users`);
        const users = await response.json();
        displayUsers(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

function displayUsers(users) {
    const userList = document.getElementById('user-list');
    userList.innerHTML = '';
    
    users.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user.name;
        li.classList.add('user-item');
        li.addEventListener('click', () => {
            document.querySelectorAll('.user-item').forEach(item => item.classList.remove('active'));
            li.classList.add('active');
            fetchPostsForUser(user.id);
        });
        userList.appendChild(li);
    });
}

async function fetchPostsForUser(userId) {
    try {
        const response = await fetch(`${BASE_URL}/posts?userId=${userId}`);
        const posts = await response.json();
        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';
    
    posts.forEach((post) => {
        const postElement = document.createElement('div');
        postElement.classList.add('post');
        
        const title = document.createElement('h3');
        title.textContent = post.title;
        
        const body = document.createElement('p');
        body.textContent = post.body;
        
        postElement.appendChild(title);
        postElement.appendChild(body);
        
        postsContainer.appendChild(postElement);
    });
}

function searchPosts(query) {
    const posts = document.querySelectorAll('.post');
    posts.forEach(post => {
        const title = post.querySelector('h3').textContent.toLowerCase();
        const body = post.querySelector('p').textContent.toLowerCase();
        if (title.includes(query.toLowerCase()) || body.includes(query.toLowerCase())) {
            post.style.display = 'block';
        } else {
            post.style.display = 'none';
        }
    });
}

window.onload = () => {
    fetchUsers();
    document.getElementById('search-input').addEventListener('input', (e) => searchPosts(e.target.value));
};
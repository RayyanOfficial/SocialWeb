// Data storage keys
const STORAGE_KEYS = {
    USERS: 'socialConnect_users',
    POSTS: 'socialConnect_posts',
    FRIEND_REQUESTS: 'socialConnect_friendRequests',
    NOTIFICATIONS: 'socialConnect_notifications',
    CURRENT_USER: 'socialConnect_currentUser',
    NIGHT_MODE: 'socialConnect_nightMode'
};

// Sample data for initial setup
const DEFAULT_DATA = {
    users: [
        {
            id: 'user1',
            name: 'John Doe',
            email: 'john@example.com',
            password: 'password123',
            avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
            bio: 'Hello! I love connecting with friends and sharing experiences.',
            friends: ['user2', 'user3'],
            createdAt: new Date().toISOString()
        },
        {
            id: 'user2',
            name: 'Jane Smith',
            email: 'jane@example.com',
            password: 'password123',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
            bio: 'Digital creator and travel enthusiast!',
            friends: ['user1'],
            createdAt: new Date().toISOString()
        },
        {
            id: 'user3',
            name: 'Mike Johnson',
            email: 'mike@example.com',
            password: 'password123',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
            bio: 'Tech enthusiast and coffee lover.',
            friends: ['user1'],
            createdAt: new Date().toISOString()
        }
    ],
    posts: [
        {
            id: 'post1',
            userId: 'user1',
            content: 'Just finished an amazing hike! The views were breathtaking. 🏞️',
            image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80',
            privacy: 'public',
            likes: [
                { userId: 'user2', reaction: 'like' },
                { userId: 'user3', reaction: 'love' }
            ],
            comments: [
                {
                    id: 'comment1',
                    userId: 'user2',
                    text: 'Wow! Where is this? Looks amazing!',
                    timestamp: new Date().toISOString(),
                    likes: []
                },
                {
                    id: 'comment2',
                    userId: 'user3',
                    text: 'Great shot! The colors are beautiful.',
                    timestamp: new Date().toISOString(),
                    likes: []
                }
            ],
            timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
        },
        {
            id: 'post2',
            userId: 'user2',
            content: 'Just launched my new website! Check it out and let me know what you think. 🚀',
            image: null,
            privacy: 'public',
            likes: [
                { userId: 'user1', reaction: 'like' }
            ],
            comments: [
                {
                    id: 'comment3',
                    userId: 'user1',
                    text: 'Congratulations! The design looks fantastic.',
                    timestamp: new Date().toISOString(),
                    likes: []
                }
            ],
            timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString()
        }
    ],
    friendRequests: [
        {
            id: 'request1',
            fromUserId: 'user3',
            toUserId: 'user2',
            status: 'pending',
            timestamp: new Date().toISOString()
        }
    ],
    notifications: []
};

// Initialize data in localStorage
function initializeData() {
    if (!localStorage.getItem(STORAGE_KEYS.USERS)) {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(DEFAULT_DATA.users));
    }
    if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(DEFAULT_DATA.posts));
    }
    if (!localStorage.getItem(STORAGE_KEYS.FRIEND_REQUESTS)) {
        localStorage.setItem(STORAGE_KEYS.FRIEND_REQUESTS, JSON.stringify(DEFAULT_DATA.friendRequests));
    }
    if (!localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS)) {
        localStorage.setItem(STORAGE_KEYS.NOTIFICATIONS, JSON.stringify(DEFAULT_DATA.notifications));
    }
}

// Get data from localStorage
function getData(key) {
    return JSON.parse(localStorage.getItem(key)) || [];
}

// Save data to localStorage
function saveData(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Current user management
let currentUser = null;

// DOM Elements
const loginPage = document.getElementById('login-page');
const signupPage = document.getElementById('signup-page');
const appContainer = document.getElementById('app-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const loginMessage = document.getElementById('login-message');
const signupMessage = document.getElementById('signup-message');
const feed = document.getElementById('feed');
const friendRequestsList = document.getElementById('friend-requests-list');
const friendRequestsBadge = document.getElementById('friend-requests-badge');
const contactsList = document.getElementById('contacts-list');
const navProfileImg = document.getElementById('nav-profile-img');
const navProfileName = document.getElementById('nav-profile-name');
const createPostAvatar = document.getElementById('create-post-avatar');
const modalProfileImg = document.getElementById('modal-profile-img');
const modalProfileName = document.getElementById('modal-profile-name');
const profileDropdown = document.getElementById('profile-dropdown');
const nightModeToggle = document.getElementById('night-mode-toggle');
const nightModeIcon = document.getElementById('night-mode-icon');
const dropdownNightIcon = document.getElementById('dropdown-night-icon');
const dropdownNightText = document.getElementById('dropdown-night-text');
const globalSearch = document.getElementById('global-search');
const feedSearch = document.getElementById('feed-search');
const sortFilter = document.getElementById('sort-filter');
const privacyFilter = document.getElementById('privacy-filter');
const urlInputSection = document.getElementById('url-input-section');
const imageUrlInput = document.getElementById('image-url');
const urlPreview = document.getElementById('url-preview');
const urlImagePreview = document.getElementById('url-image-preview');
const postImagePreview = document.getElementById('post-image-preview');
const postImage = document.getElementById('post-image');
const emojiPicker = document.getElementById('emoji-picker');
const mobileSidebar = document.getElementById('mobile-sidebar');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');

// Initialize the app
function initApp() {
    initializeData();

    // Check if user is already logged in
    const loggedInUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
    if (loggedInUser) {
        currentUser = JSON.parse(loggedInUser);
        showApp();
    } else {
        showLoginPage();
    }

    // Initialize night mode
    initNightMode();

    // Initialize search and filter functionality
    initSearchAndFilter();

    // Initialize mobile menu
    initMobileMenu();

    // Initialize emoji picker
    initEmojiPicker();
}

// Initialize emoji picker
function initEmojiPicker() {
    // Close emoji picker when clicking elsewhere
    document.addEventListener('click', function (event) {
        const emojiPicker = document.getElementById('emoji-picker');
        if (!event.target.closest('.emoji-picker') &&
            !event.target.closest('[onclick*="toggleEmojiPicker"]')) {
            emojiPicker.style.display = 'none';
        }
    });
}

// Initialize mobile menu
function initMobileMenu() {
    // Close mobile menu when clicking outside
    document.addEventListener('click', function (event) {
        if (!event.target.closest('.sidebar') && !event.target.closest('.mobile-menu-btn')) {
            mobileSidebar.style.display = 'none';
        }
    });
}

// Toggle mobile menu
function toggleMobileMenu() {
    if (mobileSidebar.style.display === 'block') {
        mobileSidebar.style.display = 'none';
    } else {
        mobileSidebar.style.display = 'block';
    }
}

// Initialize search and filter functionality
function initSearchAndFilter() {
    // Global search
    globalSearch.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length > 0) {
            performSearch(searchTerm);
        } else {
            loadPosts();
        }
    });

    // Feed search
    feedSearch.addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        filterPosts(searchTerm, sortFilter.value, privacyFilter.value);
    });

    // Sort and filter
    sortFilter.addEventListener('change', function () {
        filterPosts(feedSearch.value.toLowerCase(), this.value, privacyFilter.value);
    });

    privacyFilter.addEventListener('change', function () {
        filterPosts(feedSearch.value.toLowerCase(), sortFilter.value, this.value);
    });
}

// Perform global search
function performSearch(searchTerm) {
    const users = getData(STORAGE_KEYS.USERS);
    const posts = getData(STORAGE_KEYS.POSTS);

    // Clear existing posts (except controls and create post)
    const postsToRemove = Array.from(feed.children).slice(2);
    postsToRemove.forEach(post => post.remove());

    // Filter posts by search term
    const filteredPosts = posts.filter(post => {
        const user = users.find(u => u.id === post.userId);
        const contentMatches = post.content.toLowerCase().includes(searchTerm);
        const userMatches = user.name.toLowerCase().includes(searchTerm);

        return contentMatches || userMatches;
    });

    // Add filtered posts to feed
    filteredPosts.forEach(post => {
        addPostToFeed(post);
    });

    // Show message if no results
    if (filteredPosts.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'post';
        noResults.innerHTML = `
                    <div class="post-content" style="text-align: center; padding: 40px;">
                        <i class="fas fa-search" style="font-size: 48px; color: var(--text-light); margin-bottom: 16px;"></i>
                        <h3 style="color: var(--text-secondary);">No results found</h3>
                        <p style="color: var(--text-light);">Try searching for something else</p>
                    </div>
                `;
        feed.appendChild(noResults);
    }
}

// Filter posts based on search term, sort, and privacy
function filterPosts(searchTerm = '', sortBy = 'newest', privacy = 'all') {
    const posts = getData(STORAGE_KEYS.POSTS);
    const users = getData(STORAGE_KEYS.USERS);

    // Clear existing posts (except controls and create post)
    const postsToRemove = Array.from(feed.children).slice(2);
    postsToRemove.forEach(post => post.remove());

    // Filter posts
    let filteredPosts = posts.filter(post => {
        const user = users.find(u => u.id === post.userId);
        const contentMatches = post.content.toLowerCase().includes(searchTerm);
        const userMatches = user.name.toLowerCase().includes(searchTerm);
        const privacyMatches =
            privacy === 'all' ||
            (privacy === 'public' && post.privacy === 'public') ||
            (privacy === 'friends' && post.privacy === 'friends');

        const visibleToUser =
            post.userId === currentUser.id ||
            post.privacy === 'public' ||
            (post.privacy === 'friends' && currentUser.friends.includes(post.userId));

        return (contentMatches || userMatches) && privacyMatches && visibleToUser;
    });

    // Sort posts
    switch (sortBy) {
        case 'newest':
            filteredPosts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            break;
        case 'oldest':
            filteredPosts.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
            break;
        case 'most-liked':
            filteredPosts.sort((a, b) => b.likes.length - a.likes.length);
            break;
        case 'most-commented':
            filteredPosts.sort((a, b) => b.comments.length - a.comments.length);
            break;
    }

    // Add filtered posts to feed
    filteredPosts.forEach(post => {
        addPostToFeed(post);
    });

    // Show message if no results
    if (filteredPosts.length === 0) {
        const noResults = document.createElement('div');
        noResults.className = 'post';
        noResults.innerHTML = `
                    <div class="post-content" style="text-align: center; padding: 40px;">
                        <i class="fas fa-search" style="font-size: 48px; color: var(--text-light); margin-bottom: 16px;"></i>
                        <h3 style="color: var(--text-secondary);">No posts found</h3>
                        <p style="color: var(--text-light);">Try adjusting your search or filters</p>
                    </div>
                `;
        feed.appendChild(noResults);
    }
}

// Initialize night mode
function initNightMode() {
    const nightMode = localStorage.getItem(STORAGE_KEYS.NIGHT_MODE) === 'true';
    setNightMode(nightMode);
}

// Set night mode
function setNightMode(enabled) {
    if (enabled) {
        document.body.classList.add('night-mode');
        nightModeToggle.classList.add('active');
        nightModeIcon.className = 'fas fa-moon';
        dropdownNightIcon.className = 'fas fa-moon';
        dropdownNightText.textContent = 'Light Mode';
    } else {
        document.body.classList.remove('night-mode');
        nightModeToggle.classList.remove('active');
        nightModeIcon.className = 'fas fa-sun';
        dropdownNightIcon.className = 'fas fa-sun';
        dropdownNightText.textContent = 'Night Mode';
    }
    localStorage.setItem(STORAGE_KEYS.NIGHT_MODE, enabled);
}

// Toggle night mode
function toggleNightMode() {
    const isNightMode = document.body.classList.contains('night-mode');
    setNightMode(!isNightMode);
}

// Show login page
function showLoginPage() {
    loginPage.style.display = 'flex';
    signupPage.style.display = 'none';
    appContainer.style.display = 'none';
}

// Show signup page
function showSignupPage() {
    loginPage.style.display = 'none';
    signupPage.style.display = 'flex';
    appContainer.style.display = 'none';
}

// Show main app
function showApp() {
    loginPage.style.display = 'none';
    signupPage.style.display = 'none';
    appContainer.style.display = 'block';

    // Update UI with current user data
    navProfileImg.src = currentUser.avatar;
    navProfileName.textContent = currentUser.name;
    createPostAvatar.src = currentUser.avatar;
    modalProfileImg.src = currentUser.avatar;
    modalProfileName.textContent = currentUser.name;

    // Load posts, friend requests, and contacts
    loadPosts();
    loadFriendRequests();
    loadContacts();
    loadSuggestedFriends();
    updateNotificationBadges();
}

// Toggle profile dropdown
function toggleProfileDropdown() {
    profileDropdown.style.display = profileDropdown.style.display === 'block' ? 'none' : 'block';
}

// Close profile dropdown when clicking elsewhere
document.addEventListener('click', function (event) {
    if (!event.target.closest('.nav-profile')) {
        profileDropdown.style.display = 'none';
    }
});

// Login form handler
loginForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    // Find user
    const users = getData(STORAGE_KEYS.USERS);
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        currentUser = user;
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
        showApp();
    } else {
        showMessage(loginMessage, 'Invalid email or password', 'error');
    }
});

// Signup form handler
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;

    // Validate passwords match
    if (password !== confirmPassword) {
        showMessage(signupMessage, 'Passwords do not match', 'error');
        return;
    }

    // Check if user already exists
    const users = getData(STORAGE_KEYS.USERS);
    if (users.find(u => u.email === email)) {
        showMessage(signupMessage, 'User with this email already exists', 'error');
        return;
    }

    // Create new user
    const newUser = {
        id: generateId(),
        name,
        email,
        password,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80',
        bio: 'Hello! I\'m a social media enthusiast who loves connecting with friends and sharing experiences.',
        friends: [],
        createdAt: new Date().toISOString()
    };

    users.push(newUser);
    saveData(STORAGE_KEYS.USERS, users);

    currentUser = newUser;
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(newUser));

    showApp();
});

// Show message
function showMessage(element, text, type) {
    element.textContent = text;
    element.className = `message message-${type}`;
    element.style.display = 'block';

    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Generate unique ID
function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

// Load posts
function loadPosts() {
    // Clear existing posts (except controls and create post)
    const postsToRemove = Array.from(feed.children).slice(2);
    postsToRemove.forEach(post => post.remove());

    // Get posts from localStorage
    const posts = getData(STORAGE_KEYS.POSTS);

    // Add posts to feed (sorted by timestamp, newest first)
    posts
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        .forEach(post => {
            if (post.userId === currentUser.id || post.privacy === 'public' ||
                (post.privacy === 'friends' && currentUser.friends.includes(post.userId))) {
                addPostToFeed(post);
            }
        });
}

// Add post to feed
function addPostToFeed(post) {
    const users = getData(STORAGE_KEYS.USERS);
    const user = users.find(u => u.id === post.userId);

    const postElement = document.createElement('div');
    postElement.className = 'post';
    postElement.id = `post-${post.id}`;

    // Get user's current reaction if any
    const userReaction = post.likes.find(like => like.userId === currentUser.id);
    const currentReaction = userReaction ? userReaction.reaction : null;

    postElement.innerHTML = `
                <div class="post-header">
                    <div class="post-user">
                        <img src="${user.avatar}" alt="${user.name}" class="post-avatar">
                        <div class="post-user-info">
                            <div class="post-username">${user.name}</div>
                            <div class="post-time">${formatTime(post.timestamp)}</div>
                        </div>
                    </div>
                    <div class="post-options">
                        <button class="post-options-btn" onclick="togglePostOptions('${post.id}')">
                            <i class="fas fa-ellipsis-h"></i>
                        </button>
                        <div class="post-options-menu" id="post-options-${post.id}">
                            ${post.userId === currentUser.id ? `
                                <div class="post-option" onclick="editPost('${post.id}')">
                                    <i class="fas fa-edit"></i>
                                    <span>Edit Post</span>
                                </div>
                                <div class="post-option" onclick="deletePost('${post.id}')">
                                    <i class="fas fa-trash"></i>
                                    <span>Delete Post</span>
                                </div>
                            ` : `
                                <div class="post-option" onclick="savePost('${post.id}')">
                                    <i class="fas fa-bookmark"></i>
                                    <span>Save Post</span>
                                </div>
                                <div class="post-option" onclick="hidePost('${post.id}')">
                                    <i class="fas fa-eye-slash"></i>
                                    <span>Hide Post</span>
                                </div>
                            `}
                        </div>
                    </div>
                </div>
                <div class="post-content">
                    <div class="post-text">${post.content}</div>
                    ${post.image ? `<img src="${post.image}" class="post-image" alt="Post image">` : ''}
                </div>
                <div class="post-stats">
                    <div class="post-likes">
                        ${getReactionIcons(post.likes)}
                        <span>${post.likes.length}</span>
                    </div>
                    <div class="post-comments">
                        <span>${post.comments.length} comments</span>
                    </div>
                </div>
                <div class="post-actions">
                    <button class="post-action-btn ${currentReaction ? 'active' : ''}" 
                            onmouseenter="showReactionPicker('${post.id}')" 
                            onmouseleave="hideReactionPicker('${post.id}')"
                            id="like-btn-${post.id}">
                        ${getReactionIcon(currentReaction)}
                        <span>${getReactionText(currentReaction)}</span>
                        <div class="reaction-picker" id="reaction-picker-${post.id}">
                            <button class="reaction-btn reaction-like" onclick="addReaction('${post.id}', 'like')" title="Like">👍</button>
                            <button class="reaction-btn reaction-love" onclick="addReaction('${post.id}', 'love')" title="Love">❤️</button>
                            <button class="reaction-btn reaction-care" onclick="addReaction('${post.id}', 'care')" title="Care">🥰</button>
                            <button class="reaction-btn reaction-haha" onclick="addReaction('${post.id}', 'haha')" title="Haha">😂</button>
                            <button class="reaction-btn reaction-wow" onclick="addReaction('${post.id}', 'wow')" title="Wow">😮</button>
                            <button class="reaction-btn reaction-sad" onclick="addReaction('${post.id}', 'sad')" title="Sad">😢</button>
                            <button class="reaction-btn reaction-angry" onclick="addReaction('${post.id}', 'angry')" title="Angry">😠</button>
                        </div>
                    </button>
                    <button class="post-action-btn" onclick="toggleComments('${post.id}')">
                        <i class="fas fa-comment"></i>
                        <span>Comment</span>
                    </button>
                    <button class="post-action-btn">
                        <i class="fas fa-share"></i>
                        <span>Share</span>
                    </button>
                </div>
                <div class="comments-section" id="comments-${post.id}">
                    ${post.comments.map(comment => {
        const commentUser = users.find(u => u.id === comment.userId);
        return `
                            <div class="comment">
                                <img src="${commentUser.avatar}" alt="${commentUser.name}" class="comment-avatar">
                                <div class="comment-content">
                                    <div class="comment-header">
                                        <div class="comment-username">${commentUser.name}</div>
                                        <div class="comment-time">${formatTime(comment.timestamp)}</div>
                                    </div>
                                    <div class="comment-text">${comment.text}</div>
                                    <div class="comment-actions">
                                        <span class="comment-action" onclick="likeComment('${post.id}', '${comment.id}')">Like</span>
                                        <span class="comment-action" onclick="replyToComment('${post.id}', '${comment.id}')">Reply</span>
                                        ${comment.userId === currentUser.id ? `
                                            <span class="comment-action" onclick="deleteComment('${post.id}', '${comment.id}')">Delete</span>
                                        ` : ''}
                                    </div>
                                </div>
                            </div>
                        `;
    }).join('')}
                    <div class="add-comment">
                        <img src="${currentUser.avatar}" alt="${currentUser.name}" class="comment-avatar">
                        <input type="text" class="comment-input" placeholder="Write a comment..." id="comment-input-${post.id}">
                        <button class="comment-btn" onclick="addComment('${post.id}')">Post</button>
                    </div>
                </div>
            `;

    // Insert after the create post element
    const createPostElement = document.querySelector('.create-post');
    feed.insertBefore(postElement, createPostElement.nextSibling);
}

// Get reaction icons for post stats
function getReactionIcons(likes) {
    if (likes.length === 0) return '';

    const reactionCounts = {
        like: 0,
        love: 0,
        care: 0,
        haha: 0,
        wow: 0,
        sad: 0,
        angry: 0
    };

    likes.forEach(like => {
        reactionCounts[like.reaction]++;
    });

    // Get top 2 reactions
    const topReactions = Object.entries(reactionCounts)
        .filter(([_, count]) => count > 0)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 2)
        .map(([reaction]) => reaction);

    let icons = '';
    topReactions.forEach(reaction => {
        icons += getReactionIcon(reaction, '14px');
    });

    return icons;
}

// Get reaction icon
function getReactionIcon(reaction, size = '16px') {
    const icons = {
        like: '👍',
        love: '❤️',
        care: '🥰',
        haha: '😂',
        wow: '😮',
        sad: '😢',
        angry: '😠'
    };

    return reaction ? `<span style="font-size: ${size};">${icons[reaction]}</span>` : '<i class="fas fa-thumbs-up"></i>';
}

// Get reaction text
function getReactionText(reaction) {
    const texts = {
        like: 'Like',
        love: 'Love',
        care: 'Care',
        haha: 'Haha',
        wow: 'Wow',
        sad: 'Sad',
        angry: 'Angry'
    };

    return reaction ? texts[reaction] : 'Like';
}

// Show reaction picker
function showReactionPicker(postId) {
    const picker = document.getElementById(`reaction-picker-${postId}`);
    if (picker) {
        picker.style.display = 'flex';
    }
}

// Hide reaction picker
function hideReactionPicker(postId) {
    const picker = document.getElementById(`reaction-picker-${postId}`);
    if (picker) {
        // Add small delay before hiding to allow clicking
        setTimeout(() => {
            if (picker) picker.style.display = 'none';
        }, 300);
    }
}

// Add reaction to post
function addReaction(postId, reaction) {
    const posts = getData(STORAGE_KEYS.POSTS);
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    // Remove existing reaction from this user
    const existingReactionIndex = post.likes.findIndex(like => like.userId === currentUser.id);
    if (existingReactionIndex !== -1) {
        post.likes.splice(existingReactionIndex, 1);
    }

    // Add new reaction
    post.likes.push({
        userId: currentUser.id,
        reaction: reaction
    });

    saveData(STORAGE_KEYS.POSTS, posts);

    // Update UI
    const likeBtn = document.querySelector(`#like-btn-${postId}`);
    const likeCount = document.querySelector(`#post-${postId} .post-likes span`);
    const reactionIcons = document.querySelector(`#post-${postId} .post-likes`);

    likeBtn.innerHTML = `
                ${getReactionIcon(reaction)}
                <span>${getReactionText(reaction)}</span>
                <div class="reaction-picker" id="reaction-picker-${postId}">
                    <button class="reaction-btn reaction-like" onclick="addReaction('${postId}', 'like')" title="Like">👍</button>
                    <button class="reaction-btn reaction-love" onclick="addReaction('${postId}', 'love')" title="Love">❤️</button>
                    <button class="reaction-btn reaction-care" onclick="addReaction('${postId}', 'care')" title="Care">🥰</button>
                    <button class="reaction-btn reaction-haha" onclick="addReaction('${postId}', 'haha')" title="Haha">😂</button>
                    <button class="reaction-btn reaction-wow" onclick="addReaction('${postId}', 'wow')" title="Wow">😮</button>
                    <button class="reaction-btn reaction-sad" onclick="addReaction('${postId}', 'sad')" title="Sad">😢</button>
                    <button class="reaction-btn reaction-angry" onclick="addReaction('${postId}', 'angry')" title="Angry">😠</button>
                </div>
            `;

    likeBtn.classList.add('active');
    likeCount.textContent = post.likes.length;
    reactionIcons.innerHTML = `${getReactionIcons(post.likes)}<span>${post.likes.length}</span>`;

    // Reattach event listeners
    const newLikeBtn = document.querySelector(`#like-btn-${postId}`);
    newLikeBtn.addEventListener('mouseenter', () => showReactionPicker(postId));
    newLikeBtn.addEventListener('mouseleave', () => hideReactionPicker(postId));
}

// Format time
function formatTime(timestamp) {
    const now = new Date();
    const postTime = new Date(timestamp);
    const diff = now - postTime;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;

    return postTime.toLocaleDateString();
}

// Toggle post options
function togglePostOptions(postId) {
    const optionsMenu = document.getElementById(`post-options-${postId}`);
    optionsMenu.style.display = optionsMenu.style.display === 'block' ? 'none' : 'block';
}

// Create post modal
function showCreatePostModal() {
    document.getElementById('create-post-modal').style.display = 'flex';
    document.getElementById('post-content').value = '';
    document.getElementById('post-image-preview').style.display = 'none';
    urlInputSection.style.display = 'none';
    urlPreview.style.display = 'none';
    imageUrlInput.value = '';
    emojiPicker.style.display = 'none';
}

function closeCreatePostModal() {
    document.getElementById('create-post-modal').style.display = 'none';
    emojiPicker.style.display = 'none';
}

// Show image URL input section
function showImageUrlInput() {
    showCreatePostModal();
    urlInputSection.style.display = 'block';
}

// Toggle URL input section
function toggleUrlInput() {
    if (urlInputSection.style.display === 'none' || urlInputSection.style.display === '') {
        urlInputSection.style.display = 'block';
    } else {
        urlInputSection.style.display = 'none';
        urlPreview.style.display = 'none';
        imageUrlInput.value = '';
    }
}

// Toggle emoji picker
function toggleEmojiPicker(event) {
    if (event) {
        event.stopPropagation();
    }

    const emojiPicker = document.getElementById('emoji-picker');
    if (emojiPicker.style.display === 'grid') {
        emojiPicker.style.display = 'none';
    } else {
        emojiPicker.style.display = 'grid';
        // Position the emoji picker relative to the textarea
        positionEmojiPicker();
    }
}

// Position emoji picker near the textarea
function positionEmojiPicker() {
    const textarea = document.getElementById('post-content');
    const textareaRect = textarea.getBoundingClientRect();
    const modalRect = document.querySelector('.modal-content').getBoundingClientRect();

    emojiPicker.style.position = 'absolute';
    emojiPicker.style.bottom = '100%';
    emojiPicker.style.left = '0';
    emojiPicker.style.marginBottom = '10px';
}

// Add emoji to post content
function addEmoji(emoji) {
    const postContent = document.getElementById('post-content');
    const cursorPosition = postContent.selectionStart;
    const textBefore = postContent.value.substring(0, cursorPosition);
    const textAfter = postContent.value.substring(cursorPosition);

    postContent.value = textBefore + emoji + textAfter;

    // Set cursor position after the inserted emoji
    const newCursorPosition = cursorPosition + emoji.length;
    postContent.setSelectionRange(newCursorPosition, newCursorPosition);

    // Hide emoji picker after selection
    emojiPicker.style.display = 'none';

    // Focus back on textarea
    postContent.focus();
}

// Load image from URL
function loadImageFromUrl() {
    const imageUrl = imageUrlInput.value.trim();

    if (!imageUrl) {
        alert('Please enter an image URL');
        return;
    }

    // Validate URL format
    try {
        new URL(imageUrl);
    } catch (e) {
        alert('Please enter a valid URL');
        return;
    }

    // Show loading state
    urlImagePreview.src = '';
    urlPreview.style.display = 'block';
    urlImagePreview.alt = 'Loading...';

    // Load the image
    const img = new Image();
    img.onload = function () {
        urlImagePreview.src = imageUrl;
        urlImagePreview.alt = 'Image preview';

        // Set the image for the post
        postImage.src = imageUrl;
        postImagePreview.style.display = 'block';

        // Hide URL input section after successful load
        urlInputSection.style.display = 'none';
    };

    img.onerror = function () {
        alert('Failed to load image from the provided URL. Please check the URL and try again.');
        urlPreview.style.display = 'none';
    };

    img.src = imageUrl;
}

// Auto-resize textarea
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
}

// Create post
function createPost() {
    const content = document.getElementById('post-content').value;
    const privacy = document.getElementById('post-privacy').value;
    const image = postImagePreview.style.display === 'block' ?
        postImage.src : null;

    if (!content.trim() && !image) {
        alert('Please add some content to your post');
        return;
    }

    const posts = getData(STORAGE_KEYS.POSTS);

    const newPost = {
        id: generateId(),
        userId: currentUser.id,
        content: content.trim(),
        image: image,
        privacy: privacy,
        timestamp: new Date().toISOString(),
        likes: [],
        comments: []
    };

    posts.unshift(newPost);
    saveData(STORAGE_KEYS.POSTS, posts);

    addPostToFeed(newPost);
    closeCreatePostModal();

    // Reset search and filters
    feedSearch.value = '';
    sortFilter.value = 'newest';
    privacyFilter.value = 'all';
}

// Toggle comments section
function toggleComments(postId) {
    const commentsSection = document.getElementById(`comments-${postId}`);
    commentsSection.style.display = commentsSection.style.display === 'block' ? 'none' : 'block';
}

// Add comment
function addComment(postId) {
    const commentInput = document.getElementById(`comment-input-${postId}`);
    const text = commentInput.value.trim();

    if (!text) return;

    const posts = getData(STORAGE_KEYS.POSTS);
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const newComment = {
        id: generateId(),
        userId: currentUser.id,
        text: text,
        timestamp: new Date().toISOString(),
        likes: []
    };

    post.comments.push(newComment);
    saveData(STORAGE_KEYS.POSTS, posts);

    // Clear input
    commentInput.value = '';

    // Reload the post to show the new comment
    const postElement = document.getElementById(`post-${postId}`);
    postElement.remove();
    addPostToFeed(post);

    // Show comments section
    document.getElementById(`comments-${postId}`).style.display = 'block';
}

// Delete comment
function deleteComment(postId, commentId) {
    const posts = getData(STORAGE_KEYS.POSTS);
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    const commentIndex = post.comments.findIndex(c => c.id === commentId);
    if (commentIndex === -1) return;

    post.comments.splice(commentIndex, 1);
    saveData(STORAGE_KEYS.POSTS, posts);

    // Reload the post
    const postElement = document.getElementById(`post-${postId}`);
    postElement.remove();
    addPostToFeed(post);
}

// Edit post
function editPost(postId) {
    const posts = getData(STORAGE_KEYS.POSTS);
    const post = posts.find(p => p.id === postId);
    if (!post) return;

    document.getElementById('post-content').value = post.content;
    if (post.image) {
        postImage.src = post.image;
        postImagePreview.style.display = 'block';
    }
    document.getElementById('post-privacy').value = post.privacy;

    showCreatePostModal();

    // Remove the old post (it will be recreated after editing)
    const updatedPosts = posts.filter(p => p.id !== postId);
    saveData(STORAGE_KEYS.POSTS, updatedPosts);

    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) postElement.remove();
}

// Delete post
function deletePost(postId) {
    if (!confirm('Are you sure you want to delete this post?')) return;

    const posts = getData(STORAGE_KEYS.POSTS);
    const updatedPosts = posts.filter(p => p.id !== postId);
    saveData(STORAGE_KEYS.POSTS, updatedPosts);

    const postElement = document.getElementById(`post-${postId}`);
    if (postElement) postElement.remove();
}

// Send friend request to a user
function sendFriendRequest(toUserId) {
    const friendRequests = getData(STORAGE_KEYS.FRIEND_REQUESTS);
    const users = getData(STORAGE_KEYS.USERS);

    // Check if request already exists
    const existingRequest = friendRequests.find(req =>
        req.fromUserId === currentUser.id && req.toUserId === toUserId && req.status === 'pending'
    );

    if (existingRequest) {
        alert('Friend request already sent!');
        return;
    }

    // Create new friend request
    const newRequest = {
        id: generateId(),
        fromUserId: currentUser.id,
        toUserId: toUserId,
        status: 'pending',
        timestamp: new Date().toISOString()
    };

    friendRequests.push(newRequest);
    saveData(STORAGE_KEYS.FRIEND_REQUESTS, friendRequests);

    // Update notifications for the recipient
    updateNotifications(toUserId, 'friend_request');

    // Reload suggested friends
    loadSuggestedFriends();
    updateNotificationBadges();

    alert('Friend request sent!');
}

// Update notifications for a user
function updateNotifications(userId, type) {
    const notifications = getData(STORAGE_KEYS.NOTIFICATIONS);
    const users = getData(STORAGE_KEYS.USERS);

    const fromUser = users.find(u => u.id === currentUser.id);

    let notification = {
        id: generateId(),
        userId: userId,
        type: type,
        fromUserId: currentUser.id,
        fromUserName: fromUser.name,
        message: `${fromUser.name} sent you a friend request`,
        timestamp: new Date().toISOString(),
        read: false
    };

    notifications.push(notification);
    saveData(STORAGE_KEYS.NOTIFICATIONS, notifications);
}

// Load friend requests
function loadFriendRequests() {
    // Clear existing requests
    friendRequestsList.innerHTML = '';

    // Get requests from localStorage
    const friendRequests = getData(STORAGE_KEYS.FRIEND_REQUESTS);
    const users = getData(STORAGE_KEYS.USERS);

    // Filter requests for current user
    const userRequests = friendRequests.filter(req =>
        req.toUserId === currentUser.id && req.status === 'pending'
    );

    // Update badge
    friendRequestsBadge.textContent = userRequests.length;

    if (userRequests.length === 0) {
        friendRequestsList.innerHTML = '<div style="text-align: center; padding: 20px; color: var(--text-light);">No friend requests</div>';
        return;
    }

    // Add requests to list
    userRequests.forEach(request => {
        const fromUser = users.find(u => u.id === request.fromUserId);
        if (!fromUser) return;

        const requestElement = document.createElement('div');
        requestElement.className = 'friend-request';
        requestElement.innerHTML = `
                    <img src="${fromUser.avatar}" alt="${fromUser.name}" class="friend-request-avatar">
                    <div class="friend-request-info">
                        <div class="friend-request-name">${fromUser.name}</div>
                        <div class="friend-request-mutual">${getMutualFriendsCount(fromUser.id)} mutual friends</div>
                        <div class="friend-request-actions">
                            <button class="btn btn-primary btn-small" onclick="acceptFriendRequest('${request.id}')">Confirm</button>
                            <button class="btn btn-outline btn-small" onclick="declineFriendRequest('${request.id}')">Delete</button>
                        </div>
                    </div>
                `;

        friendRequestsList.appendChild(requestElement);
    });
}

// Accept friend request
function acceptFriendRequest(requestId) {
    const friendRequests = getData(STORAGE_KEYS.FRIEND_REQUESTS);
    const users = getData(STORAGE_KEYS.USERS);

    const request = friendRequests.find(req => req.id === requestId);
    if (!request) return;

    // Add to friends list
    const fromUser = users.find(u => u.id === request.fromUserId);
    const toUser = users.find(u => u.id === request.toUserId);

    if (fromUser && toUser) {
        if (!fromUser.friends.includes(toUser.id)) {
            fromUser.friends.push(toUser.id);
        }
        if (!toUser.friends.includes(fromUser.id)) {
            toUser.friends.push(fromUser.id);
        }

        saveData(STORAGE_KEYS.USERS, users);

        // Update current user if needed
        if (currentUser.id === toUser.id) {
            currentUser = toUser;
            localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(toUser));
        }
    }

    // Update the request status
    request.status = 'accepted';
    saveData(STORAGE_KEYS.FRIEND_REQUESTS, friendRequests);

    // Reload requests and contacts
    loadFriendRequests();
    loadContacts();
    loadSuggestedFriends();
    updateNotificationBadges();
}

// Decline friend request
function declineFriendRequest(requestId) {
    const friendRequests = getData(STORAGE_KEYS.FRIEND_REQUESTS);
    const updatedRequests = friendRequests.filter(req => req.id !== requestId);
    saveData(STORAGE_KEYS.FRIEND_REQUESTS, updatedRequests);

    // Reload requests
    loadFriendRequests();
    loadSuggestedFriends();
    updateNotificationBadges();
}

// Load suggested friends
function loadSuggestedFriends() {
    const suggestedFriendsList = document.getElementById('suggested-friends');
    const users = getData(STORAGE_KEYS.USERS);
    const friendRequests = getData(STORAGE_KEYS.FRIEND_REQUESTS);

    // Clear existing suggestions
    suggestedFriendsList.innerHTML = '';

    // Get users who are not current user and not already friends
    const suggestedUsers = users.filter(user =>
        user.id !== currentUser.id &&
        !currentUser.friends.includes(user.id) &&
        !friendRequests.find(req =>
            (req.fromUserId === currentUser.id && req.toUserId === user.id && req.status === 'pending') ||
            (req.fromUserId === user.id && req.toUserId === currentUser.id && req.status === 'pending')
        )
    );

    if (suggestedUsers.length === 0) {
        suggestedFriendsList.innerHTML = '<div style="text-align: center; padding: 10px; color: var(--text-light); font-size: 14px;">No suggestions found</div>';
        return;
    }

    // Show max 5 suggestions
    const usersToShow = suggestedUsers.slice(0, 5);

    usersToShow.forEach(user => {
        const friendElement = document.createElement('div');
        friendElement.className = 'friend-request';
        friendElement.innerHTML = `
                    <img src="${user.avatar}" alt="${user.name}" class="friend-request-avatar">
                    <div class="friend-request-info">
                        <div class="friend-request-name">${user.name}</div>
                        <div class="friend-request-mutual">${getMutualFriendsCount(user.id)} mutual friends</div>
                        <div class="friend-request-actions">
                            <button class="btn btn-primary btn-small" onclick="sendFriendRequest('${user.id}')">Add Friend</button>
                        </div>
                    </div>
                `;

        suggestedFriendsList.appendChild(friendElement);
    });
}

// Get mutual friends count
function getMutualFriendsCount(otherUserId) {
    const users = getData(STORAGE_KEYS.USERS);
    const otherUser = users.find(u => u.id === otherUserId);

    if (!otherUser) return 0;

    const mutualFriends = currentUser.friends.filter(friendId =>
        otherUser.friends.includes(friendId)
    );

    return mutualFriends.length;
}

// Load contacts (friends)
function loadContacts() {
    // Clear existing contacts
    contactsList.innerHTML = '';

    const users = getData(STORAGE_KEYS.USERS);

    // Get current user's friends
    const friends = users.filter(user =>
        currentUser.friends.includes(user.id)
    );

    if (friends.length === 0) {
        contactsList.innerHTML = '<div style="text-align: center; padding: 10px; color: var(--text-light); font-size: 14px;">No friends yet</div>';
        return;
    }

    // Add friends to contacts list
    friends.forEach(friend => {
        const contactElement = document.createElement('div');
        contactElement.className = 'sidebar-item';
        contactElement.innerHTML = `
                    <img src="${friend.avatar}" alt="${friend.name}" class="profile-img">
                    <div class="sidebar-text">${friend.name}</div>
                `;

        contactsList.appendChild(contactElement);
    });
}

// Update notification badges
function updateNotificationBadges() {
    const friendRequests = getData(STORAGE_KEYS.FRIEND_REQUESTS);
    const userRequests = friendRequests.filter(req =>
        req.toUserId === currentUser.id && req.status === 'pending'
    );
    friendRequestsBadge.textContent = userRequests.length;

    const notifications = getData(STORAGE_KEYS.NOTIFICATIONS);
    const userNotifications = notifications.filter(notif =>
        notif.userId === currentUser.id && !notif.read
    );
    // Fixed: Check if element exists before setting textContent
    const notificationsBadge = document.getElementById('notifications-badge');
    if (notificationsBadge) {
        notificationsBadge.textContent = userNotifications.length;
    }
}

// Show notifications
function showNotifications() {
    alert('Notifications feature coming soon!');
}

// Logout
function logout() {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    currentUser = null;
    showLoginPage();
}

// Initialize the app when page loads
window.onload = initApp;

// Close modals when clicking outside
window.onclick = function (event) {
    const createPostModal = document.getElementById('create-post-modal');

    if (event.target === createPostModal) {
        closeCreatePostModal();
    }
};

// Close post options when clicking elsewhere
document.addEventListener('click', function (event) {
    if (!event.target.closest('.post-options')) {
        document.querySelectorAll('.post-options-menu').forEach(menu => {
            menu.style.display = 'none';
        });
    }
});
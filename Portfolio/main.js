// Portfolio Items Data
const portfolioItems = [
    {
        title: '3D Character Model',
        category: '3D Modeling',
        image: 'https://picsum.photos/600/400?random=1',
        description: 'Detailed character model created for an animated short film'
    },
    {
        title: 'Brand Identity Design',
        category: 'Graphic Design',
        image: 'https://picsum.photos/600/400?random=2',
        description: 'Complete brand identity package for a tech startup'
    },
    {
        title: 'Animation Reel',
        category: 'Animation',
        image: 'https://picsum.photos/600/400?random=3',
        description: 'Character animation showcase for various projects'
    },
    {
        title: 'Environmental Design',
        category: '3D Modeling',
        image: 'https://picsum.photos/600/400?random=4',
        description: 'Detailed 3D environment for a game project'
    },
    {
        title: 'Motion Graphics',
        category: 'Animation',
        image: 'https://picsum.photos/600/400?random=5',
        description: 'Corporate motion graphics package'
    },
    {
        title: 'Product Visualization',
        category: '3D Modeling',
        image: 'https://picsum.photos/600/400?random=6',
        description: 'Photorealistic product rendering'
    }
];

// Populate Portfolio Grid
function populatePortfolio() {
    const portfolioGrid = document.getElementById('portfolio-grid');
    
    portfolioItems.forEach(item => {
        const portfolioItem = document.createElement('div');
        portfolioItem.className = 'portfolio-item';
        
        portfolioItem.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <div class="portfolio-item-overlay">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
                <span class="category">${item.category}</span>
            </div>
        `;
        
        portfolioGrid.appendChild(portfolioItem);
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });
});

// Form Submission
const contactForm = document.getElementById('contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Here you would typically handle the form submission
    alert('Thank you for your message! I will get back to you soon.');
    contactForm.reset();
});

// Navbar Scroll Effect
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    lastScroll = currentScroll;
});

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    populatePortfolio();
});
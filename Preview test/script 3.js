// Game data from the provided list
const games = [
    "10-minutes-till-dawn",
    "100ng",
    "1v1lol",
    "1v1space",
    "2020-game",
    "2048-multitask",
    "2048",
    "8ball-billards-classic",
    "9007199254740992",
    "DogeMiner",
    "FullScreenMario/Source",
    "HexGL",
    "OfflineParadise",
    "Squid Gun Fest",
    "Stickman-Survival",
    "achievementunlocked",
    "adarkroom",
    "adrenalinechallenge",
    "age-of-war",
    "alien-invaders-io",
    "alienhominid",
    "align-4",
    "among-us",
    "angry-birds",
    "anti-terrorist-rush",
    "arcade-wizard",
    "asciispace",
    "aspiring-artist",
    "asteroids",
    "astray",
    "avalanche",
    "awesome-tanks-2",
    "backcountry",
    "backflip-dive-3d",
    "backrooms",
    "bad-ice-cream-2",
    "bad-ice-cream-3",
    "bad-ice-cream",
    "baldis-basics",
    "basket-bros-io"
];

// Format game title for display
function formatGameTitle(title) {
    return title
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
        .split('/')
        .map(part => part.trim())
        .join(' - ');
}

// Create game cards and add them to the container
function displayGames(gamesList) {
    const gamesContainer = document.getElementById('games-container');
    gamesContainer.innerHTML = '';
    
    if (gamesList.length === 0) {
        gamesContainer.innerHTML = '<p class="no-results">No games found. Try a different search term.</p>';
        return;
    }
    
    gamesList.forEach(game => {
        const formattedTitle = formatGameTitle(game);
        
        // Create game card element
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        
        // Generate a random color for the placeholder
        const hue = Math.floor(Math.random() * 360);
        
        gameCard.innerHTML = `
            <img src="/placeholder.svg?height=150&width=250&text=${encodeURIComponent(formattedTitle)}" 
                 alt="${formattedTitle}" class="game-thumbnail">
            <div class="game-info">
                <h3 class="game-title">${formattedTitle}</h3>
            </div>
        `;
        
        gamesContainer.appendChild(gameCard);
    });
}

// Filter games based on search input
function filterGames(searchTerm) {
    if (!searchTerm) {
        return games;
    }
    
    searchTerm = searchTerm.toLowerCase();
    return games.filter(game => 
        formatGameTitle(game).toLowerCase().includes(searchTerm)
    );
}

// Initialize the page
function init() {
    // Display all games initially
    displayGames(games);
    
    // Set up search functionality
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    
    function performSearch() {
        const searchTerm = searchInput.value.trim();
        const filteredGames = filterGames(searchTerm);
        displayGames(filteredGames);
    }
    
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
    
    // Set up theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Save preference to localStorage
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDarkMode);
    });
    
    // Check for saved theme preference
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    if (savedDarkMode) {
        document.body.classList.add('dark-mode');
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);
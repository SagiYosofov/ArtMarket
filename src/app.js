import './style.css'

const header = document.querySelector('h1')
const app = document.getElementById('app')
const ddMenu = document.querySelector('#ddMenu')
const sandwitch = document.querySelectorAll('svg')
const html = document.documentElement

// Make functions available globally
window.toggle = () => html.classList.toggle('dark')

window.setView = (v) => {
    header.innerText = v
    toggleMenu(true)

    if (v === 'Home') {
        renderHome()
    } else if (v === 'Artists') {
        renderArtists()
    } else if (v === 'Artworks') {
        renderArtworks()
    }
}

window.toggleMenu = (hide) => {
    if (!hide) {
        ddMenu.classList.toggle('hidden')
        document.querySelectorAll('svg').forEach((el) => {
            el.classList.toggle('hidden')
        })
    } else {
        ddMenu.classList.add('hidden')
        document.querySelectorAll('svg')[0].classList.remove('hidden')
        document.querySelectorAll('svg')[1].classList.add('hidden')
    }
}

const renderHome = () => {
    app.innerHTML = `
        <div class="p-4 dark:text-white">
            <h1 class="text-3xl font-bold mb-4">Welcome to ArtMarket!</h1>
            <h2 class="text-xl font-semibold mb-2">Description:</h2>
            <p class="text-lg">
                Artmarket is a platform for artists to share and sell their art! We offer secure payment with Apple Pay and PayPal!
            </p>
        </div>
    `
}

const renderArtists = async () => {
    const response = await fetch('/info.json');
    const data = await response.json();
    
    app.innerHTML = data.artists.map(artist => `
        <div class="p-4 border-b border-gray-900 dark:text-white">
            <div class="grid grid-cols-1 gap-4 place-items-center">
                <img class="object-cover h-[200px] w-[200px] rounded-lg mx-auto" 
                    src="${artist.headshot}" 
                    alt="Photo of ${artist.name}">
                <div class="text-center">
                    <h2 class="text-2xl font-bold mb-2">${artist.name}</h2>
                    <p class="mb-2"><span class="font-semibold">Born:</span> ${artist.birthYear}, ${artist.birthplace}</p>
                    <p class="text-lg">${artist.summary}</p>
                </div>
            </div>
        </div>
    `).join('')
}

const renderArtworks = async () => {
    const response = await fetch('/info.json');
    const data = await response.json();
    
    const allArtworks = data.artists.flatMap(artist => 
        artist.artworks.map(artwork => ({
            ...artwork,
            artist: artist.name
        }))
    );

    app.innerHTML = `
        <div class="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${allArtworks.map(artwork => `
                <div class="border rounded-lg p-4 dark:text-white">
                    <img class="w-full h-48 object-cover rounded-lg mb-4" 
                        src="${artwork.src}" 
                        alt="${artwork.title}">
                    <h2 class="text-xl font-bold mb-2">${artwork.title}</h2>
                    <p class="mb-2"><span class="font-semibold">Artist:</span> ${artwork.artist}</p>
                    <p class="mb-2"><span class="font-semibold">Location:</span> ${artwork.location}</p>
                    <p>${artwork.summary}</p>
                    <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4 dark:bg-green-600 dark:hover:bg-green-700" onclick="alert('coming soon')">Buy Now</button>
                </div>
            `).join('')}
        </div>
    `
}

const renderMenu = () => {
    // to do
}

const renderThemeToggle = () => {
    // to do
}

const setupDarkMode = () => {
    const darkModeStyles = `
        .dark {
            background-color: #1a1a1a;
            color: #ffffff;
        }
        .dark .border {
            border-color: #374151;
        }
    `
    const styleSheet = document.createElement("style")
    styleSheet.innerText = darkModeStyles
    document.head.appendChild(styleSheet)
}

setupDarkMode()

renderMenu()
renderThemeToggle()
renderHome()

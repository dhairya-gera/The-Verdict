# The Verdict

A premium, dynamic, and fully responsive movie discovery and review web application built from the ground up with HTML, CSS, and Vanilla JavaScript. Inspired by top OTT platforms, this project serves as a comprehensive hub for movie enthusiasts to explore genres, search for titles in real-time, and engage with cinematic content through a modern, glassmorphic interface.

## ✨ Features

-   **Cinematic Discovery**: Browse an extensive, categorized library of movies and TV shows across genres like Action, Sci-Fi, Horror, Comedy, and Drama.
-   **Blazing-Fast Live Search**: An optimized real-time search engine filters titles instantly by name and genre without page reloads, built with Vanilla JavaScript.
-   **Detailed Movie Pages**: Each movie has a dedicated page with a dynamic hero section, poster, detailed information (director, country, rating), plot overview, and a critics' consensus module.
-   **Interactive UI/UX**:
    -   **Glassmorphic Navigation**: A sleek, sticky navbar provides seamless navigation and a modern aesthetic.
    -   **Engaging Micro-interactions**: Smooth hover effects on movie cards, buttons, and links enhance user engagement.
    -   **Action Buttons**: "Mark as Watched" and "Add to Playlist" functionality with interactive pop-up notifications.
-   **Full Authentication Flow**: A complete, frontend-simulated login and registration system featuring:
    -   Tabbed login/register panels.
    -   Password strength indicators.
    -   Step-by-step registration with email verification (simulated OTP).
    -   User data management using `localStorage`.
-   **Dedicated Music Player**: An integrated soundtrack section with a Spotify-like UI to listen to official movie albums.
-   **Fully Responsive Design**: The interface is built with modern CSS (Flexbox, Grid, Custom Variables) to adapt flawlessly to all screen sizes, from mobile phones to desktops.

## 💻 Tech Stack

-   **Frontend**: HTML5, CSS3, JavaScript (ES6+)
-   **Design & Styling**:
    -   **Layout**: CSS Flexbox and Grid for complex, responsive layouts.
    -   **Effects**: Glassmorphism (`backdrop-filter`), CSS Animations, and Transitions.
    -   **Typography**: Google Fonts (Bebas Neue, Roboto Condensed, Poppins).
    -   **Icons**: FontAwesome for scalable vector icons.
-   **Development Tools**:
    -   **Version Control**: Git & GitHub.
    -   **IDE**: Visual Studio Code.

## 📂 Project Structure

The repository is organized to maintain a clear separation of concerns, making the codebase clean and scalable.

```
dhairya-gera-the-verdict/
├── Assets/
│   └── images/              # Logos, posters, and UI assets
├── CSS/
│   ├── Explore.css          # Styles for movie/TV show grids
│   ├── Home.css             # Styles for the landing page
│   ├── Login.css            # Styles for the authentication page
│   ├── Music.css            # Styles for the soundtrack player
│   └── Movies/
│       └── Movie_info.css   # Styles for individual movie detail pages
├── HTML/
│   ├── Home.html            # Main landing page
│   ├── Login.html           # Login and registration page
│   ├── Movies.html          # Main movie discovery grid
│   ├── Music.html           # Soundtrack player page
│   ├── TV-Shows.html        # TV show discovery grid
│   └── Movies/
│       ├── *.html           # Individual movie detail pages
└── JS/
    ├── Explore.js           # Logic for live search functionality
    ├── Home.js              # Logic for home page interactions
    ├── Login.js             # Logic for authentication flow
    └── Movies/
        └── Movies_info.js   # Logic for movie detail page actions
```

## 🚀 Getting Started

This is a pure frontend project and does not require any build steps or backend servers to run.

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/dhairya-gera/The-Verdict.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd The-Verdict
    ```

3.  **Open the main file in your browser:**
    Simply open the `HTML/Home.html` file in your preferred web browser to launch the application.

    You can also explore other pages directly, such as `HTML/Movies.html` or `HTML/Login.html`.
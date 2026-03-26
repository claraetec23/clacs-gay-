const isGitHubDev = window.location.hostname.endsWith(".app.github.dev");

export const API_URL = isGitHubDev
    ? "https://" + window.location.hostname.replace(/-40413\.app\.github\.dev$/, "-3000.app.github.dev")
    : "http://localhost:3000";

// Theme Toggle
const mode = document.querySelector(".mode");

const toggleDarkMode = () => {
    const icon = mode.querySelector("i");
    if (mode.textContent.includes("Light")) {
        mode.innerHTML = 'Dark <i class="ri-moon-line"></i>';
        document.documentElement.setAttribute('data-bs-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        localStorage.setItem('themeText', 'Dark');
    } else {
        mode.innerHTML = 'Light <i class="ri-sun-line"></i>';
        document.documentElement.setAttribute('data-bs-theme', 'light');
        localStorage.setItem('theme', 'light');
        localStorage.setItem('themeText', 'Light');
    }
};

mode.addEventListener("click", toggleDarkMode);
// Carousel initialization and icon animation

document.addEventListener('DOMContentLoaded', () => {
    const carousel = new bootstrap.Carousel(document.getElementById('featureCarousel'), {
      interval: 5000,
      wrap: true
    });
  
    const carouselElement = document.getElementById('featureCarousel');
    carouselElement.addEventListener('slid.bs.carousel', (event) => {
      const activeItem = event.relatedTarget;
      const icon = activeItem.querySelector('.feature-icon');
      icon.style.transform = 'scale(1.2)';
      setTimeout(() => {
        icon.style.transform = 'scale(1)';
      }, 300);
    });
  });
  
  

// Initialize theme
document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem('theme');
    const savedThemeText = localStorage.getItem('themeText');

    if (savedTheme) {
        document.documentElement.setAttribute('data-bs-theme', savedTheme);
        mode.innerHTML = savedThemeText === 'Dark' 
            ? 'Light <i class="ri-sun-line"></i>' 
            : 'Dark <i class="ri-moon-line"></i>';
    }
});

// Main functionality
document.addEventListener("DOMContentLoaded", () => {
    // Elements
    const loadingSkeleton = document.getElementById("loading-skeleton");
    const userOverview = document.getElementById("user-overview");
    const repositoriesSection = document.getElementById("repositories");
    const contributionsSection = document.getElementById("contributions");
    const reposList = document.getElementById("repos-list");

    // Charts
    let contributionChart;
    let languageChart;

    // Utility Functions
    const formatDate = (dateString) => {
        const options = { year: "numeric", month: "long", day: "numeric" };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const showLoading = () => {
        loadingSkeleton.classList.remove("d-none");
        userOverview.classList.add("d-none");
        repositoriesSection.classList.add("d-none");
        contributionsSection.classList.add("d-none");
        reposList.innerHTML = "";
    };

    const hideLoading = () => {
        loadingSkeleton.classList.add("d-none");
    };

    // Create Language Chart
    const createLanguageChart = (languages) => {
        const ctx = document.getElementById('language-chart').getContext('2d');
        
        if (languageChart) {
            languageChart.destroy();
        }

        const data = {
            labels: Object.keys(languages),
            datasets: [{
                data: Object.values(languages),
                backgroundColor: [
                    '#2563eb',
                    '#3b82f6',
                    '#60a5fa',
                    '#93c5fd',
                    '#bfdbfe'
                ]
            }]
        };

        languageChart = new Chart(ctx, {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    };

    // Create Contribution Chart
    const createContributionChart = (data) => {
        const ctx = document.getElementById('contribution-graph').getContext('2d');
        
        if (contributionChart) {
            contributionChart.destroy();
        }

        contributionChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.labels,
                datasets: [{
                    label: 'Contributions',
                    data: data.values,
                    fill: true,
                    borderColor: '#2563eb',
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    };

    // Fetch GitHub Data
    const fetchUserData = async (username) => {
        try {
            showLoading();

            // Fetch user info
            const userResponse = await fetch(`https://api.github.com/users/${username}`);
            if (!userResponse.ok) throw new Error("User not found");
            const userData = await userResponse.json();

            // Update profile
            document.getElementById("profile-image").src = userData.avatar_url;
            document.getElementById("username-display").textContent = userData.login;
            document.getElementById("real-name").textContent = `FullName: ${userData.name || "N/A"}`;
            document.getElementById("bio").textContent = `Bio: ${userData.bio || "N/A"}`;
            document.getElementById("location").textContent = `Location: ${userData.location || "N/A"}`;
            document.getElementById("email").innerHTML = `Email: ${userData.email || "<span class='text-muted'>Not available</span>"}`;
            document.getElementById("date-joined").textContent = `Joined: ${formatDate(userData.created_at)}`;
            document.getElementById("followers").textContent = userData.followers;
            document.getElementById("following").textContent = userData.following;
            document.getElementById("github-link").href = userData.html_url;

            userOverview.classList.remove("d-none");
            userOverview.scrollIntoView({ behavior: 'smooth' });

            // Fetch repositories
            const reposResponse = await fetch(`https://api.github.com/users/${username}/repos`);
            const reposData = await reposResponse.json();

            // Process languages
            const languages = {};
            reposData.forEach(repo => {
                if (repo.language) {
                    languages[repo.language] = (languages[repo.language] || 0) + 1;
                }
            });

            // Create repository cards
            reposList.innerHTML = reposData.map(repo => `
                <div class="col-md-4">
                    <div class="repo-card">
                        <div class="repo-header">
                            <h3 class="repo-name">
                                <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                            </h3>
                            <div class="repo-stats">
                                <span class="repo-stat">
                                    <i class="ri-star-line"></i> ${repo.stargazers_count}
                                </span>
                                <span class="repo-stat">
                                    <i class="ri-git-branch-line"></i> ${repo.forks_count}
                                </span>
                            </div>
                        </div>
                        <p class="repo-description">${repo.description || "No description available"}</p>
                        <div class="repo-footer">
                            <span class="repo-language">
                    ${repo.language === 'Python' ? '<img src="/bolt/assets/python-logo.gif" alt="Python" class="language-logo" />' : ''}
                    ${repo.language === 'JavaScript' ? '<img src="/bolt/assets/javascript-logo.gif" alt="JavaScript" class="language-logo" />' : ''}
                    ${repo.language === 'Java' ? '<img src="/bolt/assets/java-logo.gif" alt="Java" class="language-logo" />' : ''}
                    ${repo.language === 'TypeScript' ? '<img src="/bolt/assets/ts1.png" alt="TS" class="language-logo" />' : ''}
                    ${repo.language === 'HTML' ? '<img src="/bolt/assets/html.gif" alt="HTML" class="language-logo" />' : ''}
                    ${repo.language === 'C++' ? '<img src="/bolt/assets/cpp.png" alt="c++" class="language-logo" />' : ''}
                    ${repo.language === null ? '<img src="/bolt/assets/alert-logo.gif" alt="N/A" class="language-logo" />' : repo.language}
                </span>
                            <span class="repo-updated">Updated: ${formatDate(repo.updated_at)}</span>
                        </div>
                    </div>
                </div>
            `).join('');

            repositoriesSection.classList.remove("d-none");

            // Create charts
            createLanguageChart(languages);
            
            // Fetch contribution data
            const contributionsResponse = await fetch(`https://api.github.com/users/${username}/events`);
            const contributionsData = await contributionsResponse.json();

            // Process contribution data
            const contributions = {};
            contributionsData.forEach(event => {
                const date = event.created_at.split('T')[0];
                contributions[date] = (contributions[date] || 0) + 1;
            });

            const sortedDates = Object.keys(contributions).sort();
            const chartData = {
                labels: sortedDates,
                values: sortedDates.map(date => contributions[date])
            };

            createContributionChart(chartData);
            contributionsSection.classList.remove("d-none");

            hideLoading();
        } catch (error) {
            alert(`Error: ${error.message}`);
            hideLoading();
        }
    };

    // Search functionality
    const searchBtn = document.getElementById("search-btn");
    const usernameInput = document.getElementById("username");

    searchBtn.addEventListener("click", () => {
        const username = usernameInput.value.trim();
        if (username) {
            fetchUserData(username);
        } else {
            alert("Please enter a valid GitHub username.");
        }
    });

    // Enter key support
    usernameInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            searchBtn.click();
        }
    });

    // Add scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-in");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.section-title, .profile-card, .repo-card, .chart-card').forEach(el => {
        observer.observe(el);
    });
});
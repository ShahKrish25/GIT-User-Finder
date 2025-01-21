const mode = document.querySelector(".mode");

        document.addEventListener("DOMContentLoaded", () => {
            const fetchFeaturedRepos = async () => {
                const loadingElement = document.getElementById(
                    "featured-repos-loading"
                );
                const featuredReposContainer =
                    document.getElementById("featured-repos");
                try {
                    loadingElement.classList.remove("d-none");
                    featuredReposContainer.innerHTML = "";

                    const response = await fetch(
                        "https://api.github.com/search/repositories?q=stars:>10000&sort=stars&order=desc&per_page=4"
                    );
                    const data = await response.json();
                    const featuredRepos = data.items.slice(0, 4);

                    featuredRepos.forEach((repo) => {
                        const repoCard = document.createElement("div");
                        repoCard.className = "col-md-6 col-lg-3 mb-4";
                        repoCard.innerHTML = `
                    <div class="featured-repo-card">
                        <div class="card-body">
                            <div class="featured-repo-avatar-container">
                                <img src="${repo.owner.avatar_url}" alt="${repo.name
                                        } avatar" />
                            </div>
                            <h3 class="featured-repo-name" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Visit Repo">
                                <a class="text-decoration-none" href="${repo.html_url
                                        }" target="_blank">${repo.name}</a>
                            </h3>
                            <p class="featured-repo-description">${repo.description || "No description available"
                                        }</p>
                            <div class="featured-repo-stats">
                                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Repo's Stars" class="featured-repo-stat">
                                    <i class="ri-star-line"></i> ${repo.stargazers_count.toLocaleString()}
                                </span>
                                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Repo's Forks" class="featured-repo-stat">
                                    <i class="ri-git-branch-line"></i> ${repo.forks_count.toLocaleString()}
                                </span>
                                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Repo's Watching" class="featured-repo-stat">
                                    <i class="ri-eye-line"></i> ${repo.watchers_count.toLocaleString()}
                                </span>
                                <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Repo's Type" class="featured-repo-stat">
                                    <i class="ri-menu-search-line"></i> ${repo.visibility.toLocaleString()}
                                </span>
                            </div>
                            <div class="repo-topics">
                                ${repo.topics
                                            .slice(0, 3)
                                            .map(
                                                (topic) =>
                                                    `<span class="badge bg-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tags">${topic}</span>`
                                            )
                                            .join("")}
                            </div>
                        </div>
                    </div>
                `;
                        featuredReposContainer.appendChild(repoCard);
                    });
                    const tooltipTriggerList = document.querySelectorAll(
                        '[data-bs-toggle="tooltip"]'
                    );
                    const tooltipList = [...tooltipTriggerList].map(
                        (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
                    );
                    animateFeaturedRepos();
                } catch (error) {
                    const featuredRepos1 = [
                        {
                            img: "/bolt/assets/react.gif",
                            name: "react",
                            description:
                                "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
                            stars: 232200,
                            forks: 47400,
                            watchers: 6656,
                            visibility: "public",
                            html_url: "https://github.com/facebook/react",
                            topics: ["React", "JS", "UI-Library"],
                            type: "public"
                        },
                        {
                            img: "/bolt/assets/vue.png",
                            name: "vue",
                            description:
                                "🖖 Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.",
                            stars: 208200,
                            forks: 33760,
                            watchers: 5930,
                            visibility: "public",
                            html_url: "https://github.com/vuejs/vue",
                            topics: ["Javascript", "Framework", "Vue"],
                            type: "public"
                        },
                        {
                            img: "/bolt/assets/tensor.png",
                            name: "tensorflow",
                            description:
                                "An Open Source Machine Learning Framework for Everyone",
                            stars: 187120,
                            forks: 744210,
                            watchers: 75105,
                            visibility: "public",
                            html_url: "https://github.com/tensorflow/tensorflow",
                            topics: ["Machine-Learning", "Tensorflow", "AI"],
                            type: "public"
                        },
                        {
                            img: "/bolt/assets/vs.gif",
                            name: "vscode",
                            description: "VS Code combines the simplicity of a code editor with what developers need.",
                            stars: 16600,
                            forks: 301300,
                            watchers: 3310,
                            visibility: "public",
                            html_url: "https://github.com/microsoft/vscode",
                            topics: ["Editor", "Visual-Studio-Code", "Coding"],
                            type: "public"
                        },
                    ];
                    featuredRepos1.forEach((repo) => {
                        const repoCard = document.createElement("div");
                        repoCard.className = "col-md-6 col-lg-3 mb-4";
                        repoCard.innerHTML = `
                <div class="featured-repo-card h-100">
                <div class="card-body d-flex flex-column p-4">
                    <div class="mx-auto mb-3" style="width: 50px; height: 50px;">
                        <div class="rounded-circle overflow-hidden d-flex align-items-center justify-content-center" style="width: 100%; height: 100%;">
                            <img src="${repo.img || '/api/placeholder/50/50'}" 
                                 alt="${repo.name} image" 
                                 style="width: 100%; height: 100%; object-fit: cover;"
                                 onerror="this.src='/api/placeholder/50/50'" />
                        </div>
                    </div>
                    <h3 class="featured-repo-name text-center mb-3" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-title="Visit Repo">
                        <a class="text-decoration-none" href="${repo.html_url}" target="_blank">${repo.name}</a>
                    </h3>
                    <p class="featured-repo-description text-center flex-grow-1 mb-3">${repo.description || "No description available"}</p>
                    <div class="featured-repo-stats d-grid grid-cols-2 gap-2 mb-3">
                        <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Repo's Stars" class="featured-repo-stat d-flex align-items-center justify-content-center">
                            <i class="ri-star-line me-1"></i>${repo.stars.toLocaleString()}
                        </span>
                        <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Repo's Forks" class="featured-repo-stat d-flex align-items-center justify-content-center">
                            <i class="ri-git-branch-line me-1"></i>${repo.forks.toLocaleString()}
                        </span>
                        <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Repo's Watching" class="featured-repo-stat d-flex align-items-center justify-content-center">
                            <i class="ri-eye-line me-1"></i>${repo.watchers.toLocaleString()}
                        </span>
                        <span data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Repo's Type" class="featured-repo-stat d-flex align-items-center justify-content-center">
                            <i class="ri-menu-search-line me-1"></i>${repo.type}
                        </span>
                    </div>
                    <div class="repo-topics d-flex flex-wrap gap-2 justify-content-center">
                        ${repo.topics.map(topic => `
                            <span class="badge bg-secondary" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Tags">
                                ${topic}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
              `;
                        featuredReposContainer.appendChild(repoCard);
                    });
                } finally {
                    loadingElement.classList.add("d-none");
                }
            };
            const animateFeaturedRepos = () => {
                const cards = document.querySelectorAll(".featured-repo-card");
                cards.forEach((card, index) => {
                    card.style.opacity = "0";
                    card.style.transform = "translateY(20px)";
                    setTimeout(() => {
                        card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
                        card.style.opacity = "1";
                        card.style.transform = "translateY(0)";
                    }, index * 100);
                });
            };
            fetchFeaturedRepos();
        });

        const toggleDarkMode = () => {
            const icon = mode.querySelector("i");
            if (mode.textContent.includes("Light")) {
                mode.innerHTML = 'Dark <i class="ri-moon-line"></i>';
                document.documentElement.setAttribute("data-bs-theme", "dark");
                localStorage.setItem("theme", "dark");
                localStorage.setItem("themeText", "Dark");
            } else {
                mode.innerHTML = 'Light <i class="ri-sun-line"></i>';
                document.documentElement.setAttribute("data-bs-theme", "light");
                localStorage.setItem("theme", "light");
                localStorage.setItem("themeText", "Light");
            }
        };

        mode.addEventListener("click", toggleDarkMode);

        // Carousel icon animation
        document.addEventListener("DOMContentLoaded", () => {
            const carousel = document.getElementById("featureCarousel");
            if (carousel) {
                carousel.addEventListener("slid.bs.carousel", (event) => {
                    const activeItem = event.relatedTarget;
                    const icon = activeItem.querySelector(".feature-icon");
                    icon.style.transform = "scale(1.2)";
                    setTimeout(() => {
                        icon.style.transform = "scale(1)";
                    }, 300);
                });
            }

            // Generate sample heatmap
            const sampleHeatmap = document.getElementById("sample-heatmap");
            const weeks = 52;
            const daysPerWeek = 7;

            for (let i = 0; i < weeks; i++) {
                for (let j = 0; j < daysPerWeek; j++) {
                    const cell = document.createElement("div");
                    cell.className = "heatmap-cell";
                    const intensity = Math.random();
                    cell.style.backgroundColor = `rgba(37, 99, 235, ${intensity})`;
                    sampleHeatmap.appendChild(cell);
                }
            }
        });

        // Initialize theme
        document.addEventListener("DOMContentLoaded", () => {
            const savedTheme = localStorage.getItem("theme");
            const savedThemeText = localStorage.getItem("themeText");

            if (savedTheme) {
                document.documentElement.setAttribute("data-bs-theme", savedTheme);
                mode.innerHTML =
                    savedThemeText === "Dark"
                        ? 'Light <i class="ri-sun-line"></i>'
                        : 'Dark <i class="ri-moon-line"></i>';
            }

            // Stats functionality
            const generateStatsBtn = document.getElementById("generate-stats-btn");
            const statsLoading = document.getElementById("stats-loading");
            const statsOutput = document.getElementById("stats-output");
            const languageBars = document.getElementById("language-bars");
            const contributionCalendar = document.getElementById(
                "contribution-calendar"
            );
            const activityList = document.getElementById("activity-list");
            const achievementsList = document.getElementById("achievements-list");

            const showLoading = () => {
                statsLoading.classList.remove("d-none");
                statsOutput.classList.add("d-none");
            };

            const hideLoading = () => {
                statsLoading.classList.add("d-none");
            };

            const calculateGrade = (metrics) => {
                const { stars, commits, prs, issues } = metrics;
                let score = 0;

                // Calculate score based on metrics
                score += stars * 2;
                score += commits;
                score += prs * 3;
                score += issues;

                // Determine grade
                if (score >= 1000) return "A+";
                if (score >= 750) return "A";
                if (score >= 500) return "B+";
                if (score >= 250) return "B";
                if (score >= 100) return "C+";
                return "C";
            };

            const createLanguageBars = (languages) => {
                const total = Object.values(languages).reduce((a, b) => a + b, 0);
                const sortedLanguages = Object.entries(languages)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 5);

                return sortedLanguages
                    .map(([language, count]) => {
                        const percentage = ((count / total) * 100).toFixed(1);
                        return `
                <div class="language-bar">
                    <div class="language-progress" style="width: ${percentage}%">
                        ${language} - ${percentage}%
                    </div>
                </div>
            `;
                    })
                    .join("");
            };

            const createInteractiveContributionCalendar = (contributions) => {
                const maxContributions = Math.max(...Object.values(contributions));
                const days = Object.entries(contributions).map(([date, count]) => {
                    const intensity = count / maxContributions;
                    const alpha = 0.1 + intensity * 0.9;
                    return `
                <div class="contribution-day" 
                 style="background: rgba(37, 99, 235, ${alpha})"
                 data-date="${date}"
                 data-count="${count}">
                <div class="contribution-tooltip">
                    <strong>${date}</strong>
                    <br>${count} contribution${count !== 1 ? "s" : ""}
                </div>
            </div>
        `;
                });

                // Fill remaining days to complete the grid
                const remainingDays = 35 - days.length;
                for (let i = 0; i < remainingDays; i++) {
                    days.push('<div class="contribution-day"></div>');
                }

                return days.join("");
            };

            const addTooltips = () => {
                const contributionDays =
                    document.querySelectorAll(".contribution-day");
                contributionDays.forEach((day) => {
                    const date = day.getAttribute("data-date");
                    const count = day.getAttribute("data-count");
                    tippy(day, {
                        content: `${date}: ${count} contributions`,
                        theme: "github",
                    });
                });

                const languageBars = document.querySelectorAll(".language-bar");
                languageBars.forEach((bar) => {
                    const language = bar
                        .querySelector(".language-progress")
                        .textContent.split("-")[0]
                        .trim();
                    const percentage = bar
                        .querySelector(".language-progress")
                        .textContent.split("-")[1]
                        .trim();
                    tippy(bar, {
                        content: `${language}: ${percentage}`,
                        theme: "github",
                    });
                });
            };

            const formatDate = (dateString) => {
                const options = { year: "numeric", month: "long", day: "numeric" };
                return new Date(dateString).toLocaleDateString(undefined, options);
            };

            const createActivityList = (events) => {
                return events
                    .slice(0, 5)
                    .map(
                        (event) => `
            <li class="activity-item">
                <div class="d-flex align-items-center">
                    <i class="ri-git-commit-line me-2"></i>
                    <span>${formatEventMessage(event)}</span>
                </div>
                <small class="text-muted">${formatDate(
                            event.created_at
                        )}</small>
            </li>
        `
                    )
                    .join("");
            };

            const formatEventMessage = (event) => {
                switch (event.type) {
                    case "PushEvent":
                        return `Pushed to ${event.repo.name}`;
                    case "PullRequestEvent":
                        return `${event.payload.action} a pull request in ${event.repo.name}`;
                    case "IssuesEvent":
                        return `${event.payload.action} an issue in ${event.repo.name}`;
                    default:
                        return `Performed ${event.type} in ${event.repo.name}`;
                }
            };

            const createAchievements = (userData) => {
                const achievements = [
                    {
                        name: "Popular Repo",
                        condition: userData.public_repos > 5,
                        icon: "ri-star-line",
                    },
                    {
                        name: "Follower Magnet",
                        condition: userData.followers > 50,
                        icon: "ri-team-line",
                    },
                    {
                        name: "Open Source Contributor",
                        condition: userData.public_repos > 10,
                        icon: "ri-open-source-line",
                    },
                    {
                        name: "Long-time GitHub User",
                        condition:
                            new Date().getFullYear() -
                            new Date(userData.created_at).getFullYear() >
                            3,
                        icon: "ri-calendar-line",
                    },
                ];

                return achievements
                    .filter((a) => a.condition)
                    .map(
                        (achievement) => `
            <div class="col-6 col-md-3">
                <div class="achievement-card">
                    <i class="${achievement.icon} achievement-icon"></i>
                    <h5>${achievement.name}</h5>
                </div>
            </div>
        `
                    )
                    .join("");
            };

            const generateStats = async (username) => {
                try {
                    showLoading();

                    // Fetch user data
                    const userResponse = await fetch(
                        `https://api.github.com/users/${username}`
                    );
                    if (!userResponse.ok) throw new Error("User not found");
                    const userData = await userResponse.json();

                    // Fetch repositories
                    const reposResponse = await fetch(
                        `https://api.github.com/users/${username}/repos`
                    );
                    const reposData = await reposResponse.json();

                    // Process repository data
                    const languages = {};
                    let totalStars = 0;

                    reposData.forEach((repo) => {
                        if (repo.language) {
                            languages[repo.language] = (languages[repo.language] || 0) + 1;
                        }
                        totalStars += repo.stargazers_count;
                    });

                    // Fetch contribution data
                    const eventsResponse = await fetch(
                        `https://api.github.com/users/${username}/events`
                    );
                    const eventsData = await eventsResponse.json();

                    // Process contributions
                    const contributions = {};
                    eventsData.forEach((event) => {
                        const date = event.created_at.split("T")[0];
                        contributions[date] = (contributions[date] || 0) + 1;
                    });

                    // Update UI
                    document.getElementById("stats-avatar").src = userData.avatar_url;
                    document.getElementById("stats-username-display").textContent =
                        userData.login;
                    document.getElementById("total-stars").textContent = totalStars;
                    document.getElementById("total-commits").textContent =
                        eventsData.filter((e) => e.type === "PushEvent").length;
                    document.getElementById("total-prs").textContent =
                        eventsData.filter((e) => e.type === "PullRequestEvent").length;
                    document.getElementById("total-issues").textContent =
                        eventsData.filter((e) => e.type === "IssuesEvent").length;

                    // Calculate and display grade
                    const metrics = {
                        stars: totalStars,
                        commits: eventsData.filter((e) => e.type === "PushEvent").length,
                        prs: eventsData.filter((e) => e.type === "PullRequestEvent")
                            .length,
                        issues: eventsData.filter((e) => e.type === "IssuesEvent").length,
                    };
                    document.getElementById("grade-value").textContent =
                        calculateGrade(metrics);

                    // Update language bars and contribution calendar
                    languageBars.innerHTML = createLanguageBars(languages);
                    contributionCalendar.innerHTML =
                        createInteractiveContributionCalendar(contributions);

                    // Update activity list
                    activityList.innerHTML = createActivityList(eventsData);

                    // Update achievements
                    achievementsList.innerHTML = createAchievements(userData);

                    addTooltips();

                    // Show output with animation
                    statsOutput.classList.remove("d-none");
                    statsOutput.classList.add("stats-visible");
                    statsOutput.scrollIntoView({ behavior: "smooth" });
                    document.querySelectorAll(".stats-card").forEach((card, index) => {
                        card.style.opacity = "0";
                        card.style.animation = "none";
                        setTimeout(() => {
                            card.classList.add("animate-fade-in-up");
                            card.style.animationDelay = `${index * 100}ms`;
                        }, 50);
                    });

                    //animateLanguageBars();

                    hideLoading();
                } catch (error) {
                    alert(`Error: ${error.message}`);
                    hideLoading();
                }
            };

            generateStatsBtn.addEventListener("click", () => {
                const username = document
                    .getElementById("stats-username")
                    .value.trim();
                if (username) {
                    generateStats(username);
                } else {
                    alert("Please enter a valid GitHub username");
                }
            });

            // Enter key support
            document
                .getElementById("stats-username")
                .addEventListener("keypress", (e) => {
                    if (e.key === "Enter") {
                        generateStatsBtn.click();
                    }
                });
        });
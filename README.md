# GitHub User Insights

## Overview
GitHub User Insights is a web-based application that allows users to search for GitHub profiles and view detailed information about their repositories and contribution activity. This application leverages the GitHub API to provide real-time data.

## Features
- Fetch and display user profile information.
- View a list of repositories owned by the user.
- Display contribution activity and statistics.
- Responsive design for optimal viewing on various devices.

## Installation
This project does not require any installation. It is a web-based application that can be accessed through a web browser.

## Usage
1. **Open the Application**: Open the `index.html` file in a web browser.
2. **Search for a User**: Enter a GitHub username in the search bar and click the "Search" button.
3. **View Results**: The application will fetch and display the user's profile information, repositories, and contribution activity.

## API
The application uses the GitHub API to fetch user data. The following endpoints are utilized:

- **User Profile**: 
  - `GET https://api.github.com/users/{username}`: Fetches the user's profile information.
  
- **User Repositories**: 
  - `GET https://api.github.com/users/{username}/repos`: Fetches the user's repositories.
  
- **User Events**: 
  - `GET https://api.github.com/users/{username}/events`: Fetches the user's contribution activity.

### Rate Limiting
Please note that the GitHub API has rate limits. For unauthenticated requests, the limit is 60 requests per hour. For authenticated requests, the limit is 5,000 requests per hour. Consider using authentication for higher limits.

## Contributing
Contributions are welcome! If you find any issues or have suggestions for improvements, please follow these steps:

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository page.
2. **Create a New Branch**: 
   ```bash
   git checkout -b feature/YourFeatureName
   ```
3. **Make Your Changes**: Implement your feature or fix the bug.
4. **Commit Your Changes**: 
   ```bash
   git commit -m "Add your message here"
   ```
5. **Push to the Branch**: 
   ```bash
   git push origin feature/YourFeatureName
   ```
6. **Create a Pull Request**: Go to the original repository and click on "New Pull Request".

## License
This project is licensed under the [MIT License](LICENSE).

## Testing
The application has been tested manually. No automated tests are currently available. If you would like to contribute tests, please feel free to submit a pull request.

## Acknowledgments
- Thanks to the [GitHub API](https://docs.github.com/en/rest) for providing the data.
- Special thanks to the open-source community for their contributions and support.

## Contact
For any inquiries or feedback, please reach out to the project maintainer at [kvshah25092005@gmail.com](mailto:kvshah25092005@gmail.com).
[![GIT USER FINDER VIDEO](bolt/Screenshot%202025-01-22%20095135.png)](https://dl.dropboxusercontent.com/scl/fi/48n4yqhotjx48th4ihysm/GIT.mp4?rlkey=9kgn369c6lv4b365mr1penqnx&st=dwli136m&dl=0&raw=1)

<video width="640" height="360" controls>
  <source src="https://dl.dropboxusercontent.com/scl/fi/48n4yqhotjx48th4ihysm/GIT.mp4?rlkey=9kgn369c6lv4b365mr1penqnx&st=dwli136m&dl=0&raw=1" type="video/mp4">
  Your browser does not support the video tag.
</video>


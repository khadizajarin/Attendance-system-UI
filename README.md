# Smart Attendance System - UI Only Version

## Introduction
This repository contains the initial version of the Smart Attendance System developed as a personal project for the academic large scale web project. This version focuses solely on the User Interface (UI), utilizing fake JSON data and localStorage for data management.

## Features
- **Session Creation UI**: Interface for teachers to create attendance sessions with a countdown timer and secret code.
- **Student View**: Interface for students to view the countdown, input the secret code, and submit their attendance.
- **Fake Data Management**: Uses fake JSON data and localStorage to simulate the backend functionality.

## Technologies Used
- **Frontend**: React, Tailwind CSS
- **Data Management**: Fake JSON data, localStorage

## Project Structure
- **Components**: Contains all the React components for the project.
- **Data**: Contains the fake JSON data used for simulating backend responses.
- **Styles**: Contains Tailwind CSS configuration and custom styles.

## Installation and Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/khadizajarin/Attendance-system-UI
   cd your-repo-name
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the application:
   ```bash
   npm run dev
   ```
4. Open the application in your browser at `http://localhost:3000`.

## Usage
1. **Teacher**: Use the UI to create a session. The system will generate a countdown timer and a fake 8-character secret code.
2. **Student**: View the session details, input the fake secret code, and submit your attendance. The attendance data will be managed using localStorage.

## Project Structure
The project is organized as follows:
- `src/`: Main source directory
  - `components/`: Contains React components
  - `lib/`: Contains components for the UI
  - `wels-component/`: Contains common component for the entire large scale project.
- `public/`: Main source directory
  - `data/`: Contains fake json data
  - `semester/`: Contains more fake json data


## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Acknowledgements
Special thanks to everyone who supported the development of this project.

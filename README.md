

# Call Transcript Analyzer - Frontend 📊

This is the frontend application for the Call Transcript Analyzer, built with React, Vite, and Material-UI. It provides a user-friendly interface to interact with the backend, allowing users to submit transcripts and visualize the AI-generated analyses in an interactive dashboard.

---
## ✨ Features

- **Interactive Dashboard**: Displays statistics like average sentiment and charts showing sentiment distribution and trends over time.
- **Create New Analysis**: A user-friendly modal with drag-and-drop support for uploading JSON transcript files.
- **History View**: An interactive and sortable DataGrid showing all past analyses.
- **Detailed View**: A dedicated page for each analysis, showing the full summary, sentiment, action items, and the original transcript in a timeline format.
- **Responsive Design**: The interface is fully responsive and works on both desktop and mobile devices.

---
## 🛠️ Tech Stack

- **Framework**: React
- **Build Tool**: Vite
- **Language**: TypeScript
- **UI Library**: Material-UI (MUI) & MUI X (DataGrid, Charts)
- **Data Fetching**: SWR
- **Routing**: React Router

---
## ⚙️ Setup and Installation

Follow these steps to get the frontend running locally.

1.  **Clone the repository**
    ```bash
    git clone https://github.com/kristoffervelazquez/fonema-frontend.git
    ```

2.  **Navigate to the frontend directory**
    ```bash
    cd fonema_frontend
    ```

3.  **Install dependencies**
    ```bash
    npm install
    ```

4.  **Create the environment file**
   Create the `.env` file and add your credentials.

---
## 🔑 Environment Variables

The `.env` file is required to connect the frontend to the backend.

```dotenv
# .env

# The base URL for the backend API.
# This must match the host and port where your backend server is running.
VITE_BACKEND_URL="http://localhost:3000/api"
```
---


## ✅ Run the project
1.  **Run development**
    ```bash
    npm run dev
    ```
The application will be available at http://localhost:3000 (or another port specified on .env file).

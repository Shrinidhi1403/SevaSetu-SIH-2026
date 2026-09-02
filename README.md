<div align="center">
  
  # 🏥 SevaSetu
  ### Integrated Care-Access and Quality Support Platform

  [![Smart India Hackathon](https://img.shields.io/badge/Smart_India_Hackathon-2026-F47C20?style=for-the-badge&logo=hackaday)](#)
  [![Problem Statement](https://img.shields.io/badge/PS_ID-26133-28A745?style=for-the-badge)](#)
  [![Status](https://img.shields.io/badge/Status-Frontend_MVP_Ready-blue?style=for-the-badge)](#)
  
  <p align="center">
    <strong>Bridging the gap between rural healthcare needs and accessible medical facilities using Offline-First tech and Smart Routing.</strong>
  </p>
</div>

<hr />

## 📖 About The Project

**SevaSetu** is designed to solve the critical challenges of rural India's healthcare infrastructure. This project targets the issue of blind travel, network blackouts in rural areas, and fragmented health records across sub-centres and district hospitals.

---

## 🚀 Hackathon MVP (Current State)

For the initial 36-hour hackathon phase, our team has focused entirely on building a robust, **Offline-First Frontend Prototype** to demonstrate the core user experience and flow. 

**MVP Features:**
*   **Offline Data Capture:** ASHA workers can fill out patient symptom forms without an internet connection.
*   **State Persistence (Mock Offline Sync):** Utilizing browser `localStorage` to simulate the "Store & Forward" mechanism. Data entered offline is retained and displayed on the Doctor's Dashboard upon page reload.
*   **UI/UX Flow:** Complete visual flow for Patient Registration, Triage calculation, and Smart Facility Routing alerts.

### 💻 Current Tech Stack (Frontend)
*   **Framework:** React.js + Vite
*   **Styling:** Tailwind CSS
*   **Data Handling:** JSON Mock Data & Web Storage API (Local Storage)

---

## 🛠️ Proposed Final Architecture (For Grand Finale)

Once the idea phase is cleared, the application will be integrated with a highly scalable, real-time backend ecosystem:
*   **Backend Framework:** Spring Boot (Java) for building RESTful APIs.
*   **Database:** PostgreSQL for persistent, relational data storage.
*   **Real-time Caching:** Redis for $O(1)$ time complexity checks on hospital equipment and doctor availability.
*   **Interoperability:** ABDM and HL7 FHIR standards for national health record integration.

---

## ⚙️ How to Run Locally

Since this is a frontend-only MVP, setup is incredibly fast and simple.

### Prerequisites
- Node.js (v18+)

### Installation

1. **Clone the repository:**
   ```bash
git clone [https://github.com/Shrinidhi1403/SevaSetu-SIH-2026.git](https://github.com/Shrinidhi1403/SevaSetu-SIH-2026.git)

---

## 👥 Team Cybernetics

| Name | Role |
| :--- | :--- |
| **Neal Zanwar** | Team Leader & Full Stack Developer |
| **Shrinidhi Sardeshmukh** | UI/UX & PWA Architect |
| **Ekaksh Tyagi** | Pitch Strategy & Documentation |
| **Nikita Sharma** | Frontend Developer |
| **Prachi Chauhan** | Presentation & Flow Design |
| **Pranav Pawar** | Quality Assurance |

> **"Committed to bringing accessible and continuous healthcare to the last mile."**

<p align="center">
  <img src="./img.png" alt="Project Banner" width="100%">
</p>

# Harvest Hive 🎯

## 📖 Introduction
**Harvest Hive** is a specialized decentralized platform designed to streamline the cardamom farming lifecycle. We bridge the gap between farmers, laborers, and shopkeepers in the High Ranges (like Idukki) through real-time logistics, AI-driven diagnostics, and transparent supply chains.

### Team Name: Buildverse

### Team Members
- Member 1: Amritha Santhosh - MBCCET
- Member 2: Ann Mary Job - MBCCET

### Hosted Project Link
[Project Hosted Link](https://harvest-hive.vercel.app)

### Project Description
Harvest Hive is a specialized, role-based web application designed to digitize and optimize the unique agricultural ecosystem of the Cardamom plantations in the Western Ghats. It acts as a digital bridge between farmers, the migratory workforce, and local agricultural supply hubs.

### The Problem statement
Cardamom farming is the backbone of our local economy, yet it remains digitally underserved. Farmers face critical challenges that lead to reduced yields and financial instability:
- **Labor Shortages:** Difficulty in finding verified workers during the short, intense harvesting windows.
- **Logistics Gaps:** Poor transport coordination for workers moving from valleys to hilltop plantations.
- **Undiagnosed Crop Diseases:** Delayed identification of diseases like *Katte* (Mosaic) or *Azhukal* (Rot) leads to massive crop loss.
- **Supply Chain Opacity:** Difficulty in locating essential fertilizers or medicines in real-time, leading to dependence on expensive middlemen.


### The Solution
Harvest Hive provides an all-in-one digital ecosystem to ensure:
- **Real-time Worker Matching:** Connecting farmers with verified local labor based on skill and location.
- **Valley-to-Hill Carpooling:** Synchronized logistics and shared transport for the agricultural workforce.
- **AI-Powered Diagnostics:** On-field disease detection using computer vision patterns.
- **Direct Shopkeeper Integration:** Real-time stock tracking for fertilizers and medicines across local agro-hubs.
- **Multi-lingual Accessibility:** Full support for **English, Malayalam, Tamil, Hindi, and Kannada** to ensure inclusivity for all stakeholders.

---
## 🚀 Key Features

### 1. Farmer Portal
- **Labor Matching:** Match with verified workers based on farm location.
- **Logistics Hub:** "Valley-to-Hill" transport scheduling and shared mini-bus tracking.
- **Crop Health:** AI Scan capability to detect cardamom diseases.

### 2. Worker Portal
- **Job Discovery:** Real-time notifications for harvest and maintenance tasks.
- **Wage Transparency:** Pre-negotiated daily wages displayed upfront.
- **QR Check-in:** Digital attendance for co-op credit subsidies.

### 3. Shopkeeper Portal
- **Inventory Management:** Live stock updates for fertilizers/medicines.
- **Order Tracking:** Managed view of customer requests from local farms.

---
## Technical Details

| Category | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 15.1 (App Router) |
| **Library** | React 19 |
| **Styling** | Tailwind CSS v4 (Modern Design System) |
| **Animations** | Framer Motion (Glassmorphism & Micro-interactions) |
| **Backend/Database** | Firebase Firestore (Real-time DB) |
| **Authentication** | Firebase Auth (Role-based security) |
| **Icons** | Lucide React |
| **Deployment** | Vercel (Edge Network: BOM1 Mumbai) |

---
### Technologies/Components Used

**For Software:**
- Languages used: [e.g., JavaScript, Python, Java]
- Frameworks used: [e.g., React, Django, Spring Boot]
- Libraries used: [e.g., axios, pandas, JUnit]
- Tools used: [e.g., VS Code, Git, Docker]




## Implementation
### Installation
```bash
# Clone the repository
git clone https://github.com/Ann8507/harvest-hive.git

# Install dependencies
npm install
```

### Run Locally
```bash
# Start the development server
npm run dev
```

---

### For Software:

#### Installation
```bash
[Installation commands - e.g., npm install, pip install -r requirements.txt]
```

#### Run
```bash
[Run commands - e.g., npm start, python app.py]
```


## Project Documentation
### Application Architecture
The app follows a **Serverless Architecture** using Next.js and Firebase. Global state is managed via React Context to handle real-time Auth and Multi-language translation tokens.

### For Software:

#### Screenshots (Add at least 3)
<img width="946" height="439" alt="Screenshot 2026-03-02 233656" src="https://github.com/user-attachments/assets/e45f14b9-ef6a-4053-b5e8-b5d51560b902" />
Home page

<img width="945" height="444" alt="Screenshot 2026-03-02 233823" src="https://github.com/user-attachments/assets/c9b4e0fb-d27a-4224-9efc-0fbc04888d01" />
Harvest Season Optimization page

<img width="944" height="438" alt="Screenshot 2026-03-02 234017" src="https://github.com/user-attachments/assets/b5181a36-dc23-4bac-b848-27046d493a42" />
Crop Health & Diagnostics page

<img width="947" height="439" alt="Screenshot 2026-03-02 234229" src="https://github.com/user-attachments/assets/eb31947e-bf0a-4c95-b55d-d360a4fc1d2d" />

login page

#### Diagrams

**System Architecture:**

![Architecture Diagram](docs/architecture.png)
The Harvest Hive architecture is built for real-time synchronization and extreme performance in rural agricultural regions.

Frontend (Next.js 15 + React 19): A role-based interface providing specific portals for Farmers, Workers, and Shopkeepers with a premium Tailwind CSS v4 Glassmorphism design.
State Management (Context API): Centralized hubs (

AuthContext
 & 

LanguageContext
) that manage user identity and 5-language localization (Malayalam, Tamil, Hindi, Kannada, English) across the app.
Real-time Cloud Backbone (Firebase Firestore): A NoSQL database that eliminates traditional API latency. Using onSnapshot listeners, any inventory or job update is broadcast to all users in under 200ms.
Seamless Data Flow: When a Shopkeeper updates stock, the change is pushed to the cloud and instantly "popped" onto the Farmer’s dashboard without a page refresh, ensuring live tracking of fertilizers and medicines.
Secure Authentication (Firebase Auth): Implements role-based access control (RBAC), ensuring that only registered shopkeepers can access the inventory management suite.
Edge Deployment (Vercel): The application is deployed to the BOM1 (Mumbai) Edge Region, placing the code physically closer to users in South India for sub-second page loads.
Interactive Visuals (Framer Motion & Lucide): High-performance animations and a localized iconography system ensure the app remains intuitive across different linguistic and technical backgrounds.


---

## 🛠️ Additional Documentation

### Data Architecture & Backend
Harvest Hive uses a serverless real-time database architecture. For documentation purposes, the following "endpoints" represent our Firestore collection interactions.

#### API Documentation (Firebase Mapping)

**Base Database URL:** `firestore://harvesthive-a7df1`

##### Endpoints

**GET /inventory**
- **Description:** Real-time stream of all available fertilizers and medicines across all shopkeepers.
- **Sync Method:** `onSnapshot` (WebSocket)
- **Response:**
```json
{
  "id": "item_uid",
  "name": "Cardamom Bio-Fertilizer",
  "price": "1200",
  "qty": "50 Bags",
  "shopName": "Thomas Agro",
  "status": "In Stock"
}
```

**POST /inventory**
- **Description:** Allows authorized Shopkeepers to publish new stock to the ecosystem.
- **Request Body:**
```json
{
  "name": "Fungicide X",
  "price": "450",
  "qty": "10 Units",
  "status": "In Stock",
  "ownerId": "user_uid"
}
```

**POST /users**
- **Description:** Registers user role (Farmer/Worker/Shopkeeper) during the first login.
- **Role Permissions:** RBAC (Role-Based Access Control) enforced via context.

---

### Command Reference (Scripts)

**Basic Usage:**
```bash
npm [command]
```

**Available Commands:**
- `npm run dev` - Launches the Vite/Next dev server with hot-reload.
- `npm run build` - Optimizes and compiles the app for production.
- `npx vercel --prod` - Deploys the latest build to the Mumbai Edge network.

**Options:**
- `--help` - Show Next.js help message
- `--yes` - Auto-confirm Vercel deployment prompts

---

## Project Demo

### Video


https://cdn-user-temp.veed.io/render/2d5c54c8-3c7f-40ea-b876-e535547920d7.mp4?filename=Harvest%2520Hive%2520_%2520Premium%2520Agrarian%2520Solutions%2520-%2520Google%2520Chrome%25202026-03-02%252023-12-31.mp4


# AI Tools Used 

We leveraged advanced AI tools to accelerate development while ensuring industrial-grade code quality and accessibility for the cardamom farming community.

**Tools Used:**
- **Antigravity (Google DeepMind):** Used for complex backend orchestration, Firebase role-based logic, and debugging Next.js build-time errors.
- **v0.dev / Tailwind v4:** Guided the creation of the "Premium" Glassmorphism UI tokens and responsive layouts.
- **Claude 3.5 Sonnet:** Assisted in the implementation of the comprehensive 5-language translation context.

**Key Prompts Used:**
- "Create a decentralized management system for cardamom plantations with role-based access."
- "Implement a performant React context for 5-language localization (**Malayalam, Tamil, Hindi, Kannada, English**)."
- "Configure Vercel deployment pinning for the **BOM1 (Mumbai)** edge region to ensure low latency."
- "Debug the `onSnapshot` Firestore listener for real-time inventory updates."

**Human Architecture & Planning:**
- **Problem Ideation:** Identifying the specific logistics and diagnostic blind spots in the Cardamom high-ranges.
- **UX Strategy:** Defining the unique user flows for migratory workers vs. local plantation owners.
- **Quality Assurance:** Manual validation of real-time stock updates and cross-device responsive testing.
- **Asset Curation:** Selecting and optimizing agricultural iconography and local branding.

---


## Team Contributions

 **Amritha Santhosh** - MBCCET (Lead Developer & Frontend Architect)
- **Ann Mary Job** - MBCCET (UI/UX Designer & Logic Implementation)



Made with ❤️ at TinkerHub

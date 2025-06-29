# Task Manager

A frontend Task Manager application built with **Next.js** to help users manage personal or professional tasks efficiently.

[**Live Demo**](https://task-manager-iykixxvbg-sai-dheerajs-projects-4c4bb25e.vercel.app)

---

## **Functional Implementation**

###  **Task Creation**
- Create tasks with:
  - Title (required)
  - Description (optional)
  - Due Date
  - Priority (Low, Medium, High)
  - Tags (comma-separated)
  - Status: Todo, In Progress, or Done

---

###  **Task Management**
- View all tasks in a list
- Edit existing tasks
- Delete tasks
- Update task status (e.g., move from Todo → Done)

---

### **Filtering and Sorting**
- **Filter tasks by:**
  - Status
  - Tags
  - Due Date (Today, This Week)
- **Sort tasks by:**
  - Due Date
  - Priority
  - Creation Date

---

### **Data Persistence**
- All task data saved in browser's **localStorage**
- Application state persists across page reloads

---

## **My Special Additions**
- **Export & import tasks as JSON**  
  Easily back up your tasks or load them again anytime
-  **Dynamic background color** based on priority:
  - Red → High priority
  - Yellow → Medium priority
  - Green → Low priority

---

## **Technical Stack**
- **Framework:** Next.js (v13)
- **State Management:** Zustand
- **Form Handling:** Yup (validation)
- **Persistence:** localStorage
- **Routing:**
  - `/` – Task dashboard
  - `/create` – Task creation page
  - `/task/[id]` – Task detail/edit page
- **Navigation:** Responsive navbar

---

##  **Setup Instructions**

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/task-manager.git
cd task-manager

# Install dependencies 
npm install

# Start the local development server
npm run dev
```
- Open http://localhost:3000 to view in browser.

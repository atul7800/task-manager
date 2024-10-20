# Task Manager

A simple task management application that helps users create, organize, and manage their tasks efficiently. The app allows sorting of tasks by priority (high, medium, low), marking tasks as complete, and filtering tasks using a search bar. Built using modern web technologies like Next.js, React.js, Tailwind CSS, and local storage for task persistence.

## Features

- Add, edit, and delete tasks.
- Assign priorities (low, medium, high) to tasks.
- Mark tasks as completed.
- Search tasks by title or description.
- Sort tasks by priority.
- Visual differentiation between incomplete and completed tasks.

## Tech Stack

- **Frontend**: Next.js, React.js, Tailwind CSS, JavaScript
- **Storage**: LocalStorage (for persistent task data)
- **UI Components**: React Icons, Toastify for notifications

## Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-repo/task-manager.git
   cd task-manager
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

4. **Open the app:**
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Project Structure

The project is organized as follows:

```bash
├── app
│   ├── global.css          # Global styles for the application
│   ├── layout.js           # Layout with navbar
│   ├── page.js             # Main task management page
├── components
│   ├── KebabMenu.js        # Dropdown menu for task actions
│   ├── NavBar.jsx          # Navigation bar
│   ├── SearchBar.jsx       # Search bar for filtering tasks
│   └── Tasks.jsx           # Task card component
```

## Approach to Sorting Tasks by Priority

Tasks are categorized into incomplete and completed sections. Incomplete tasks are sorted based on their priority:

### Priority Levels:

- High priority is given the highest importance, followed by medium and low.

### Sorting Logic:

- Incomplete tasks are sorted in descending order: High > Medium > Low.
- Completed tasks retain their original order but are visually separated from incomplete ones.

The sorting ensures that users can focus on high-priority tasks first. When a task is marked as completed, it moves to the completed section.

## Future Enhancements

- Implement task due dates and reminder notifications.
- Add user authentication for task management across devices.
- Improve the UI with additional task filtering options.

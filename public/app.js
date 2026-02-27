// API Base URL
const API_BASE = '/api';

// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const tasksContainer = document.getElementById('tasksContainer');
const totalCount = document.getElementById('totalCount');
const completedCount = document.getElementById('completedCount');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  loadTasks();
  
  addBtn.addEventListener('click', addTask);
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });
});

// Load all tasks
async function loadTasks() {
  try {
    const response = await fetch(`${API_BASE}/tasks`);
    const result = await response.json();
    
    if (result.success && result.data) {
      renderTasks(result.data);
    }
  } catch (error) {
    console.error('Failed to load tasks:', error);
    tasksContainer.innerHTML = '<div class="loading">Error loading tasks</div>';
  }
}

// Render tasks
function renderTasks(tasks) {
  if (tasks.length === 0) {
    tasksContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <div class="empty-state-text">No tasks yet. Add one to get started!</div>
      </div>
    `;
    updateStats(tasks);
    return;
  }

  tasksContainer.innerHTML = tasks.map(task => `
    <div class="task-item ${task.completed ? 'completed' : ''}">
      <input 
        type="checkbox" 
        class="checkbox"
        ${task.completed ? 'checked' : ''}
        onchange="toggleTask(${task.id}, this.checked)"
      >
      <div class="task-content">
        <div class="task-text">${escapeHtml(task.title)}</div>
        ${task.description ? `<div class="task-description">${escapeHtml(task.description)}</div>` : ''}
        <div class="task-date">${formatDate(task.created_at)}</div>
      </div>
      <div class="task-actions">
        <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    </div>
  `).join('');

  updateStats(tasks);
}

// Add new task
async function addTask() {
  const title = taskInput.value.trim();
  
  if (!title) {
    alert('Please enter a task title');
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    });
    
    const result = await response.json();
    
    if (result.success) {
      taskInput.value = '';
      taskInput.focus();
      loadTasks();
    } else {
      alert('Failed to add task: ' + result.error);
    }
  } catch (error) {
    console.error('Failed to add task:', error);
    alert('Error adding task');
  }
}

// Toggle task completion
async function toggleTask(id, completed) {
  try {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    
    const result = await response.json();
    
    if (result.success) {
      loadTasks();
    } else {
      alert('Failed to update task');
      loadTasks();
    }
  } catch (error) {
    console.error('Failed to toggle task:', error);
    loadTasks();
  }
}

// Delete task
async function deleteTask(id) {
  if (!confirm('Are you sure you want to delete this task?')) {
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/tasks/${id}`, {
      method: 'DELETE'
    });
    
    const result = await response.json();
    
    if (result.success) {
      loadTasks();
    } else {
      alert('Failed to delete task');
    }
  } catch (error) {
    console.error('Failed to delete task:', error);
    alert('Error deleting task');
  }
}

// Update statistics
function updateStats(tasks) {
  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  
  totalCount.textContent = `Total: ${total}`;
  completedCount.textContent = `Completed: ${completed}`;
}

// Utility Functions
function formatDate(dateString) {
  const date = new Date(dateString);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  } else if (date.toDateString() === yesterday.toDateString()) {
    return 'Yesterday';
  } else {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { Database } from './database';
import { CreateTaskRequest, UpdateTaskRequest, ApiResponse, Task } from './types';

const app = express();
const PORT = process.env.PORT || 3001;
const db = new Database();

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../public')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// GET - Tüm taskları al
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await db.getAllTasks();
    res.json({ success: true, data: tasks } as ApiResponse<Task[]>);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch tasks' });
  }
});

// GET - Tek task
app.get('/api/tasks/:id', async (req, res) => {
  try {
    const task = await db.getTaskById(parseInt(req.params.id));
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.json({ success: true, data: task } as ApiResponse<Task>);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch task' });
  }
});

// POST - Yeni task oluştur
app.post('/api/tasks', async (req, res) => {
  try {
    const createReq: CreateTaskRequest = req.body;
    if (!createReq.title) {
      return res.status(400).json({ success: false, error: 'Title is required' });
    }
    const task = await db.createTask(createReq);
    res.status(201).json({ success: true, data: task } as ApiResponse<Task>);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to create task' });
  }
});

// PUT - Task güncelle
app.put('/api/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updateReq: UpdateTaskRequest = req.body;
    const task = await db.updateTask(id, updateReq);
    if (!task) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.json({ success: true, data: task } as ApiResponse<Task>);
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to update task' });
  }
});

// DELETE - Task sil
app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const deleted = await db.deleteTask(id);
    if (!deleted) {
      return res.status(404).json({ success: false, error: 'Task not found' });
    }
    res.json({ success: true, data: { id, deleted: true } });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to delete task' });
  }
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚀 To Do List App başlatıldı!`);
  console.log(`📱 Browser: http://localhost:${PORT}`);
  console.log(`🔌 API: http://localhost:${PORT}/api`);
  console.log(`\n✅ Server çalışıyor...`);
});

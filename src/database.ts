import sqlite3 from 'sqlite3';
import path from 'path';
import { Task, CreateTaskRequest, UpdateTaskRequest } from './types';

export class Database {
  private db: sqlite3.Database;

  constructor() {
    const dbPath = path.join(__dirname, '../todo.db');
    this.db = new sqlite3.Database(dbPath, (err) => {
      if (err) {
        console.error('❌ Database bağlantı hatası:', err);
      } else {
        console.log('✅ SQLite Database bağlandı:', dbPath);
      }
    });
    this.initializeSchema();
  }

  private initializeSchema(): void {
    this.db.run(
      `CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        completed BOOLEAN DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      (err) => {
        if (err) {
          console.error('❌ Schema oluşturma hatası:', err);
        } else {
          console.log('✅ Tasks tablosu hazır');
        }
      }
    );
  }

  // Tüm taskları al
  getAllTasks(): Promise<Task[]> {
    return new Promise((resolve, reject) => {
      this.db.all('SELECT * FROM tasks ORDER BY created_at DESC', (err, rows) => {
        if (err) reject(err);
        resolve((rows || []) as Task[]);
      });
    });
  }

  // Tek taskı al
  getTaskById(id: number): Promise<Task | null> {
    return new Promise((resolve, reject) => {
      this.db.get('SELECT * FROM tasks WHERE id = ?', [id], (err, row) => {
        if (err) reject(err);
        resolve((row || null) as Task | null);
      });
    });
  }

  // Task oluştur
  createTask(req: CreateTaskRequest): Promise<Task> {
    return new Promise((resolve, reject) => {
      const { title, description = '' } = req;
      this.db.run(
        'INSERT INTO tasks (title, description) VALUES (?, ?)',
        [title, description],
        function (err) {
          if (err) {
            reject(err);
          } else {
            resolve({
              id: this.lastID,
              title,
              description,
              completed: false,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
          }
        }
      );
    });
  }

  // Task güncelle
  updateTask(id: number, req: UpdateTaskRequest): Promise<Task | null> {
    return new Promise((resolve, reject) => {
      const updates: string[] = [];
      const values: any[] = [];

      if (req.title !== undefined) {
        updates.push('title = ?');
        values.push(req.title);
      }
      if (req.description !== undefined) {
        updates.push('description = ?');
        values.push(req.description);
      }
      if (req.completed !== undefined) {
        updates.push('completed = ?');
        values.push(req.completed ? 1 : 0);
      }

      if (updates.length === 0) {
        resolve(null);
        return;
      }

      updates.push('updated_at = CURRENT_TIMESTAMP');
      values.push(id);

      this.db.run(
        `UPDATE tasks SET ${updates.join(', ')} WHERE id = ?`,
        values,
        (err) => {
          if (err) {
            reject(err);
          } else {
            this.getTaskById(id).then(resolve).catch(reject);
          }
        }
      );
    });
  }

  // Task sil
  deleteTask(id: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.db.run('DELETE FROM tasks WHERE id = ?', [id], (err) => {
        if (err) {
          reject(err);
        } else {
          resolve(true);
        }
      });
    });
  }

  // Database kapat
  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }
}

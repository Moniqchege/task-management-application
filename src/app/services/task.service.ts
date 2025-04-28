import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private tasks: any[] = [];

  private tasksSubject = new BehaviorSubject<any[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  constructor() {}

  setTasks(tasks: any[]) {
    this.tasks = tasks;
    this.tasksSubject.next(this.tasks);
  }

  getTasks() {
    return this.tasks;
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
    this.tasksSubject.next(this.tasks);
  }

  toggleTaskComplete(task: any) {
    task.completed = !task.completed;
    this.tasksSubject.next(this.tasks);
  }

  addTask(task: any) {
    this.tasks.push(task);
    this.tasksSubject.next(this.tasks); 
  }
}

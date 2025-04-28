import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { MOCK_TASKS } from '../mock-tasks';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent implements OnInit {
  tasks: any[] = [];
  taskToEdit: any = null;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();

    this.taskService.tasks$.subscribe((updatedTasks) => {
      this.tasks = updatedTasks;
    });
  }

  loadTasks() {
    this.taskService.setTasks(MOCK_TASKS);
  }

  deleteTask(index: number) {
    this.taskService.deleteTask(index);
  }

  markComplete(task: any) {
    this.taskService.toggleTaskComplete(task);
  }

  
}

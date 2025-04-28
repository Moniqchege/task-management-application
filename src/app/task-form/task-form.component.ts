import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TaskService } from '../services/task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-form',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './task-form.component.html',
})
export class TaskFormComponent implements OnInit, OnChanges {
  @Input() taskToEdit: any = null;
  taskForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder, private taskService: TaskService) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['taskToEdit'] && this.taskToEdit) {
      this.taskForm.patchValue({
        title: this.taskToEdit.title,
        description: this.taskToEdit.description,
        dueDate: this.taskToEdit.dueDate,
        status: this.taskToEdit.completed ? 'true' : 'false',
      });
    }
  }

  createForm() {
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      dueDate: ['', [Validators.required, this.futureDateValidator]],
      status: ['false'],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.taskForm.invalid) {
      return;
    }

    const newTask = this.taskForm.value;
    newTask.completed = newTask.status === 'true';
    newTask.dueDate = new Date(newTask.dueDate).toLocaleDateString();

    console.log('New Task Submitted:', newTask);

    this.taskService.addTask(newTask);

    this.taskForm.reset();
    this.submitted = false;
    alert('Task submitted successfully!');
  }

  futureDateValidator(control: any) {
    if (!control.value) return null;
    const today = new Date().setHours(0, 0, 0, 0);
    const selectedDate = new Date(control.value).setHours(0, 0, 0, 0);
    return selectedDate > today ? null : { notFutureDate: true };
  }
}

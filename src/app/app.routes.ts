import { Routes } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskFormComponent } from './task-form/task-form.component';
import { NotificationsComponent } from './notifications/notifications.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/task-list',
        pathMatch: 'full'
    },
    {
        path: 'task-list',
        component: TaskListComponent
    },
    {
        path: 'task-form',
        component: TaskFormComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    }
];

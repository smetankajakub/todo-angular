import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from './components/todo-item/todo-item.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { TodoRoutingModule } from './todo-routing.module';
import { TodoPageComponent } from './pages/todo-page/todo-page.component';
import { ReactiveFormsModule } from '@angular/forms';

//ANGULAR MATERIAL
import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TodoItemDetailComponent } from './components/todo-item-detail/todo-item-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    TodoItemComponent,
    TodoListComponent,
    TodoPageComponent,
    TodoItemDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MatSliderModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatGridListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRadioModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [
    TodoRoutingModule
  ]
})
export class TodoModule { }

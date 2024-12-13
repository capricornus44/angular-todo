import { Component, inject } from '@angular/core';

import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'todos-header',
  templateUrl: './header.component.html',
})
export class TodosHeaderComponent {
  todoService = inject(TodosService);
  text: string = '';

  changeText(event: Event): void {
    this.text = (event.target as HTMLInputElement).value;
  }

  addTodo(): void {
    this.todoService.addTodo(this.text);
    this.text = '';
  }
}

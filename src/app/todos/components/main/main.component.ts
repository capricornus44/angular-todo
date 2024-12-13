import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { FILTERS } from '../../types/filters.enam';
import { TodosTodoComponent } from '../todo/todo.component';

@Component({
  selector: 'todos-main',
  templateUrl: './main.component.html',
  imports: [CommonModule, TodosTodoComponent],
})
export class TodosMainComponent {
  todosService = inject(TodosService);
  editingId: string | null = null;

  filteredTodos = computed(() => {
    const todos = this.todosService.todosSignal();
    const filter = this.todosService.filterSignal();

    if (filter === FILTERS.COMPLETED) {
      return todos.filter((todo) => todo.isCompleted);
    }

    if (filter === FILTERS.ACTIVE) {
      return todos.filter((todo) => !todo.isCompleted);
    }

    return todos;
  });

  isAllTodosSelected = computed(() => {
    const todos = this.todosService.todosSignal();
    return todos.every((todo) => todo.isCompleted);
  });

  noTodos = computed(() => this.todosService.todosSignal().length === 0);

  setEditingId(id: string | null): void {
    this.editingId = id;
  }

  toggleAllTodos = (event: Event): void => {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAllTodos(target.checked);
  };
}

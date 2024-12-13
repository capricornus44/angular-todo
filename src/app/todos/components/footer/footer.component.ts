import { CommonModule } from '@angular/common';
import { Component, computed, inject } from '@angular/core';

import { TodosService } from '../../services/todos.service';
import { FILTERS } from '../../types/filters.enam';

@Component({
  selector: 'todos-footer',
  templateUrl: './footer.component.html',
  imports: [CommonModule],
})
export class TodosFooterComponent {
  todosService = inject(TodosService);
  filterSignal = this.todosService.filterSignal;
  filters = FILTERS;
  activeTodosCount = computed(
    () =>
      this.todosService.todosSignal().filter((todo) => !todo.isCompleted).length
  );
  activeTodosCountText = computed(
    () => `${this.activeTodosCount() !== 1 ? 'items left' : 'item left'}`
  );
  noTodos = computed(() => this.todosService.todosSignal().length === 0);

  changeFilter(event: Event, filter: FILTERS): void {
    event.preventDefault();
    this.todosService.changeFilter(filter);
  }
}

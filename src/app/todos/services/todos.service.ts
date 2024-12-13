import { Injectable, signal } from '@angular/core';

import { TODO } from '../types/todo.interface';
import { FILTERS } from '../types/filters.enam';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  todosSignal = signal<TODO[]>([]);
  filterSignal = signal<FILTERS>(FILTERS.ALL);

  addTodo(text: string): void {
    const newTodo: TODO = {
      id: Math.random().toString(16),
      text,
      isCompleted: false,
    };
    this.todosSignal.update((todos) => [...todos, newTodo]);
  }

  changeFilter(filter: FILTERS): void {
    this.filterSignal.set(filter);
  }

  editTodo(id: string, text: string): void {
    this.todosSignal.update((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, text } : todo))
    );
  }

  removeTodo(id: string): void {
    this.todosSignal.update((todos) => todos.filter((todo) => todo.id !== id));
  }

  toggleTodo(id: string): void {
    this.todosSignal.update((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  }

  toggleAllTodos(isCompleted: boolean): void {
    this.todosSignal.update((todos) =>
      todos.map((todo) => ({ ...todo, isCompleted }))
    );
  }
}

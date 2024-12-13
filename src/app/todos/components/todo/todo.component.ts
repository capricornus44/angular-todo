import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

import { TODO } from '../../types/todo.interface';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'todos-todo',
  templateUrl: './todo.component.html',
  imports: [CommonModule],
})
export class TodosTodoComponent implements OnInit, OnChanges {
  @Input({ required: true }) todo!: TODO;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();
  @ViewChild('textInput') textInput?: ElementRef;

  todoService = inject(TodosService);
  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => this.textInput?.nativeElement.focus(), 0);
    }
  }

  changeText(event: Event): void {
    this.editingText = (event.target as HTMLInputElement).value;
  }

  editTodo(): void {
    this.todoService.editTodo(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTodoInEditing(): void {
    this.setEditingId.emit(this.todo.id);
  }

  removeTodo(): void {
    this.todoService.removeTodo(this.todo.id);
  }

  toggleTodo(): void {
    this.todoService.toggleTodo(this.todo.id);
  }
}

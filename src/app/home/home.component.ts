import { Component, signal } from '@angular/core';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  CdkDrag,
  CdkDropList,
} from '@angular/cdk/drag-drop';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CdkDropList, CdkDrag, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  expense = signal<any>([]);

  done = signal<any>([]);
  total = signal(0);
  myForm!: FormGroup;
  value = 0;
  description = [];

  constructor(private fb: FormBuilder) {
    this.myForm = this.fb.group({
      value: [0, Validators.required],
      description: ['', Validators.required],
    });
  }

  onAddClick() {
    if (this.myForm.value) {
      this.total.update((total) => total + this.myForm.value.value);
      if (this.myForm.value) {
        if (this.myForm.value.value < 0) {
          this.expense.update((expense) => [
            ...expense,
            this.myForm.value.value + ' ' + this.myForm.value.description,
          ]);
        } else {
          this.done.update((done) => [
            ...done,
            this.myForm.value.value + ' ' + this.myForm.value.description,
          ]);
        }
      }
    } else {
      alert('Please enter a value');
    }
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

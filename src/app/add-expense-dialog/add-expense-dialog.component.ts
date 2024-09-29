import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category } from '../shared/model.shared';

@Component({
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss'],
})
export class AddExpenseDialogComponent {
  @Input() displayModal: boolean = false;
  @Input() categories: Category[] = [];
  @Output() addExpense = new EventEmitter<any>();
  @Output() closeModal = new EventEmitter<void>();

  expenseForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      store: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      description: [''],
    });
  }

  onAddExpense(): void {
    if (this.expenseForm.valid) {
      this.addExpense.emit(this.expenseForm.value);
      this.expenseForm.reset();
    }
  }

  onCloseModal(): void {
    this.closeModal.emit();
  }
}

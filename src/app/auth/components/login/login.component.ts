import { Component } from '@angular/core';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducer';
import { LoginRequestInterface } from '../../types/loginRequest.interface';
import { authActions } from '../../store/actions';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BackendErrorMessagesComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private fb: FormBuilder, private store: Store) {}

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required]],

    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  onSubmit() {
    const request: LoginRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.login({ request }));
  }
}

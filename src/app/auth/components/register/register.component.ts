import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { authActions } from '../../store/actions';
import { RegisterRequestInterface } from '../../types/registerRequest.interface';
import { CommonModule } from '@angular/common';
import {
  selectIsSubmitting,
  selectValidationErrors,
} from '../../store/reducer';
import { AuthService } from '../../services/auth.service';
import { combineLatest } from 'rxjs';
import { BackendErrorMessagesComponent } from '../../../shared/components/backend-error-messages/backend-error-messages.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterLink,
    BackendErrorMessagesComponent,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  constructor(private fb: FormBuilder, private store: Store) {}

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required]],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  data$ = combineLatest({
    isSubmitting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  });

  onSubmit() {
    const request: RegisterRequestInterface = {
      user: this.form.getRawValue(),
    };
    this.store.dispatch(authActions.register({ request }));
  }
}

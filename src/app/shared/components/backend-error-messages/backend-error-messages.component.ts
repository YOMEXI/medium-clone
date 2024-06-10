import { Component, Input, OnInit } from '@angular/core';
import { BackendErrorInterface } from '../../types/backendError.interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-backend-error-messages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './backend-error-messages.component.html',
  styleUrl: './backend-error-messages.component.scss',
})
export class BackendErrorMessagesComponent implements OnInit {
  @Input()
  backendErrors: BackendErrorInterface = {};

  errorMessages: string[] = [];

  ngOnInit(): void {
    this.errorMessages = Object.keys(this.backendErrors).map((name: string) => {
      const messages = this.backendErrors[name];

      return `${name} ${messages}`;
    });
  }
}

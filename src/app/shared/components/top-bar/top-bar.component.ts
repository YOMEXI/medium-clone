import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';
import { selectCurrentUser } from '../../../auth/store/reducer';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'mc-topbar',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  data$ = combineLatest({
    currentUser: this.store.select(selectCurrentUser),
  });
  constructor(private store: Store) {}
}

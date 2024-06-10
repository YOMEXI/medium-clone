import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { RegisterRequestInterface } from '../types/registerRequest.interface';
import { CurrentUserInterface } from '../../shared/types/CurrentUser.interface';
import { BackendErrorInterface } from '../../shared/types/backendError.interface';
import { LoginRequestInterface } from '../types/loginRequest.interface';

export const authActions = createActionGroup({
  source: 'auth',
  events: {
    Register: props<{ request: RegisterRequestInterface }>(),
    'Register Success': props<{ currentUser: CurrentUserInterface }>(),
    'Register failure': props<{ errors: BackendErrorInterface }>(),

    Login: props<{ request: LoginRequestInterface }>(),
    'Login Success': props<{ currentUser: CurrentUserInterface }>(),
    'Login failure': props<{ errors: BackendErrorInterface }>(),

    'Get currentUser': emptyProps(),
    'Get currentUser Success': props<{ currentUser: CurrentUserInterface }>(),
    'Get currentUser failure': emptyProps(),
  },
});

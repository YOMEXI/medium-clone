import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthStateInterface } from '../types/authState.interface';
import { authActions } from './actions';
import { Actions } from '@ngrx/effects';
import {
  routerNavigatedAction,
  routerNavigationAction,
} from '@ngrx/router-store';

const initialState: AuthStateInterface = {
  isSubmitting: false,
  isLoading: false,
  currentUser: undefined,
  validationErrors: null,
};

const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(authActions.register, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.registerSuccess, (state, actions) => ({
      ...state,
      isSubmitting: false,

      currentUser: actions.currentUser,
    })),
    on(authActions.registerFailure, (state, actions) => ({
      ...state,
      isSubmitting: false,
      validationErrors: actions.errors,
    })),
    on(authActions.login, (state) => ({
      ...state,
      isSubmitting: true,
      validationErrors: null,
    })),
    on(authActions.loginSuccess, (state, actions) => ({
      ...state,
      isSubmitting: false,

      currentUser: actions.currentUser,
    })),
    on(authActions.loginFailure, (state, actions) => ({
      ...state,
      isSubmitting: false,
      validationErrors: actions.errors,
    })),
    on(authActions.getCurrentUser, (state) => ({
      ...state,
      isLoading: true,
    })),
    on(authActions.getCurrentUserSuccess, (state, action) => ({
      ...state,
      isLoading: false,
      currentUser: action.currentUser,
    })),
    on(authActions.getCurrentUserFailure, (state) => ({
      ...state,
      isLoading: false,
      currentUser: null,
    })),
    on(routerNavigationAction, (state) => ({
      ...state,
      validationErrors: null,
    }))
  ),
});

export const {
  name: authFeatureKey,
  reducer: authReducer,
  selectIsSubmitting,
  selectCurrentUser,
  selectIsLoading,
  selectValidationErrors,
} = authFeature;

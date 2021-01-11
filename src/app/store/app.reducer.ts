import { ActionReducerMap } from '@ngrx/store';
import * as fromAdmin from '../admin/store/admin.reducer';
import * as fromAuth from '../auth/store/auth.reducer';
import * as fromUsers from '../users/store/users.reducer';

export interface AppState{
    admin: fromAdmin.State;
    auth: fromAuth.State;
    users: fromUsers.State;
}

export const appReducer: ActionReducerMap<AppState>={
    admin: fromAdmin.adminReducer,
    auth: fromAuth.authReducer,
    users: fromUsers.usersReducer
};
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { FireBaseProvider } from '../../providers/firebase.provider';

export const NotLoggedIn: CanActivateFn = async (route, state) => {
    const router = inject(Router);
    const fireBaseProvider = inject(FireBaseProvider);
    const user = await fireBaseProvider.user;

    if (user) {
        await router.navigate(['/fill-score']);
        return false;
    }

    return true;
};

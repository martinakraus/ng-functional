import { inject, InjectionToken, PLATFORM_ID } from "@angular/core";

export const WINDOW = new InjectionToken('WindowToken', {
    providedIn: 'root',
    factory: () => {
        const platform = inject(PLATFORM_ID);

        return platform === 'browser' ? window : {} as Window
    }
});
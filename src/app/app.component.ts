import { Component, HostBinding, Inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { WINDOW } from "./window.token";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    imports: [
        RouterOutlet,
        HeaderComponent,
    ],
    styleUrls: [ './app.component.scss' ],
})
export class AppComponent {
    private readonly darkModeClassName = 'darkMode';
    @HostBinding('class') private className = '';


    // ToDo move to inject function
    constructor(@Inject(WINDOW) window: Window) {
    }

    changeTheme(isInDarkMode: boolean) {
        this.className = isInDarkMode ? this.darkModeClassName : '';
    }
}

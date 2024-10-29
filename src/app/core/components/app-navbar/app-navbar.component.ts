import { Component } from '@angular/core';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-app-navbar',
  standalone: true,
  imports: [
    MenuModule
  ],
  templateUrl: './app-navbar.component.html',
  styleUrl: './app-navbar.component.scss'
})
export class AppNavbarComponent {

}

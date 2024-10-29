import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppNavbarComponent } from '../app-navbar/app-navbar.component';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    RouterModule,
    AppNavbarComponent
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss'
})
export class AppLayoutComponent {

}

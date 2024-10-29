import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { BadgeModule } from 'primeng/badge';
import { RouterOutlet } from '@angular/router';
import { BaseComponent } from '../../../core/commonComponent/base.component';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { UserDto } from '../../../core/dtos/user.dto';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    InputTextModule,
    BadgeModule,
    RouterOutlet,
    AutoCompleteModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent extends BaseComponent implements OnInit {
  /**
   *
   */

  public suggestions: any[] = [];
  constructor() {
    super();
  }

  ngOnInit(): void {
      
  }

  search(event: AutoCompleteCompleteEvent) {
    console.log(event);
    
  }
}

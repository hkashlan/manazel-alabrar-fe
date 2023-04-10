import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';
import { SharedModule } from '../../core/modules/shared.module';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SharedModule, NavbarComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  loginPrefix = environment.loginPrefix;

  constructor() {}
  photo: any = '/assets/img/Group 28.png';
  ngOnInit(): void {}
}

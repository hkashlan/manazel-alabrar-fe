import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../core/modules/shared.module';
import { NavbarComponent } from '../components/navbar/navbar.component';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SharedModule, NavbarComponent, RouterModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {
  photo: any = '/assets/img/Group 28.png';
}

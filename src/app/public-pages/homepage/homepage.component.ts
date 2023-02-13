import { Component } from '@angular/core';
import { SharedModule } from '../../core/modules/shared.module';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {}

import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { APIService } from '../core/services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin';

  constructor(api: APIService) {
    api.user.findAll({where: {
      id: {
        gte: 4
      }
    }});


  }
}

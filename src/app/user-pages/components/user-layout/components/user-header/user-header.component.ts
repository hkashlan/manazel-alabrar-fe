import { Component, EventEmitter, Output } from '@angular/core';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { AuthenticationService } from '../../../../../core/services/authentication.service';
import { StudentService } from '../../../../services/student.service';
import { menus } from '../../../../user-pages-routing';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
  menus = menus;

  constructor(public studentService: StudentService, private authenticationService: AuthenticationService) {}

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  logout() {
    this.authenticationService.logout();
  }
}

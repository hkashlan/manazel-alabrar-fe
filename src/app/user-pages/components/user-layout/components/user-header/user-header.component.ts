import { Component, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { translationKeys } from '../../../../../core/models/translations';
import { SharedModule } from '../../../../../core/modules/shared.module';
import { AuthenticationService } from '../../../../../core/services/authentication.service';
import { BFF } from '../../../../models/schema-bff';
import { menus, userPageRouting } from '../../../../user-pages-routing';
import { UserStore } from '../../../../user-state';

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

  profilePath = userPageRouting.profile.path;

  translationKeys = translationKeys;
  student$: Observable<BFF.myPaths.response>;

  constructor(private userStore: UserStore, private authenticationService: AuthenticationService) {
    this.student$ = this.userStore.student$;
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };

  logout() {
    this.authenticationService.logout();
  }
}

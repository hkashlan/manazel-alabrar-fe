import { Component } from '@angular/core';
import { SharedModule } from '../../../core/modules/shared.module';
import { UserStore } from '../../user-state';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserSidenavListComponent } from './components/user-sidenav-list/user-sidenav-list.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [SharedModule, UserSidenavListComponent, UserHeaderComponent],
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
  providers: [UserStore],
})
export class UserLayoutComponent {
  student$ = this.userStore.select((s) => s.student);
  constructor(private userStore: UserStore) {}
}

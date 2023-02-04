import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserSidenavListComponent } from './components/user-sidenav-list/user-sidenav-list.component';

@Component({
  selector: 'app-user-layout',
  standalone: true,
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule,
    UserSidenavListComponent,
    UserHeaderComponent,
  ],
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss'],
})
export class UserLayoutComponent {}

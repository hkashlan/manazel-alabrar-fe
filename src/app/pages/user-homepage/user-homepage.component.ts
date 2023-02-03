import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../shared-material/shared-material.module';
import { UserHeaderComponent } from './components/user-header/user-header.component';
import { UserLayoutComponent } from './components/user-layout/user-layout.component';
import { UserSidenavListComponent } from './components/user-sidenav-list/user-sidenav-list.component';

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [
    CommonModule,
    SharedMaterialModule,
    RouterModule,
    UserLayoutComponent,
    UserSidenavListComponent,
    UserHeaderComponent,
  ],
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss'],
})
export class UserHomepageComponent {}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../../../../shared-material/shared-material.module';
import { menus } from '../../../../user-pages-routing';

@Component({
  selector: 'app-user-sidenav-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedMaterialModule],
  templateUrl: './user-sidenav-list.component.html',
  styleUrls: ['./user-sidenav-list.component.scss'],
})
export class UserSidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  menus = menus;

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}

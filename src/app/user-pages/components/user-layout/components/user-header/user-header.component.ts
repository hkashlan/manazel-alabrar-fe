import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedMaterialModule } from '../../../../../shared-material/shared-material.module';
import { menus } from '../../../../user-pages-routing';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule, RouterModule, SharedMaterialModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();

  menus = menus;

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}

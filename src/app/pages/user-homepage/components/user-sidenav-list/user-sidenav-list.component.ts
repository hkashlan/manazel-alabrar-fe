import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';

@Component({
  selector: 'app-user-sidenav-list',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './user-sidenav-list.component.html',
  styleUrls: ['./user-sidenav-list.component.scss'],
})
export class UserSidenavListComponent {
  @Output() sidenavClose = new EventEmitter();

  public onSidenavClose = () => {
    this.sidenavClose.emit();
  };
}

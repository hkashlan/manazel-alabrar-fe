import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { SharedMaterialModule } from '../../../../shared-material/shared-material.module';

@Component({
  selector: 'app-user-header',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss'],
})
export class UserHeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  };
}

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  imports: [MatIconModule, CommonModule, MatToolbarModule],
})
export class HeaderComponent {
  @Output() toggleSidebarForMe: EventEmitter<unknown> = new EventEmitter();

  toggleSidebar() {
    this.toggleSidebarForMe.emit();
  }
}

import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TableColumnComponent } from '../table';

@Component({
  selector: 'app-row-actions',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './row-actions.component.html',
  styleUrl: './row-actions.component.scss',
})
export class RowActionsComponent extends TableColumnComponent<unknown> {
  @Input() editBasicUrl: string = '';
}

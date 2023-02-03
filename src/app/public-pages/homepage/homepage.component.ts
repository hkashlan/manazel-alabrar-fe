import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../shared-material/shared-material.module';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
})
export class HomepageComponent {}

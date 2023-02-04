import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedMaterialModule } from '../../../shared-material/shared-material.module';

@Component({
  selector: 'app-user-homepage',
  standalone: true,
  imports: [CommonModule, SharedMaterialModule],
  templateUrl: './user-homepage.component.html',
  styleUrls: ['./user-homepage.component.scss'],
})
export class UserHomepageComponent {}

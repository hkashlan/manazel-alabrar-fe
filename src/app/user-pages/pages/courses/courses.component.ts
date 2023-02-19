import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Faculty } from '../../models/student';
import { UserStore } from '../../user-state';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  faculties: Faculty[];

  constructor(userStore: UserStore) {
    this.faculties = userStore.get().student.faculties;
  }
}

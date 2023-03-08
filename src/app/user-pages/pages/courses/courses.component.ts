import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BFF } from '../../models/student';
import { UserStore } from '../../user-state';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent {
  faculties: BFF.Faculty[];

  constructor(userStore: UserStore) {
    this.faculties = userStore.get().student.faculties;
  }
}

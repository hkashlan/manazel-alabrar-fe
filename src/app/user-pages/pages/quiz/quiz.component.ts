import { Component } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { TableColumn } from '../../../core/components/table/table';
import { translationKeys } from '../../../core/models/translations';
import { CoreModule } from '../../../core/modules/core.module';
import { Course } from '../../models/student';
import { StudentService } from '../../services/student.service';

interface Quizes {
  courseName: string;
  courseId: number;
}

export interface Order {
  id: number;
  description: string;
  amount: number;
  price: number;
  discount: number;
}

@Component({
  standalone: true,
  imports: [CoreModule],
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent {
  translationKeys = translationKeys;

  courses: Course[] = [];

  orders: Order[] = this.getOrders();
  ordersTableColumns: TableColumn<Order>[] = this.initializeColumns();

  constructor(public studentService: StudentService) {
    this.courses = this.studentService.student.faculties
      .map((f) => f.courses)
      .flat();
  }

  sortData(sortParameters: Sort) {
    const keyName = sortParameters.active;
    // if (sortParameters.direction === 'asc') {
    //   this.orders = this.orders.sort((a: Order, b: Order) =>
    //     a[keyName].localeCompare(b[keyName])
    //   );
    // } else if (sortParameters.direction === 'desc') {
    //   this.orders = this.orders.sort((a: Order, b: Order) =>
    //     b[keyName] as.localeCompare(a[keyName])
    //   );
    // } else {
    //   return (this.orders = this.getOrders());
    // }
  }

  removeOrder(order: Order) {
    this.orders = this.orders.filter((item) => item.id !== order.id);
  }

  initializeColumns(): TableColumn<Order>[] {
    return [
      {
        name: 'book name',
        dataKey: 'description',
        position: 'left',
        isSortable: true,
      },
      {
        name: 'ordered amount',
        dataKey: 'amount',
        position: 'right',
        isSortable: false,
      },
      {
        name: 'book price',
        dataKey: 'price',
        position: 'right',
        isSortable: true,
      },
      {
        name: 'book discount',
        dataKey: 'discount',
        position: 'right',
        isSortable: false,
      },
    ];
  }

  getOrders(): any[] {
    return [
      {
        id: 1,
        description: 'first book',
        amount: 2,
        price: 15,
        discount: 0,
      },
      {
        id: 2,
        description: 'second book',
        amount: 1,
        price: 42.5,
        discount: 0.1,
      },
      {
        id: 3,
        description: 'third book',
        amount: 4,
        price: 12.99,
        discount: 0.05,
      },
      {
        id: 4,
        description: 'fourth book',
        amount: 1,
        price: 19.99,
        discount: 0.02,
      },
      {
        id: 5,
        description: 'fifth book',
        amount: 8,
        price: 10.25,
        discount: 0.2,
      },
    ];
  }
}

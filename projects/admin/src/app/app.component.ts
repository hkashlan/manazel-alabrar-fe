import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { JSONSchema7 } from 'json-schema';
import { RowActionsComponent } from '../core/components/table/row-actions/row-actions.component';
import { TableColumn, componentDef } from '../core/components/table/table';
import { ColumnDefinition, TableComponent } from '../core/components/table/table.component';
import { APIService } from '../core/services/api.service';
import schema from './model/json-schema.json';
import { DataTableComponent } from './shared/components/data-table/data-table.component';

interface Student {
  id: number;
  name: string;
  image: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    TableComponent,
    ColumnDefinition,
    DataTableComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'admin';

  mobileQuery: MediaQueryList;

  fillerNav = Array.from({ length: 50 }, (_, i) => `Nav Item ${i + 1}`);

  fillerContent = Array.from(
    { length: 50 },
    () =>
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
       labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
       laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
       voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
       cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
  );

  ordersTableColumns: TableColumn<Student>[] = [
    {
      name: 'id',
      dataKey: 'id',
    },
    {
      name: 'name',
      dataKey: 'name',
      isSortable: true,
    },
    {
      dataKey: 'image',
      name: 'image',
    },
    {
      name: 'action12',
      componentDef: componentDef(RowActionsComponent, {
        editBasicUrl: '123',
      }),
      // componentDef: componentDef(RowActionsComponent, 'editBasicUrl'),
    },
  ];

  data: Student[] = [];

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, api: APIService) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    api.user.findAll({
      where: {
        id: {
          gte: 4,
        },
      },
    });

    for (let index = 0; index < 30; index++) {
      this.data.push({
        id: index,
        name: 'name ' + index,
        image: 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_light_color_92x30dp.png',
      });
    }

    const tt: JSONSchema7 = schema as unknown as JSONSchema7;
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);
}

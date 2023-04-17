import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { translationKeys } from '../../../core/models/translations';
import { UserStore } from '../../user-state';

@Component({
  selector: 'app-path',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, TranslateModule],
  templateUrl: './path.component.html',
  styleUrls: ['./path.component.scss'],
})
export class PathComponent implements OnInit {
  @HostBinding('class') classes = 'cards';

  paths$ = this.userStore.openPath$;

  translationKeys = translationKeys;

  constructor(private userStore: UserStore) {}

  ngOnInit(): void {
    this.userStore.loadOpenPaths();
  }

  register() {}
}

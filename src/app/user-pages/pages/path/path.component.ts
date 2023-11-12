import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ConfirmDialogService } from '../../../core/components/confirm-dialog/confirm-dialog.service';
import { translationKeys } from '../../../core/models/translations';
import { LoadingService } from '../../services/loading-service';
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

  openPathResponse$ = this.userStore.openPathResponse$;

  translationKeys = translationKeys;
  error: { message: string } | undefined;

  constructor(
    private userStore: UserStore,
    private confirmDialogService: ConfirmDialogService,
    public loadingService: LoadingService,
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
    this.userStore.loadOpenPaths();
  }

  register(pathId: number) {
    this.confirmDialogService
      .openDialog({ msg: this.translateService.instant(this.translationKeys.path.register_confirm) })
      .afterClosed()
      .subscribe((accepted) => {
        if (accepted) {
          this.userStore.register(pathId).subscribe((response) => {
            if (response.data) {
              this.userStore.patchState({ openPathsResponse: { data: response.data } });
            } else {
              this.error = response.error;
            }
          });
        }
      });
  }
}

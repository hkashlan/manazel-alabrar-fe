import { CommonModule } from '@angular/common';
import { Component, HostBinding, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmDialogService } from '../../../core/components/confirm-dialog/confirm-dialog.service';
import { translationKeys } from '../../../core/models/translations';
import { md } from '../../../utils/markdown.utils';
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

  openPathResponse = this.userStore.openPathsResponse;

  translationKeys = translationKeys;
  error: { message: string } | undefined;

  constructor(
    private userStore: UserStore,
    private confirmDialogService: ConfirmDialogService,
    public loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.userStore.loadOpenPaths();
  }

  getDescription(description: string) {
    return md.parse(description);
  }

  register(pathId: number) {
    this.confirmDialogService
      .openDialog({ msg: this.translationKeys.path.register_confirm })
      .afterClosed()
      .subscribe((accepted) => {
        if (accepted) {
          this.userStore.register(pathId).subscribe((response) => {
            if (response.data) {
              this.userStore.openPathsResponse.set(response);
            } else {
              this.error = response.error;
            }
          });
        }
      });
  }
}

import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

const icons: Record<string, string> = {
  google: '/assets/providers/google.svg',
};

@Injectable({
  providedIn: 'root',
})
export class IconService {
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {}

  init(): void {
    Object.keys(icons).forEach((iconKey) =>
      this.matIconRegistry.addSvgIcon(iconKey, this.domSanitizer.bypassSecurityTrustResourceUrl(icons[iconKey]))
    );
  }
}

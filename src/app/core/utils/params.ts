import { inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export function getRouteParam(name: string): string {
  return inject(ActivatedRoute).snapshot.paramMap.get(name)!;
}

export function getRouteNumberParam(name: string): Number {
  return Number(getRouteParam(name));
}

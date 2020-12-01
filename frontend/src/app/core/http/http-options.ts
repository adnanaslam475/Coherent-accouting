import { Injectable } from '@angular/core';

@Injectable()
export class HttpOptions {
  private tokenRequired = true;

  public isTokenRequired(): boolean {
    return this.tokenRequired;
  }

  public setTokenRequired(tokenRequired: boolean): void {
    this.tokenRequired = tokenRequired;
  }
}

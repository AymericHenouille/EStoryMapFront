import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  public loading: boolean = false;
  private _loading!: Subscription;

  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this._loading = this.authService.loading$.subscribe(loading => this.loading = loading);
  }

  public ngOnDestroy(): void {
    this._loading.unsubscribe();
  }

}

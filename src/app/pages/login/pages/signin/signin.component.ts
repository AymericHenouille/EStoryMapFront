import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {

  public signinForm!: FormGroup;
  public isLoading: boolean = false;
  private _isLoading!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
    this._isLoading = this.authService.loading$.subscribe(isLoading => this.isLoading = isLoading);
  }

  public ngOnDestroy(): void {
    this._isLoading.unsubscribe();
  }

  public submit(): void {
    if (this.signinForm.valid) {
      const email: string = this.signinForm.get('email')?.value;
      const password: string = this.signinForm.get('password')?.value;
      this.authService.loginWithEmailAndPassword(email, password)
        .then(() => this.router.navigate(['/']))
        .catch(({message}) => this.snackBar.open(message, 'ok', {
          duration: 3000
        }));
    }
  }

}

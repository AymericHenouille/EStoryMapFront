import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  public signupForm!: FormGroup;
  public isLoading: boolean = false;
  private _isLoading!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      comfirmPassword: new FormControl('', [Validators.required])
    });
    this._isLoading = this.authService.loading$.subscribe(isLoading => this.isLoading = isLoading);
  }

  public ngOnDestroy(): void {
    this._isLoading.unsubscribe();
  }

  public submit(): void {
    if (this.signupForm.valid) {
      const user: User = {
        name: this.signupForm.get('name')?.value,
        email: this.signupForm.get('email')?.value
      };
      this.authService.register(user, this.signupForm.get('password')?.value)
        .then(() => this.router.navigate(['/']))
        .catch(({message}) => this.snackBar.open(message, 'ok', {
          duration: 3000
        }));

    }
  }

}

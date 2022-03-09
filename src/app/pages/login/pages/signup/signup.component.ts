import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signupForm!: FormGroup;

  constructor(private authService: AuthService) { }

  public ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      name: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      comfirmPassword: new FormControl('', [Validators.required])
    });
  }

  public submit(): void {
    const user: User = {
      name: this.signupForm.get('name')?.value,
      email: this.signupForm.get('email')?.value
    };
    this.authService.register(user, '')
  }

}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { filter, Observable, Subscription } from 'rxjs';
import { User } from 'src/app/core/models/user.model';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy {

  public editProfilForm!: FormGroup;
  public isEdit: boolean = false;
  public user!: User;
  private _user!: Subscription;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) { }

  public ngOnInit(): void {
    this._user = (this.authService.user$.pipe(
      filter(user => !!user)
    ) as Observable<User>).subscribe(user => {
      this.user = user;
      this.editProfilForm = new FormGroup({
        name: new FormControl(this.user.name),
        email: new FormControl(this.user.email)
      });
    });
  }

  public ngOnDestroy(): void {
    this._user?.unsubscribe();
  }

  public toggleEdit(): void {
    this.isEdit = !this.isEdit;
  }

  public save(): void {
    if (this.editProfilForm.valid) {
      const user: User = this.editProfilForm.value;
      const duration: number = 2500;
      this.authService.updateUserState(user)
        .then(() => {
          this.snackBar.open('profile mis a jour', 'ok', { duration });
          this.toggleEdit();
        })
        .catch((error) => this.snackBar.open(error, 'ok', { duration }));
    }
  }

}

import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, first, mergeMap, Subscription } from 'rxjs';

@Component({
  selector: 'app-shared',
  templateUrl: './shared.component.html',
  styleUrls: ['./shared.component.scss']
})
export class SharedComponent implements OnInit, OnDestroy {

  public name: string = '';
  public valid: boolean = false;

  private nameSubject: BehaviorSubject<string> = new BehaviorSubject('');
  private _name!: Subscription;

  constructor(private httpClient: HttpClient) { }

  public onSubmit(): void {
  }

  public ngOnInit(): void {
    this._name = this.nameSubject.pipe(
      mergeMap(name => this.httpClient.get<boolean>(`user/${name}`).pipe(first())),
    ).subscribe(valid => this.valid = valid);
  }

  public ngOnDestroy(): void {
    this._name.unsubscribe();
  }

  public updateName(name: string): void {
    this.nameSubject.next(this.name = name);
  }

}

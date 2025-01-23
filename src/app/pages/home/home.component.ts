import { CoreCardComponent } from '@/app/components/core-card/core-card.component';
import { User } from '@/app/shared/models/interfaces';
import { ApiService } from '@/app/shared/services';
import { AsyncPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, filter, Observable, of, take } from 'rxjs';
import { catchError } from 'rxjs/internal/operators/catchError';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    AsyncPipe,
    CoreCardComponent,
    MatDialogModule
  ],
  standalone: true
})
export class HomeComponent implements OnInit {
  private readonly _apiService = inject(ApiService);
  private readonly _dialog = inject(MatDialog);

  private dialogRef!: MatDialogRef<CoreCardComponent>;
  private readonly users: BehaviorSubject<Array<User>> = new BehaviorSubject<Array<User>>([]);

  readonly users$ = this.users.asObservable();

  /**
   * @inheritdoc
  */
  ngOnInit(): void {
    this.fetchUsers()
      .subscribe((users: Array<User>) => this.users.next(users));
  }


  /**
   * Fetches a list of users from the API service.
   *
   * @returns An Observable that emits an array of User objects.
   *          If an error occurs during the API call, it returns an empty array.
   *          The result is filtered to only include users with a name title.
   *
   * @throws HttpErrorResponse - Caught and handled internally, logs to console
   */
  private fetchUsers(): Observable<Array<User>> {
    return this._apiService.get<Array<User>>({ results: 50 })
      .pipe(
        take(1),
        catchError((error: HttpErrorResponse) => {
          console.error('Error fetching users', error);
          return of([]);  // Return empty array on error
        }),
        filter((users: Array<User>) => users.some((user: User) => user?.id?.value))
      );
  }


  /**
   * Opens a dialog displaying user details using CoreCardComponent.
   *
   * @param index - The index of the selected user in the users array
   * @returns void
   *
   * @remarks
   * The dialog is configured with custom animations, backdrop and styling.
   * After opening, it sets up the dialog instance with the selected user data.
   */
  onAction(index: number): void {
    const selectedUser: User = this.users.value[index];
    const modalDialogSettings: MatDialogConfig<CoreCardComponent> = {
      closeOnNavigation: true,
      delayFocusTrap: true,
      enterAnimationDuration: 500,
      exitAnimationDuration: 500,
      id: `${index}-dialog`,
      hasBackdrop: true,
      minWidth: '400px',
      role: 'dialog'
    };
    this.dialogRef = this._dialog.open(
      CoreCardComponent,
      modalDialogSettings
    );
    this.setupUserDialog(this.dialogRef.componentInstance, selectedUser);
  }

  /**
   * Configures a CoreCardComponent instance with user data for display in a dialog.
   * @param userProfileDialog - The CoreCardComponent to be configured
   * @param selectedUser - The User object containing the data to display
   * @private
   * @description Sets up the card's title, subtitle, content, image, expansion state,
   * available actions, and appearance. Also handles the 'Close' action by collapsing
   * the card and closing the dialog.
   */
  private setupUserDialog(userProfileDialog: CoreCardComponent, selectedUser: User): void {
    userProfileDialog.title = `${selectedUser.name.title} ${selectedUser.name.first} ${selectedUser.name.last}`;
    userProfileDialog.subtitle = selectedUser.email;
    userProfileDialog.content = selectedUser.phone;
    userProfileDialog.image = selectedUser.picture.medium;
    userProfileDialog.expanded = true;
    userProfileDialog.actions = ['Close'];
    userProfileDialog.appearance = 'outlined';

    // Set additional user details
    userProfileDialog.cell = selectedUser.cell;
    userProfileDialog.gender = selectedUser.gender;
    userProfileDialog.dob = selectedUser.dob;
    userProfileDialog.location = selectedUser.location;
    userProfileDialog.registered = selectedUser.registered;

    userProfileDialog.actionClick.pipe(take(1)).subscribe(() => {
      userProfileDialog.expanded = false;
      this.dialogRef.close();
    });
  }
}

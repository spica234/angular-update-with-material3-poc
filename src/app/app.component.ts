import { LoaderService } from '@/app/shared/services';
import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [RouterOutlet, MatProgressBarModule, AsyncPipe]
})
export class AppComponent {
  readonly loading: Readonly<Observable<boolean>> = inject(LoaderService).loading$;
}

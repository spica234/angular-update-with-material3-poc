import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

/**
 * Service responsible for managing application-wide loading states.
 *
 * @description
 * The LoaderService provides methods to control and observe loading states
 * throughout the application. It uses a BehaviorSubject internally to maintain
 * the current loading state and expose it as an observable to subscribers.
 *
 * @example
 * ```typescript
 * export class MyComponent {
 *   constructor(private readonly loaderService: LoaderService) {
 *     // Start loading
 *     this.loaderService.start();
 *
 *     // Stop loading
 *     this.loaderService.stop();
 *   }
 * }
 * ```
 */
@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private readonly loading = new BehaviorSubject<boolean>(false);
  readonly loading$: Observable<boolean> = this.loading.asObservable();

  /**
   * Sets the loading state to true, indicating that a loading process has started.
   */
  start(): void {
    this.loading.next(true);
  }

  /**
   * Stops the loader by setting the loading state to false.
   *
   * @remarks
   * This method is typically called when the current loading operation
   * has completed or needs to be cancelled.
   */
  stop(): void {
    this.loading.next(false);
  }
}

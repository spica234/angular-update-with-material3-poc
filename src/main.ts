import { AppComponent } from '@/app/app.component';
import { routes } from '@/app/app.routes';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';


bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      BrowserAnimationsModule,
      RouterModule.forRoot(routes),
      MatProgressSpinnerModule
    ),
    provideAnimations(),
    provideHttpClient(withInterceptorsFromDi())
  ]
})
  .catch(err => console.error(err));

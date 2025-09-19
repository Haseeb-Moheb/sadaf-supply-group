import { bootstrapApplication } from '@angular/platform-browser';
import { importProvidersFrom } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { AppComponent } from '../app/app.component';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(FormsModule), // ✅ Correct way to include FormsModule
    provideAnimations()
  ]
}).catch(err => console.error(err));

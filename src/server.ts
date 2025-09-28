import { AppComponent } from './app/app.component';
import { config } from './app/app.config.server';
import { provideServerRendering } from '@angular/platform-server';
import { bootstrapApplication } from '@angular/platform-browser';
import { ApplicationRef } from '@angular/core';


export const bootstrap = (context: any): Promise<ApplicationRef> => {
  return bootstrapApplication(AppComponent, {
    ...config,
    providers: [
      ...(config.providers || []),
      provideServerRendering(),
    ],
  });
};

import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config'; // 1. تأكد من استيراد الإعدادات
import { App } from '../../product/src/app/app';
bootstrapApplication(App, appConfig) // يجب أن يكون AppComponent هو البداية
  .catch((err) => console.error(err));
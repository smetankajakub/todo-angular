import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppHttpInterceptor } from './core/interceptors/app-http.interceptor';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';

import { AuthService } from './core/services/auth.service';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { EffectsModule } from '@ngrx/effects';
import { environment } from 'src/environments/environment';
@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		HttpClientModule,
		provideAuth(() => {
			return getAuth();
		}),
		provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
		provideFirestore(() => getFirestore()),
		provideStorage(() => getStorage()),
		StoreModule.forRoot({}),
		StoreDevtoolsModule.instrument({
			name: 'Todolists app',
			maxAge: 25
		}),
		EffectsModule.forRoot([])
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AppHttpInterceptor,
			multi: true
		},
		AuthService
	],
	bootstrap: [AppComponent],
	exports: [AppRoutingModule]
})
export class AppModule {}

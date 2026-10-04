import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SplashComponent } from './components/splash/splash.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SplashComponent,
    NavbarComponent,
    HomeComponent,
    ExperienceComponent,
    AboutComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  readonly showSplash = signal(true);

  onSplashComplete(): void {
    this.showSplash.set(false);
  }

  replaySplash(): void {
    this.showSplash.set(true);
  }
}

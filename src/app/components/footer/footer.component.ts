import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="border-t border-slate-200/80 dark:border-slate-800/80 bg-white/70 dark:bg-slate-950/80 py-12 backdrop-blur-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pb-8 border-b border-slate-200/60 dark:border-slate-800/60">
          
          <!-- Brand / Name -->
          <div class="md:col-span-6">
            <span class="font-bold text-lg tracking-tight text-slate-900 dark:text-white">
              {{ profile().name }}
            </span>
          </div>

          <!-- Quick Navigation Links -->
          <div class="md:col-span-4 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <a href="#hero" (click)="scrollTo($event, 'hero')" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Home</a>
            <a href="#experience" (click)="scrollTo($event, 'experience')" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Internships</a>
            <a href="#about" (click)="scrollTo($event, 'about')" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">About</a>
            <a href="#projects" (click)="scrollTo($event, 'projects')" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Projects</a>
            <a href="#contact" (click)="scrollTo($event, 'contact')" class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors">Contact</a>
          </div>

          <!-- Back to Top Button -->
          <div class="md:col-span-2 flex justify-start md:justify-end">
            <button
              type="button"
              (click)="scrollToTop()"
              class="inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <span>Back to Top</span>
              <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>

        </div>

        <!-- Bottom Copyright -->
        <div class="pt-8 flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 font-mono">
          &copy; {{ currentYear }} {{ profile().name }}. All rights reserved.
        </div>

      </div>
    </footer>
  `,
})
export class FooterComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;
  readonly currentYear = new Date().getFullYear();

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToTop(): void {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
}

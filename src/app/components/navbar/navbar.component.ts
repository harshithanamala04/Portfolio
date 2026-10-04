import { Component, inject, signal, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';
import { PortfolioService } from '../../core/services/portfolio.service';

interface NavItem {
  label: string;
  href: string;
  id: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      [class.py-3]="isScrolled()"
      [class.py-5]="!isScrolled()"
      [class.glass-nav]="isScrolled()"
      [class.bg-transparent]="!isScrolled()"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between">
          <!-- Brand Name -->
          <a
            href="#hero"
            (click)="scrollToSection($event, 'hero')"
            class="group flex items-center space-x-2.5 focus:outline-none"
            aria-label="Portfolio Home"
          >
            <div class="w-8 h-8 rounded-lg overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-slate-900 flex items-center justify-center p-1 shadow-sm group-hover:border-primary-500 transition-colors">
              <img src="/HN_logo_white.png" alt="HN Logo" class="w-full h-full object-contain" />
            </div>
            <span class="font-bold text-xl tracking-tight bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-800 dark:from-white dark:via-slate-200 dark:to-slate-300 bg-clip-text text-transparent group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {{ portfolioService.profile().name }}
            </span>
          </a>

          <!-- Desktop Navigation Links -->
          <nav class="hidden md:flex items-center space-x-1 lg:space-x-2 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-900/70 border border-slate-200/60 dark:border-slate-800/80 backdrop-blur-md shadow-sm">
            @for (item of navItems; track item.id) {
              <a
                [href]="item.href"
                (click)="scrollToSection($event, item.id)"
                class="px-3.5 py-1.5 text-sm font-medium rounded-full transition-all duration-200 relative"
                [class.text-primary-600]="activeSection() === item.id"
                [class.dark:text-primary-400]="activeSection() === item.id"
                [class.font-semibold]="activeSection() === item.id"
                [class.text-slate-600]="activeSection() !== item.id"
                [class.dark:text-slate-300]="activeSection() !== item.id"
                [class.hover:text-slate-900]="activeSection() !== item.id"
                [class.dark:hover:text-white]="activeSection() !== item.id"
              >
                {{ item.label }}
                @if (activeSection() === item.id) {
                  <span class="absolute inset-0 bg-white dark:bg-slate-800 rounded-full -z-10 shadow-sm transition-all duration-300"></span>
                }
              </a>
            }
          </nav>

          <!-- Right Utilities (Theme Toggle, Socials, Mobile Trigger) -->
          <div class="flex items-center space-x-2 sm:space-x-3">
            <!-- GitHub Link -->
            <a
              [href]="portfolioService.profile().github"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all"
              aria-label="GitHub Profile"
              title="GitHub Profile"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>

            <!-- LinkedIn Link -->
            <a
              [href]="portfolioService.profile().linkedin"
              target="_blank"
              rel="noopener noreferrer"
              class="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 transition-all"
              aria-label="LinkedIn Profile"
              title="LinkedIn Profile"
            >
              <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>

            <!-- Theme Toggle Button -->
            <button
              type="button"
              (click)="themeService.toggleTheme()"
              class="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-slate-200/50 dark:border-slate-800 focus:outline-none transition-all duration-200"
              [attr.aria-label]="themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
              [title]="themeService.isDarkMode() ? 'Switch to light mode' : 'Switch to dark mode'"
            >
              @if (themeService.isDarkMode()) {
                <!-- Sun Icon -->
                <svg class="w-5 h-5 text-amber-400 animate-pulse-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              } @else {
                <!-- Moon Icon -->
                <svg class="w-5 h-5 text-slate-700 hover:text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              }
            </button>


            <!-- Mobile Hamburger Button -->
            <button
              type="button"
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 rounded-xl text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              @if (isMobileMenuOpen()) {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              } @else {
                <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              }
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden fixed inset-x-0 top-[65px] p-4 bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-b border-slate-200 dark:border-slate-800 shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-top-4">
          <nav class="flex flex-col space-y-1.5">
            @for (item of navItems; track item.id) {
              <a
                [href]="item.href"
                (click)="scrollToSection($event, item.id)"
                class="flex items-center justify-between px-4 py-3 rounded-xl text-base font-medium transition-all"
                [class.bg-primary-50]="activeSection() === item.id"
                [class.dark:bg-primary-950/40]="activeSection() === item.id"
                [class.text-primary-600]="activeSection() === item.id"
                [class.dark:text-primary-400]="activeSection() === item.id"
                [class.text-slate-700]="activeSection() !== item.id"
                [class.dark:text-slate-300]="activeSection() !== item.id"
              >
                <span>{{ item.label }}</span>
                @if (activeSection() === item.id) {
                  <span class="w-2 h-2 rounded-full bg-primary-500"></span>
                }
              </a>
            }
            
            <div class="pt-4 mt-2 border-t border-slate-200 dark:border-slate-800 flex items-center justify-around">
              <a
                [href]="portfolioService.profile().github"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 py-2"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                <span>GitHub</span>
              </a>

              <a
                [href]="portfolioService.profile().linkedin"
                target="_blank"
                rel="noopener noreferrer"
                class="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400 hover:text-primary-500 py-2"
              >
                <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                <span>LinkedIn</span>
              </a>
            </div>
          </nav>
        </div>
      }
    </header>
  `,
})
export class NavbarComponent {
  readonly themeService = inject(ThemeService);
  readonly portfolioService = inject(PortfolioService);

  readonly isScrolled = signal(false);
  readonly isMobileMenuOpen = signal(false);
  readonly activeSection = signal('hero');

  readonly navItems: NavItem[] = [
    { label: 'Home', href: '#hero', id: 'hero' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'About Me', href: '#about', id: 'about' },
    { label: 'Projects', href: '#projects', id: 'projects' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  @HostListener('window:scroll')
  onWindowScroll(): void {
    if (typeof window === 'undefined') return;
    this.isScrolled.set(window.scrollY > 20);

    if (window.scrollY < 100) {
      this.activeSection.set('hero');
      return;
    }

    const sections = ['experience', 'about', 'projects', 'contact'];
    const scrollPosition = window.scrollY + 160;

    for (const section of sections) {
      const el = document.getElementById(section);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          this.activeSection.set(section);
          break;
        }
      }
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update((open) => !open);
  }

  scrollToSection(event: Event, id: string): void {
    event.preventDefault();
    this.isMobileMenuOpen.set(false);
    this.activeSection.set(id);

    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

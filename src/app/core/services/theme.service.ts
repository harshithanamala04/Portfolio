import { Injectable, signal, computed, effect } from '@angular/core';

export type ThemeMode = 'light' | 'dark';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'portfolio_theme_mode';

  readonly theme = signal<ThemeMode>(this.getInitialTheme());
  readonly isDarkMode = computed(() => this.theme() === 'dark');

  constructor() {
    // Synchronize DOM and localStorage whenever theme changes
    effect(() => {
      const current = this.theme();
      this.applyTheme(current);
    });

    // Listen to OS preference changes if user hasn't explicitly set a preference
    if (typeof window !== 'undefined' && window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const stored = localStorage.getItem(this.THEME_KEY);
        if (!stored) {
          this.setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  toggleTheme(): void {
    const nextTheme: ThemeMode = this.theme() === 'dark' ? 'light' : 'dark';
    this.setTheme(nextTheme);
  }

  setTheme(mode: ThemeMode): void {
    this.theme.set(mode);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.THEME_KEY, mode);
      } catch (err) {
        console.warn('LocalStorage not accessible', err);
      }
    }
  }

  private getInitialTheme(): ThemeMode {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    try {
      const stored = localStorage.getItem(this.THEME_KEY) as ThemeMode | null;
      if (stored === 'light' || stored === 'dark') {
        return stored;
      }
    } catch {
      // Ignore localStorage error
    }

    // Default to dark or matchMedia
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches) {
      return 'light';
    }

    return 'dark';
  }

  private applyTheme(mode: ThemeMode): void {
    if (typeof document === 'undefined') {
      return;
    }

    const root = document.documentElement;
    if (mode === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
  }
}

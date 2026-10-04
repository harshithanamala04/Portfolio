import { Component, inject, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Project } from '../../models/portfolio.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="projects" class="py-12 sm:py-16 relative scroll-mt-24 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <!-- Section Header with Left/Right Arrows -->
        <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div class="space-y-1">
            <h2 class="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Featured <span class="text-gradient">Projects</span>
            </h2>
            <p class="text-sm sm:text-base text-slate-600 dark:text-slate-400">
              Selected projects built to solve practical problems through modern software development.
            </p>
          </div>

          <!-- Header Navigation Controls -->
          <div class="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              (click)="scrollPrev()"
              aria-label="Previous project card"
              title="Previous project"
              class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              (click)="scrollNext()"
              aria-label="Next project card"
              title="Next project"
              class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-800 bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/50 shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none cursor-pointer"
            >
              <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Continuous Track with Floating Navigation Arrows -->
        <div
          class="relative w-full group/carousel py-2"
          (mouseenter)="pause()"
          (mouseleave)="resume()"
        >
          <!-- Floating Left Arrow -->
          <button
            type="button"
            (click)="scrollPrev()"
            aria-label="Scroll left"
            title="Previous card"
            class="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-slate-200/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Floating Right Arrow -->
          <button
            type="button"
            (click)="scrollNext()"
            aria-label="Scroll right"
            title="Next card"
            class="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full border border-slate-200/90 dark:border-slate-700/90 bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-white shadow-xl backdrop-blur-md flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 hover:border-blue-500 hover:text-blue-600 dark:hover:text-blue-400 opacity-90 sm:opacity-0 sm:group-hover/carousel:opacity-100 cursor-pointer"
          >
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <!-- Edge Gradient Masks -->
          <div class="pointer-events-none absolute left-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-r from-slate-50 dark:from-[#0b0f19] to-transparent z-20"></div>
          <div class="pointer-events-none absolute right-0 top-0 bottom-0 w-10 sm:w-16 bg-gradient-to-l from-slate-50 dark:from-[#0b0f19] to-transparent z-20"></div>

          <!-- Scrollable Track with Hidden Scrollbar -->
          <div
            #scrollTrack
            class="flex gap-5 overflow-x-auto scrollbar-none py-3 px-4"
          >
            <!-- Set 1: Original Projects List -->
            @for (project of projects(); track 'orig-' + project.id) {
              <div
                class="flex-shrink-0 w-[295px] sm:w-[325px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <!-- Card Top: Website Preview Screenshot -->
                <a
                  [href]="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block relative h-40 sm:h-44 overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 group/img cursor-pointer"
                  [title]="'Visit ' + project.title"
                >
                  <img
                    [src]="project.imageUrl"
                    [alt]="project.title + ' preview'"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    loading="lazy"
                  />
                  <!-- Live preview hover overlay -->
                  <div class="absolute inset-0 bg-slate-900/25 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <span class="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-900/95 text-xs font-bold text-slate-800 dark:text-white shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                      <span>Visit Live Site</span>
                      <svg class="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </div>
                </a>

                <!-- Card Body -->
                <div class="p-4 sm:p-5 flex flex-col flex-grow justify-start space-y-2">
                  <a
                    [href]="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
                  >
                    {{ project.title }}
                  </a>

                  <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {{ project.description }}
                  </p>
                </div>
              </div>
            }

            <!-- Set 2: Duplicate Projects List for Seamless Infinite Loop -->
            @for (project of projects(); track 'dup-' + project.id) {
              <div
                class="flex-shrink-0 w-[295px] sm:w-[325px] rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:-translate-y-1.5 hover:shadow-md transition-all duration-300 flex flex-col justify-between overflow-hidden group"
              >
                <!-- Card Top: Website Preview Screenshot -->
                <a
                  [href]="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="block relative h-40 sm:h-44 overflow-hidden bg-slate-100 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 group/img cursor-pointer"
                  [title]="'Visit ' + project.title"
                >
                  <img
                    [src]="project.imageUrl"
                    [alt]="project.title + ' preview'"
                    class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                    loading="lazy"
                  />
                  <!-- Live preview hover overlay -->
                  <div class="absolute inset-0 bg-slate-900/25 opacity-0 group-hover/img:opacity-100 transition-opacity duration-200 flex items-center justify-center pointer-events-none">
                    <span class="px-3 py-1.5 rounded-lg bg-white/95 dark:bg-slate-900/95 text-xs font-bold text-slate-800 dark:text-white shadow-md flex items-center gap-1.5 backdrop-blur-xs">
                      <span>Visit Live Site</span>
                      <svg class="w-3.5 h-3.5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </span>
                  </div>
                </a>

                <!-- Card Body -->
                <div class="p-4 sm:p-5 flex flex-col flex-grow justify-start space-y-2">
                  <a
                    [href]="project.liveUrl"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="font-bold text-slate-900 dark:text-white text-base leading-snug line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 transition-colors block"
                  >
                    {{ project.title }}
                  </a>

                  <p class="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                    {{ project.description }}
                  </p>
                </div>
              </div>
            }

          </div>
        </div>

      </div>
    </section>
  `,
})
export class ProjectsComponent implements AfterViewInit, OnDestroy {
  readonly portfolioService = inject(PortfolioService);
  readonly projects = this.portfolioService.projects;

  @ViewChild('scrollTrack', { static: false }) scrollTrackRef?: ElementRef<HTMLDivElement>;

  private animFrameId: number | null = null;
  private isPaused = false;
  private resumeTimeout: any = null;
  private readonly speed = 0.6; // Smooth gliding speed

  ngAfterViewInit(): void {
    this.startAutoScroll();
  }

  ngOnDestroy(): void {
    this.stopAutoScroll();
  }

  private startAutoScroll(): void {
    const step = () => {
      const el = this.scrollTrackRef?.nativeElement;
      if (el && !this.isPaused) {
        el.scrollLeft += this.speed;
        const halfWidth = el.scrollWidth / 2;
        if (halfWidth > 0 && el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      this.animFrameId = requestAnimationFrame(step);
    };
    this.animFrameId = requestAnimationFrame(step);
  }

  private stopAutoScroll(): void {
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = null;
    }
    if (this.resumeTimeout) {
      clearTimeout(this.resumeTimeout);
    }
  }

  pause(): void {
    this.isPaused = true;
  }

  resume(): void {
    if (this.resumeTimeout) clearTimeout(this.resumeTimeout);
    this.resumeTimeout = setTimeout(() => {
      this.isPaused = false;
    }, 800);
  }

  scrollPrev(): void {
    const el = this.scrollTrackRef?.nativeElement;
    if (!el) return;
    this.isPaused = true;
    const cardWidth = 345;
    const halfWidth = el.scrollWidth / 2;
    if (el.scrollLeft < cardWidth) {
      el.scrollLeft += halfWidth;
    }
    el.scrollBy({ left: -cardWidth, behavior: 'smooth' });

    if (this.resumeTimeout) clearTimeout(this.resumeTimeout);
    this.resumeTimeout = setTimeout(() => {
      this.isPaused = false;
    }, 3500);
  }

  scrollNext(): void {
    const el = this.scrollTrackRef?.nativeElement;
    if (!el) return;
    this.isPaused = true;
    const cardWidth = 345;
    const halfWidth = el.scrollWidth / 2;
    if (el.scrollLeft >= halfWidth) {
      el.scrollLeft -= halfWidth;
    }
    el.scrollBy({ left: cardWidth, behavior: 'smooth' });

    if (this.resumeTimeout) clearTimeout(this.resumeTimeout);
    this.resumeTimeout = setTimeout(() => {
      this.isPaused = false;
    }, 3500);
  }
}

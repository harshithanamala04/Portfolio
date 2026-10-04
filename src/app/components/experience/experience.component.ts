import { Component, inject, signal, HostListener, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';
import { Internship, Certification } from '../../models/portfolio.model';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.css',
})
export class ExperienceComponent implements AfterViewInit, OnDestroy {
  readonly portfolioService = inject(PortfolioService);
  readonly internships = this.portfolioService.internships;
  readonly certifications = this.portfolioService.certifications;

  readonly selectedModalCert = signal<{ title: string; issuer: string; previewUrl: string } | null>(null);

  @ViewChild('scrollTrack', { static: false }) scrollTrackRef?: ElementRef<HTMLDivElement>;

  private animFrameId: number | null = null;
  private isPaused = false;
  private resumeTimeout: any = null;
  private readonly speed = 0.6;

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

  @HostListener('window:keydown.escape')
  onEscape(): void {
    this.closeModal();
  }

  // --- Modal Click Handling ---
  openModal(cert: Certification): void {
    this.selectedModalCert.set({
      title: cert.title,
      issuer: cert.issuer,
      previewUrl: cert.previewUrl,
    });
  }

  openCertificatePreview(previewUrl: string, title: string, issuer: string): void {
    this.selectedModalCert.set({
      title,
      issuer,
      previewUrl,
    });
  }

  closeModal(): void {
    this.selectedModalCert.set(null);
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) {
      this.closeModal();
    }
  }
}

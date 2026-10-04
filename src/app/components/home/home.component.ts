import { Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly portfolioService = inject(PortfolioService);
  readonly profile = this.portfolioService.profile;

  readonly currentTypewriterText = signal('');

  private readonly phrases = [
    'Crafting Scalable Backends & Fluid Frontends.',
    'Building Reactive Interfaces with Angular Signals.',
    'Designing High-Throughput APIs & Robust Systems.',
  ];

  private phraseIndex = 0;
  private charIndex = 0;
  private isDeleting = false;
  private timerRef: any = null;

  ngOnInit(): void {
    this.typewriterStep();
  }

  ngOnDestroy(): void {
    if (this.timerRef) {
      clearTimeout(this.timerRef);
      this.timerRef = null;
    }
  }

  private typewriterStep(): void {
    const currentPhrase = this.phrases[this.phraseIndex];

    if (!this.isDeleting) {
      // Typing forward
      this.charIndex++;
      this.currentTypewriterText.set(currentPhrase.substring(0, this.charIndex));

      if (this.charIndex === currentPhrase.length) {
        // Finished typing full phrase, pause before deleting
        this.isDeleting = true;
        this.timerRef = setTimeout(() => this.typewriterStep(), 2400);
        return;
      }
      this.timerRef = setTimeout(() => this.typewriterStep(), 75);
    } else {
      // Deleting characters
      this.charIndex--;
      this.currentTypewriterText.set(currentPhrase.substring(0, this.charIndex));

      if (this.charIndex === 0) {
        // Cleared phrase, move to next and pause briefly
        this.isDeleting = false;
        this.phraseIndex = (this.phraseIndex + 1) % this.phrases.length;
        this.timerRef = setTimeout(() => this.typewriterStep(), 500);
        return;
      }
      this.timerRef = setTimeout(() => this.typewriterStep(), 35);
    }
  }

  scrollTo(event: Event, sectionId: string): void {
    event.preventDefault();
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      const navOffset = 75;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  }
}

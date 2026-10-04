import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  readonly portfolioService = inject(PortfolioService);
  readonly skillCategories = this.portfolioService.skillCategories;
  readonly education = this.portfolioService.education;
}

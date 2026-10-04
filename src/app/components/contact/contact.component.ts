import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PortfolioService } from '../../core/services/portfolio.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  readonly portfolioService = inject(PortfolioService);

  readonly email = 'harshithanamala04@gmail.com';
  readonly phone = '+91 9441283233';
  readonly github = 'https://github.com/harshithanamala04';
  readonly linkedin = 'https://www.linkedin.com/in/harshitha-namala-a0a482318';

  readonly emailCopied = signal(false);
  readonly phoneCopied = signal(false);
  readonly submitSuccess = signal(false);
  readonly isSubmitting = signal(false);

  readonly contactForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', [Validators.required, Validators.minLength(3)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  copyEmailToClipboard(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.email).then(() => {
        this.emailCopied.set(true);
        setTimeout(() => this.emailCopied.set(false), 2200);
      });
    }
  }

  copyPhoneToClipboard(): void {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(this.phone).then(() => {
        this.phoneCopied.set(true);
        setTimeout(() => this.phoneCopied.set(false), 2200);
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting.set(true);

    // Simulate reliable dispatch
    setTimeout(() => {
      this.isSubmitting.set(false);
      this.submitSuccess.set(true);
      this.contactForm.reset();
    }, 600);
  }

  resetFormState(): void {
    this.submitSuccess.set(false);
    this.contactForm.reset();
  }
}

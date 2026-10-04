import { Component, EventEmitter, Output, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-splash',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div
      (click)="finishSplash()"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center p-6 select-none transition-all duration-1000 bg-[#040711] text-white cursor-pointer overflow-hidden"
      [class.opacity-0]="isExiting()"
      [class.scale-105]="isExiting()"
      [class.blur-sm]="isExiting()"
      [class.pointer-events-none]="isExiting()"
    >
      <!-- Atmospheric Ambient Lighting Spheres -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div class="ambient-orb orb-1"></div>
        <div class="ambient-orb orb-2"></div>
        <div class="ambient-orb orb-3"></div>
        <div class="grid-overlay"></div>
      </div>

      <!-- Floating Ambient Star Dust -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        @for (star of stars; track star.id) {
          <div
            class="star"
            [style.left.%]="star.x"
            [style.top.%]="star.y"
            [style.width.px]="star.size"
            [style.height.px]="star.size"
            [style.animation-delay.s]="star.delay"
            [style.animation-duration.s]="star.duration"
          ></div>
        }
      </div>

      <!-- Center Container: Animated Name & Loading -->
      <div class="relative z-20 flex flex-col items-center justify-center text-center space-y-8 max-w-3xl w-full" (click)="$event.stopPropagation()">
        
        <!-- Animated Cascading Name Typography Container -->
        <div class="relative space-y-4 px-4">
          <!-- Ambient Halo Glow behind Name -->
          <div class="name-halo-glow"></div>

          <h1 class="relative z-10 text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none flex flex-wrap items-center justify-center gap-x-4 sm:gap-x-6 gap-y-2">
            
            <!-- First Word: NAMALA -->
            <span class="inline-flex relative name-word">
              @for (char of firstName; track $index) {
                <span
                  class="letter-wrapper"
                  [style.animation-delay]="($index * 75) + 'ms'"
                >
                  <span
                    class="letter-inner text-platinum"
                    [style.animation-delay]="(650 + $index * 120) + 'ms'"
                  >
                    {{ char }}
                  </span>
                </span>
              }
            </span>

            <!-- Second Word: HARSHITHA -->
            <span class="inline-flex relative name-word">
              @for (char of lastName; track $index) {
                <span
                  class="letter-wrapper"
                  [style.animation-delay]="((firstName.length + $index) * 75) + 'ms'"
                >
                  <span
                    class="letter-inner text-aurora"
                    [style.animation-delay]="(650 + (firstName.length + $index) * 120) + 'ms'"
                  >
                    {{ char }}
                  </span>
                </span>
              }
            </span>

          </h1>

          <!-- Expanding Light Streak Divider -->
          <div class="relative w-48 sm:w-72 h-[2px] mx-auto overflow-hidden rounded-full bg-slate-800/80 shadow-[0_0_12px_rgba(34,211,238,0.4)]">
            <div class="laser-streak"></div>
          </div>

          <!-- Subtitle with tracking expansion -->
          <p class="text-xs sm:text-sm font-mono tracking-[0.35em] uppercase text-cyan-300/85 animate-fade-in font-medium">
            Full Stack Developer
          </p>
        </div>

        <!-- Sleek Minimal Progress Bar -->
        <div class="w-64 sm:w-80 space-y-3 pt-3">
          <!-- Progress Bar Container -->
          <div class="relative w-full h-1.5 rounded-full bg-slate-900/90 border border-slate-700/60 overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.25)]">
            <div
              class="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-400 to-teal-300 transition-all duration-150 shadow-[0_0_12px_#22d3ee]"
              [style.width.%]="progress()"
            ></div>
          </div>

          <!-- Loading Readout -->
          <div class="flex items-center justify-between text-xs font-mono text-slate-400">
            <span class="tracking-widest flex items-center space-x-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping"></span>
              <span>Loading Experience</span>
            </span>
            <span class="font-bold text-cyan-400">{{ progress() }}%</span>
          </div>
        </div>

      </div>
    </div>
  `,
  styles: [`
    /* 3D Kinetic Letter Reveal Entrance */
    @keyframes letterEntrance {
      0% {
        opacity: 0;
        transform: translateY(50px) rotateX(-90deg) scale(0.6);
        filter: blur(14px);
      }
      65% {
        transform: translateY(-10px) rotateX(14deg) scale(1.08);
        filter: blur(0px);
      }
      85% {
        transform: translateY(3px) rotateX(-4deg) scale(0.98);
      }
      100% {
        opacity: 1;
        transform: translateY(0px) rotateX(0deg) scale(1);
        filter: blur(0px);
      }
    }

    .letter-wrapper {
      display: inline-block;
      perspective: 800px;
      opacity: 0;
      animation: letterEntrance 0.85s cubic-bezier(0.19, 1, 0.22, 1) forwards;
      transform-origin: center bottom;
    }

    /* Continuous Undulating Floating Wave for each letter */
    @keyframes letterFloatWave {
      0% {
        transform: translateY(0px) rotate(0deg);
      }
      50% {
        transform: translateY(-7px) rotate(1.5deg);
      }
      100% {
        transform: translateY(0px) rotate(0deg);
      }
    }

    .letter-inner {
      display: inline-block;
      animation: letterFloatWave 3.2s ease-in-out infinite alternate;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), filter 0.35s ease;
      cursor: pointer;
    }

    /* Interactive Magnetic Hover Bounce */
    .letter-inner:hover {
      transform: translateY(-12px) scale(1.22) rotate(-4deg) !important;
      filter: drop-shadow(0 0 25px rgba(34, 211, 238, 0.95)) drop-shadow(0 0 45px rgba(129, 140, 248, 0.8)) !important;
    }

    /* Platinum Metallic Crystalline Shimmer for "NAMALA" */
    @keyframes shimmerMetallic {
      0% {
        background-position: 250% 0;
      }
      100% {
        background-position: -250% 0;
      }
    }

    .text-platinum {
      background: linear-gradient(
        110deg,
        #ffffff 0%,
        #e2e8f0 25%,
        #38bdf8 45%,
        #ffffff 55%,
        #cbd5e1 75%,
        #ffffff 100%
      );
      background-size: 250% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: letterFloatWave 3.2s ease-in-out infinite alternate, shimmerMetallic 4s linear infinite;
      filter: drop-shadow(0 0 18px rgba(255, 255, 255, 0.35));
    }

    /* Aurora Flowing Multi-Stop Neon Gradient for "HARSHITHA" */
    @keyframes auroraShift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }

    .text-aurora {
      background: linear-gradient(
        135deg,
        #22d3ee 0%,
        #818cf8 25%,
        #c084fc 50%,
        #2dd4bf 75%,
        #22d3ee 100%
      );
      background-size: 300% 300%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: letterFloatWave 3.2s ease-in-out infinite alternate, auroraShift 5s ease-in-out infinite;
      filter: drop-shadow(0 0 24px rgba(34, 211, 238, 0.5));
    }

    /* Luminous Radial Halo Glow centered behind the Name */
    @keyframes haloPulse {
      0%, 100% {
        transform: scale(0.95);
        opacity: 0.5;
        filter: blur(45px);
      }
      50% {
        transform: scale(1.1);
        opacity: 0.85;
        filter: blur(60px);
      }
    }

    .name-halo-glow {
      position: absolute;
      inset: -20px -30px;
      pointer-events: none;
      border-radius: 9999px;
      background: radial-gradient(circle, rgba(34, 211, 238, 0.25) 0%, rgba(129, 140, 248, 0.2) 45%, transparent 75%);
      animation: haloPulse 4s ease-in-out infinite;
      z-index: 0;
    }

    /* Laser streak animation under the name */
    @keyframes laserSweep {
      0% {
        transform: translateX(-100%);
      }
      100% {
        transform: translateX(100%);
      }
    }

    .laser-streak {
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, #22d3ee, #818cf8, #2dd4bf, transparent);
      animation: laserSweep 2s ease-in-out infinite;
    }


    /* Ambient Lighting Orbs */
    .ambient-orb {
      position: absolute;
      border-radius: 50%;
      filter: blur(120px);
      pointer-events: none;
    }

    .orb-1 {
      top: 20%;
      left: 30%;
      width: 450px;
      height: 450px;
      background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
      animation: floatSlow 12s ease-in-out infinite alternate;
    }

    .orb-2 {
      bottom: 20%;
      right: 25%;
      width: 500px;
      height: 500px;
      background: radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, transparent 70%);
      animation: floatSlow 15s ease-in-out infinite alternate-reverse;
    }

    .orb-3 {
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(45, 212, 191, 0.08) 0%, transparent 70%);
    }

    @keyframes floatSlow {
      0% {
        transform: translateY(0px) scale(1);
      }
      100% {
        transform: translateY(-40px) scale(1.1);
      }
    }

    /* Subtle Background Grid Mesh */
    .grid-overlay {
      position: absolute;
      inset: 0;
      background-image: linear-gradient(to right, rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
      background-size: 40px 40px;
      mask-image: radial-gradient(ellipse at center, rgba(0, 0, 0, 0.7) 0%, transparent 80%);
    }

    /* Floating Ambient Star Dust */
    .star {
      position: absolute;
      border-radius: 50%;
      background: #a5f3fc;
      box-shadow: 0 0 6px #22d3ee;
      animation: starTwinkle linear infinite alternate;
    }

    @keyframes starTwinkle {
      0% {
        opacity: 0.15;
        transform: scale(0.6);
      }
      100% {
        opacity: 0.85;
        transform: scale(1.3);
      }
    }



    /* Fade-in for subtitle */
    .animate-fade-in {
      animation: fadeIn 1.2s ease-out 0.8s backwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `],
})
export class SplashComponent implements OnInit, OnDestroy {
  @Output() readonly complete = new EventEmitter<void>();

  readonly isExiting = signal(false);
  readonly progress = signal(0);

  readonly firstName = 'NAMALA'.split('');
  readonly lastName = 'HARSHITHA'.split('');

  // Randomized Ambient Stars
  readonly stars = Array.from({ length: 22 }, (_, i) => ({
    id: i,
    x: Math.floor(Math.random() * 96) + 2,
    y: Math.floor(Math.random() * 96) + 2,
    size: Math.floor(Math.random() * 3) + 1.5,
    delay: (Math.random() * 3).toFixed(2),
    duration: (Math.random() * 2 + 2).toFixed(2),
  }));

  private progressInterval: any;

  ngOnInit(): void {
    let p = 0;
    this.progressInterval = setInterval(() => {
      p += 2;
      this.progress.set(p);

      if (p >= 100) {
        clearInterval(this.progressInterval);
        setTimeout(() => {
          this.finishSplash();
        }, 400);
      }
    }, 38); // Smooth ~1.9s duration
  }

  ngOnDestroy(): void {
    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }
  }

  finishSplash(): void {
    if (this.isExiting()) return;
    this.isExiting.set(true);

    if (this.progressInterval) {
      clearInterval(this.progressInterval);
    }

    setTimeout(() => {
      this.complete.emit();
    }, 700);
  }
}

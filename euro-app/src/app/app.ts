import { Component } from '@angular/core';
import { CommonModule, KeyValue, KeyValuePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BreakdownService, Breakdown } from './breakdown.service';
import { calculateBreakdownFrontend, diffBreakdown } from './breakdown-logic';

type Mode = 'frontend' | 'backend';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule, KeyValuePipe],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class AppComponent {
  amount = '';
  mode: Mode = 'frontend';

  current: Breakdown | null = null;
  previous: Breakdown | null = null;
  diff: Breakdown | null = null;

  currentAmountLabel: string | null = null;
  previousAmountLabel: string | null = null;

  error: string | null = null;
  loading = false;

  constructor(private breakdownService: BreakdownService) {}

  compareDenominations = (
    a: KeyValue<string, number>,
    b: KeyValue<string, number>
  ): number => {
    return parseFloat(b.key) - parseFloat(a.key);
  };

  formatAmount(amount?: string | null): string {
    if (!amount) {
      return '';
    }
    return amount.replace('.', ',');
  }

  formatDenomination(denomination: string): string {
    return denomination.replace('.', ',');
  }

  onCalculate(): void {
    this.error = null;

    const displayAmount = this.amount.replace('.', ',').trim();

    if (this.mode === 'frontend') {
      try {
        const result = calculateBreakdownFrontend(this.amount);

        this.previous = this.current;
        this.previousAmountLabel = this.currentAmountLabel;

        this.current = result;
        this.currentAmountLabel = displayAmount;
        this.diff = diffBreakdown(this.current, this.previous);
      } catch (e: any) {
        this.error = e?.message ?? 'Fehler bei der Berechnung';
        this.current = null;
        this.diff = null;
      }
    } else {
      this.loading = true;

      this.breakdownService.calculateBackend(this.amount).subscribe({
        next: (res) => {
          this.previous = this.current;
          this.previousAmountLabel = this.currentAmountLabel;

          this.current = res;
          this.currentAmountLabel = displayAmount;
          this.diff = diffBreakdown(this.current!, this.previous);

          this.loading = false;
        },
        error: () => {
          this.error = 'Fehler beim Backend-Aufruf';
          this.current = null;
          this.diff = null;
          this.loading = false;
        },
      });
    }
  }
}

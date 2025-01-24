import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardAppearance, MatCardModule } from '@angular/material/card';

/**
 * A component representing a Material card with customizable content.
 *
 * @example
 * <core-card
 *   title="Card Title"
 *   subtitle="Card Subtitle"
 *   content="Card Content"
 *   image="path/to/image.jpg"
 *   [actions]="['Action 1', 'Action 2']"
 *   appearance="outlined"
 * ></core-card>
 *
 * @property {string} title - The main heading text of the card
 * @property {string} subtitle - The secondary heading text of the card
 * @property {string} content - The main content text of the card
 * @property {string} image - URL or path to the card's image
 * @property {string[]} actions - Array of action text to be displayed as buttons
 * @property {MatCardAppearance} appearance - The visual style of the card ('outlined' | 'raised')
 */
@Component({
  selector: 'app-core-card',
  templateUrl: './core-card.component.html',
  styleUrls: ['./core-card.component.scss'],
  imports: [
    MatCardModule,
    MatButtonModule,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true
})
export class CoreCardComponent {
  @Input() title!: string;
  @Input() subtitle!: string;
  @Input() content!: string;
  @Input() image!: string;
  @Input() actions!: string[];
  @Input() appearance!: MatCardAppearance;
  @Input() expanded = false;

  // Additional User interface properties
  @Input() cell?: string;
  @Input() gender?: string;
  @Input() dob?: { date: string; age: number };
  @Input() location?: {
    street: { number: number; name: string };
    city: string;
    state: string;
    country: string;
    postcode: number;
    timezone: { description: string };
  };
  @Input() registered?: { date: string; age: number };

  @Output() readonly actionClick = new EventEmitter<string>();

  onAction(value: string): void {
    this.actionClick.emit(value);
  }
}

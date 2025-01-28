import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardAppearance, MatCardModule } from '@angular/material/card';

/**
 * CoreCardComponent is a reusable card component that displays a title, subtitle, content, image, and actions.
 * It also supports additional user interface properties such as cell, gender, date of birth, location, and registration details.
 *
 * @property {string} title - The title of the card.
 * @property {string} subtitle - The subtitle of the card.
 * @property {string} content - The main content of the card.
 * @property {string} image - The URL of the image to display on the card.
 * @property {string[]} actions - The list of actions available on the card.
 * @property {MatCardAppearance} appearance - The appearance style of the card.
 * @property {boolean} expanded - Indicates whether the card is expanded or not.
 * @property {string} [cell] - The cell phone number associated with the card.
 * @property {string} [gender] - The gender associated with the card.
 * @property {{ date: string; age: number }} [dob] - The date of birth and age associated with the card.
 * @property {{ street: { number: number; name: string }; city: string; state: string; country: string; postcode: number; timezone: { description: string } }} [location] - The location details associated with the card.
 * @property {{ date: string; age: number }} [registered] - The registration date and age associated with the card.
 *
 * @event actionClick - Emits an event when an action is clicked, passing the action value as a string.
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

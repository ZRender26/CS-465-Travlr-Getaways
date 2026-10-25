
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Trip } from '../../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: false,
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  @Input() trip!: Trip;

  @Output() edit = new EventEmitter<Trip>();
  @Output() delete = new EventEmitter<string>();

  editTrip(): void {
    this.edit.emit(this.trip);
  }

  deleteTrip(): void {
    if (confirm(`Are you sure you want to delete ${this.trip.name}?`)) {
      this.delete.emit(this.trip.code);
    }
  }
}


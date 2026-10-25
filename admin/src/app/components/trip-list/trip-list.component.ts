
import { Component, OnInit } from '@angular/core';
import { Trip } from '../../models/trip';
import { TripService } from '../../services/trip.service';

@Component({
  selector: 'app-trip-list',
  standalone: false,
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css']
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];
  errorMessage = '';
  showForm = false;
  editingTrip: Trip | null = null;

  newTrip: Trip = this.emptyTrip();

  constructor(private tripService: TripService) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  emptyTrip(): Trip {
    return {
      code: '',
      name: '',
      length: '',
      start: '',
      resort: '',
      perPerson: 0,
      image: '',
      description: ''
    };
  }

  loadTrips(): void {
    this.tripService.getTrips().subscribe({
      next: (trips: Trip[]) => {
        this.trips = trips;
        this.errorMessage = '';
      },
      error: (error: unknown) => {
        console.error('Error loading trips:', error);
        this.errorMessage = 'Could not load trips. Make sure the backend server is running.';
      }
    });
  }

  addTrip(): void {
    this.editingTrip = null;
    this.newTrip = this.emptyTrip();
    this.showForm = true;
  }

  editTrip(trip: Trip): void {
    this.editingTrip = trip;
    this.newTrip = { ...trip };
    this.showForm = true;
  }

  saveTrip(): void {
    if (this.editingTrip) {
      this.tripService.updateTrip(this.editingTrip.code, this.newTrip).subscribe({
        next: () => {
          this.cancelForm();
          this.loadTrips();
        },
        error: (error: unknown) => {
          console.error('Error updating trip:', error);
          this.errorMessage = 'Could not update the trip.';
        }
      });
    } else {
      this.tripService.addTrip(this.newTrip).subscribe({
        next: () => {
          this.cancelForm();
          this.loadTrips();
        },
        error: (error: unknown) => {
          console.error('Error adding trip:', error);
          this.errorMessage = 'Could not add the trip. Check that the trip code is unique and all fields are valid.';
        }
      });
    }
  }

  deleteTrip(code: string): void {
    this.tripService.deleteTrip(code).subscribe({
      next: () => this.loadTrips(),
      error: (error: unknown) => {
        console.error('Error deleting trip:', error);
        this.errorMessage = 'Could not delete the trip.';
      }
    });
  }

  cancelForm(): void {
    this.showForm = false;
    this.editingTrip = null;
    this.newTrip = this.emptyTrip();
    this.errorMessage = '';
  }
}



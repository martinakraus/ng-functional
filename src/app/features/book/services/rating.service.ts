import { Injectable } from '@angular/core';
import { BehaviorSubject } from "rxjs";
import { Rating } from "../models/rating";

@Injectable({
    providedIn: 'root'
})
export class RatingService {
    private bookRatings = new BehaviorSubject<Rating[]>([ { id: '0', rating: 0 } ]);
    bookRatings$ = this.bookRatings.asObservable();

    setRating(ratings: Rating[]) {
        this.bookRatings.next(ratings);
    }
}

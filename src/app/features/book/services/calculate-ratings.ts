import { Rating } from "../models/rating";
import { inject } from "@angular/core";
import { RatingService } from "./rating.service";
import { map, Observable, take, tap } from "rxjs";

export const setRating = (newRating: Rating): Observable<Rating[]> =>
    inject(RatingService).bookRatings$.pipe(
        take(1),
        tap(currentRatings => {
            if (!currentRatings) {
                inject(RatingService).setRating([ newRating ]);
            } else {
                const currentRating = currentRatings.find(rating => rating.id === newRating.id) ?? {};
                const updatedRating = { ...currentRating, ...newRating };
                inject(RatingService).setRating([ ...currentRatings, updatedRating ]);
            }
        }));


export const rating = (id: string): Observable<Rating | undefined> =>
    inject(RatingService).bookRatings$.pipe(
        map((currentRatings: Rating[]) => {
            const currentRating = currentRatings.find(rating => rating.id === id)
            return currentRating ? currentRating : { id, rating: 0 }
        }),
    )

import { Component, EnvironmentInjector, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../models/book';
import { PrefixPipe } from '../pipes/prefix.pipe';
import { rating, setRating } from "../services/calculate-ratings";
import { Rating } from "../models/rating";
import { Observable } from "rxjs";
import { MatButtonModule } from "@angular/material/button";
import { AsyncPipe, DatePipe, NgIf } from "@angular/common";

@Component({
    selector: 'app-book-card',
    templateUrl: './book-card.component.html',
    standalone: true,
    imports: [ PrefixPipe, MatButtonModule, AsyncPipe, DatePipe, NgIf ],
    styleUrls: [ './book-card.component.scss' ],
})
export class BookCardComponent implements OnInit {
    @Input() content!: Book;
    @Output() detailClick = new EventEmitter<Book>();

    currentRating$!: Observable<Rating | undefined>;

    constructor(private injector: EnvironmentInjector) {
    }

    ngOnInit() {
        this.injector.runInContext(() => {
            this.currentRating$ = rating(this.content.id);
        })
    }

    setRating(currentRating: Rating) {
        this.injector.runInContext(() => {
            setRating({
                id: currentRating.id,
                rating: currentRating.rating++
            }).subscribe()
        })
    };

    handleDetailClick() {
        this.detailClick.emit(this.content);
    }
}

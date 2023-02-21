import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Book } from '../models/book';
import { PrefixPipe } from '../pipes/prefix.pipe';
import { Rating } from "../models/rating";
import { Observable, of } from "rxjs";
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

    constructor() {
    }

    ngOnInit() {
        this.currentRating$ = of({ id: this.content.id, rating: 0 })
    }

    setRating(currentRating: Rating) {
        // ToDo call setRating function
    };

    handleDetailClick() {
        this.detailClick.emit(this.content);
    }
}

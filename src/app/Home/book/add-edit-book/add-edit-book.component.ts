import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {NgForOf, NgIf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {GenreService} from "../../../services/genre/genre.service";
import {IAuthorResponse, IGenreResponse, PaginationInput} from "../../../models/auth.model";
import {AuthorService} from "../../../services/author/author.service";
import {BookService} from "../../../services/Book/book.service";


@Component({
    selector: 'app-add-edit-book',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormField,
        MatSelect,
        MatOption,
        MatLabel,
        MatInputModule,
        NgForOf,
        MatButton,
        NgIf
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {appearance: 'fill'},
        },
    ],
    templateUrl: './add-edit-book.component.html',
    styleUrl: './add-edit-book.component.css'
})
export class AddEditBookComponent implements OnInit {
    authors: string[] = [];
    genres: string[] = [];
    genresResponse: IGenreResponse[] = [];
    authorResponse: IAuthorResponse[] = [];
    form: FormGroup;
    updateBook: boolean = false;
    currentBookId: number;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private ref: MatDialogRef<AddEditBookComponent>,
        private fb: FormBuilder,
        private genreService: GenreService,
        private authorService: AuthorService,
        private bookService: BookService
    ) {
        this.updateBook = data.book !== null;
        this.currentBookId = data.book ? data.book.id : null;
        this.form = this.fb.group({
            title: [data.book ? data.book.title : '', Validators.required],
            publicationYear: [data.book ? data.book.publicationYear : '', [Validators.required, Validators.pattern(/^[1-9]\d*$/), Validators.min(1500)]],
            copiesAvailable: [data.book ? data.book.copiesAvailable : '', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
            authorId: [data.book ? data.book.author.id : '', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
            genreIds: [data.book ? data.book.genres.map(genre => genre.id) : '', Validators.required]
        });
    }


    ngOnInit(){
        this.fetchGenres();
        this.fetchAuthors();
    }


    closepopup() {
        this.ref.close();
    }

    getPaginationInput() {
        const paginationInput = {
            sortingField: 'id',
            pageNo: 0,
            pageSize: 30,
        } as PaginationInput;

        return paginationInput;
    }

    onSubmit() {
        if(this.updateBook) {
            this.bookService.updateBook(this.currentBookId, this.form.value).subscribe({
                next: (res) => {
                    this.bookService.loadBook.next(true);
                }
            });
            this.ref.close();
            return;
        }
        this.bookService.saveBook(this.form.value).subscribe({
            next: () => {
                this.bookService.loadBook.next(true);
                this.ref.close();
            }
        });

    }

    private fetchGenres() {
        this.genreService.fetchGenres(this.getPaginationInput()).subscribe({
            next: (res) => {
                this.genresResponse = res;
                this.genres = res.map(genre => genre.name);
            },
            error: (err) => {
                this.genres = [];
            }
        })
    }

    private fetchAuthors() {
        this.authorService.fetchAuthors(this.getPaginationInput()).subscribe({
            next: (res) => {
                this.authorResponse = res;
                this.authors = res.map((author: IAuthorResponse): string => `${author.firstName} ${author.lastName}`);
            },
            error: (res) => {
                this.authors = [];
            }
        })
    }

}

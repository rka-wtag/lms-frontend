import {Component, inject, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BookService} from "../../../services/Book/book.service";
import {IBookResponse, PaginationInput} from "../../../models/auth.model";
import {NgForOf, NgIf} from "@angular/common";
import {SidebarComponent} from "../../sidebar/sidebar.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatFabButton, MatIconButton} from "@angular/material/button";
import {MatDialog, MatDialogContent, MatDialogModule} from "@angular/material/dialog";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatCheckbox} from "@angular/material/checkbox";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {AddEditBookComponent} from "../add-edit-book/add-edit-book.component";
import {MatTooltip} from "@angular/material/tooltip";
import {HttpErrorResponse} from "@angular/common/http";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
    selector: 'app-show-books',
    standalone: true,
    imports: [
        NgForOf,
        SidebarComponent,
        MatIcon,
        MatIconButton,
        MatButton,
        FormsModule,
        MatCheckbox,
        MatDialogContent,
        MatFormField,
        MatLabel,
        ReactiveFormsModule,
        MatDialogModule,
        MatFabButton,
        MatTooltip,
        MatPaginator,
        NgIf
    ],
    templateUrl: './show-books.component.html',
    styleUrl: './show-books.component.css'
})
export class ShowBooksComponent implements OnInit {
    public books: IBookResponse[] = [];
    public genres: String;
    public hasBooks = true;
    public genresMap: Map<number, String> = new Map<number, String>();

    public sortBy: string = 'id'
    public itemPerPage: number = 10;
    public currentPage: number = 0;
    public pageSizeOptions = [5, 10, 20];
    public length = 50;
    pageEvent: PageEvent;

    constructor(private bookService: BookService, public dialog: MatDialog) {
    }

    getPaginationInput() {
        const paginationInput = {
            sortingField: this.sortBy,
            pageNo: this.currentPage,
            pageSize: this.itemPerPage,
        } as PaginationInput;

        return paginationInput;
    }

    handlePageEvent(e: PageEvent) {
        this.pageEvent = e;
        this.length = e.length;
        this.itemPerPage = e.pageSize;
        this.currentPage = e.pageIndex;
        this.fetchBooks(this.getPaginationInput());
    }

    ngOnInit(): void {
        this.fetchBooks(this.getPaginationInput());
        this.bookService.loadBook.subscribe({
            next: (val) => {
                if (val) {
                    this.fetchBooks(this.getPaginationInput());
                }
            }
        })
    }

    fetchBooks(paginationInput: PaginationInput): void {
        this.bookService.fetchBooks(paginationInput).subscribe({
            next: (res) => {
                this.fetchBooksAlternate();
                this.books = [];
                this.hasBooks = true;
                res.forEach(book => {
                    this.books.push(book);
                    this.genresMap.set(book.id, book.genres.map(genre => genre.name).join(', '));
                })
            },
            error: (err) => {
                if (err.status === 404) {
                    this.hasBooks = false;
                    this.books = [];
                }
            }
        })
    }

    fetchBooksAlternate(): void {
        this.bookService.fetchBooksAlternate().subscribe({
            next: (res) => {
                this.length = res;
            },
            error: (err) => {
                this.books = [];
            }
        })
    }


    openEditBookDialog(id: number) {
        this.bookService.fetchBook(id).subscribe({
            next: (res: IBookResponse) => {
                this.dialog.open(AddEditBookComponent, {
                    data: {
                        book: res
                    }
                });
            }
        })
    }

    deleteBook(id: number) {
        if (confirm(`Please confirm to delete`)) {
            this.bookService.deleteBook(id).subscribe({
                next: () => {
                    this.fetchBooks(this.getPaginationInput());
                },
                error: (err: HttpErrorResponse) => {
                    this.errorHandler(err);
                }
            })
        }
    }

    issueBook(id: number) {
        if (confirm('Please confirm to Borrow book')) {
            this.bookService.issueBook(id).subscribe({
                next: () => {
                    this.fetchBooks(this.getPaginationInput());
                },
                error: (err) => {
                    if (err.status === 400) {
                        alert(`Cannot issue book! ${err.error.errorMessage}`);
                    }
                }
            })

        }
    }

    errorHandler(err: HttpErrorResponse) {
        if (err.error.errorMessage) {
            alert(err.error.errorMessage);
        }
    }

}

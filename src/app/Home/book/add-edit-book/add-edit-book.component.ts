import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatOption, MatSelect} from "@angular/material/select";
import {MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {NgForOf} from "@angular/common";
import {MatButton} from "@angular/material/button";
import {IGenreResponse} from "../../../models/auth.model";
import {regexPattern} from "../../../constants/constants";

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
        MatButton
    ],
    providers: [
        {
            provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
            useValue: {appearance: 'fill'}, // Set your desired default options here
        },
    ],
    templateUrl: './add-edit-book.component.html',
    styleUrl: './add-edit-book.component.css'
})
export class AddEditBookComponent {
    authors = ['Author1', 'Author2', 'Author3'];
    genres = ['genre1', 'genre2'];
    genresResponse: IGenreResponse[] = [];
    form: FormGroup;

    constructor(private ref: MatDialogRef<AddEditBookComponent>, private fb: FormBuilder) {
        this.form = this.fb.group({
            bookName: ['', Validators.required],
            publicationYear: ['', Validators.required],
            copiesAvailable: ['', [Validators.required, regexPattern.number]],
            author: ['', Validators.required],
            genre: ['', Validators.required],
        });
    }

    closepopup() {
        this.ref.close('Closed using function');
    }

    onSubmit() {
        this.ref.close();
    }

}


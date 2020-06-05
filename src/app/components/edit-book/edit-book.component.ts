import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { UploadImageServiceService } from 'src/app/services/upload-image-service.service';
import { Params, Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  private bookId: number;
  private book: Book = new Book();
  private bookUpdated: boolean;

  constructor(
    private bookService: BookService,
    private uploadImageService: UploadImageServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      this.bookId = Number.parseInt(params['id']);
    })

    this.bookService.getBookById(this.bookId).subscribe(
      res => {
        this.book = res;
      },
      error => {
        console.log(error);
      }
    )
  }


  onSubmit()
  {
    this.bookService.editBook(this.book).subscribe(
      res =>
      {
        this.uploadImageService.modify(res.id);
        this.bookUpdated=true
      },
      error =>{
        console.log(error);
      }
    )
  }
}

import { OnInit, Component } from '@angular/core';
import { Book } from 'src/app/models/book';
import { Router } from '@angular/router';
import { error } from 'protractor';
import { BookService } from 'src/app/services/book.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

  private selectedBook:Book;
  private checked: boolean;
  private bookList: any;
  private allChecked:boolean;
  private removeBookList:Book[]=new Array();

  constructor(
    private bookService:BookService,
    private router:Router,
    public dialog:MatDialog,
  ) { }

    onSelect(book:Book)
    {
      this.selectedBook=book;
      this.router.navigate(['/viewBook',this.selectedBook.id]);
    }

    openDialog(book:Book) {
      let dialogRef = this.dialog.open(DialogResultExampleDialog);
      dialogRef.afterClosed().subscribe(
        result => {
          console.log(result);
          if(result=="yes") {
            this.bookService.deleteBookById(book.id).subscribe(
              res => {
                console.log(res);
                this.getBookList();
                // location.reload();
              }, 
              err => {
                console.log(err);
              }
              );
          }
        }
        );
    }

  getBookList()
  {
    this.bookService.getBookList().subscribe(
      res =>
      {
        console.log(res);
        this.bookList=res;
        
      },
      error =>
      {
        console.log(error);
      }
    )
  }
  ngOnInit() {
    this.getBookList();
  }

}

@Component({
  selector:'dialog-result-example-dialog',
  templateUrl:'./dialog-result-example-dialog.html'
})
export class DialogResultExampleDialog
{
  constructor(public dialogRef: MatDialogRef<DialogResultExampleDialog>)
  {

  }
}

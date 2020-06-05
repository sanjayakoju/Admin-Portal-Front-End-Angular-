import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { BookService } from 'src/app/services/book.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { error } from 'protractor';

@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.css']
})
export class ViewBookComponent implements OnInit {

  private book:Book=new Book();
  private boodId:number;

  constructor(
    private bookService:BookService,
    private router:Router,
    private route:ActivatedRoute
  ) { }

  onSelect(book)
  {
    this.router.navigate(['/editBook',this.book.id]);
  }

  ngOnInit() {
    this.route.params.forEach((params:Params) =>
    {
      this.boodId=Number.parseInt(params['id']);
    })

    this.bookService.getBookById(this.boodId).subscribe(
      res =>
      {
        this.book=res;
      },
      error =>
      {
        console.log(error);
      }
    )
  }

}

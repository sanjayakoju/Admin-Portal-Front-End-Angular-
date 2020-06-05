import { Component, OnInit } from '@angular/core';
import { Book } from 'src/app/models/book';
import { UploadImageServiceService } from 'src/app/services/upload-image-service.service';
import { BookService } from 'src/app/services/book.service';

@Component({
  selector: 'app-add-new-book',
  templateUrl: './add-new-book.component.html',
  styleUrls: ['./add-new-book.component.css']
})
export class AddNewBookComponent implements OnInit {

  private newBook: Book=new Book();
  private bookAdded:boolean;
  constructor(
	  private bookService:BookService, 
	  private uploadImageService:UploadImageServiceService) { }

  onSubmit() {
  	this.bookService.sendBook(this.newBook).subscribe(
  		res => {
        
  			this.uploadImageService.upload(res.id);
  			this.bookAdded=true;
  			this.newBook = new Book();
  			this.newBook.active=true;
  			this.newBook.category="Management";
  			this.newBook.language="english";
  			this.newBook.format="paperback";
  		},
  		error => {
  			console.log(error);
  		}
  	);
  }

  ngOnInit() {
    this.bookAdded=false;
  	this.newBook.active=true;
  	this.newBook.category="Management";
  	this.newBook.language="english";
  	this.newBook.format="paperback";
  }

}

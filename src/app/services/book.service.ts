import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {


  constructor(private http: HttpClient) { }

  // sendBook(book:Book) {
  // 	let url = "http://localhost:8080/book/add";

  //   let headers = new Headers ({
  //     'Content-Type': 'application/json',
  //     'x-auth-token' : localStorage.getItem('xAuthToken')
  //   });

  //   return this.http.post(url, JSON.stringify(book),{headers:headers});
  // }

  sendBook(book: Book) {
    let url = "http://localhost:8080/book/add";
    return this.http.post<{ id: number }>(url, book);
  }

  getBookList() {
    let url = 'http://localhost:8080/book/bookList';
    return this.http.get<Book>(url);
  }

  getBookById(id:number)
  {
    let url = 'http://localhost:8080/book/'+id;
    return this.http.get<Book>(url);
  }

  editBook(book:Book)
  {
    let url = "http://localhost:8080/book/update";
    return this.http.post<{ id: number }>(url,book);
  }

  deleteBookById(id:number)
  {
    let url = "http://localhost:8080/book/delete/";
    return this.http.delete(url+id);
  }
}

import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookShelf from './BookShelf';
import SearchBooks from './SearchBooks';
import {Link,Route} from 'react-router-dom';

class BooksApp extends React.Component {

componentDidMount() {
 this.GetMyBooks();      
};

/**
 * @description get all books on the shelfs then updates the componenet state.
 */
GetMyBooks(){
 BooksAPI.getAll()
 .then((result)=>{
   this.setState({books:result});
  });
}

state = {
 books:[],
};

/**
 * @description this method will be called by the book component to add new book to a shelf or to change the current shelf of a book
 * @param {*} bookId the book id
 * @param {*} shelf the new shelf
 */
ChangeShelf=(bookId,shelf)=>{
 const newBookList=[...this.state.books];
 const index=newBookList.findIndex((b)=>b.id===bookId);
 if (index===-1){
  BooksAPI.get(bookId)
   .then(book=>{
     book.shelf=shelf
     BooksAPI.update({id:bookId},shelf)
     .then(()=>{
       newBookList.push(book)
       this.setState({books:newBookList})
     });
    });
  }
  else{
   BooksAPI.update({id:bookId},shelf)
   .then((result)=>{
     newBookList[index].shelf=shelf;
     this.setState({books:newBookList});
   });
  };
 };

  render() {
    return (
     <div className="app">
        <Route exact path='/Search' render={()=> (
            <SearchBooks move={this.ChangeShelf} books={this.state.books}/> 
         )}/>
        <Route exact path='/' render={()=> (
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <BookShelf title="Currently Reading" move={this.ChangeShelf} books={this.state.books.filter(book=>book.shelf==="currentlyReading")}/>
                <BookShelf title="Want to Read" move={this.ChangeShelf} books={this.state.books.filter(book=>book.shelf==="wantToRead")}/>
                <BookShelf title="Read" move={this.ChangeShelf} books={this.state.books.filter(book=>book.shelf==="read")}/>
              </div>
            </div>
            <div className="open-search">
             <Link to='/Search'>
              <button >Add a book</button>
             </Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
};

export default BooksApp;

import React from 'react';
import Book from './Book';

const BookShelf=(props)=>{
return(
 <div className="bookshelf">
    <h2 className="bookshelf-title">{props.title}</h2>
  <div className="bookshelf-books">
    <ol className="books-grid">
      {props.books.map(book=>
        <li key={book.id}>
          <Book move={props.move} bookId={book.id} shelf={book.shelf} title={book.title} authors={book.authors} image={book.imageLinks.thumbnail}/>
        </li>
      )}               
    </ol>
  </div>
 </div>
);
}


export default BookShelf;
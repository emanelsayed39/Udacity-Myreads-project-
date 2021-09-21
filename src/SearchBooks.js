import React,{useState} from 'react';
import Book from './Book';
import * as BooksAPI from './BooksAPI';
import {Link} from 'react-router-dom';

const SearchBooks=(props)=>{

 const [searchResult,SetSearchResult]=useState([]);
 const [resultCount,SetResultCount]=useState(-1);

 /**
  * @description handle the text change event of the search text book ,it sends a search request to the book API with search query
  * @param e the text change event argument
  */
const Search=(e)=>{
 if (e.keyCode === 13 & e.target.value !=="") {       
  BooksAPI.search(e.target.value).then((result)=>{
   if(!result.error) {
    result.map(book=> {
     const index= props.books.findIndex(b=>b.id===book.id);
     if (index !== -1) {
      book.shelf=props.books[index].shelf;          
     }
     else {
      book.shelf="none"; 
     }
    //return true;
    }) 
    SetSearchResult(result);
    SetResultCount(result.length);               
   }
   else{
    SetResultCount(0);
   // return false;
   }
  })
 }
 else{
  SetResultCount(-1);
 // return false;
 }
 return true;
};  

/**
 * @description add a new book to the shelf by calling move in the app component  then update the search result list of the serach component
 * @param {*} bookId new book id
 * @param {*} shelf  the target shelf
 */
const AddToShelf=(bookId,shelf)=>{
 const result=[...searchResult];
 const index=result.findIndex(b=>b.id===bookId);
 result[index].shelf=shelf;
 props.move(bookId,shelf);
 SetSearchResult(result);
}

 return(
  <div className="search-books">
   <div className="search-books-bar">
    <Link to='/'>
     <button className="close-search" >Close</button>
    </Link>
   <div className="search-books-input-wrapper">
     {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
    <input type="text" placeholder="Search by title or author and press enter" onKeyUp={(e)=>Search(e)}/>       
   </div>
  </div>
  <div className="search-books-results">
   {(resultCount > 0 && 
    <ol className="books-grid">{
        searchResult.map(book=>
         <li key={book.id}>
          <Book move={AddToShelf} bookId={book.id} shelf={book.shelf} title={book.title} authors={book.authors} image={book.imageLinks && book.imageLinks.thumbnail}/>
         </li>
    )}</ol>
   ) || (resultCount===0 && <em>No matching books found .</em>)  }
  </div>
 </div> 
 );
}

export default SearchBooks;
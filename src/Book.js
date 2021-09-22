import React from 'react'

const Book=(props)=>{
   const move= (val)=>{
      props.move(props.bookId,val)
    }

    return(
    <div className="book">
    <div className="book-top">
      <div className="book-cover" style={{ width: 128, height: 193, 
        backgroundImage: `url(${props.image})` }}></div>
      <div className="book-shelf-changer">
        <select onChange={(e)=>move(e.target.value)}>
          <option value="move" disabled>Move to...</option>
          <option value="currentlyReading"   selected={props.shelf==="currentlyReading"} > {props.shelf==="currentlyReading" && '\u2713'} Currently Reading</option>
          <option value="wantToRead" selected={props.shelf==="wantToRead"}>{props.shelf==="wantToRead" && '\u2713'} Want to Read</option>
          <option value="read" selected={props.shelf==="read"}>{props.shelf==="read" && '\u2713'}Read</option>
          <option value="none" selected={props.shelf==="none"}> None</option>
        </select>
      </div>
    </div>
    
    <div className="book-title">{props.title}</div>
    <div className="book-authors">{props.authors.join(' & ')}</div>
  </div>
);

}


export default Book;
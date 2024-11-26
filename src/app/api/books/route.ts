import { NextResponse, NextRequest } from "next/server"


type Books = {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  language: string;
  available: boolean;
};


const books: Books[] = [
  { id: 1, title: "Harry Potter and the Philosopher's Stone", author: "J.K. Rowling", year: 1997, available: true, language: "English", genre: "Fantasy" },
  { id: 3, title: "Harry Potter and the Prisoner of Azkaban", author: "J.K. Rowling", year: 1999, available: true, language: "English", genre: "Fantasy" },
  { id: 4, title: "Harry Potter and the Goblet of Fire", author: "J.K. Rowling", year: 2000, available: true, language: "English", genre: "Fantasy" },
  { id: 5, title: "Harry Potter and the Order of the Phoenix", author: "J.K. Rowling", year: 2003, available: true, language: "English", genre: "Fantasy" },
  { id: 6, title: "Harry Potter and the Half-Blood Prince", author: "J.K. Rowling", year: 2005, available: true, language: "English", genre: "Fantasy" },
  { id: 7, title: "Harry Potter and the Deathly Hallows", author: "J.K. Rowling", year: 2007, available: true, language: "English", genre: "Fantasy" },
];

// GET handler to fetch books
export async function GET() {
  try {
    return NextResponse.json(books, { status: 200 });
  } catch (error) {
    console.error("Error fetching books:", error);
    return NextResponse.json({ message: "Error fetching books" }, { status: 500 });
  }
}

// POST handler to add a new book
export async function POST(request: NextRequest) {
  try {
    const newBook: Books = await request.json();
    const newId = books.length ? Math.max(...books.map(b => b.id)) + 1 : 1;
    
   
    const book = { ...newBook, id: newId };  

    books.push(book); 
    return NextResponse.json(book, { status: 201 });
  } catch (error) {
    console.error("Error adding book:", error);
    return NextResponse.json({ message: "Error occurred while adding the book" }, { status: 500 });
  }
}


// PUT handler to update an existing book
export async function PUT(request: NextRequest) {
  try {
    const { id, title, author, available, year, genre, language }: Books = await request.json();
    const index = books.findIndex(b => b.id === id); // Find the book by ID
    if (index === -1) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    
    books[index] = { id, title, author, available, year, genre, language };
    return NextResponse.json(books[index], { status: 200 });
  } catch (error) {
    console.error("Error updating book:", error);
    return NextResponse.json({ message: "Can't update book" }, { status: 500 });
  }
}

// DELETE handler to remove a book
export async function DELETE(request: NextRequest) {
  try {
    const { id }: { id: number } = await request.json();
    const index = books.findIndex(b => b.id === id); // Find the book by ID
    if (index === -1) {
      return NextResponse.json({ message: "Book not found" }, { status: 404 });
    }

    // Remove the book from the array
    books.splice(index, 1);
    return NextResponse.json({ message: "Book deleted" }, { status: 200 });
  } catch (error) {
    console.error("Error deleting book:", error);
    return NextResponse.json({ message: "Can't delete book" }, { status: 500 });
  }
}

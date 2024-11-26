
// import { NextRequest, NextResponse } from 'next/server';

// let books = [
//   { id: 1, title: 'Harry Potter and the Philosopher\'s Stone', author: 'J.K. Rowling', year: 1997, available: true, language: 'English', genre: 'Fantasy' },
//   { id: 2, title: 'Harry Potter and the Chamber of Secrets', author: 'J.K. Rowling', year: 1998, available: true, language: 'English', genre: 'Fantasy' },
  
// ];


// export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const id = parseInt(params.id);
//     const updatedBook = await req.json();

//     if (!updatedBook.title || !updatedBook.author || !updatedBook.year || !updatedBook.language || !updatedBook.genre) {
//       return NextResponse.json({ message: "All fields (title, author, year, language, genre) are required" }, { status: 400 });
//     }


//     const bookIndex = books.findIndex(book => book.id === id);

//     if (bookIndex === -1) {
//       return NextResponse.json({ message: "Book not found" }, { status: 404 });
//     }

//     books[bookIndex] = { id, ...updatedBook };

   
//     return NextResponse.json(books[bookIndex], { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to update book" }, { status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
//   try {
//     const id = parseInt(params.id);

//     const bookIndex = books.findIndex(book => book.id === id);

//     if (bookIndex === -1) {
//       return NextResponse.json({ message: "Book not found" }, { status: 404 });
//     }

   
//     books.splice(bookIndex, 1);

//     return NextResponse.json({ message: "Book deleted successfully" }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ message: "Failed to delete book" }, { status: 500 });
//   }
// }
import { NextRequest, NextResponse } from 'next/server';
interface Book {
  id: number;
  title: string;
  author: string;
  year: number;
  genre: string;
  language: string;
  available: boolean;
}
const books: Book[] = [];  // This should be replaced with your actual database logic.

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  const bookId = parseInt(params.id);

  const book = books.find(b => b.id === bookId);
  
  if (!book) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  return NextResponse.json(book);
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const bookId = parseInt(params.id);
  const updatedData = await req.json();

  const bookIndex = books.findIndex(b => b.id === bookId);
  
  if (bookIndex === -1) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  const updatedBook = { ...books[bookIndex], ...updatedData };
  books[bookIndex] = updatedBook;

  return NextResponse.json(updatedBook);
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const bookId = parseInt(params.id);
  
  const bookIndex = books.findIndex(b => b.id === bookId);
  if (bookIndex === -1) {
    return NextResponse.json({ message: 'Book not found' }, { status: 404 });
  }

  books.splice(bookIndex, 1);

  return NextResponse.json({ message: 'Book deleted' }, { status: 200 });
}

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
const books: Book[] = [];  

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

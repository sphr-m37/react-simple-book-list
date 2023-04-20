import React, { useState, useEffect } from 'react'

import { Book } from './Book'

import swal from 'sweetalert'

export const AddForm = () => {


    const [books, setBooks] = useState([])

    useEffect(() => {
        setBooks(JSON.parse(localStorage.getItem('books')) || [])
    }, [])

    const [values, setValues] = useState({
        title: "",
        author: "",
        year: ""
    })

    const disableSubmitBtn = () => {
        return (
            values.title.trim() !== "" &&
            values.author.trim() !== "" &&
            values.year.trim() !== ""
        )
    }

    const onchangeHandle = e => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const submitHandle = e => {
        e.preventDefault()
        const newBook = { id: books.length + 1, ...values }
        setBooks([...books, newBook])
        setValues({
            title: "",
            author: "",
            year: ""
        })

        if (localStorage.getItem('books')) {
            const oldBooks = JSON.parse(localStorage.getItem('books'))
            const newBooks = [...oldBooks, newBook]
            localStorage.setItem('books', JSON.stringify(newBooks))

        } else {
            localStorage.setItem('books', JSON.stringify([...books, newBook]))
        }

    }
    const clearBookList = () => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to clear book list?",
            icon: "warning",
            buttons: ["cancel", "delete"]
        })
            .then(willDelete => {
                if (willDelete) {
                    localStorage.setItem('books', JSON.stringify([]))
                    swal("Deleted!", "Your book list has been cleared!", "success");
                    setBooks([])
                }
            });
    }

    const removeBook = id => {
        swal({
            title: "Are you sure?",
            text: "Are you sure that you want to delete this book?",
            icon: "warning",
            buttons: ["cancel", "delete"]
        })
            .then(willDelete => {
                if (willDelete) {
                    const oldBooks = JSON.parse(localStorage.getItem('books'))
                    const newBooks = oldBooks.filter(book => book.id !== id)
                    localStorage.setItem('books', JSON.stringify(newBooks))
                    swal("Deleted!", "Your selected book has been deleted!", "success");
                    setBooks([...books.filter(book => book.id !== id)])
                }
            });
    }
    return (
        <>
            <form id="book-form" autoComplete="off" onSubmit={submitHandle}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" value={values.title} name="title" className="form-control" onChange={onchangeHandle} />
                </div>

                <div className="form-group">
                    <label htmlFor="author">Author</label>
                    <input type="text" value={values.author} name="author" className="form-control" onChange={onchangeHandle} />
                </div>

                <div className="form-group">
                    <label htmlFor="year">Year</label>
                    <input type="text" value={values.year} name="year" className="form-control" onChange={onchangeHandle} />
                </div>
                <button type="submit" className="btn btn-warning btn-block add-btn" disabled={!disableSubmitBtn()} >save</button>
            </form>
            <table className="table table-striped mt-5 text-center">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Year</th>
                        <th>action </th>
                    </tr>
                </thead>
                <tbody id="book-list">
                    {books.map(book => <Book key={book.id} book={book} removeBook={removeBook} />)}
                </tbody>
            </table>
            {books.length > 0 && <button className='btn btn-danger w-100 ' onClick={clearBookList}>Clear List</button>}
        </>
    )
}
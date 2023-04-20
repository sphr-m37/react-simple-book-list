import React from 'react'

export const Book = ({ book, removeBook }) => {
    const { id, title, year, author } = book
    return (
        <tr>
            <th>{title}</th>
            <th>{author}</th>
            <th>{year}</th>
            <th className='btn btn-warning' onClick={() => removeBook(id)}>Delete</th>
        </tr>
    )
}

import React from 'react'
import { Header } from './components/Header/Header'
import { AddForm } from './components/BookList/AddForm'

export const App = () => {
    return (
        <div className='container mt-4'>
            <Header />
            <AddForm />
        </div>
    )
}

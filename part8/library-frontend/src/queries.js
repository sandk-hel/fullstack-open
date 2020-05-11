import { gql } from '@apollo/client'

const BOOK_DETAIL = gql`
  fragment BookDetail on Book {
    title
    published
    id
    author {
      name
      id
    }
    genres
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
      id
    }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    ...BookDetail
  }
}
${BOOK_DETAIL}
`

export const BOOKS_FOR_GENRE = gql`
query allBooks($genre: String) {
  allBooks(genre: $genre) {
    ...BookDetail
  }
}
${BOOK_DETAIL}
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title,  author: $author, published: $published, genres: $genres) {
      ...BookDetail
    }
  }
  ${BOOK_DETAIL}
`

export const UPDATE_BIRTH_YEAR = gql`
  mutation setBornYear($author: String!, $year: Int!) {
    editAuthor(name: $author, setBornTo: $year) {
      name
      born
      bookCount
      id
    }
  }
`

export const LOGIN = gql `
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const RECOMMENDATION = gql`
query {
  recommendation {
    books {
      ...BookDetail
    }
    genre
  }
}
${BOOK_DETAIL}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetail
    }
  }
${BOOK_DETAIL}
`

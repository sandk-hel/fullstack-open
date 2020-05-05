import { gql } from '@apollo/client'

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
    title
    author
    published
    id
  }
}
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title,  author: $author, published: $published, genres: $genres) {
      title
      author
      published
      id
    }
  }
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
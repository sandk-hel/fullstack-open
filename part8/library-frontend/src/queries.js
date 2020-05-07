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
    published
    id
    author {
      name
    }
    genres
  }
}
`

export const ADD_BOOK = gql`
  mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(title: $title,  author: $author, published: $published, genres: $genres) {
      title
      author {
        name
        born
        bookCount
        id
      }
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
      title
      author {
        name
        born
        bookCount
        id
      }
      published
      id
    }
    genre
  }
}
`

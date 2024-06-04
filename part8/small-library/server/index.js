const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require("graphql")
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

require('dotenv').config()
const Author = require("./model/AuthorModel")
const Book = require("./model/BookModel")

const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connection to MongoDB:', error.message)
        process.exit(-1)
    })

let authors = [
    {
        name: 'Robert Martin',
        id: "afa51ab0-344d-11e9-a414-719c6709cf3e",
        born: 1952,
    },
    {
        name: 'Martin Fowler',
        id: "afa5b6f0-344d-11e9-a414-719c6709cf3e",
        born: 1963
    },
    {
        name: 'Fyodor Dostoevsky',
        id: "afa5b6f1-344d-11e9-a414-719c6709cf3e",
        born: 1821
    },
    {
        name: 'Joshua Kerievsky', // birthyear not known
        id: "afa5b6f2-344d-11e9-a414-719c6709cf3e",
    },
    {
        name: 'Sandi Metz', // birthyear not known
        id: "afa5b6f3-344d-11e9-a414-719c6709cf3e",
    },
]

let books = [
    {
        title: 'Clean Code',
        published: 2008,
        author: 'Robert Martin',
        id: "afa5b6f4-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Agile software development',
        published: 2002,
        author: 'Robert Martin',
        id: "afa5b6f5-344d-11e9-a414-719c6709cf3e",
        genres: ['agile', 'patterns', 'design']
    },
    {
        title: 'Refactoring, edition 2',
        published: 2018,
        author: 'Martin Fowler',
        id: "afa5de00-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring']
    },
    {
        title: 'Refactoring to patterns',
        published: 2008,
        author: 'Joshua Kerievsky',
        id: "afa5de01-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'patterns']
    },
    {
        title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
        published: 2012,
        author: 'Sandi Metz',
        id: "afa5de02-344d-11e9-a414-719c6709cf3e",
        genres: ['refactoring', 'design']
    },
    {
        title: 'Crime and punishment',
        published: 1866,
        author: 'Fyodor Dostoevsky',
        id: "afa5de03-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'crime']
    },
    {
        title: 'Demons',
        published: 1872,
        author: 'Fyodor Dostoevsky',
        id: "afa5de04-344d-11e9-a414-719c6709cf3e",
        genres: ['classic', 'revolution']
    },
]


const typeDefs = `
  type Book {
    title: String!
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Author {
    id: ID!
    name: String!
    born: String
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!) : Author
  }
`

const resolvers = {
    Query: {
        bookCount: () => books.length,
        authorCount: () => authors.length,
        allBooks: (root, args) => {
            return books.filter(book => {
                const authorCondition = !args.author || book.author === args.author;
                const genreCondition = !args.genre || book.genres.includes(args.genre);
                return authorCondition && genreCondition;
            });
        },
        allAuthors: () => authors
    },

    Author: {
        bookCount: (root) => books.filter(book => book.author === root.name).length
    },

    Mutation: {
        addBook: async (root, args) => {
            try {
                const book = new Book({ ...args })
                const author = await Author.findOne({ name: args.author })
                if (!author) {
                    const authorObj = new Author({ name: args.author })
                    const res = await authorObj.save()
                    book.author = res.id
                } else {
                    book.author = author.id
                }
                return book.save()
            } catch (e) {
                throw new GraphQLError("SomeError occured", {
                    extensions: {
                        code: 'BAD_REQUEST'
                    }
                })
            }

        },
        editAuthor: (root, args) => {
            const authorIndex = authors.findIndex(e => e.name === args.name)
            console.log(authorIndex)
            if (authorIndex >= 0) {
                console.log({ ...args })
                const newAuthorobj = { ...authors[authorIndex], born: args.setBornTo }
                authors[authorIndex] = newAuthorobj
                return newAuthorobj
            }
            return null
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

startStandaloneServer(server, {
    listen: { port: 4000 },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
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
        bookCount: async () => Book.countDocuments({}),
        authorCount: async () => Author.countDocuments({}),
        allBooks: async (root, args) => {
            let query = {};
            if (args.author) {
                query.author = args.author;
            }
            if (args.genre) {
                query.genres = args.genre;
            }
            const books = await Book.find(query).populate('Author')
            return books;
        },
        allAuthors: async () => Author.find({})
    },

    Author: {
        bookCount: async (root) => Book.countDocuments({ author: root.id })
    },

    Mutation: {
        addBook: async (root, args) => {
            try {
                const author = await Author.findOne({ name: args.author });
                let authorId;

                if (!author) {
                    const authorObj = new Author({ name: args.author });
                    const res = await authorObj.save();
                    authorId = res.id;
                } else {
                    authorId = author.id;
                }

                const book = new Book({ ...args, author: authorId });

                await book.validate();

                return await book.save();
            } catch (e) {
                let errorMessage = "Some Error occurred";

                if (e instanceof mongoose.Error.ValidationError) {
                    errorMessage = e.message;
                }

                throw new GraphQLError(errorMessage, {
                    extensions: {
                        code: 'BAD_REQUEST',
                        exception: e
                    }
                });
            }
        },
        editAuthor: async (root, args) => {
            const query = { name: args.name };
            const authorDoc = await Author.findOne(query)
            if (authorDoc) {
                authorDoc.born = args.setBornTo
                return await authorDoc.save()
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
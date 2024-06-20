const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { GraphQLError } = require("graphql")
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
mongoose.set('strictQuery', false)

require('dotenv').config()
const Author = require("./model/AuthorModel")
const Book = require("./model/BookModel")
const User = require("./model/UserModel")

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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }
  
  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
    allgenres: [String]
  }

  type Mutation {
    addBook(
        title: String!
        author: String!
        published: Int!
        genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!) : Author
    createUser(
        username: String!
        favoriteGenre: String!
      ): User
      login(
        username: String!
        password: String!
      ): Token
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
            const books = await Book.find(query).populate('author')
            return books;
        },
        allAuthors: async () => Author.find({}),
        me: (root, args, context) => {
            const { currentUser } = context
            return currentUser
        },
        allgenres: async () => {
            const books = await Book.find({})
            const genresSet = new Set()
            books.forEach(book => {
                book.genres.forEach(genre => {
                    genresSet.add(genre);
                });
            });
            return Array.from(genresSet);
        }
    },

    Author: {
        bookCount: async (root) => Book.countDocuments({ author: root.id })
    },

    Mutation: {
        addBook: async (root, args, context) => {

            const { currentUser } = context
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

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
        editAuthor: async (root, args, context) => {

            const { currentUser } = context
            if (!currentUser) {
                throw new GraphQLError('not authenticated', {
                    extensions: {
                        code: 'BAD_USER_INPUT',
                    }
                })
            }

            const query = { name: args.name };
            const authorDoc = await Author.findOne(query)
            if (authorDoc) {
                authorDoc.born = args.setBornTo
                return await authorDoc.save()
            }
            return null
        },
        createUser: async (root, args) => {
            try {
                const user = new User({ ...args })
                return await user.save()
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
        login: async (root, args) => {
            if (args.password === "qwerty") {
                const user = await User.findOne({ username: args.username })
                if (user) {
                    const userForToken = {
                        username: user.username,
                        id: user._id,
                        favoriteGenre: user.favoriteGenre
                    }
                    return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
                }
            }
            throw new GraphQLError('wrong credentials', {
                extensions: {
                    code: 'BAD_USER_INPUT'
                }
            })
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true,
    playground: true
})

startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async ({ req, res }) => {
        try {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.startsWith('Bearer ') && auth.substring(7).length > 0) {
                const decodedToken = jwt.verify(
                    auth.substring(7), process.env.JWT_SECRET
                )
                const currentUser = await User
                    .findById(decodedToken.id)
                return { currentUser }
            }
        } catch (e) {
            return { currentUser: null }
        }
    },
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
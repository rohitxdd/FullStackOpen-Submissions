const Author = require("./model/AuthorModel")
const Book = require("./model/BookModel")
const { GraphQLError } = require("graphql")
const mongoose = require('mongoose')
const User = require("./model/UserModel")
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()


const resolvers = {
    Query: {
        bookCount: async () => Book.countDocuments({}),
        authorCount: async () => Author.countDocuments({}),
        allBooks: async (root, args) => {
            let query = {};
            if (args.author) {
                const authurObj = await Author.findOne({ name: args.author })
                if (authurObj) {
                    query.author = authurObj.id;
                } else {
                    query.author = new mongoose.Types.ObjectId();
                }
            }
            if (args.genre) {
                query.genres = args.genre;
            }
            const books = await Book.find(query).populate('author')
            return books;
        },
        allAuthors: async () => {
            return await Author.aggregate([
                {
                    $lookup: {
                        from: 'books',
                        localField: '_id',
                        foreignField: 'author',
                        as: 'books'
                    }
                },
                {
                    $project: {
                        name: 1,
                        bookCount: { $size: '$books' }
                    }
                }
            ]);
        },
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

                await book.save();
                await book.populate('author')

                pubsub.publish('BOOK_ADDED', { bookAdded: book })
                return book

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
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator('BOOK_ADDED')
        },
    },
}

module.exports = resolvers
const graphql = require('graphql');
const { 
  GraphQLObjectType, 
  GraphQLString, 
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;
const _ = require('lodash');
const Author = require('../models/author');
const Book = require('../models/book');

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
      }
    }
  }),
});

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args) {
      }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    author: {
      type: AuthorType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
      }
    },
    book: {
      type: BookType,
      args: {
        id: {type: GraphQLID}
      },
      resolve(parent, args) {
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
    }
  }
  }
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: {type: GraphQLString},
        age: {type: GraphQLInt},
      },
      resolve(parent, args) {
        let author = new Author({
          name: args.name,
          age: args.age,
        });
        return author.save();
      }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
})

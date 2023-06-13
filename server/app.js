const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://rohit:rw9rWL32Pn7H19fk@cluster0.88dmr3o.mongodb.net/?retryWrites=true&w=majority')
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB Atlas instance.');
});

app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql: true,
}));

app.listen(4000, () => {
  console.log('Now listening for requests on port 4000.');
})

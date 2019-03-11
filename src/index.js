const { GraphQLServer } = require('graphql-yoga')
// const { characterGenerator } = require('uatools-devutils')

const { dbUri } = require('./config')

const db = require('./models')(dbUri)

// const char = new db.models.Character(characterGenerator)

// console.log(char.save())

const Query = require('./resolvers/Query')
// const Mutation = require('./resolvers/Mutation')
// const Subscription = require('./resolvers/Subscription')
// const User = require('./resolvers/User')
// const Link = require('./resolvers/Link')
// const Vote = require('./resolvers/Vote')

const resolvers = {
    Query,
    // Mutation,
    // Subscription,
    // User,
    // Link,
    // Vote,
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: request => ({
        ...request,
        db
    })
})

server.start(() => console.log(`Server is running on http://localhost:4000`))
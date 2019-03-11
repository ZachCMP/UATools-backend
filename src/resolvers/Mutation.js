const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { APP_SECRET, getUserId } = require('../utils')

const ownerOfLink = async (context, id) => {
    const userId = getUserId(context)
    const link = context.prisma.link({ id })
    const linkUserId = await link.postedBy().id()
    if (userId !== linkUserId) return false
    return true
}

async function signup(parent, args, context, info) {
    const password = await bcrypt.hash(args.password, 10)
    const user = await context.prisma.createUser({ ...args, password })
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user
    }
}

async function login(parent, args, context, info) {
    const user = await context.prisma.user({ email: args.email })
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bcrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }
    
    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

function post(parent, args, context, info) {
    const userId = getUserId(context)
    return context.prisma.createLink({
        url: args.url,
        description: args.description,
        postedBy: { connect: { id: userId } }
    })
}

async function updateLink(parent, args, context, info) {
    if (!await ownerOfLink(context, args.id)) throw new Error(`You are not allowed to edit link: ${args.id}`)
    let update = {}
    if (args.url) update.url = args.url
    if (args.description) update.description = args.description
    return context.prisma.updateLink({
        data: update,
        where: { id: args.id }
    })
}

async function deleteLink(parent, args, context, info) {
    // if (!await ownerOfLink(context, args.id)) throw new Error(`You are not allowed to delete link: ${args.id}`)
    return await context.prisma.deleteLink({ id: args.id })
}

async function vote(parent, args, context, info) {
    const userId = getUserId(context)
    const linkExists = await context.prisma.$exists.vote({
        user: { id: userId },
        link: { id: args.linkId },
    })
    if (linkExists) {
        throw new Error(`Already voted for link: ${args.linkId}`)
    }

    return context.prisma.createVote({
        user: { connect: { id: userId } },
        link: { connect: { id: args.linkId } },
    })
}

async function clearLinks(parent, args, context, info) {
    await context.prisma.deleteManyLinks()
    return true
}

module.exports = {
    signup,
    login,
    post,
    updateLink,
    deleteLink,
    vote,
    clearLinks,
}
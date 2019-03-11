function info() {
    return `This is a text GQL server`
}

async function characters(parent, args, context, info) {
    return await context.db.models.Character.find({})
}

async function character(parent, { id }, context, info) {
    return await context.db.models.Character.findOne({ _id: id })
}

// async function feed(root, args, context, info) {
//     const where = args.filter ? {
//         OR: [
//             { description_contains: args.filter },
//             { url_contains: args.filter },
//         ]
//     } : {}
//     const links = context.prisma.links({ 
//         where,
//         skip: args.skip,
//         first: args.first,
//         orderBy: args.orderBy
//     })
//     const count = (
//         await context.prisma
//         .linksConnection({
//             where
//         })
//         .aggregate()
//         .count()
//     )
//     return {
//         links,
//         count,
//     }
// }

// function link(root, args, context, info) {
//     return context.prisma.link({ id: args.id })
// }

// function users(parent, args, context, info) {
//     return context.prisma.users()
// }

module.exports = {
    info,
    characters,
    character,
    // link,
    // users,
}
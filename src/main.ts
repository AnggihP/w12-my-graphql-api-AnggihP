import { createYoga } from 'graphql-yoga'
import { createServer } from 'http'
import { schema } from './schema'

function main () {
    const yoga = createYoga({ schema })
    const server = createServer(yoga)
    const port = process.env.PORT || 4000
    server.listen(port, () => {
        console.info('Server is running on http://localhost:' + port + '/graphql')
    })
}

main ()
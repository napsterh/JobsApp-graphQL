import { request } from 'graphql-request'

export function fetchData(query) {
    return request('https://api.graphql.jobs/',query)
}
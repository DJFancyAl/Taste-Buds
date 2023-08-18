import { createContext } from 'react';

interface Member {
    _id: string
    username: string
    name: string
    bio: string
    pic: string
}

interface Group {
    _id: string
    description: string
    type: string
    requests: Number[]
    members: Member[]
}

interface User {
    _id: string
    username: string
    name: string
    bio: string
    pic: string
    group: Group
}

export const UserContext = createContext({
    user: {_id: '', username: '', name: '', bio: '', pic: '', group: { _id: '', description: '', type: '', members: [], requests: []}},
    setUser: (data: User) => {}
});
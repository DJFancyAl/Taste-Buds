import { createContext } from 'react';

interface User {
    _id: String
    username: String
    name: String
    bio: String
    pic: String
    group: {
        _id: String
        requests: []
    }
}

export const UserContext = createContext({
    user: {_id: '', username: '', name: '', bio: '', pic: '', group: { id: '', requests: []}},
    setUser: (user: User) => {}
});
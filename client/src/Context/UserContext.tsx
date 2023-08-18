import { createContext } from 'react';

export const UserContext = createContext({
    user: {_id: '', username: '', name: '', bio: '', pic: ''}
});
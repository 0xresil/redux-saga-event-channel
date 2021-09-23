
import { createContext, useState } from 'react'

export const SearchContext = createContext();

export const SearchContextProvider = (props) => {
    const [searchTerm, setSearchTerm] = useState('');
    return (
        <SearchContext.Provider value = {[searchTerm, setSearchTerm]}>
            {props.children}
        </SearchContext.Provider>
    );
}
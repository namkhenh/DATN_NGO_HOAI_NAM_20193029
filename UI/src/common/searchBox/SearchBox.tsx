import * as React from 'react';
import './SearchBox.scss'
import { SearchBox, ISearchBoxStyles } from '@fluentui/react/lib/SearchBox';
import { useState } from 'react';
interface SearchBoxProps {
    placeholder: string
    // onChange: () => {}
    onSearch: (newValue: string) => void
    onClear?: () => void
}

/* eslint-disable react/jsx-no-bind */
export const SearchBoxView = (props: SearchBoxProps) => {
    const [searchText, setSearchText] = useState<string>('')
    return (
        <SearchBox
            placeholder={props.placeholder}
            onEscape={ev => {
                
            }}
            onClear={ev => props.onClear!()}
            // onChange={(_, newValue) => console.log('SearchBox onChange fired: ' + newValue)}
            onSearch={newValue => props.onSearch(newValue)}
        />
    )
}
    
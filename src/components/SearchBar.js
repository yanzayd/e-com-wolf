import React, { useState, useEffect } from 'react';
import { MagnifyingGlassIcon as SearchIcon } from "@heroicons/react/24/outline";
import ReactCountryFlag from "react-country-flag";

function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [userCountry, setUserCountry] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchUserCountry = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/');
                const data = await response.json();
                setUserCountry(data.country_code);
            } catch (error) {
                console.error('Error fetching country:', error);
            }
        };
        fetchUserCountry();
    }, []);

    useEffect(() => {
        const delayDebounceFn = setTimeout(async () => {
            if (searchTerm) {
                setLoading(true);
                try {
                    const response = await fetch(`/api/search?term=${encodeURIComponent(searchTerm)}`);
                    const data = await response.json();
                    setSearchResults(data);
                } catch (error) {
                    console.error('Error searching:', error);
                }
                setLoading(false);
            }
        }, 500);

        return () => clearTimeout(delayDebounceFn);
    }, [searchTerm]);

    return (
        <div className="flex items-center w-2/5 mx-4">
            {userCountry && (
                <div className="mr-2 hidden sm:block">
                    <ReactCountryFlag
                        countryCode={userCountry}
                        svg
                        style={{
                            width: '2em',
                            height: '2em',
                        }}
                        title={userCountry}
                    />
                </div>
            )}
            <div className="flex flex-grow items-center h-10 rounded-md bg-yellow-400 hover:bg-yellow-500 cursor-pointer relative">
                <input
                    className="p-2 h-full w-full flex-grow flex-shrink rounded-l-md focus:outline-none px-4"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search food..."
                />
                <SearchIcon className="h-12 p-4" />
                {searchTerm && searchResults.length > 0 && (
                    <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-md shadow-lg z-50">
                        {searchResults.map((result) => (
                            <div key={result.id} className="p-2 hover:bg-gray-100 cursor-pointer">
                                {result.title}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default SearchBar;
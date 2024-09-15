'use client';
import { useEffect, useState } from 'react';
import { getProductByQuery } from '@/services/productservices';
import Image from 'next/image';
import Link from 'next/link';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [timer, setTimer] = useState(null);
    const [data, setData] = useState(null);

    const search = async (searchTerm) => {
        try {
            const result = await getProductByQuery(searchTerm);
            setData(result);
        } catch (error) {
            console.error('Error fetching search results:', error);
        }
    };

    useEffect(() => {
        if (timer) {
            clearTimeout(timer);
        }
        const newTimer = setTimeout(() => {
            if (searchTerm.trim()) {
                search(searchTerm);
            }
        }, 300);
        setTimer(newTimer);

        return () => clearTimeout(newTimer);
    }, [searchTerm]);

    return (
        <div>
            <form className="search-form">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Enter the name of products"
                    onChange={(e) => setSearchTerm(e.currentTarget.value)}
                />
            </form>


            {data && data.products.length > 0 && (
                <div className="products-grid">
                    {data.products.map((item) => (
                        <div key={item.id} className="product-card">
                            <h2>{item.title}</h2>
                            <Image
                                src={item.thumbnail}
                                alt={item.title}
                                width={200}
                                height={100}
                            />
                            <p>{item.description}</p>
                            <p className="price">${item.price}</p>
                            <Link href={`/products/${item.id}`}>
                                <button>View Details</button>
                            </Link>
                        </div>
                    ))}
                </div>
            )}


            {data && data.products.length === 0 && (
                <p>Product: {searchTerm} is not exist in our store</p>
            )}
        </div>
    );
};

export default SearchBar;
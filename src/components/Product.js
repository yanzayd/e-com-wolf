import { StarIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';
import { useState, useEffect } from 'react';
import Currency from "react-currency-formatter";
import { useDispatch } from 'react-redux';
import { addToBasket } from '../slices/basketSlice';

const MAX_RATING = 5;
const MIN_RATING = 1;

function Product({ id, title, price, description, category, image, comboImages }) {
    const dispatch = useDispatch();
    const [mounted, setMounted] = useState(false);
    const [rating, setRating] = useState(MIN_RATING);
    const [hasPrime, setHasPrime] = useState(false);

    useEffect(() => {
        setMounted(true);
        setRating(Math.floor(Math.random() * (MAX_RATING - MIN_RATING + 1)) + MIN_RATING);
        setHasPrime(Math.random() < 0.5);
    }, []);

    const addItemToBasket = () => {
        const product = {
            id, 
            title, 
            price,
            rating,
            description, 
            category, 
            image,
            comboImages,
            hasPrime
        };
        dispatch(addToBasket(product));
    };

    return (
        <div className='relative flex flex-col m-5 bg-white z-30 p-10'>
            <p className='absolute top-2 right-2 text-xs italic text-gray-400'>{category}</p>

            <Image 
                src={image} 
                height={200} 
                width={200} 
                style={{ objectFit: "contain" }} 
                alt={title}
                priority={image.includes("hambClassic01_jdhmss.png")}
            />

            <h4 className='my-3'>{title}</h4>

            <div className='flex'>
                {Array(rating)
                    .fill()
                    .map((_, i) => (
                        <StarIcon key={i} className='h-5 text-yellow-500' />
                    ))}
            </div>

            <p className='text-xs my-2 line-clamp-2'>{description}</p>

            <div className='mb-5'>
                <Currency quantity={price} currency="CDF" />
            </div>

            {hasPrime && (
                <div className='flex items-center space-x-2 mt-5'>
                    <img className='w-12' src="https://res.cloudinary.com/dayffumrr/image/upload/v1753626466/prime02_rzrbk3.webp" alt="Prime delivery" />
                    <p className='text-xs text-gray-500'>FREE Next-day Delivery</p>
                </div>
            )}
            <button onClick={addItemToBasket} className='mt-auto button'>Add to Basket</button>
        </div>
    )
}

export default Product
import React from 'react'
import Product from './Product'
import Image from 'next/image'

function ProductFeed({ products }) {
  return (
    <div className='grid grid-flow-row-dense md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:-mt-52 mx-auto'>
         {/* <p> product will go here</p> */}
         {products
            .slice(0, 4)
            .map(({ id, title, price, description, category, image }) =>(
              <Product
                     key={id} 
                     id={id} 
                     title={title} 
                     price={price} 
                     description={description} 
                     category={category} 
                     image={image} 
             />
         ))}
         <Image
           className='md:col-span-full'
           src="https://links.papareact.com/dyz"
           alt=""
           width={1300}
           height={300}
           style={{ objectFit: "cover" }}
         />
         <div className='md:col-span-2'>
            {products
              .slice(4, 5)
              .map(({ id, title, price, description, category, image }) =>(
                <Product
                     key={id} 
                     id={id} 
                     title={title} 
                     price={price} 
                     description={description} 
                     category={category} 
                     image={image} 
             />
         ))}
         </div>

         {products
              .slice(5, products.length)
              .map(({ id, title, price, description, category, image }) =>(
                <Product
                     key={id} 
                     id={id} 
                     title={title} 
                     price={price} 
                     description={description} 
                     category={category} 
                     image={image} 
             />
         ))}
    </div>
  )
}

export default ProductFeed
 
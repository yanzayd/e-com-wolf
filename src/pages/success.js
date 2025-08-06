import { CheckCircleIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../components/Header'

function Success() {
    const router = useRouter()
    
    return (
        <div className='bg-gray-100 h-screen pt-[200px]'>
            <Header />

            <main className='max-w-screen-lg mx-auto'>
                <div className='flex flex-col p-10 bg-white'>
                    <div className='flex items-center space-x-2 mb-5'>
                        <CheckCircleIcon className='text-green-500 h-10' />
                        <h1 className='text-3xl'>Merci, votre commande a été confirmée ! ✅</h1>
                    </div>
                    <p>
                        Merci d’avoir fait vos achats chez nous.
Nous vous enverrons une confirmation dès que votre article aura été expédié.
Si vous souhaitez vérifier le statut de votre commande, veuillez cliquer sur le lien ci-dessous.
                    </p>
                    <button 
                        onClick={() => router.push('/orders')}
                        className='button mt-8'
                    >
                        Go to my orders
                    </button>
                </div>
            </main>
        </div>
    )
}

export default Success
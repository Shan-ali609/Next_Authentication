import React from 'react'



export default async function page({params}:any) {
  return (
    <div className='flex flex-col items-center justify-center w-full h-screen'>
      <h1 className='text-3xl font-bold'>profile page</h1>
      <hr />
      <hr />
     <h2 className=' bg-green-500 p-2 text-black'>{params.id}</h2>
    </div>
  )
}



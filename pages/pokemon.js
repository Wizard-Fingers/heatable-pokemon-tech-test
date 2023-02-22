import React from 'react'
import Layout from '@/components/Layout'
import Link from 'next/link'
export default function pokemon({ pokemon }) {
    // console.log(pokemon)
  return (
    <Layout title={pokemon.name}>
    <h1 className='text-4xl mb-2 text-center cap'>
    {pokemon.name}</h1>
    <img src={pokemon.image} alt={pokemon.name} className="mx-auto"/>
    <p><span className='font-bold mr-2'>Weight:</span>{pokemon.weight}</p>
    <p><span className='font-bold mr-2'>Hight:</span>{pokemon.hight}</p>
    <h2 className='text-2xl mt-6 mb-2'>Types</h2>
    {pokemon.types.map((type, index) => (
        <p key={index}>{type.type.name}</p>
    ))}
    <p className='mt-10 text-center'>
        <Link href='/'>
        <button className='text-2xl underline'>Home</button>
        </Link>
    </p>

    </Layout>
  )
}

export async function getServerSideProps({ query }) {
    const id = query.id
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = await res.json()
        const paddedIndex = ('00' + (id)).slice(-3)
        const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`
        pokemon.image = image
        return {
        props: { pokemon },
        }
    } catch (err) {
        console.error(err)
    }
    }
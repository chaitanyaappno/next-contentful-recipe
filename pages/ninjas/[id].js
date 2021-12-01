import React from 'react'


export const getStaticPaths = async()=>{
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const data =await res.json()

    const paths = data.map((ninja)=>{
        return {
            params:{id:ninja.id.toString()}
        }
    })
    return {
    paths,
    fallback:false

    }
}

export const getStaticProps = async(context) =>{
const id = context.params.id
const res = await fetch("https://jsonplaceholder.typicode.com/users/"+id)
const data = await res.json()

return {
    props:{
        user: data
    }
}
}
function Detail({user}) {
    return (
        <div>
            <h1>{user?.name}</h1>
            <p>{user?.email}</p>
            <p>{user?.website}</p>
            <p>{user?.address?.city}</p>
        </div>
    )
}

export default Detail

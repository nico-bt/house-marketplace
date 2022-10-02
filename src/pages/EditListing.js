import React from 'react'
import { useParams } from 'react-router-dom'

function EditListing() {

    const params = useParams()

  return (
    <div>
        <h1>Edit listing</h1>
        <h2>Id: {params.listingId}</h2>
    </div>
  )
}

export default EditListing
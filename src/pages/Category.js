import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, getDocs, query, where, orderBy, limit, startAfter } from 'firebase/firestore'
import { db } from '../firebase.config'
import { toast } from 'react-toastify'
import Spinner from '../components/Spinner'
import ListingItem from '../components/ListingItem'

function Category() {
  const [listings, setListings] = useState(null)
  const [loading, setLoading] = useState(true)
  const [lastFetchedListing, setLastFetchedListing] = useState(null)

  const params = useParams()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        // Get reference to the collection in Firestore
        const listingsRef = collection(db, 'listings')

        // Create a query
        const q = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10)
        )
        // Execute query
        const querySnap = await getDocs(q)

        const listingsFromQuery = []

        querySnap.forEach(doc => {
          // console.log(doc.data()) 
          listingsFromQuery.push({
            id: doc.id,             //id separate from data
            data: doc.data()        //get the data with the data() method
          })
        })

        setListings(listingsFromQuery)
        setLoading(false)

      } catch (error) {
        setLoading(false)
        toast.error("Sorry. Something went wrong. Can't access info for the moment")
      }
    }
    
    fetchListings()
    
  }, [params.categoryName])
  

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>
          {params.categoryName === 'rent'? 'Places for rent' : 'Places for sale'}
        </p>
      </header>

      {loading ? ( <Spinner />) : listings && listings.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id}
                  listing={listing.data}
                  id={listing.id}
                />
              ))}
            </ul>
          </main>

          <br />
          <br />

          {/* {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )} */}
        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category
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
  const [areMoreListingsToShow, setAreMoreListingsToShow] = useState(false)

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
          limit(5)
        )
        // Execute query
        const querySnap = await getDocs(q)

        // Get the last visible doc for pagination. Pass this to the onFetchMoreListings() function
        const lastVisibleDoc = querySnap.docs[querySnap.docs.length-1]
        setLastFetchedListing(lastVisibleDoc)

        // Check if there are more items to show after the last one fetched. To dinamically display the "show more" button
        const qRemaining = query(
          listingsRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          startAfter(lastVisibleDoc),
          limit(1)
        )
        const qRemainingSnap = await getDocs(qRemaining)
        console.log(qRemainingSnap);
        if(qRemainingSnap.docs.length > 0){
          setAreMoreListingsToShow(true)
        } else {
          setAreMoreListingsToShow(false)
        }

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
  

  // Pagination / Load More Listings
  const onFetchMoreListings = async () => {
    try {
      // Get reference
      const listingsRef = collection(db, 'listings')

      // Create a query
      const q = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(5)
      )

      // Execute query
      const querySnap = await getDocs(q)

      const lastVisibleDoc = querySnap.docs[querySnap.docs.length - 1]
      setLastFetchedListing(lastVisibleDoc)

      // Check if there are more items to show after the last one fetched. To dinamically display the "show more" button
      const qRemaining = query(
        listingsRef,
        where('type', '==', params.categoryName),
        orderBy('timestamp', 'desc'),
        startAfter(lastVisibleDoc),
        limit(1)
      )
      const qRemainingSnap = await getDocs(qRemaining)
      if(qRemainingSnap.size > 0){
        setAreMoreListingsToShow(true)
      } else {
        setAreMoreListingsToShow(false)
      }

      const listings = []

      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        })
      })

      setListings((prevState) => [...prevState, ...listings])
      setLoading(false)
    } catch (error) {
      toast.error('Could not fetch listings')
    }
  }
  
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
          
          {areMoreListingsToShow && (
            <p className='loadMore' onClick={onFetchMoreListings}>
              Load More
            </p>
          )}

        </>
      ) : (
        <p>No listings for {params.categoryName}</p>
      )}
    </div>
  )
}

export default Category
import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
// Firebase
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore'
import { db } from '../firebase.config'

import Spinner from './Spinner'
//Swiper
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Slider() {
    
    // Options to format numbers as currency
    const options = { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 }
    const numberFormat = new Intl.NumberFormat('en-US', options);

    const [loading, setLoading] = useState(true)
    const [listings, setListings] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {
        const fetchListings = async () => {
          const listingsRef = collection(db, 'listings')
          const q = query(listingsRef, orderBy('timestamp', 'desc'), limit(5))
          const querySnap = await getDocs(q)
    
          let listings = []
    
          querySnap.forEach((doc) => {
            return listings.push({
              id: doc.id,
              data: doc.data(),
            })
          })
    
          setListings(listings)
          setLoading(false)
        }
    
        fetchListings()
    }, [])

    if (loading) {
        return <Spinner />
    }

    if (listings.length === 0) {
        return <></>
    }

  return (
    listings && (
        <>
            <p className='exploreHeading'>Latest props added</p>
            <Swiper
                slidesPerView={1} 
                pagination={{ clickable: true }} 
                className="swiper-container swiper-explore" 
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                scrollbar={{ draggable: true }}
            >
                {listings.map((item)=>(
                    <SwiperSlide
                        key={item.id}
                        onClick={() => navigate(`/category/${item.data.type}/${item.id}`)}
                        style={{cursor:"pointer"}}
                    >
                        <div style={{background:`url(${item.data.imgUrls[0]}) center no-repeat`, backgroundSize:"cover"}} className='swiperSlideDiv' >
                            <p className='swiperSlideText'>{item.data.name}</p>
                            <p className='swiperSlidePrice'>Hello</p>
                            <p className='swiperSlidePrice'>
                              {item.data.discountedPrice ?? numberFormat.format(item.data.regularPrice)}{' '}
                                {item.data.type === 'rent' && '/ month'}
                            </p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>
    )
  )
}

export default Slider
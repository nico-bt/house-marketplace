//React
import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
//Firebase
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
// Spinner, icons and toast
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import copyIcon from '../assets/svg/copyToClipboard.svg'
import { toast } from 'react-toastify'
// Swiper (for imgs slider)
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

function Listing() {

    const {categoryName, listingId} = useParams()
    const [listing, setListing] = useState(null)
    const [landlord, setLandlord] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)
    const [emailCopied, setEmailCopied] = useState(false)

    const navigate = useNavigate()
    const auth = getAuth()

    useEffect(() => {
        const fetchListing = async () => {
            setisLoading(true)
            try {
                // Get reference in Firestore
                const docRef = doc(db, "listings", listingId);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    setListing(docSnap.data())
                    setisLoading(false)
                } else {
                    toast.error("No such document!")
                    setisLoading(false)
                }
            } catch (error) {
                setisLoading(false)
                toast.error("Sorry. Something went wrong. Can't access info for the moment")
            }
        }
        fetchListing()
      }, [listingId])

    // Options to format numbers as currency
    const options = { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 }
    const numberFormat = new Intl.NumberFormat('en-US', options);
    
    // Get Landlord data (user creator of the listing)
    useEffect(() => {
        const getLandlord = async () => {
            try {
                // Get doc Ref
                const docRef = doc(db, 'users', listing.userRef)
                const docSnap = await getDoc(docRef)
          
                if (docSnap.exists()) {
                  setLandlord(docSnap.data())
                } else {
                  toast.error('Could not get landlord data')
                }
            } catch (error) {
                console.log(error);
                toast.error('Could not get landlord data')                
            }
          }
          // After listing is filled with userRef, run getLandlord
          listing && getLandlord()
    }, [listing])
    

    if(isLoading){
        return <Spinner />
    }
    
    return (
        <main className='max-width'>
            {/* Slider */}
            <Swiper 
                slidesPerView={1} 
                pagination={{ clickable: true }} 
                className="swiper-container" 
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                navigation
                scrollbar={{ draggable: true }}
            >
                {listing.imgUrls.map((url, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className='swiperSlideDiv' 
                            style={{background: `url(${url}) center no-repeat`, backgroundSize:"cover"}}></div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Copy link to clipboard to share ******/}
            <div
                className='shareIconDiv'
                onClick={() => {
                    navigator.clipboard.writeText(window.location.href)
                    setShareLinkCopied(true)
                    // For display a message "copied link" for 2 seconds
                    setTimeout(() => {setShareLinkCopied(false)}, 2000)
                }}
                >
                <img src={shareIcon} alt='copy link to share' />
            </div>

            {shareLinkCopied && <p className='linkCopied'>Link Copied!</p>}

            
            <div className='listingDetails'>
                <p className='listingName'>
                    {listing.name} - {listing.offer? numberFormat.format(listing.discountedPrice) : numberFormat.format(listing.regularPrice)}
                    {listing.type === "rent" && " / month"}
                </p>
                <p className='listingLocation'>
                    {listing.address}
                </p>
                <p className='listingType'>
                    For {listing.type === 'rent' ? 'Rent' : 'Sale'}
                </p>
                {listing.offer && (
                    <p className='discountPrice'>
                        {numberFormat.format(listing.regularPrice - listing.discountedPrice)} discount
                    </p>
                )}

                <ul className='listingDetailsList'>
                    <li>
                        {listing.bedrooms > 1? `${listing.bedrooms} Bedrooms` : '1 Bedroom'}
                    </li>
                    <li>
                        {listing.bathrooms > 1? `${listing.bathrooms} Bathrooms` : '1 Bathroom'}
                    </li>
                    <li>{listing.parking && 'Parking Spot'}</li>
                    <li>{listing.furnished && 'Furnished'}</li>
                </ul>
            </div>

            {landlord?.email && (
                <>
                <div className='contactLandlord-Container'>
                    <a href={`mailto:${landlord.email}?Subject=${listing.name}`} className='contactLandlord' target="_blank">
                        <h2>Contact Landlord:</h2>
                        <p >Email: {landlord?.email}</p>
                    </a>
                    <img 
                        src={copyIcon} 
                        alt='copy email' 
                        className='socialIconDiv'
                        onClick={() => {
                            navigator.clipboard.writeText(landlord.email)
                            setEmailCopied(true)
                            // For display a message "copied email" for 2 seconds
                            setTimeout(() => {setEmailCopied(false)}, 2000)
                        }}
                    />
                    {emailCopied && <p className='copiedEmailMessage'>Email copied to clipboard!</p>}
                </div>
                </>
            )}    

        </main>
  )
}
export default Listing
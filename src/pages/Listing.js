import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
//Firebase
import { getDoc, doc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { db } from '../firebase.config'
// Spinner and icon
import Spinner from '../components/Spinner'
import shareIcon from '../assets/svg/shareIcon.svg'
import { toast } from 'react-toastify'

function Listing() {

    const {categoryName, listingId} = useParams()
    const [listing, setListing] = useState(null)
    const [isLoading, setisLoading] = useState(true)
    const [shareLinkCopied, setShareLinkCopied] = useState(false)

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
      

    if(isLoading){
        return <Spinner />
    }
    
    return (
        <main>
            {/* To do: Slider */}

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
                        ${listing.regularPrice - listing.discountedPrice} discount
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
                

        </main>
  )
}

export default Listing
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import bedIcon from '../assets/svg/bedIcon.svg'
import bathtubIcon from '../assets/svg/bathtubIcon.svg'

// Options to format numbers as currency
const options = { style: 'currency', currency: 'USD', maximumFractionDigits: 0, minimumFractionDigits: 0 }
const numberFormat = new Intl.NumberFormat('en-US', options);

function ListingItem({ listing, id, onEdit, onDelete }) {
  return (
    <li className='categoryListing'>
      <Link
        to={`/category/${listing.type}/${id}`}
        className='categoryListingLink'
      >
        <img src={listing.imgUrls[0]} alt={listing.name} className='categoryListingImg'/>
        <div className='categoryListingDetails'>
          <p className='categoryListingLocation'>{listing.address}</p>
          <p className='categoryListingName'>{listing.name}</p>

          <p className='categoryListingPrice'>
            {listing.offer? numberFormat.format(listing.discountedPrice) : numberFormat.format(listing.regularPrice)}
            {listing.type === 'rent' && ' / Month'}
          </p>

          <div className='categoryListingInfoDiv'>
            <img src={bedIcon} alt='bed' />
            <p className='categoryListingInfoText'>
              {listing.bedrooms > 1
                ? `${listing.bedrooms} Bedrooms`
                : '1 Bedroom'}
            </p>
            
            <img src={bathtubIcon} alt='bath' />
            <p className='categoryListingInfoText'>
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Bathrooms`
                : '1 Bathroom'}
            </p>
          </div>
          

        </div>
      </Link>
      
      {onDelete && (
        <DeleteIcon
          className='removeIcon'
          fill='rgb(231, 76,60)'
          onClick={() => onDelete(listing.id, listing.name)}
        />
      )}

      {onEdit && <EditIcon className='editIcon' onClick={() => onEdit(id)} />}

    </li>
  )
}

export default ListingItem
import React from 'react'
import { Link } from 'react-router-dom'
import rentCategoryImage from '../assets/jpg/rentCategoryImage.jpg'
import sellCategoryImage from '../assets/jpg/sellCategoryImage.jpg'
import Slider from '../components/Slider'

function Explore() {
  return (
    <div className='explore'>
      {/* <header>
        <p className='pageHeader'>Explore</p>
      </header> */}

      <main>

        <Slider />

        <p className='exploreCategoryHeading'>Categories</p>
        <div className='exploreCategories'>
          <Link to='/category/rent'>
            <div className='overlay'>
              <img
                src={rentCategoryImage}
                alt='rent'
                className='exploreCategoryImg'
              />
              <p className='overlay-text'>Rent</p>
            </div>
            <p className='exploreCategoryName'>Places for rent</p>
          </Link>
          
          <Link to='/category/sale'>
            <div className='overlay'>
              <img
                src={sellCategoryImage}
                alt='sell'
                className='exploreCategoryImg'
              />
              <p className='overlay-text'>Sale</p>
            </div>
            <p className='exploreCategoryName'>Places for sale</p>
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Explore
import React from 'react'
import './SubBanerComponent.css';
import CTA from '../../../photos/CTA.png';

const SubBanerComponent = () => {
  return (
    <>
    <div className="SubBannerMainContainer">
        <img src={CTA} alt="" className='SubBannerMainImage'/>
        <button class="btn">Apply For Loan</button>
    </div> 
    </>
  )
}

export default SubBanerComponent

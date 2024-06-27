import React from 'react';

import Quote from '../assets/quote-img.png';
import Review1 from '../assets/review-1.png';
import Review2 from '../assets/review-2.png';
import Review3 from '../assets/review-3.png';

const Reviews = () => {
  return (
    <section className='review' id='review'>
      <h1 className='heading'>Customer's Review</h1>

      <div className='box-container'>
        <div className='box'>
          <img src={Quote} alt='quote' className='quote' />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nulla
            sit libero nemo fuga sequi nobis? Necessitatibus aut laborum, nisi
            quas eaque laudantium consequuntur iste ex aliquam minus vel? Nemo.
          </p>
          <img src={Review1} className='user' alt='reviewer1' />
          <h3>derek rude</h3>
          <div className='stars'>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star-half-alt'></i>
          </div>
        </div>

        <div className='box'>
          <img src={Quote} alt='quote' className='quote' />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nulla
            sit libero nemo fuga sequi nobis? Necessitatibus aut laborum, nisi
            quas eaque laudantium consequuntur iste ex aliquam minus vel? Nemo.
          </p>
          <img src={Review2} className='user' alt='reviewer2' />
          <h3>jenny white</h3>
          <div className='stars'>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star-half-alt'></i>
          </div>
        </div>

        <div className='box'>
          <img src={Quote} alt='quote' className='quote' />
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nulla
            sit libero nemo fuga sequi nobis? Necessitatibus aut laborum, nisi
            quas eaque laudantium consequuntur iste ex aliquam minus vel? Nemo.
          </p>
          <img src={Review3} className='user' alt='reviewer3' />
          <h3>kate mudton</h3>
          <div className='stars'>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star'></i>
            <i className='fas fa-star-half-alt'></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;

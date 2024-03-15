import React from 'react'

const Cards = ({item}) => {
  return (
    <div className='item'>
        <div className='image'>
        <img src={item.urls.small} alt={item.description} />
        <a className='btn-save' href=''>Guardar</a>
        {/* <a className='icon-upload' href=''><img src='./uploadIcon.webp' alt='upload' /></a>
        <a className='icon-dots' href=''><img src='./dotsIcon.webp' alt='options' /></a> */}
        </div>
      <p>{item.description}</p>
      <div>
        <img className='user' src={item.user.profile_image.small} width='40' alt={item.user.name} />
        <span>{item.user.name}</span>
      </div>
      </div>
  )
}

export default Cards
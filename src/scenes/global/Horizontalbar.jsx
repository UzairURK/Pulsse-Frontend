import React from 'react'
// import Pulsse_logo from './Assets/Pulsse_logo.svg'
import Pulsse_logo from '../../assets/img/logo.png'
import navbar from './Assets/navbar.jpg'
function Horizontalbar() {
  return (
    <div
      className='horizontalbar'
      // style={{
      //   width: '100%', // width: '172px'
      //   height: '70px',
      //   border: '1px solid #DADCE0',
      //   display: 'flex',
      //   flexDirection: 'row',
      //   background: '#FFFFFF',
      //   justifyContent: 'space-between',
      //   position: 'fixed',
      //   zIndex: '9999',
      //   padding: '11px',
      // }}
    >
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
        <div>
          {/* pulsse */}
          <img
            src={Pulsse_logo}
            alt='Pulsse Logo'
            style={{
              width: '135px',
              height: '50px',
            }}
          />
        </div>
        <div
          style={{
            width: '1px', // Width 1px creates a vertical line
            height: '50px',
            marginLeft: '16px',
            // angele: '-90 deg',
            marginRight: '18px',
            border: '1px solid #DADCE0', // Border on the left side creates the line
            // transform: 'rotate(-90deg)', // Rotate the line to make it vertical
          }}
        ></div>
        <div
          style={{
            position: 'absolute',
            width: '50px',
            height: '0px', // Setting height to 0 to hide the vertical space of the border
            top: '11px',
            left: '169px',
            // border: '1px solid #DADCE0',
            transformOrigin: 'top left', // Set the origin of rotation
            transform: 'rotate(-90deg)', // Rotate the border
          }}
        />
        <div
          className='horizontalbarbox'
        >
          <div
            className='horizontalbarfelx'>
            <span
              className='typography horizontalbarHeading'>
              <span
                style={{
                  color: '#0000008A', // Text color with opacity
                }}
              >
                Branches {' > '}
              </span>
              Jeddah branch Analytics
            </span>
          </div>
          <div>
            <span
              className='horizontaltext'
            >
              Hi, Layla
            </span>
          </div>
        </div>
        {/* Search Line */}
        <div className='horizontalbarSearchbar'>
          <img
            src="data:image/svg+xml,%3Csvg width='18' height='18' viewBox='0 0 18 18' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M16.5 16.5L12.875 12.875M14.8333 8.16667C14.8333 11.8486 11.8486 14.8333 8.16667 14.8333C4.48477 14.8333 1.5 11.8486 1.5 8.16667C1.5 4.48477 4.48477 1.5 8.16667 1.5C11.8486 1.5 14.8333 4.48477 14.8333 8.16667Z' stroke='%23667085' stroke-width='1.66667' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E"
            alt='Search'
            style={{ width: '18px', height: '18px' }}
          />
          <input
            type='text'
            placeholder='Search'
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              outline: 'none',
              fontFamily: 'Noto Sans',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '24px',
              letterSpacing: '0em',
              backgroundColor: '#EEEEEE',
            }}
          />
        </div>
      </div>
      <div
        className='flex'
        style={{ alignItems: 'center', marginRight: '38px' }}
      >
        <svg
          width='40'
          height='40'
          viewBox='0 0 40 40'
          fill='none'
          style={{
            marginRight: '20px',
          }}
          xmlns='http://www.w3.org/2000/svg'
        >
          <rect
            width='40'
            height='40'
            rx='6'
            fill='white'
          />
          <path
            d='M21.4417 27.5003C21.2952 27.7529 21.0849 27.9625 20.8319 28.1083C20.5788 28.254 20.292 28.3307 20 28.3307C19.708 28.3307 19.4212 28.254 19.1681 28.1083C18.9151 27.9625 18.7048 27.7529 18.5583 27.5003M25 16.667C25 15.3409 24.4732 14.0691 23.5355 13.1315C22.5979 12.1938 21.3261 11.667 20 11.667C18.6739 11.667 17.4021 12.1938 16.4645 13.1315C15.5268 14.0691 15 15.3409 15 16.667C15 22.5003 12.5 24.167 12.5 24.167H27.5C27.5 24.167 25 22.5003 25 16.667Z'
            stroke='#667085'
            strokeWidth='1.66667'
            strokeLinecap='round'
            strokeLinejoin='round'
          />
        </svg>
        <img
          src={navbar}
          alt='Profile'
          style={{ width: '40px', height: '40px', borderRadius: '200px' }}
        />
      </div>
    </div>
  )
}

export default Horizontalbar

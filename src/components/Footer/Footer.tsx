import React, { FC } from 'react'

import './Footer.scss'

const Footer: FC = () => {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <a className='github' href='https://github.com/nairabrab'>
          github
        </a>
        <a className='rss' href='https://rs.school/js/'>
          <span className='rss-year'>21</span>
        </a>
      </div>
    </footer>
  )
}

export default Footer

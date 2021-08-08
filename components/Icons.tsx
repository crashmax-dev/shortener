import React from 'react'

const Github = () => (
  <a href="https://github.com/crashmax-dev/shortener" target="_blank" className="github-corner" aria-label="View source on GitHub" rel="noreferrer">
    <svg width="80" height="80" viewBox="0 0 250 250" aria-hidden="true">
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z"></path>
      <path d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2" fill="currentColor" style={{ transformOrigin: '130px 106px' }} className="octo-arm"></path>
      <path d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z" fill="currentColor" className="octo-body"></path>
    </svg>
  </a>
)

interface LoadingIconProps {
  width?: string
  height?: string
}

const Loading: React.FC<LoadingIconProps> = ({ width, height }) => (
  <svg viewBox="0 0 24 24" style={{ width: width || '26px', height }} className="icon">
    <defs>
      <linearGradient x1="28.154%" y1="63.74%" x2="74.629%" y2="17.783%" id="a">
        <stop stopColor="currentColor" offset="0%"></stop>
        <stop stopColor="#fff" stopOpacity="0" offset="100%"></stop>
      </linearGradient>
    </defs>
    <g transform="translate(2)" fill="none">
      <circle stroke="url(#a)" strokeWidth="2" cx="10" cy="12" r="10"></circle>
      <path d="M10 2C4.477 2 0 6.477 0 12" stroke="currentColor" strokeWidth="2"></path>
    </g>
    <animateTransform
      attributeType="xml"
      attributeName="transform"
      type="rotate"
      from="0 0 0"
      to="360 0 0"
      dur="0.5s"
      repeatCount="indefinite"
    />
  </svg>
)

const Info = () => (
  <svg viewBox="0 0 24 24" style={{ width: '28px' }} className="icon">
    <g fill="currentColor" stroke="currentColor" strokeLinecap="square" strokeWidth="2">
      <circle cx="12" cy="12" fill="none" r="11" stroke="currentColor"></circle>
      <line fill="none" x1="11.959" x2="11.959" y1="11" y2="17"></line>
      <circle cx="11.959" cy="7" r="1" stroke="none"></circle>
    </g>
  </svg>
)

const Copy = () => (
  <svg viewBox="0 0 24 24" style={{ width: '26px' }} className="icon">
    <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
  </svg>
)

const Send = () => (
  <svg viewBox="0 0 24 24" style={{ width: '26px', height: '24.75px' }} className="icon">
    <path strokeWidth="2" fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
  </svg>
)

const Check = () => (
  <svg viewBox="0 0 14 14" style={{ width: '26px' }} className="icon">
    <g fill="currentColor">
      <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
    </g>
  </svg>
)

const Chevron = () => (
  <svg viewBox="0 0 40 40" style={{ width: '22px', height: '22px' }} className="icon animate-bounce">
    <g fill="currentColor">
      <path d="M35.3 12L20 21.8893L4.7 12L0 15.0445L20 28L40 15.0445L35.3 12Z" />
    </g>
  </svg>
)

const Icon = () => null

Icon.Github = Github
Icon.Loading = Loading
Icon.Info = Info
Icon.Copy = Copy
Icon.Send = Send
Icon.Check = Check
Icon.Chevron = Chevron

export default Icon
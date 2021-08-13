import { memo } from 'react'

interface LoadingIconProps {
  width?: string
  height?: string
}

const LoadingIcon: React.FC<LoadingIconProps> = memo(({ width, height }) => (
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
))

const CopyIcon = memo(() => (
  <svg viewBox="0 0 24 24" style={{ width: '26px' }} className="icon">
    <path fill="currentColor" d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path>
  </svg>
))

const ArrowRightIcon = () => (
  <svg viewBox="0 0 24 24" style={{ width: '26px', height: '26px' }} className="icon">
    <path strokeWidth="2" fill="currentColor" d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path>
  </svg>
)

const CheckIcon = memo(() => (
  <svg viewBox="0 0 14 14" style={{ width: '26px' }} className="icon">
    <g fill="currentColor">
      <polygon points="5.5 11.9993304 14 3.49933039 12.5 2 5.5 8.99933039 1.5 4.9968652 0 6.49933039"></polygon>
    </g>
  </svg>
))

const ChevronDownIcon = () => (
  <svg viewBox="0 0 40 40" style={{ width: '22px', height: '22px' }} className="icon animate-bounce">
    <g fill="currentColor">
      <path d="M35.3 12L20 21.8893L4.7 12L0 15.0445L20 28L40 15.0445L35.3 12Z" />
    </g>
  </svg>
)

const ChevronRightIcon = memo(() => (
  <svg viewBox="0 0 24 24" className="icon">
    <path fill="currentColor" d="M8.90283 4L7 5.88L13.1808 12L7 18.12L8.90283 20L17 12L8.90283 4Z" />
  </svg>
))

const ChevronLeftIcon = memo(() => (
  <svg viewBox="0 0 24 24" className="icon">
    <path fill="currentColor" d="M17 5.88L15.0972 4L7 12L15.0972 20L17 18.12L10.8192 12L17 5.88Z" />
  </svg>
))

LoadingIcon.displayName = 'LoadingIcon'
CopyIcon.displayName = 'CopyIcon'
CheckIcon.displayName = 'CheckIcon'
ChevronRightIcon.displayName = 'ChevronRightIcon'
ChevronLeftIcon.displayName = 'ChevronLeftIcon'

export {
  LoadingIcon,
  CopyIcon,
  CheckIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon
}
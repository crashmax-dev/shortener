import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import { Check } from './Icons'

interface ClipboardProps {
  text: string
  className?: string
}

const Clipboard: React.FC<ClipboardProps> = ({ text, className, children }) => {
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    if (!copied) {
      setCopied(true)
      setTimeout(() => {
        setCopied(false)
      }, 1000)
    }
  }

  return (
    <CopyToClipboard
      text={text}
      onCopy={onCopy}
    >
      <button className={className}>
        {copied ? <Check /> : children}
      </button>
    </CopyToClipboard>
  )
}

export default Clipboard
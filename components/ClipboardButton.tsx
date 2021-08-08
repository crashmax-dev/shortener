import React, { useState } from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import Icon from './Icons'

interface ClipboardButtonProps {
  text: string
  className?: string
}

const Clipboard: React.FC<ClipboardButtonProps> = ({ text, className }) => {
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
        {copied ? <Icon.Check /> : <Icon.Copy />}
      </button>
    </CopyToClipboard>
  )
}

export default Clipboard
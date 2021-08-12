import Icon from '~/components/Icons'
import { findUrl } from './api/shortener'
import { NextPage } from 'next'

const Slug: NextPage = () => {
  return (
    <div className="header-container">
      <Icon.Loading width="46px" height="46px" />
    </div>
  )
}

Slug.getInitialProps = async ({ res, query }) => {
  const data = await findUrl(query.slug as string)
  const location = data ? data.url : '/'

  res.writeHead(307, {
    Location: location
  }).end()
}

export default Slug
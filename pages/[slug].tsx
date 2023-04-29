import { LoadingIcon } from '~/components/Icons'
import { findUrl } from './api/shortener'
import { NextPage } from 'next'

const Slug: NextPage = () => {
  return (
    <div className="header-container">
      <LoadingIcon width="46px" height="46px" />
    </div>
  )
}

Slug.getInitialProps = async (ctx) => {
  const data = await findUrl(ctx.query.slug as string)
  const location = data ? data.url : '/'

  ctx.res!.writeHead(301, {
    Location: location
  }).end()
}

export default Slug

import Icon from '~/components/Icons'
import { findUrl } from './api/shortener'

export default function Slug() {
  return (
    <div className="header-container">
      <Icon.Loading width="46px" height="46px" />
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true
  }
}

export async function getStaticProps({ params }) {
  const data = await findUrl(params.slug)
  const destination = data ? data.url : '/'

  return {
    props: {
      data
    },
    redirect: {
      destination
    }
  }
}
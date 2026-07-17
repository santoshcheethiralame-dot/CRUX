import { useLocation } from 'react-router-dom'

// Layout/Sidebar render ABOVE <Routes>, so useParams() is empty there.
// useLocation() works anywhere inside the router, so derive route info from the path.
export function useRouteInfo() {
  const { pathname } = useLocation()
  const m = /^\/s\/([^/]+)(?:\/u\/(\d+))?(?:\/t\/([^/]+))?/.exec(pathname)
  return {
    subject: m?.[1],
    unit: m?.[2] ? Number(m[2]) : undefined,
    slug: m?.[3],
  }
}

import { Link, Outlet, useLocation } from 'react-router-dom'
import styles from '../styles/User.module.scss'
import links from '../lib/links'

const User = () => {
  const location = useLocation()

  const activeClass = (url: string): string => {
    return location.pathname === url ? styles.active : ''
  }

  return (
    <div>
      <h1>User</h1>
      <nav className={styles.nav}>
        {links.map((link) => (
          <Link key={link.id} to={link.url} className={activeClass(link.url)}>
            {link.label}
          </Link>
        ))}
      </nav>

      <Outlet />
    </div>
  )
}

export default User

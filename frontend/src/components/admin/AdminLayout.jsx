import { useNavigate } from 'react-router-dom'
import {
  SIDEBAR_ITEMS,
  SIDEBAR_STYLES as S,
  getNavItemStyle,
  ADMIN_PAGE_STYLE,
  TOPBAR_STYLE,
} from '../../constants/admin'

const ToothIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/>
  </svg>
)

export default function AdminLayout({ pageLabel, topBarRight, children }) {
  const navigate = useNavigate()

  return (
    <div style={ADMIN_PAGE_STYLE}>
      {/* Sidebar */}
      <aside style={S.wrap}>
        <div style={S.logo}>
          <div style={S.logoBox}><ToothIcon /></div>
        </div>
        <div style={S.sub}>
          <p style={S.subTop}>Dashboard</p>
          <p style={S.subBot}>Home / {pageLabel}</p>
        </div>
        {SIDEBAR_ITEMS.map(item => (
          <div key={item.path} onClick={() => navigate(item.path)} style={getNavItemStyle(item)}>
            {item.label}
          </div>
        ))}
        <div style={S.logout}>
          <button onClick={() => { localStorage.removeItem('currentUser'); navigate('/login') }} style={S.logBtn}>
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        <div style={TOPBAR_STYLE}>
          <div>
            <p style={{ fontSize: 11, color: '#8a9fc4' }}>Dashboard</p>
            <p style={{ fontSize: 13, fontWeight: 600, color: '#0d1b3e' }}>Home / {pageLabel}</p>
          </div>
          {topBarRight && <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>{topBarRight}</div>}
        </div>
        <div style={{ padding: 24, flex: 1, overflowY: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

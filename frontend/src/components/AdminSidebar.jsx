import { useNavigate, useLocation } from 'react-router-dom'
import '../pages/admin/Dashboard.css'

const sidebarItems = [
  { label: 'Dashboard',   path: '/admin'               },
  { label: 'Schedule',    path: '/admin/schedule'      },
  { label: 'Employees',   path: '/admin/dentists'      },
  { label: 'Appointment', path: '/admin/appointments'  },
  { label: 'Record',      path: '/admin/users'         },
  { label: 'Setting',     path: '/admin/AdminSetting'  },
]

export default function AdminSidebar({ pageTitle, pageSubtitle, children }) {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <div className="ad-wrap">
      <aside className="ad-sidebar">
        <div className="ad-sidebar-logo">
          <div className="ad-logo-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2C8 2 5 5 5 9c0 2 .5 4 1.5 5.5L8 20h8l1.5-5.5C18.5 13 19 11 19 9c0-4-3-7-7-7z"/>
            </svg>
          </div>
        </div>
        <div className="ad-sidebar-label">
          <p className="ad-sidebar-top">Dashboard</p>
          <p className="ad-sidebar-sub">{pageSubtitle || 'Admin'}</p>
        </div>
        <nav className="ad-sidebar-nav">
          {sidebarItems.map(item => (
            <div
              key={item.path}
              className={`ad-nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => navigate(item.path)}
            >
              {item.label}
            </div>
          ))}
        </nav>
        <div style={{ padding: '0 16px', marginTop: 'auto' }}>
          <button className="ad-logout-btn" onClick={() => { localStorage.removeItem('token'); navigate('/login') }}>
            Logout
          </button>
        </div>
      </aside>

      <div className="ad-content">
        <div className="ad-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div>
              <p className="ad-topbar-title">{pageTitle || 'Dashboard'}</p>
              <p className="ad-topbar-sub">{pageSubtitle || 'Admin'}</p>
            </div>
          </div>
          <div className="ad-topbar-right">
            <button className="ad-signin-btn" onClick={() => { localStorage.removeItem('token'); navigate('/login') }}>
              Sign Out
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

import { useNavigate, useLocation } from 'react-router-dom'
import '../pages/admin/Dashboard.css'
import { LOGO_URL } from '../constants'
import { supabase } from '../config/supabaseClient'

const sidebarItems = [
  { label: 'Dashboard',   path: '/admin'               },
  { label: 'Schedule',    path: '/admin/schedule'      },
  { label: 'Employees',   path: '/admin/dentists'      },
  { label: 'Appointment', path: '/admin/appointments'  },
  { label: 'Record',      path: '/admin/users'         },
  { label: 'Concerns',    path: '/admin/concerns'      },
  { label: 'Setting',     path: '/admin/AdminSetting'  },
]

export default function AdminSidebar({ pageTitle, pageSubtitle, children }) {
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = async () => {
    await supabase.auth.signOut()
    navigate('/login')
  }

  return (
    <div className="ad-wrap">
      <aside className="ad-sidebar">
        <div className="ad-sidebar-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={LOGO_URL} alt="ToothTime logo" style={{ width: 44, height: 44, objectFit: 'contain' }} />
          <span style={{ fontSize: '20px', fontWeight: 600, color: '#fff' }}>ToothTime</span>
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
          <button className="ad-logout-btn" onClick={handleLogout}>
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
            <button className="ad-signin-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        </div>

        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
          {children}
        </div>
      </div>
    </div>
  )
}

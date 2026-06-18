export const SIDEBAR_ITEMS = [
  { label: 'Dashboard',   path: '/admin'              },
  { label: 'Schedule',    path: '/admin/schedule'     },
  { label: 'Employees',   path: '/admin/dentists'     },
  { label: 'Appointment', path: '/admin/appointments' },
  { label: 'Record',      path: '/admin/users'        },
  { label: 'Setting',     path: '/admin/reports'      },
]

export const STATUS_COLORS = {
  pending:   '#f5c842',
  confirmed: '#4ecdc4',
  cancelled: '#ff6b6b',
  done:      '#64c864',
  Pending:   '#f5c842',
  Confirmed: '#4ecdc4',
  Cancelled: '#ff6b6b',
  Done:      '#64c864',
}

export const STATUS_BADGE_STYLES = {
  Confirmed: { color: '#4ecdc4', bg: 'rgba(78,205,196,0.08)',  border: '#4ecdc4' },
  confirmed: { color: '#4ecdc4', bg: 'rgba(78,205,196,0.08)',  border: '#4ecdc4' },
  Pending:   { color: '#f5c842', bg: 'rgba(245,200,66,0.08)',  border: '#f5c842' },
  pending:   { color: '#f5c842', bg: 'rgba(245,200,66,0.08)',  border: '#f5c842' },
  Cancelled: { color: '#ff6b6b', bg: 'rgba(255,107,107,0.08)', border: '#ff6b6b' },
  cancelled: { color: '#ff6b6b', bg: 'rgba(255,107,107,0.08)', border: '#ff6b6b' },
  Done:      { color: '#64c864', bg: 'rgba(100,200,100,0.08)', border: '#64c864' },
  done:      { color: '#64c864', bg: 'rgba(100,200,100,0.08)', border: '#64c864' },
}

export const SIDEBAR_STYLES = {
  wrap:    { width: 180, background: '#0d1b3e', display: 'flex', flexDirection: 'column', flexShrink: 0, paddingBottom: 24 },
  logo:    { padding: '20px 20px 16px', borderBottom: '1px solid #243560' },
  logoBox: { background: '#4ecdc4', borderRadius: 10, width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#0d1b3e' },
  sub:     { padding: '14px 20px 10px', borderBottom: '1px solid #243560' },
  subTop:  { fontSize: 10, color: '#8a9fc4', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 2 },
  subBot:  { fontSize: 11, color: '#4ecdc4', fontWeight: 500 },
  logout:  { marginTop: 'auto', padding: '0 16px' },
  logBtn:  { width: '100%', background: 'rgba(255,107,107,0.1)', border: '1px solid rgba(255,107,107,0.25)', color: '#ff6b6b', padding: 9, borderRadius: 8, fontSize: 12, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" },
}

export const getNavItemStyle = (item) => ({
  padding: '11px 20px',
  fontSize: 13,
  cursor: 'pointer',
  transition: 'all 0.2s',
  background: window.location.pathname === item.path ? 'rgba(78,205,196,0.1)' : 'transparent',
  borderLeft: window.location.pathname === item.path ? '3px solid #4ecdc4' : '3px solid transparent',
  color: window.location.pathname === item.path ? '#4ecdc4' : '#8a9fc4',
})

export const ADMIN_PAGE_STYLE = {
  display: 'flex', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif", background: '#f0f2f5'
}

export const TOPBAR_STYLE = {
  background: '#fff', borderBottom: '1px solid #e8ecf0', padding: '12px 24px',
  display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexShrink: 0
}

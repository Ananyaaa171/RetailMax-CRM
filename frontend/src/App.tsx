import { useEffect, useState } from 'react'
import './App.css'

type Customer = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
}

type Lead = {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  source: string
  status: string
  score: number
}

type Deal = {
  id: number
  title: string
  customerId: number
  amount: number
  stage: string
  probability: number
}

const menuItems = [
  { name: 'Dashboard', icon: '▦', count: '' },
  { name: 'Customers', icon: '◯', count: '12' },
  { name: 'Leads', icon: '◇', count: '13' },
  { name: 'Deals', icon: '◆', count: '15' },
  { name: 'Tasks', icon: '✓', count: '13' },
  { name: 'Campaigns', icon: '✦', count: '' },
  { name: 'Notifications', icon: '♧', count: '6' },
  { name: 'Users & Settings', icon: '⚙', count: '' },
]

function Dashboard() {
  return (
      <div className="module-page">

        <div className="module-heading">
          <div>
            <h1>Dashboard</h1>
            <p>Overview of your CRM activity.</p>
          </div>
        </div>

        <section className="stats">

          <div className="stat-card">
            <div className="stat-icon customer-icon">◯</div>
            <div>
              <p>Total Customers</p>
              <h2>12</h2>
              <span>Customer accounts</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon lead-icon">◇</div>
            <div>
              <p>Total Leads</p>
              <h2>13</h2>
              <span>Current leads</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon deal-icon">◆</div>
            <div>
              <p>Total Deals</p>
              <h2>15</h2>
              <span>Sales opportunities</span>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon revenue-icon">₹</div>
            <div>
              <p>Pipeline Value</p>
              <h2>₹27.8L</h2>
              <span>Total deal value</span>
            </div>
          </div>

        </section>

        <section className="section">

          <div className="section-header">
            <div>
              <h2>Sales Pipeline</h2>
              <p>Deals currently in the sales process</p>
            </div>
          </div>

          <div className="pipeline">

            <div className="stage new">
              <div className="stage-header">
                <span>NEW</span>
                <b>1</b>
              </div>

              <div className="deal-card">
                <p>HomeNeeds</p>
                <h3>Automation Package</h3>
                <strong>₹1.45L</strong>

                <div className="deal-line">
                  <span>Probability</span>
                  <span>20%</span>
                </div>

                <div className="progress">
                  <div style={{ width: '20%' }} />
                </div>
              </div>
            </div>

            <div className="stage qualified">
              <div className="stage-header">
                <span>QUALIFIED</span>
                <b>2</b>
              </div>

              <div className="deal-card">
                <p>FreshBasket</p>
                <h3>Enterprise Plan</h3>
                <strong>₹3.20L</strong>

                <div className="deal-line">
                  <span>Probability</span>
                  <span>40%</span>
                </div>

                <div className="progress">
                  <div style={{ width: '40%' }} />
                </div>
              </div>

              <div className="deal-card">
                <p>GreenBasket</p>
                <h3>Customer Platform</h3>
                <strong>₹1.65L</strong>

                <div className="deal-line">
                  <span>Probability</span>
                  <span>45%</span>
                </div>

                <div className="progress">
                  <div style={{ width: '45%' }} />
                </div>
              </div>
            </div>

            <div className="stage proposal">
              <div className="stage-header">
                <span>PROPOSAL</span>
                <b>3</b>
              </div>

              <div className="deal-card">
                <p>StyleHub</p>
                <h3>CRM Upgrade</h3>
                <strong>₹1.80L</strong>

                <div className="deal-line">
                  <span>Probability</span>
                  <span>60%</span>
                </div>

                <div className="progress">
                  <div style={{ width: '60%' }} />
                </div>
              </div>

              <div className="deal-card">
                <p>DailyNeeds</p>
                <h3>Sales Suite</h3>
                <strong>₹2.10L</strong>

                <div className="deal-line">
                  <span>Probability</span>
                  <span>65%</span>
                </div>

                <div className="progress">
                  <div style={{ width: '65%' }} />
                </div>
              </div>

              <div className="deal-card">
                <p>Lifestyle Store</p>
                <h3>CRM Solution</h3>
                <strong>₹2.25L</strong>

                <div className="deal-line">
                  <span>Probability</span>
                  <span>55%</span>
                </div>

                <div className="progress">
                  <div style={{ width: '55%' }} />
                </div>
              </div>
            </div>

            <div className="stage negotiation">
              <div className="stage-header">
                <span>NEGOTIATION</span>
                <b>2</b>
              </div>

              <div className="deal-card">
                <p>TechWorld</p>
                <h3>Premium CRM</h3>
                <strong>₹4.50L</strong>

                <div className="deal-line">
                  <span>Probability</span>
                  <span>80%</span>
                </div>

                <div className="progress">
                  <div style={{ width: '80%' }} />
                </div>
              </div>

              <div className="deal-card">
                <p>UrbanMart</p>
                <h3>Annual Package</h3>
                <strong>₹2.50L</strong>

                <div className="deal-line">
                  <span>Probability</span>
                  <span>75%</span>
                </div>

                <div className="progress">
                  <div style={{ width: '75%' }} />
                </div>
              </div>
            </div>

          </div>

        </section>

      </div>
  )
}

function CustomersPage() {

  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {

    fetch('http://localhost:8081/api/customers')
        .then((response) => {

          if (!response.ok) {
            throw new Error('Failed to load customers')
          }

          return response.json()
        })
        .then((data) => {
          setCustomers(data)
          setLoading(false)
        })
        .catch(() => {
          setError('Could not connect to the backend.')
          setLoading(false)
        })

  }, [])

  const filteredCustomers = customers.filter((customer) => {

    const text = `
      ${customer.firstName}
      ${customer.lastName}
      ${customer.email}
      ${customer.phone}
      ${customer.company}
    `.toLowerCase()

    return text.includes(search.toLowerCase())
  })

  return (
      <div className="module-page">

        <div className="module-heading">
          <div>
            <h1>Customers</h1>
            <p>View and manage your customer information.</p>
          </div>

          <button className="primary-button">
            + Add Customer
          </button>
        </div>

        <div className="customer-stats">

          <div>
            <span>Total Customers</span>
            <strong>{customers.length}</strong>
          </div>

          <div>
            <span>Companies</span>
            <strong>
              {new Set(
                  customers
                      .map((customer) => customer.company)
                      .filter(Boolean)
              ).size}
            </strong>
          </div>

          <div>
            <span>With Phone</span>
            <strong>
              {customers.filter((customer) => customer.phone).length}
            </strong>
          </div>

          <div>
            <span>With Email</span>
            <strong>
              {customers.filter((customer) => customer.email).length}
            </strong>
          </div>

        </div>

        <div className="customer-table-card">

          <div className="table-header">

            <div>
              <h2>Customer List</h2>
              <p>Customers stored in RetailMax</p>
            </div>

            <input
                className="table-search"
                placeholder="Search customers..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {loading && (
              <div className="table-message">
                Loading customers...
              </div>
          )}

          {error && (
              <div className="table-error">
                {error}
              </div>
          )}

          {!loading && !error && (
              <div className="table-wrapper">

                <table>

                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Customer</th>
                    <th>Company</th>
                    <th>Email</th>
                    <th>Phone</th>
                  </tr>
                  </thead>

                  <tbody>

                  {filteredCustomers.map((customer) => (
                      <tr key={customer.id}>

                        <td>
                      <span className="customer-id">
                        #{customer.id}
                      </span>
                        </td>

                        <td>

                          <div className="customer-name">

                            <div className="customer-avatar">
                              {customer.firstName?.charAt(0)}
                              {customer.lastName?.charAt(0)}
                            </div>

                            <div>
                              <strong>
                                {customer.firstName} {customer.lastName}
                              </strong>

                              <small>
                                Customer
                              </small>
                            </div>

                          </div>

                        </td>

                        <td>
                          {customer.company || '—'}
                        </td>

                        <td>
                          {customer.email || '—'}
                        </td>

                        <td>
                          {customer.phone || '—'}
                        </td>

                      </tr>
                  ))}

                  </tbody>

                </table>

              </div>
          )}

        </div>

      </div>
  )
}

function LeadsPage() {

  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {

    fetch('http://localhost:8081/api/leads')
        .then((response) => {

          if (!response.ok) {
            throw new Error('Failed to load leads')
          }

          return response.json()
        })
        .then((data) => {
          setLeads(data)
          setLoading(false)
        })
        .catch(() => {
          setError('Could not connect to the backend.')
          setLoading(false)
        })

  }, [])

  const filteredLeads = leads.filter((lead) => {

    const text = `
      ${lead.firstName}
      ${lead.lastName}
      ${lead.email}
      ${lead.phone}
      ${lead.source}
      ${lead.status}
    `.toLowerCase()

    return text.includes(search.toLowerCase())
  })

  const getStatusStyle = (status: string) => {

    if (status === 'VERY_HOT') {
      return {
        background: '#fbecef',
        color: '#c34e6c',
      }
    }

    if (status === 'HOT') {
      return {
        background: '#fff4df',
        color: '#c78316',
      }
    }

    if (status === 'QUALIFIED') {
      return {
        background: '#e5f7f8',
        color: '#15939d',
      }
    }

    if (status === 'CONVERTED') {
      return {
        background: '#e7f7ef',
        color: '#239d78',
      }
    }

    return {
      background: '#f0f1f4',
      color: '#707586',
    }
  }

  return (
      <div className="module-page">

        <div className="module-heading">

          <div>
            <h1>Leads</h1>
            <p>Track and manage potential customers.</p>
          </div>

          <button className="primary-button">
            + Add Lead
          </button>

        </div>

        <div className="customer-stats">

          <div>
            <span>Total Leads</span>
            <strong>{leads.length}</strong>
          </div>

          <div>
            <span>Very Hot</span>
            <strong>
              {leads.filter(
                  (lead) => lead.status === 'VERY_HOT'
              ).length}
            </strong>
          </div>

          <div>
            <span>Hot</span>
            <strong>
              {leads.filter(
                  (lead) => lead.status === 'HOT'
              ).length}
            </strong>
          </div>

          <div>
            <span>Qualified</span>
            <strong>
              {leads.filter(
                  (lead) => lead.status === 'QUALIFIED'
              ).length}
            </strong>
          </div>

        </div>

        <div className="customer-table-card">

          <div className="table-header">

            <div>
              <h2>Lead List</h2>
              <p>Leads stored in RetailMax</p>
            </div>

            <input
                className="table-search"
                placeholder="Search leads..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {loading && (
              <div className="table-message">
                Loading leads...
              </div>
          )}

          {error && (
              <div className="table-error">
                {error}
              </div>
          )}

          {!loading && !error && (
              <div className="table-wrapper">

                <table>

                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Lead</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Source</th>
                    <th>Score</th>
                    <th>Status</th>
                  </tr>
                  </thead>

                  <tbody>

                  {filteredLeads.map((lead) => (
                      <tr key={lead.id}>

                        <td>
                      <span className="customer-id">
                        #{lead.id}
                      </span>
                        </td>

                        <td>

                          <div className="customer-name">

                            <div className="customer-avatar">
                              {lead.firstName?.charAt(0)}
                              {lead.lastName?.charAt(0)}
                            </div>

                            <div>
                              <strong>
                                {lead.firstName} {lead.lastName}
                              </strong>

                              <small>
                                Lead
                              </small>
                            </div>

                          </div>

                        </td>

                        <td>
                          {lead.email || '—'}
                        </td>

                        <td>
                          {lead.phone || '—'}
                        </td>

                        <td>
                          {lead.source || '—'}
                        </td>

                        <td>
                          <strong>
                            {lead.score}
                          </strong>
                        </td>

                        <td>

                      <span
                          style={{
                            ...getStatusStyle(lead.status),
                            display: 'inline-block',
                            padding: '5px 8px',
                            borderRadius: '12px',
                            fontSize: '8px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                          }}
                      >
                        {lead.status?.replace('_', ' ')}
                      </span>

                        </td>

                      </tr>
                  ))}

                  </tbody>

                </table>

              </div>
          )}

        </div>

      </div>
  )
}

function DealsPage() {

  const [deals, setDeals] = useState<Deal[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  useEffect(() => {

    fetch('http://localhost:8081/api/deals')
        .then((response) => {

          if (!response.ok) {
            throw new Error('Failed to load deals')
          }

          return response.json()
        })
        .then((data) => {
          setDeals(data)
          setLoading(false)
        })
        .catch(() => {
          setError('Could not connect to the backend.')
          setLoading(false)
        })

  }, [])

  const filteredDeals = deals.filter((deal) => {

    const text = `
      ${deal.title}
      ${deal.stage}
      ${deal.customerId}
      ${deal.amount}
    `.toLowerCase()

    return text.includes(search.toLowerCase())
  })

  const totalValue = deals.reduce(
      (total, deal) => total + Number(deal.amount || 0),
      0
  )

  const wonDeals = deals.filter(
      (deal) => deal.stage === 'WON'
  )

  const negotiationDeals = deals.filter(
      (deal) => deal.stage === 'NEGOTIATION'
  )

  const getStageStyle = (stage: string) => {

    if (stage === 'WON') {
      return {
        background: '#e7f7ef',
        color: '#239d78',
      }
    }

    if (stage === 'LOST') {
      return {
        background: '#fbecef',
        color: '#c34e6c',
      }
    }

    if (stage === 'NEGOTIATION') {
      return {
        background: '#fff4df',
        color: '#c78316',
      }
    }

    if (stage === 'PROPOSAL') {
      return {
        background: '#f0edff',
        color: '#6655bd',
      }
    }

    if (stage === 'QUALIFIED') {
      return {
        background: '#e5f7f8',
        color: '#15939d',
      }
    }

    return {
      background: '#f0f1f4',
      color: '#707586',
    }
  }

  const formatAmount = (amount: number) => {
    return `₹${Number(amount).toLocaleString('en-IN')}`
  }

  return (
      <div className="module-page">

        <div className="module-heading">

          <div>
            <h1>Deals</h1>
            <p>Manage sales opportunities and deal stages.</p>
          </div>

          <button className="primary-button">
            + Add Deal
          </button>

        </div>

        <div className="customer-stats">

          <div>
            <span>Total Deals</span>
            <strong>{deals.length}</strong>
          </div>

          <div>
            <span>Pipeline Value</span>
            <strong>
              ₹{totalValue.toLocaleString('en-IN')}
            </strong>
          </div>

          <div>
            <span>Won Deals</span>
            <strong>{wonDeals.length}</strong>
          </div>

          <div>
            <span>Negotiations</span>
            <strong>{negotiationDeals.length}</strong>
          </div>

        </div>

        <div className="customer-table-card">

          <div className="table-header">

            <div>
              <h2>Deal List</h2>
              <p>Sales opportunities stored in RetailMax</p>
            </div>

            <input
                className="table-search"
                placeholder="Search deals..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          {loading && (
              <div className="table-message">
                Loading deals...
              </div>
          )}

          {error && (
              <div className="table-error">
                {error}
              </div>
          )}

          {!loading && !error && (
              <div className="table-wrapper">

                <table>

                  <thead>
                  <tr>
                    <th>ID</th>
                    <th>Deal</th>
                    <th>Customer ID</th>
                    <th>Amount</th>
                    <th>Stage</th>
                    <th>Probability</th>
                  </tr>
                  </thead>

                  <tbody>

                  {filteredDeals.map((deal) => (
                      <tr key={deal.id}>

                        <td>
                      <span className="customer-id">
                        #{deal.id}
                      </span>
                        </td>

                        <td>

                          <div className="customer-name">

                            <div className="customer-avatar">
                              ◆
                            </div>

                            <div>
                              <strong>
                                {deal.title}
                              </strong>

                              <small>
                                Sales Opportunity
                              </small>
                            </div>

                          </div>

                        </td>

                        <td>
                          Customer #{deal.customerId}
                        </td>

                        <td>
                          <strong>
                            {formatAmount(deal.amount)}
                          </strong>
                        </td>

                        <td>

                      <span
                          style={{
                            ...getStageStyle(deal.stage),
                            display: 'inline-block',
                            padding: '5px 8px',
                            borderRadius: '12px',
                            fontSize: '8px',
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                          }}
                      >
                        {deal.stage}
                      </span>

                        </td>

                        <td>

                          <div
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '7px',
                              }}
                          >

                            <div
                                style={{
                                  width: '65px',
                                  height: '5px',
                                  background: '#eceef2',
                                  borderRadius: '5px',
                                  overflow: 'hidden',
                                }}
                            >

                              <div
                                  style={{
                                    width: `${deal.probability}%`,
                                    height: '100%',
                                    background: '#5144ae',
                                    borderRadius: '5px',
                                  }}
                              />

                            </div>

                            <span>
                          {deal.probability}%
                        </span>

                          </div>

                        </td>

                      </tr>
                  ))}

                  </tbody>

                </table>

              </div>
          )}

        </div>

      </div>
  )
}

function ModulePage({ page }: { page: string }) {

  const descriptions: Record<string, string> = {
    Tasks: 'Manage follow-ups and scheduled activities.',
    Campaigns: 'Manage marketing campaigns and results.',
    Notifications: 'View important CRM notifications.',
    'Users & Settings': 'Manage system users and settings.',
  }

  const icons: Record<string, string> = {
    Tasks: '✓',
    Campaigns: '✦',
    Notifications: '♧',
    'Users & Settings': '⚙',
  }

  return (
      <div className="module-page">

        <div className="module-heading">

          <div>
            <h1>{page}</h1>
            <p>{descriptions[page]}</p>
          </div>

          <button className="primary-button">
            + Add New
          </button>

        </div>

        <div className="module-content">

          <div className="module-icon">
            {icons[page]}
          </div>

          <h2>{page}</h2>

          <p>
            This module will display data from the RetailMax backend.
          </p>

          <button className="primary-button">
            Open {page}
          </button>

        </div>

      </div>
  )
}

function App() {

  const [activePage, setActivePage] = useState('Dashboard')

  return (
      <div className="app">

        <aside className="sidebar">

          <div className="logo">

            <div className="logo-box">
              R
            </div>

            <div>
              <h2>
                Retail<span>Max</span>
              </h2>

              <p>CRM</p>
            </div>

          </div>

          <nav>

            <p className="menu-title">
              MAIN
            </p>

            {menuItems.slice(0, 5).map((item) => (

                <button
                    key={item.name}
                    className={`menu ${
                        activePage === item.name ? 'active' : ''
                    }`}
                    onClick={() => setActivePage(item.name)}
                >

              <span>
                {item.icon}
              </span>

                  {item.name}

                  {item.count && (
                      <small>
                        {item.count}
                      </small>
                  )}

                </button>

            ))}

            <p className="menu-title">
              MARKETING
            </p>

            {menuItems.slice(5, 7).map((item) => (

                <button
                    key={item.name}
                    className={`menu ${
                        activePage === item.name ? 'active' : ''
                    }`}
                    onClick={() => setActivePage(item.name)}
                >

              <span>
                {item.icon}
              </span>

                  {item.name}

                  {item.count && (
                      <small
                          className={
                            item.name === 'Notifications'
                                ? 'red'
                                : ''
                          }
                      >
                        {item.count}
                      </small>
                  )}

                </button>

            ))}

            <p className="menu-title">
              SYSTEM
            </p>

            {menuItems.slice(7).map((item) => (

                <button
                    key={item.name}
                    className={`menu ${
                        activePage === item.name ? 'active' : ''
                    }`}
                    onClick={() => setActivePage(item.name)}
                >

              <span>
                {item.icon}
              </span>

                  {item.name}

                </button>

            ))}

          </nav>

          <div className="user-box">

            <div className="user-avatar">
              SA
            </div>

            <div>
              <strong>
                System Admin
              </strong>

              <p>
                Administrator
              </p>
            </div>

          </div>

        </aside>

        <main className="main">

          <header className="header">

            <div>

              <h1>
                {activePage}
              </h1>

              <p>
                {activePage === 'Dashboard'
                    ? 'Overview of your CRM activity'
                    : `Manage your ${activePage.toLowerCase()}`}
              </p>

            </div>

            <div className="header-right">

              <div className="search">

              <span>
                ⌕
              </span>

                <input
                    type="text"
                    placeholder="Search..."
                />

              </div>

              <button className="header-icon">
                ♧
              </button>

              <div className="header-user">

                <div className="user-avatar small">
                  SA
                </div>

                <span>
                System Admin
              </span>

              </div>

            </div>

          </header>

          <div className="content">

            {activePage === 'Dashboard' && (
                <Dashboard />
            )}

            {activePage === 'Customers' && (
                <CustomersPage />
            )}

            {activePage === 'Leads' && (
                <LeadsPage />
            )}

            {activePage === 'Deals' && (
                <DealsPage />
            )}

            {activePage !== 'Dashboard' &&
                activePage !== 'Customers' &&
                activePage !== 'Leads' &&
                activePage !== 'Deals' && (
                    <ModulePage page={activePage} />
                )}

          </div>

        </main>

      </div>
  )
}

export default App
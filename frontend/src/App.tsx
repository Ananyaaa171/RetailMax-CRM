import React, { useEffect, useState } from 'react'
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
  dealName: string
  customerId: number
  amount: number
  stage: string
  probability: string
  expectedCloseDate?: string
}

type Task = {
  id: number
  title: string
  description?: string
  taskType: string
  status: string
  priority: string
  dueDate?: string
  customerId?: number
  dealId?: number
}

type Campaign = {
  id: number
  campaignName: string
  campaignType: string
  status: string
  targetAudience?: string
  startDate?: string
  endDate?: string
  budget: number
  targetLeads: number
  generatedLeads: number
  convertedLeads: number
  revenueGenerated: number
}

type Notification = {
  id: number
  title: string
  message: string
  type: string
  priority: string
  isRead: boolean
  customerId?: number
  dealId?: number
  taskId?: number
  createdAt?: string
}

type UserAccount = {
  id: number
  username: string
  email: string
  fullName: string
  role: string
  status: string
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


function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(20,20,30,.45)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20
    }}>
      <div style={{
        width: 'min(720px, 96vw)', maxHeight: '90vh', overflowY: 'auto',
        background: '#fff', borderRadius: 14, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ margin: 0 }}>{title}</h2>
          <button type="button" className="secondary-button" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 14 }}>{children}</div>
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600 }}>
      {label}
      {children}
    </label>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%', boxSizing: 'border-box', padding: '10px 12px', border: '1px solid #d9dbe3',
  borderRadius: 8, fontSize: 14, background: '#fff'
}

function ModalActions({ onClose, saving, label = 'Save Changes' }: { onClose: () => void; saving: boolean; label?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 22 }}>
      <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
      <button type="submit" className="primary-button" disabled={saving}>{saving ? 'Saving...' : label}</button>
    </div>
  )
}

async function apiRequest(path: string, options: RequestInit = {}) {
  const response = await fetch(`http://localhost:8081${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...(options.headers || {}) },
  })
  if (!response.ok) {
    const body = await response.text()
    throw new Error(body || `Request failed (${response.status})`)
  }
  if (response.status === 204) return null
  return response.json()
}

function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Customer | null>(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => {
    setLoading(true)
    apiRequest('/api/customers').then(setCustomers).catch(() => setError('Could not load customers.')).finally(() => setLoading(false))
  }
  useEffect(load, [])

  const remove = async (id: number) => {
    if (!window.confirm('Delete this customer?')) return
    try { await apiRequest(`/api/customers/${id}`, { method: 'DELETE' }); load() }
    catch { setError('Could not delete customer.') }
  }

  const save = async (form: Omit<Customer, 'id'>) => {
    try {
      if (editing) await apiRequest(`/api/customers/${editing.id}`, { method: 'PUT', body: JSON.stringify(form) })
      else await apiRequest('/api/customers', { method: 'POST', body: JSON.stringify(form) })
      setShowForm(false); setEditing(null); load()
    } catch { setError('Could not save customer.') }
  }

  const filtered = customers.filter(c => `${c.firstName} ${c.lastName} ${c.email} ${c.phone} ${c.company}`.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="module-page">
      <div className="module-heading"><div><h1>Customers</h1><p>View and manage your customer information.</p></div>
        <button className="primary-button" onClick={() => { setEditing(null); setShowForm(true) }}>+ Add Customer</button></div>
      <div className="customer-stats">
        <div><span>Total Customers</span><strong>{customers.length}</strong></div>
        <div><span>Companies</span><strong>{new Set(customers.map(c => c.company).filter(Boolean)).size}</strong></div>
        <div><span>With Phone</span><strong>{customers.filter(c => c.phone).length}</strong></div>
        <div><span>With Email</span><strong>{customers.filter(c => c.email).length}</strong></div>
      </div>
      <div className="customer-table-card">
        <div className="table-header"><div><h2>Customer List</h2><p>Changes are saved automatically.</p></div>
          <input className="table-search" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)} /></div>
        {loading && <div className="table-message">Loading customers...</div>}
        {error && <div className="table-error">{error}</div>}
        {!loading && <div className="table-wrapper"><table><thead><tr><th>ID</th><th>Customer</th><th>Company</th><th>Email</th><th>Phone</th><th>Actions</th></tr></thead>
          <tbody>{filtered.map(c => <tr key={c.id}>
            <td>#{c.id}</td><td><div className="customer-name"><div className="customer-avatar">{c.firstName?.[0]}{c.lastName?.[0]}</div><div><strong>{c.firstName} {c.lastName}</strong><small>Customer</small></div></div></td>
            <td>{c.company || '—'}</td><td>{c.email || '—'}</td><td>{c.phone || '—'}</td>
            <td><div style={{display:'flex',gap:6}}><button className="secondary-button" onClick={() => { setEditing(c); setShowForm(true) }}>Edit</button><button className="secondary-button" onClick={() => remove(c.id)}>Delete</button></div></td>
          </tr>)}</tbody></table></div>}
      </div>
      {showForm && <CustomerForm initial={editing} onClose={() => {setShowForm(false);setEditing(null)}} onSave={save} />}
    </div>
  )
}

function CustomerForm({ initial, onClose, onSave }: { initial: Customer | null; onClose: () => void; onSave: (data: Omit<Customer,'id'>) => Promise<void> }) {
  const [form, setForm] = useState<Omit<Customer,'id'>>({
    firstName: initial?.firstName || '', lastName: initial?.lastName || '', email: initial?.email || '',
    phone: initial?.phone || '', company: initial?.company || ''
  })
  const [saving, setSaving] = useState(false)
  const submit = async (e: React.FormEvent) => { e.preventDefault(); setSaving(true); try { await onSave(form) } finally { setSaving(false) } }
  const set = (key: keyof typeof form, value: string) => setForm({...form, [key]: value})
  return <Modal title={initial ? 'Edit Customer' : 'Add Customer'} onClose={onClose}><form onSubmit={submit}><FormGrid>
    <FormField label="First Name"><input required style={inputStyle} value={form.firstName} onChange={e=>set('firstName',e.target.value)} /></FormField>
    <FormField label="Last Name"><input required style={inputStyle} value={form.lastName} onChange={e=>set('lastName',e.target.value)} /></FormField>
    <FormField label="Email"><input type="email" style={inputStyle} value={form.email} onChange={e=>set('email',e.target.value)} /></FormField>
    <FormField label="Phone"><input style={inputStyle} value={form.phone} onChange={e=>set('phone',e.target.value)} /></FormField>
    <FormField label="Company"><input style={inputStyle} value={form.company} onChange={e=>set('company',e.target.value)} /></FormField>
  </FormGrid><ModalActions onClose={onClose} saving={saving} label={initial?'Update Customer':'Create Customer'} /></form></Modal>
}

function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true); const [error, setError] = useState(''); const [search, setSearch] = useState('')
  const [editing, setEditing] = useState<Lead|null>(null); const [showForm,setShowForm]=useState(false)
  const load=()=>{setLoading(true);apiRequest('/api/leads').then(setLeads).catch(()=>setError('Could not load leads.')).finally(()=>setLoading(false))}
  useEffect(load,[])
  const save=async(data:Omit<Lead,'id'>)=>{try{if(editing)await apiRequest(`/api/leads/${editing.id}`,{method:'PUT',body:JSON.stringify(data)});else await apiRequest('/api/leads',{method:'POST',body:JSON.stringify(data)});setShowForm(false);setEditing(null);load()}catch{setError('Could not save lead.')}}
  const remove=async(id:number)=>{if(!confirm('Delete this lead?'))return;try{await apiRequest(`/api/leads/${id}`,{method:'DELETE'});load()}catch{setError('Could not delete lead.')}}
  const calculate=async(id:number)=>{try{await apiRequest(`/api/leads/${id}/calculate-score`,{method:'POST'});load()}catch{setError('Could not calculate lead score.')}}
  const convert=async(id:number)=>{if(!confirm('Convert this lead into a customer?'))return;try{await apiRequest(`/api/leads/${id}/convert`,{method:'POST'});load()}catch{setError('Could not convert lead.')}}
  const filtered=leads.filter(l=>`${l.firstName} ${l.lastName} ${l.email} ${l.phone} ${l.source} ${l.status}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="module-page">
    <div className="module-heading"><div><h1>Leads</h1><p>Track and manage potential customers.</p></div><button className="primary-button" onClick={()=>{setEditing(null);setShowForm(true)}}>+ Add Lead</button></div>
    <div className="customer-stats"><div><span>Total Leads</span><strong>{leads.length}</strong></div><div><span>Very Hot</span><strong>{leads.filter(l=>l.status==='VERY_HOT').length}</strong></div><div><span>Hot</span><strong>{leads.filter(l=>l.status==='HOT').length}</strong></div><div><span>Qualified</span><strong>{leads.filter(l=>l.status==='QUALIFIED').length}</strong></div></div>
    <div className="customer-table-card"><div className="table-header"><div><h2>Lead List</h2><p>Changes are saved automatically.</p></div><input className="table-search" placeholder="Search leads..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      {loading&&<div className="table-message">Loading leads...</div>}{error&&<div className="table-error">{error}</div>}
      {!loading&&<div className="table-wrapper"><table><thead><tr><th>ID</th><th>Lead</th><th>Email</th><th>Source</th><th>Score</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {filtered.map(l=><tr key={l.id}><td>#{l.id}</td><td><div className="customer-name"><div className="customer-avatar">{l.firstName?.[0]}{l.lastName?.[0]}</div><div><strong>{l.firstName} {l.lastName}</strong><small>{l.phone}</small></div></div></td><td>{l.email||'—'}</td><td>{l.source||'—'}</td><td>{l.score}</td><td>{l.status?.replace(/_/g,' ')}</td>
          <td><div style={{display:'flex',gap:5,flexWrap:'wrap'}}><button className="secondary-button" onClick={()=>{setEditing(l);setShowForm(true)}}>Edit</button><button className="secondary-button" onClick={()=>calculate(l.id)}>Score</button><button className="secondary-button" onClick={()=>convert(l.id)}>Convert</button><button className="secondary-button" onClick={()=>remove(l.id)}>Delete</button></div></td>
        </tr>)}</tbody></table></div>}
    </div>
    {showForm&&<LeadForm initial={editing} onClose={()=>{setShowForm(false);setEditing(null)}} onSave={save}/>}
  </div>
}

function LeadForm({initial,onClose,onSave}:{initial:Lead|null;onClose:()=>void;onSave:(data:Omit<Lead,'id'>)=>Promise<void>}) {
  const [form,setForm]=useState<Omit<Lead,'id'>>({firstName:initial?.firstName||'',lastName:initial?.lastName||'',email:initial?.email||'',phone:initial?.phone||'',source:initial?.source||'Website',status:initial?.status||'NEW',score:initial?.score??0})
  const [saving,setSaving]=useState(false); const set=(k:keyof typeof form,v:string|number)=>setForm({...form,[k]:v})
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);try{await onSave(form)}finally{setSaving(false)}}
  return <Modal title={initial?'Edit Lead':'Add Lead'} onClose={onClose}><form onSubmit={submit}><FormGrid>
    <FormField label="First Name"><input required style={inputStyle} value={form.firstName} onChange={e=>set('firstName',e.target.value)}/></FormField>
    <FormField label="Last Name"><input required style={inputStyle} value={form.lastName} onChange={e=>set('lastName',e.target.value)}/></FormField>
    <FormField label="Email"><input type="email" style={inputStyle} value={form.email} onChange={e=>set('email',e.target.value)}/></FormField>
    <FormField label="Phone"><input style={inputStyle} value={form.phone} onChange={e=>set('phone',e.target.value)}/></FormField>
    <FormField label="Source"><select style={inputStyle} value={form.source} onChange={e=>set('source',e.target.value)}><option>Website</option><option>LinkedIn</option><option>Referral</option><option>Social Media</option><option>Other</option></select></FormField>
    <FormField label="Status"><select style={inputStyle} value={form.status} onChange={e=>set('status',e.target.value)}><option>NEW</option><option>QUALIFIED</option><option>HOT</option><option>VERY_HOT</option><option>CONVERTED</option></select></FormField>
    <FormField label="Score"><input type="number" min="0" max="100" style={inputStyle} value={form.score} onChange={e=>set('score',Number(e.target.value))}/></FormField>
  </FormGrid><ModalActions onClose={onClose} saving={saving} label={initial?'Update Lead':'Create Lead'}/></form></Modal>
}

function DealsPage() {
  const [deals,setDeals]=useState<Deal[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const [search,setSearch]=useState('')
  const [editing,setEditing]=useState<Deal|null>(null); const [showForm,setShowForm]=useState(false)
  const load=()=>{setLoading(true);apiRequest('/api/deals').then(setDeals).catch(()=>setError('Could not load deals.')).finally(()=>setLoading(false))}
  useEffect(load,[])
  const save=async(data:Omit<Deal,'id'>)=>{try{if(editing)await apiRequest(`/api/deals/${editing.id}`,{method:'PUT',body:JSON.stringify(data)});else await apiRequest('/api/deals',{method:'POST',body:JSON.stringify(data)});setShowForm(false);setEditing(null);load()}catch{setError('Could not save deal.')}}
  const remove=async(id:number)=>{if(!confirm('Delete this deal?'))return;try{await apiRequest(`/api/deals/${id}`,{method:'DELETE'});load()}catch{setError('Could not delete deal.')}}
  const filtered=deals.filter(d=>`${d.dealName} ${d.stage} ${d.customerId} ${d.amount}`.toLowerCase().includes(search.toLowerCase()))
  const total=deals.reduce((s,d)=>s+Number(d.amount||0),0)
  return <div className="module-page">
    <div className="module-heading"><div><h1>Deals</h1><p>Manage sales opportunities and deal stages.</p></div><button className="primary-button" onClick={()=>{setEditing(null);setShowForm(true)}}>+ Add Deal</button></div>
    <div className="customer-stats"><div><span>Total Deals</span><strong>{deals.length}</strong></div><div><span>Pipeline Value</span><strong>₹{total.toLocaleString('en-IN')}</strong></div><div><span>Won Deals</span><strong>{deals.filter(d=>d.stage==='WON').length}</strong></div><div><span>Negotiations</span><strong>{deals.filter(d=>d.stage==='NEGOTIATION').length}</strong></div></div>
    <div className="customer-table-card"><div className="table-header"><div><h2>Deal List</h2><p>Changes are saved automatically.</p></div><input className="table-search" placeholder="Search deals..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      {loading&&<div className="table-message">Loading deals...</div>}{error&&<div className="table-error">{error}</div>}
      {!loading&&<div className="table-wrapper"><table><thead><tr><th>ID</th><th>Deal</th><th>Customer</th><th>Amount</th><th>Stage</th><th>Probability</th><th>Actions</th></tr></thead><tbody>
      {filtered.map(d=><tr key={d.id}><td>#{d.id}</td><td><strong>{d.dealName}</strong></td><td>#{d.customerId}</td><td>₹{Number(d.amount||0).toLocaleString('en-IN')}</td><td>{d.stage}</td><td>{d.probability}</td><td><div style={{display:'flex',gap:5}}><button className="secondary-button" onClick={()=>{setEditing(d);setShowForm(true)}}>Edit</button><button className="secondary-button" onClick={()=>remove(d.id)}>Delete</button></div></td></tr>)}</tbody></table></div>}
    </div>
    {showForm&&<DealForm initial={editing} onClose={()=>{setShowForm(false);setEditing(null)}} onSave={save}/>}
  </div>
}

function DealForm({initial,onClose,onSave}:{initial:Deal|null;onClose:()=>void;onSave:(data:Omit<Deal,'id'>)=>Promise<void>}) {
  const [form,setForm]=useState<Omit<Deal,'id'>>({dealName:initial?.dealName||'',customerId:initial?.customerId||0,amount:initial?.amount||0,stage:initial?.stage||'PROSPECTING',probability:initial?.probability||'10%',expectedCloseDate:initial?.expectedCloseDate||''})
  const [saving,setSaving]=useState(false); const set=(k:keyof typeof form,v:string|number)=>setForm({...form,[k]:v})
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);try{await onSave(form)}finally{setSaving(false)}}
  return <Modal title={initial?'Edit Deal':'Add Deal'} onClose={onClose}><form onSubmit={submit}><FormGrid>
    <FormField label="Deal Name"><input required style={inputStyle} value={form.dealName} onChange={e=>set('dealName',e.target.value)}/></FormField>
    <FormField label="Customer ID"><input type="number" min="1" required style={inputStyle} value={form.customerId||''} onChange={e=>set('customerId',Number(e.target.value))}/></FormField>
    <FormField label="Amount"><input type="number" min="0" required style={inputStyle} value={form.amount} onChange={e=>set('amount',Number(e.target.value))}/></FormField>
    <FormField label="Stage"><select style={inputStyle} value={form.stage} onChange={e=>set('stage',e.target.value)}><option>PROSPECTING</option><option>QUALIFIED</option><option>PROPOSAL</option><option>NEGOTIATION</option><option>WON</option><option>LOST</option></select></FormField>
    <FormField label="Probability"><input style={inputStyle} value={form.probability} onChange={e=>set('probability',e.target.value)}/></FormField>
    <FormField label="Expected Close Date"><input type="date" style={inputStyle} value={form.expectedCloseDate||''} onChange={e=>set('expectedCloseDate',e.target.value)}/></FormField>
  </FormGrid><ModalActions onClose={onClose} saving={saving} label={initial?'Update Deal':'Create Deal'}/></form></Modal>
}

function TasksPage() {
  const [tasks,setTasks]=useState<Task[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const [search,setSearch]=useState('')
  const [editing,setEditing]=useState<Task|null>(null); const [showForm,setShowForm]=useState(false)
  const load=()=>{setLoading(true);apiRequest('/api/tasks').then(setTasks).catch(()=>setError('Could not load tasks.')).finally(()=>setLoading(false))}
  useEffect(load,[])
  const save=async(data:Omit<Task,'id'>)=>{try{if(editing)await apiRequest(`/api/tasks/${editing.id}`,{method:'PUT',body:JSON.stringify(data)});else await apiRequest('/api/tasks',{method:'POST',body:JSON.stringify(data)});setShowForm(false);setEditing(null);load()}catch{setError('Could not save task.')}}
  const remove=async(id:number)=>{if(!confirm('Delete this task?'))return;try{await apiRequest(`/api/tasks/${id}`,{method:'DELETE'});load()}catch{setError('Could not delete task.')}}
  const complete=async(id:number)=>{try{await apiRequest(`/api/tasks/${id}/complete`,{method:'PUT'});load()}catch{setError('Could not complete task.')}}
  const filtered=tasks.filter(t=>`${t.title} ${t.description||''} ${t.taskType} ${t.status} ${t.priority}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="module-page"><div className="module-heading"><div><h1>Tasks</h1><p>Manage follow-ups and scheduled activities.</p></div><button className="primary-button" onClick={()=>{setEditing(null);setShowForm(true)}}>+ Add Task</button></div>
    <div className="customer-stats"><div><span>Total Tasks</span><strong>{tasks.length}</strong></div><div><span>Pending</span><strong>{tasks.filter(t=>t.status!=='COMPLETED').length}</strong></div><div><span>Completed</span><strong>{tasks.filter(t=>t.status==='COMPLETED').length}</strong></div><div><span>High Priority</span><strong>{tasks.filter(t=>t.priority==='HIGH').length}</strong></div></div>
    <div className="customer-table-card"><div className="table-header"><div><h2>Task List</h2><p>Changes are saved automatically.</p></div><input className="table-search" placeholder="Search tasks..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      {loading&&<div className="table-message">Loading tasks...</div>}{error&&<div className="table-error">{error}</div>}
      {!loading&&<div className="table-wrapper"><table><thead><tr><th>ID</th><th>Task</th><th>Type</th><th>Due</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      {filtered.map(t=><tr key={t.id}><td>#{t.id}</td><td><strong>{t.title}</strong><small>{t.description}</small></td><td>{t.taskType}</td><td>{t.dueDate||'—'}</td><td>{t.priority}</td><td>{t.status}</td><td><div style={{display:'flex',gap:5,flexWrap:'wrap'}}><button className="secondary-button" onClick={()=>{setEditing(t);setShowForm(true)}}>Edit</button>{t.status!=='COMPLETED'&&<button className="secondary-button" onClick={()=>complete(t.id)}>Complete</button>}<button className="secondary-button" onClick={()=>remove(t.id)}>Delete</button></div></td></tr>)}</tbody></table></div>}
    </div>{showForm&&<TaskForm initial={editing} onClose={()=>{setShowForm(false);setEditing(null)}} onSave={save}/>}</div>
}

function TaskForm({initial,onClose,onSave}:{initial:Task|null;onClose:()=>void;onSave:(data:Omit<Task,'id'>)=>Promise<void>}) {
  const [form,setForm]=useState<Omit<Task,'id'>>({title:initial?.title||'',description:initial?.description||'',taskType:initial?.taskType||'FOLLOW_UP',status:initial?.status||'PENDING',priority:initial?.priority||'MEDIUM',dueDate:initial?.dueDate||'',customerId:initial?.customerId||undefined,dealId:initial?.dealId||undefined})
  const [saving,setSaving]=useState(false); const set=(k:keyof typeof form,v:any)=>setForm({...form,[k]:v})
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);try{await onSave(form)}finally{setSaving(false)}}
  return <Modal title={initial?'Edit Task':'Add Task'} onClose={onClose}><form onSubmit={submit}><FormGrid>
    <FormField label="Title"><input required style={inputStyle} value={form.title} onChange={e=>set('title',e.target.value)}/></FormField>
    <FormField label="Type"><select style={inputStyle} value={form.taskType} onChange={e=>set('taskType',e.target.value)}><option>FOLLOW_UP</option><option>CALL</option><option>MEETING</option><option>EMAIL</option><option>OTHER</option></select></FormField>
    <FormField label="Description"><textarea style={{...inputStyle,minHeight:80}} value={form.description||''} onChange={e=>set('description',e.target.value)}/></FormField>
    <FormField label="Due Date"><input type="date" style={inputStyle} value={form.dueDate||''} onChange={e=>set('dueDate',e.target.value)}/></FormField>
    <FormField label="Priority"><select style={inputStyle} value={form.priority} onChange={e=>set('priority',e.target.value)}><option>LOW</option><option>MEDIUM</option><option>HIGH</option></select></FormField>
    <FormField label="Status"><select style={inputStyle} value={form.status} onChange={e=>set('status',e.target.value)}><option>PENDING</option><option>IN_PROGRESS</option><option>COMPLETED</option><option>CANCELLED</option></select></FormField>
    <FormField label="Customer ID"><input type="number" style={inputStyle} value={form.customerId||''} onChange={e=>set('customerId',e.target.value?Number(e.target.value):undefined)}/></FormField>
    <FormField label="Deal ID"><input type="number" style={inputStyle} value={form.dealId||''} onChange={e=>set('dealId',e.target.value?Number(e.target.value):undefined)}/></FormField>
  </FormGrid><ModalActions onClose={onClose} saving={saving} label={initial?'Update Task':'Create Task'}/></form></Modal>
}

function CampaignsPage() {
  const [items,setItems]=useState<Campaign[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const [search,setSearch]=useState('')
  const [editing,setEditing]=useState<Campaign|null>(null); const [showForm,setShowForm]=useState(false)
  const load=()=>{setLoading(true);apiRequest('/api/campaigns').then(setItems).catch(()=>setError('Could not load campaigns.')).finally(()=>setLoading(false))}
  useEffect(load,[])
  const save=async(data:Omit<Campaign,'id'>)=>{try{if(editing)await apiRequest(`/api/campaigns/${editing.id}`,{method:'PUT',body:JSON.stringify(data)});else await apiRequest('/api/campaigns',{method:'POST',body:JSON.stringify(data)});setShowForm(false);setEditing(null);load()}catch{setError('Could not save campaign.')}}
  const remove=async(id:number)=>{if(!confirm('Delete this campaign?'))return;try{await apiRequest(`/api/campaigns/${id}`,{method:'DELETE'});load()}catch{setError('Could not delete campaign.')}}
  const status=async(id:number,s:string)=>{try{await apiRequest(`/api/campaigns/${id}/status?status=${encodeURIComponent(s)}`,{method:'PUT'});load()}catch{setError('Could not update campaign status.')}}
  const filtered=items.filter(c=>`${c.campaignName} ${c.campaignType} ${c.status} ${c.targetAudience||''}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="module-page"><div className="module-heading"><div><h1>Campaigns</h1><p>Manage marketing campaigns and results.</p></div><button className="primary-button" onClick={()=>{setEditing(null);setShowForm(true)}}>+ Add Campaign</button></div>
    <div className="customer-stats"><div><span>Total Campaigns</span><strong>{items.length}</strong></div><div><span>Active</span><strong>{items.filter(c=>c.status==='ACTIVE').length}</strong></div><div><span>Budget</span><strong>₹{items.reduce((s,c)=>s+Number(c.budget||0),0).toLocaleString('en-IN')}</strong></div><div><span>Revenue</span><strong>₹{items.reduce((s,c)=>s+Number(c.revenueGenerated||0),0).toLocaleString('en-IN')}</strong></div></div>
    <div className="customer-table-card"><div className="table-header"><div><h2>Campaign List</h2><p>Changes are saved automatically.</p></div><input className="table-search" placeholder="Search campaigns..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      {loading&&<div className="table-message">Loading campaigns...</div>}{error&&<div className="table-error">{error}</div>}
      {!loading&&<div className="table-wrapper"><table><thead><tr><th>ID</th><th>Campaign</th><th>Type</th><th>Budget</th><th>Leads</th><th>Revenue</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      {filtered.map(c=><tr key={c.id}><td>#{c.id}</td><td><strong>{c.campaignName}</strong><small>{c.targetAudience||'—'}</small></td><td>{c.campaignType}</td><td>₹{Number(c.budget||0).toLocaleString('en-IN')}</td><td>{c.generatedLeads}/{c.targetLeads}</td><td>₹{Number(c.revenueGenerated||0).toLocaleString('en-IN')}</td><td>{c.status}</td><td><div style={{display:'flex',gap:5,flexWrap:'wrap'}}><button className="secondary-button" onClick={()=>{setEditing(c);setShowForm(true)}}>Edit</button>{c.status!=='ACTIVE'&&<button className="secondary-button" onClick={()=>status(c.id,'ACTIVE')}>Activate</button>}{c.status==='ACTIVE'&&<button className="secondary-button" onClick={()=>status(c.id,'PAUSED')}>Pause</button>}<button className="secondary-button" onClick={()=>remove(c.id)}>Delete</button></div></td></tr>)}</tbody></table></div>}
    </div>{showForm&&<CampaignForm initial={editing} onClose={()=>{setShowForm(false);setEditing(null)}} onSave={save}/>}</div>
}

function CampaignForm({initial,onClose,onSave}:{initial:Campaign|null;onClose:()=>void;onSave:(data:Omit<Campaign,'id'>)=>Promise<void>}) {
  const [form,setForm]=useState<Omit<Campaign,'id'>>({campaignName:initial?.campaignName||'',campaignType:initial?.campaignType||'EMAIL',status:initial?.status||'DRAFT',targetAudience:initial?.targetAudience||'',startDate:initial?.startDate||'',endDate:initial?.endDate||'',budget:initial?.budget||0,targetLeads:initial?.targetLeads||0,generatedLeads:initial?.generatedLeads||0,convertedLeads:initial?.convertedLeads||0,revenueGenerated:initial?.revenueGenerated||0})
  const [saving,setSaving]=useState(false); const set=(k:keyof typeof form,v:any)=>setForm({...form,[k]:v})
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);try{await onSave(form)}finally{setSaving(false)}}
  return <Modal title={initial?'Edit Campaign':'Add Campaign'} onClose={onClose}><form onSubmit={submit}><FormGrid>
    <FormField label="Campaign Name"><input required style={inputStyle} value={form.campaignName} onChange={e=>set('campaignName',e.target.value)}/></FormField>
    <FormField label="Type"><select style={inputStyle} value={form.campaignType} onChange={e=>set('campaignType',e.target.value)}><option>EMAIL</option><option>SOCIAL_MEDIA</option><option>SMS</option><option>WEB</option><option>OTHER</option></select></FormField>
    <FormField label="Status"><select style={inputStyle} value={form.status} onChange={e=>set('status',e.target.value)}><option>DRAFT</option><option>ACTIVE</option><option>PAUSED</option><option>COMPLETED</option></select></FormField>
    <FormField label="Target Audience"><input style={inputStyle} value={form.targetAudience||''} onChange={e=>set('targetAudience',e.target.value)}/></FormField>
    <FormField label="Start Date"><input style={inputStyle} value={form.startDate||''} onChange={e=>set('startDate',e.target.value)}/></FormField>
    <FormField label="End Date"><input style={inputStyle} value={form.endDate||''} onChange={e=>set('endDate',e.target.value)}/></FormField>
    <FormField label="Budget"><input type="number" min="0" style={inputStyle} value={form.budget} onChange={e=>set('budget',Number(e.target.value))}/></FormField>
    <FormField label="Target Leads"><input type="number" min="0" style={inputStyle} value={form.targetLeads} onChange={e=>set('targetLeads',Number(e.target.value))}/></FormField>
    <FormField label="Generated Leads"><input type="number" min="0" style={inputStyle} value={form.generatedLeads} onChange={e=>set('generatedLeads',Number(e.target.value))}/></FormField>
    <FormField label="Converted Leads"><input type="number" min="0" style={inputStyle} value={form.convertedLeads} onChange={e=>set('convertedLeads',Number(e.target.value))}/></FormField>
    <FormField label="Revenue Generated"><input type="number" min="0" style={inputStyle} value={form.revenueGenerated} onChange={e=>set('revenueGenerated',Number(e.target.value))}/></FormField>
  </FormGrid><ModalActions onClose={onClose} saving={saving} label={initial?'Update Campaign':'Create Campaign'}/></form></Modal>
}

function NotificationsPage() {
  const [items,setItems]=useState<Notification[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const [search,setSearch]=useState('')
  const [showForm,setShowForm]=useState(false)
  const load=()=>{setLoading(true);apiRequest('/api/notifications').then(setItems).catch(()=>setError('Could not load notifications.')).finally(()=>setLoading(false))}
  useEffect(load,[])
  const save=async(data:Omit<Notification,'id'|'createdAt'>)=>{try{await apiRequest('/api/notifications',{method:'POST',body:JSON.stringify(data)});setShowForm(false);load()}catch{setError('Could not create notification.')}}
  const read=async(id:number)=>{try{await apiRequest(`/api/notifications/${id}/read`,{method:'PUT'});load()}catch{setError('Could not update notification.')}}
  const unread=async(id:number)=>{try{await apiRequest(`/api/notifications/${id}/unread`,{method:'PUT'});load()}catch{setError('Could not update notification.')}}
  const remove=async(id:number)=>{if(!confirm('Delete this notification?'))return;try{await apiRequest(`/api/notifications/${id}`,{method:'DELETE'});load()}catch{setError('Could not delete notification.')}}
  const filtered=items.filter(n=>`${n.title} ${n.message} ${n.type} ${n.priority}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="module-page"><div className="module-heading"><div><h1>Notifications</h1><p>View important CRM notifications.</p></div><button className="primary-button" onClick={()=>setShowForm(true)}>+ Add Notification</button></div>
    <div className="customer-stats"><div><span>Total</span><strong>{items.length}</strong></div><div><span>Unread</span><strong>{items.filter(n=>!n.isRead).length}</strong></div><div><span>High Priority</span><strong>{items.filter(n=>n.priority==='HIGH').length}</strong></div><div><span>Read</span><strong>{items.filter(n=>n.isRead).length}</strong></div></div>
    <div className="customer-table-card"><div className="table-header"><div><h2>Notification List</h2><p>Changes are saved automatically.</p></div><input className="table-search" placeholder="Search notifications..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      {loading&&<div className="table-message">Loading notifications...</div>}{error&&<div className="table-error">{error}</div>}
      {!loading&&<div className="table-wrapper"><table><thead><tr><th>ID</th><th>Notification</th><th>Type</th><th>Priority</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      {filtered.map(n=><tr key={n.id}><td>#{n.id}</td><td><strong>{n.title}</strong><small>{n.message}</small></td><td>{n.type}</td><td>{n.priority}</td><td>{n.isRead?'READ':'UNREAD'}</td><td><div style={{display:'flex',gap:5}}>{n.isRead?<button className="secondary-button" onClick={()=>unread(n.id)}>Mark Unread</button>:<button className="secondary-button" onClick={()=>read(n.id)}>Mark Read</button>}<button className="secondary-button" onClick={()=>remove(n.id)}>Delete</button></div></td></tr>)}</tbody></table></div>}
    </div>{showForm&&<NotificationForm onClose={()=>setShowForm(false)} onSave={save}/>}</div>
}

function NotificationForm({onClose,onSave}:{onClose:()=>void;onSave:(data:Omit<Notification,'id'|'createdAt'>)=>Promise<void>}) {
  const [form,setForm]=useState<Omit<Notification,'id'|'createdAt'>>({title:'',message:'',type:'GENERAL',priority:'MEDIUM',isRead:false,customerId:undefined,dealId:undefined,taskId:undefined})
  const [saving,setSaving]=useState(false); const set=(k:keyof typeof form,v:any)=>setForm({...form,[k]:v})
  const submit=async(e:React.FormEvent)=>{e.preventDefault();setSaving(true);try{await onSave(form)}finally{setSaving(false)}}
  return <Modal title="Add Notification" onClose={onClose}><form onSubmit={submit}><FormGrid>
    <FormField label="Title"><input required style={inputStyle} value={form.title} onChange={e=>set('title',e.target.value)}/></FormField>
    <FormField label="Type"><input style={inputStyle} value={form.type} onChange={e=>set('type',e.target.value)}/></FormField>
    <FormField label="Message"><textarea required style={{...inputStyle,minHeight:90}} value={form.message} onChange={e=>set('message',e.target.value)}/></FormField>
    <FormField label="Priority"><select style={inputStyle} value={form.priority} onChange={e=>set('priority',e.target.value)}><option>LOW</option><option>MEDIUM</option><option>HIGH</option></select></FormField>
    <FormField label="Customer ID"><input type="number" style={inputStyle} value={form.customerId||''} onChange={e=>set('customerId',e.target.value?Number(e.target.value):undefined)}/></FormField>
    <FormField label="Deal ID"><input type="number" style={inputStyle} value={form.dealId||''} onChange={e=>set('dealId',e.target.value?Number(e.target.value):undefined)}/></FormField>
    <FormField label="Task ID"><input type="number" style={inputStyle} value={form.taskId||''} onChange={e=>set('taskId',e.target.value?Number(e.target.value):undefined)}/></FormField>
  </FormGrid><ModalActions onClose={onClose} saving={saving} label="Create Notification"/></form></Modal>
}

function UsersSettingsPage() {
  const [users,setUsers]=useState<UserAccount[]>([]); const [loading,setLoading]=useState(true); const [error,setError]=useState(''); const [search,setSearch]=useState('')
  const [editing,setEditing]=useState<UserAccount|null>(null); const [showForm,setShowForm]=useState(false)
  const load=()=>{setLoading(true);apiRequest('/api/users').then(setUsers).catch(()=>setError('Could not load users.')).finally(()=>setLoading(false))}
  useEffect(load,[])
  const save=async(data:UserAccount & {password?:string})=>{try{const payload={...data};delete (payload as any).id;if(editing)await apiRequest(`/api/users/${editing.id}`,{method:'PUT',body:JSON.stringify(payload)});else await apiRequest('/api/users',{method:'POST',body:JSON.stringify(payload)});setShowForm(false);setEditing(null);load()}catch{setError('Could not save user.')}}
  const status=async(id:number,s:string)=>{try{await apiRequest(`/api/users/${id}/status?status=${encodeURIComponent(s)}`,{method:'PUT'});load()}catch{setError('Could not update user status.')}}
  const remove=async(id:number)=>{if(!confirm('Delete this user?'))return;try{await apiRequest(`/api/users/${id}`,{method:'DELETE'});load()}catch{setError('Could not delete user.')}}
  const filtered=users.filter(u=>`${u.username} ${u.email} ${u.fullName} ${u.role} ${u.status}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="module-page"><div className="module-heading"><div><h1>Users & Settings</h1><p>Manage system users and settings.</p></div><button className="primary-button" onClick={()=>{setEditing(null);setShowForm(true)}}>+ Add User</button></div>
    <div className="customer-stats"><div><span>Total Users</span><strong>{users.length}</strong></div><div><span>Active</span><strong>{users.filter(u=>u.status==='ACTIVE').length}</strong></div><div><span>Administrators</span><strong>{users.filter(u=>u.role==='ADMIN').length}</strong></div><div><span>Inactive</span><strong>{users.filter(u=>u.status!=='ACTIVE').length}</strong></div></div>
    <div className="customer-table-card"><div className="table-header"><div><h2>User List</h2><p>Changes are saved automatically.</p></div><input className="table-search" placeholder="Search users..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      {loading&&<div className="table-message">Loading users...</div>}{error&&<div className="table-error">{error}</div>}
      {!loading&&<div className="table-wrapper"><table><thead><tr><th>ID</th><th>User</th><th>Email</th><th>Role</th><th>Status</th><th>Actions</th></tr></thead><tbody>
      {filtered.map(u=><tr key={u.id}><td>#{u.id}</td><td><strong>{u.fullName}</strong><small>@{u.username}</small></td><td>{u.email}</td><td>{u.role}</td><td>{u.status}</td><td><div style={{display:'flex',gap:5,flexWrap:'wrap'}}><button className="secondary-button" onClick={()=>{setEditing(u);setShowForm(true)}}>Edit</button>{u.status==='ACTIVE'?<button className="secondary-button" onClick={()=>status(u.id,'INACTIVE')}>Deactivate</button>:<button className="secondary-button" onClick={()=>status(u.id,'ACTIVE')}>Activate</button>}<button className="secondary-button" onClick={()=>remove(u.id)}>Delete</button></div></td></tr>)}</tbody></table></div>}
    </div>{showForm&&<UserForm initial={editing} onClose={()=>{setShowForm(false);setEditing(null)}} onSave={save}/>}</div>
}

function UserForm({initial,onClose,onSave}:{initial:UserAccount|null;onClose:()=>void;onSave:(data:UserAccount & {password?:string})=>Promise<void>}) {
  const [form,setForm]=useState<any>({username:initial?.username||'',email:initial?.email||'',fullName:initial?.fullName||'',role:initial?.role||'SALES_USER',status:initial?.status||'ACTIVE',password:''})
  const [saving,setSaving]=useState(false); const set=(k:string,v:any)=>setForm({...form,[k]:v})
  const submit=async(e:React.FormEvent)=>{e.preventDefault();if(!initial&&!form.password){alert('Password is required for a new user.');return}setSaving(true);try{await onSave(form)}finally{setSaving(false)}}
  return <Modal title={initial?'Edit User':'Add User'} onClose={onClose}><form onSubmit={submit}><FormGrid>
    <FormField label="Username"><input required style={inputStyle} value={form.username} onChange={e=>set('username',e.target.value)}/></FormField>
    <FormField label="Full Name"><input required style={inputStyle} value={form.fullName} onChange={e=>set('fullName',e.target.value)}/></FormField>
    <FormField label="Email"><input required type="email" style={inputStyle} value={form.email} onChange={e=>set('email',e.target.value)}/></FormField>
    <FormField label="Role"><select style={inputStyle} value={form.role} onChange={e=>set('role',e.target.value)}><option>ADMIN</option><option>SALES_USER</option><option>MANAGER</option></select></FormField>
    <FormField label="Status"><select style={inputStyle} value={form.status} onChange={e=>set('status',e.target.value)}><option>ACTIVE</option><option>INACTIVE</option></select></FormField>
    <FormField label={initial?'New Password (optional)':'Password'}><input required={!initial} type="password" style={inputStyle} value={form.password} onChange={e=>set('password',e.target.value)} /></FormField>
  </FormGrid><ModalActions onClose={onClose} saving={saving} label={initial?'Update User':'Create User'}/></form></Modal>
}

function App() {

  const [activePage, setActivePage] = useState('Dashboard')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('retailmax-dark-mode') === 'true')

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode)
    localStorage.setItem('retailmax-dark-mode', String(darkMode))
  }, [darkMode])

  return (
      <div className={`app ${darkMode ? 'dark-mode' : ''}`}>

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

              <button
                className="theme-toggle"
                type="button"
                onClick={() => setDarkMode((value) => !value)}
                aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <span className="theme-toggle-track">
                  <span className="theme-toggle-thumb">{darkMode ? '☾' : '☀'}</span>
                </span>
                <span className="theme-toggle-label">{darkMode ? 'Dark' : 'Light'}</span>
              </button>

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

            {activePage === 'Tasks' && (
                <TasksPage />
            )}

            {activePage === 'Campaigns' && (
                <CampaignsPage />
            )}

            {activePage === 'Notifications' && (
                <NotificationsPage />
            )}

            {activePage === 'Users & Settings' && (
                <UsersSettingsPage />
            )}

          </div>

        </main>

      </div>
  )
}

export default App
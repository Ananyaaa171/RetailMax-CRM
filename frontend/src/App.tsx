import React, { useEffect, useRef, useState } from 'react'
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


function CustomerSupport() {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  return (
    <>
      <section className="customer-support">
        <div className="support-mark">?</div>
        <div className="support-copy">
          <span>CUSTOMER SUPPORT</span>
          <h2>Need a hand?</h2>
          <p>Contact the RetailMax support team for help with your workspace.</p>
        </div>
        <div className="support-options">
          <div><small>RESPONSE</small><strong>Within 1 business day</strong></div>
          <div><small>CHANNEL</small><strong>Support request</strong></div>
          <button type="button" onClick={() => { setOpen(true); setSubmitted(false) }}>
            Contact Support →
          </button>
        </div>
      </section>

      {open && (
        <div className="support-overlay" onMouseDown={(e) => { if (e.target === e.currentTarget) setOpen(false) }}>
          <div className="support-panel">
            <div className="support-panel-head">
              <div>
                <span>CUSTOMER SUPPORT</span>
                <h2>How can we help?</h2>
              </div>
              <button type="button" className="support-close" onClick={() => setOpen(false)}>×</button>
            </div>

            {submitted ? (
              <div className="support-success">
                <div>✓</div>
                <h3>Request received</h3>
                <p>Your support request has been recorded. Our team will follow up.</p>
                <button type="button" onClick={() => setOpen(false)}>Close</button>
              </div>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                <label>
                  <span>Topic</span>
                  <select required defaultValue="">
                    <option value="" disabled>Select a topic</option>
                    <option>Account & access</option>
                    <option>Customers & leads</option>
                    <option>Deals & sales</option>
                    <option>Tasks & campaigns</option>
                    <option>Something else</option>
                  </select>
                </label>

                <label>
                  <span>Subject</span>
                  <input required placeholder="What do you need help with?" />
                </label>

                <label>
                  <span>Message</span>
                  <textarea required rows={5} placeholder="Describe the issue or question..." />
                </label>

                <div className="support-form-actions">
                  <button type="button" className="support-cancel" onClick={() => setOpen(false)}>Cancel</button>
                  <button type="submit" className="support-submit">Send Request</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

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

        <CustomerSupport />

      </div>
  )
}


function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: React.ReactNode }) {
  return (
    <div className="rm-modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="rm-modal" role="dialog" aria-modal="true" aria-label={title}>
        <div className="rm-modal-head">
          <div>
            <span className="rm-kicker">RETAILMAX</span>
            <h2>{title}</h2>
          </div>
          <button type="button" className="rm-icon-button" onClick={onClose} aria-label="Close">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}

function FormGrid({ children }: { children: React.ReactNode }) {
  return <div className="rm-form-grid">{children}</div>
}

function FormField({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="rm-form-field">
      <span>{label}</span>
      {children}
    </label>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  boxSizing: 'border-box',
  padding: '11px 12px',
  border: '1px solid var(--field-border)',
  borderRadius: 7,
  fontSize: 14,
  background: 'var(--field-bg)',
  color: 'var(--text)',
  outline: 'none',
}

function ModalActions({ onClose, saving, label = 'Save Changes' }: { onClose: () => void; saving: boolean; label?: string }) {
  return (
    <div className="rm-modal-actions">
      <button type="button" className="secondary-button" onClick={onClose}>Cancel</button>
      <button type="submit" className="primary-button" disabled={saving}>{saving ? 'Saving…' : label}</button>
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
        <div className="table-header"><div><h2>Customer List</h2><p>Changes are saved directly to PostgreSQL.</p></div>
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
  const [scoringId, setScoringId] = useState<number | null>(null)

  const load=()=>{setLoading(true);apiRequest('/api/leads').then(setLeads).catch(()=>setError('Could not load leads.')).finally(()=>setLoading(false))}
  useEffect(load,[])

  const save=async(data:Omit<Lead,'id'>)=>{
    try{
      if(editing) await apiRequest(`/api/leads/${editing.id}`,{method:'PUT',body:JSON.stringify(data)})
      else await apiRequest('/api/leads',{method:'POST',body:JSON.stringify(data)})
      setShowForm(false);setEditing(null);load()
    }catch{setError('Could not save lead.')}
  }

  const remove=async(id:number)=>{
    if(!window.confirm('Delete this lead?'))return
    try{await apiRequest(`/api/leads/${id}`,{method:'DELETE'});load()}
    catch{setError('Could not delete lead.')}
  }

  const calculate=async(id:number)=>{
    try{
      setError('')
      setScoringId(id)

      const updatedLead = await apiRequest(`/api/leads/${id}/calculate-score`,{method:'POST'})

      setLeads(current => current.map(lead => lead.id === id ? updatedLead : lead))
    }catch(error){
      console.error('Lead score calculation failed:',error)
      setError('Could not calculate lead score.')
    }finally{
      setScoringId(null)
    }
  }

  const convert=async(id:number)=>{
    if(!window.confirm('Convert this lead into a customer?'))return
    try{await apiRequest(`/api/leads/${id}/convert`,{method:'POST'});load()}
    catch{setError('Could not convert lead.')}
  }
  const filtered=leads.filter(l=>`${l.firstName} ${l.lastName} ${l.email} ${l.phone} ${l.source} ${l.status}`.toLowerCase().includes(search.toLowerCase()))
  return <div className="module-page">
    <div className="module-heading"><div><h1>Leads</h1><p>Track and manage potential customers.</p></div><button className="primary-button" onClick={()=>{setEditing(null);setShowForm(true)}}>+ Add Lead</button></div>
    <div className="customer-stats"><div><span>Total Leads</span><strong>{leads.length}</strong></div><div><span>Very Hot</span><strong>{leads.filter(l=>l.status==='VERY_HOT').length}</strong></div><div><span>Hot</span><strong>{leads.filter(l=>l.status==='HOT').length}</strong></div><div><span>Qualified</span><strong>{leads.filter(l=>l.status==='QUALIFIED').length}</strong></div></div>
    <div className="customer-table-card"><div className="table-header"><div><h2>Lead List</h2><p>Changes are saved directly to PostgreSQL.</p></div><input className="table-search" placeholder="Search leads..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
      {loading&&<div className="table-message">Loading leads...</div>}{error&&<div className="table-error">{error}</div>}
      {!loading&&<div className="table-wrapper"><table><thead><tr><th>ID</th><th>Lead</th><th>Email</th><th>Source</th><th>Score</th><th>Status</th><th>Actions</th></tr></thead><tbody>
        {filtered.map(l=><tr key={l.id}><td>#{l.id}</td><td><div className="customer-name"><div className="customer-avatar">{l.firstName?.[0]}{l.lastName?.[0]}</div><div><strong>{l.firstName} {l.lastName}</strong><small>{l.phone}</small></div></div></td><td>{l.email||'—'}</td><td>{l.source||'—'}</td><td>{l.score}</td><td>{l.status?.replace(/_/g,' ')}</td>
          <td><div style={{display:'flex',gap:5,flexWrap:'wrap'}}><button className="secondary-button" onClick={()=>{setEditing(l);setShowForm(true)}}>Edit</button><button className="secondary-button" onClick={()=>calculate(l.id)} disabled={scoringId===l.id}>{scoringId===l.id?'Scoring...':'Score'}</button><button className="secondary-button" onClick={()=>convert(l.id)}>Convert</button><button className="secondary-button" onClick={()=>remove(l.id)}>Delete</button></div></td>
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
    <div className="customer-table-card"><div className="table-header"><div><h2>Deal List</h2><p>Changes are saved directly to PostgreSQL.</p></div><input className="table-search" placeholder="Search deals..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
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
    <div className="customer-table-card"><div className="table-header"><div><h2>Task List</h2><p>Changes are saved directly to PostgreSQL.</p></div><input className="table-search" placeholder="Search tasks..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
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
    <div className="customer-table-card"><div className="table-header"><div><h2>Campaign List</h2><p>Changes are saved directly to PostgreSQL.</p></div><input className="table-search" placeholder="Search campaigns..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
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
    <div className="customer-table-card"><div className="table-header"><div><h2>Notification List</h2><p>Changes are saved directly to PostgreSQL.</p></div><input className="table-search" placeholder="Search notifications..." value={search} onChange={e=>setSearch(e.target.value)}/></div>
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
  const [users, setUsers] = useState<UserAccount[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState('ALL')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [settingsSection, setSettingsSection] = useState('Team & Access')
  const [editing, setEditing] = useState<UserAccount | null>(null)
  const [showForm, setShowForm] = useState(false)

  const load = () => {
    setLoading(true)
    apiRequest('/api/users')
      .then(setUsers)
      .catch(() => setError('Could not load users.'))
      .finally(() => setLoading(false))
  }

  useEffect(load, [])

  const save = async (data: UserAccount & { password?: string }) => {
    try {
      const payload = { ...data }
      delete (payload as any).id

      if (editing) {
        await apiRequest(`/api/users/${editing.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        })
      } else {
        await apiRequest('/api/users', {
          method: 'POST',
          body: JSON.stringify(payload),
        })
      }

      setShowForm(false)
      setEditing(null)
      load()
    } catch {
      setError('Could not save user.')
    }
  }

  const status = async (id: number, value: string) => {
    try {
      await apiRequest(
        `/api/users/${id}/status?status=${encodeURIComponent(value)}`,
        { method: 'PUT' }
      )
      load()
    } catch {
      setError('Could not update user status.')
    }
  }

  const remove = async (id: number) => {
    if (!window.confirm('Delete this user?')) return

    try {
      await apiRequest(`/api/users/${id}`, { method: 'DELETE' })
      load()
    } catch {
      setError('Could not delete user.')
    }
  }

  const filteredUsers = users.filter(user => {
    const query = search.toLowerCase().trim()
    const matchesSearch =
      !query ||
      `${user.username} ${user.email} ${user.fullName} ${user.role} ${user.status}`
        .toLowerCase()
        .includes(query)

    const matchesRole = roleFilter === 'ALL' || user.role === roleFilter
    const matchesStatus = statusFilter === 'ALL' || user.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const activeUsers = users.filter(user => user.status === 'ACTIVE').length
  const adminUsers = users.filter(user => user.role === 'ADMIN').length

  return (
    <div className="module-page settings-page">
      <div className="module-heading">
        <div>
          <span className="settings-eyebrow">WORKSPACE SETTINGS</span>
          <h1>Users & Settings</h1>
          <p>Manage access, workspace users and account preferences.</p>
        </div>
      </div>

      <div className="settings-layout">
        <aside className="settings-sidebar">
          <div className="settings-sidebar-label">SETTINGS</div>

          <button
            type="button"
            className={`settings-nav-item ${settingsSection === 'Team & Access' ? 'active' : ''}`}
            onClick={() => setSettingsSection('Team & Access')}
          >
            <span className="settings-nav-index">01</span>
            <span>
              <strong>Team & Access</strong>
              <small>Users and permissions</small>
            </span>
          </button>

          <button
            type="button"
            className={`settings-nav-item ${settingsSection === 'Workspace' ? 'active' : ''}`}
            onClick={() => setSettingsSection('Workspace')}
          >
            <span className="settings-nav-index">02</span>
            <span>
              <strong>Workspace</strong>
              <small>CRM workspace details</small>
            </span>
          </button>

          <button
            type="button"
            className={`settings-nav-item ${settingsSection === 'Preferences' ? 'active' : ''}`}
            onClick={() => setSettingsSection('Preferences')}
          >
            <span className="settings-nav-index">03</span>
            <span>
              <strong>Preferences</strong>
              <small>Interface preferences</small>
            </span>
          </button>

          <div className="settings-sidebar-foot">
            <span>RETAILMAX CRM</span>
            <small>Workspace configuration</small>
          </div>
        </aside>

        <section className="settings-content">
          {settingsSection === 'Team & Access' && (
            <>
              <div className="settings-section-heading">
                <div>
                  <span>TEAM & ACCESS</span>
                  <h2>User management</h2>
                  <p>Control who can access the RetailMax workspace.</p>
                </div>
                <button
                  className="primary-button"
                  onClick={() => {
                    setEditing(null)
                    setShowForm(true)
                  }}
                >
                  + Add User
                </button>
              </div>

              <div className="settings-overview-grid">
                <div className="settings-overview-card">
                  <span>TOTAL USERS</span>
                  <strong>{users.length}</strong>
                  <small>Accounts in this workspace</small>
                </div>
                <div className="settings-overview-card">
                  <span>ACTIVE</span>
                  <strong>{activeUsers}</strong>
                  <small>Currently active accounts</small>
                </div>
                <div className="settings-overview-card">
                  <span>ADMINISTRATORS</span>
                  <strong>{adminUsers}</strong>
                  <small>Users with admin access</small>
                </div>
              </div>

              <div className="settings-panel">
                <div className="settings-panel-head">
                  <div>
                    <span>DIRECTORY</span>
                    <h3>Workspace users</h3>
                  </div>
                  <span className="settings-count">{filteredUsers.length} shown</span>
                </div>

                <div className="settings-filters">
                  <div className="settings-search-wrap">
                    <span>⌕</span>
                    <input
                      className="settings-search"
                      placeholder="Search name, username or email..."
                      value={search}
                      onChange={e => setSearch(e.target.value)}
                    />
                  </div>

                  <select
                    className="settings-filter"
                    value={roleFilter}
                    onChange={e => setRoleFilter(e.target.value)}
                    aria-label="Filter users by role"
                  >
                    <option value="ALL">All roles</option>
                    <option value="ADMIN">Admin</option>
                    <option value="MANAGER">Manager</option>
                    <option value="SALES_USER">Sales user</option>
                  </select>

                  <select
                    className="settings-filter"
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    aria-label="Filter users by status"
                  >
                    <option value="ALL">All status</option>
                    <option value="ACTIVE">Active</option>
                    <option value="INACTIVE">Inactive</option>
                  </select>

                  {(search || roleFilter !== 'ALL' || statusFilter !== 'ALL') && (
                    <button
                      type="button"
                      className="settings-clear"
                      onClick={() => {
                        setSearch('')
                        setRoleFilter('ALL')
                        setStatusFilter('ALL')
                      }}
                    >
                      Clear
                    </button>
                  )}
                </div>

                {loading && <div className="table-message">Loading users...</div>}
                {error && <div className="table-error">{error}</div>}

                {!loading && (
                  <div className="settings-user-list">
                    {filteredUsers.map(user => (
                      <div className="settings-user-row" key={user.id}>
                        <div className="settings-user-identity">
                          <div className="settings-user-avatar">
                            {user.fullName?.[0] || user.username?.[0] || '?'}
                          </div>
                          <div>
                            <strong>{user.fullName}</strong>
                            <small>@{user.username} · {user.email}</small>
                          </div>
                        </div>

                        <div className="settings-user-meta">
                          <span className="settings-role">{user.role.replace(/_/g, ' ')}</span>
                          <span className={`settings-status ${user.status.toLowerCase()}`}>
                            <i /> {user.status}
                          </span>
                        </div>

                        <div className="settings-user-actions">
                          <button
                            className="secondary-button"
                            onClick={() => {
                              setEditing(user)
                              setShowForm(true)
                            }}
                          >
                            Edit
                          </button>
                          {user.status === 'ACTIVE' ? (
                            <button
                              className="secondary-button"
                              onClick={() => status(user.id, 'INACTIVE')}
                            >
                              Deactivate
                            </button>
                          ) : (
                            <button
                              className="secondary-button"
                              onClick={() => status(user.id, 'ACTIVE')}
                            >
                              Activate
                            </button>
                          )}
                          <button
                            className="secondary-button"
                            onClick={() => remove(user.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}

                    {!filteredUsers.length && (
                      <div className="settings-empty">
                        <strong>No users match these filters.</strong>
                        <span>Try changing the search or filter selection.</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}

          {settingsSection === 'Workspace' && (
            <div className="settings-standard-panel">
              <div className="settings-section-heading compact">
                <div>
                  <span>WORKSPACE</span>
                  <h2>Workspace details</h2>
                  <p>General information about this RetailMax workspace.</p>
                </div>
              </div>

              <div className="settings-form-grid">
                <div className="settings-field-card">
                  <span>WORKSPACE NAME</span>
                  <strong>RetailMax CRM</strong>
                  <small>Your CRM workspace</small>
                </div>
                <div className="settings-field-card">
                  <span>WORKSPACE TYPE</span>
                  <strong>Retail Operations</strong>
                  <small>Customer and sales management</small>
                </div>
                <div className="settings-field-card">
                  <span>DATA STORAGE</span>
                  <strong>PostgreSQL</strong>
                  <small>Application data storage</small>
                </div>
                <div className="settings-field-card">
                  <span>ACCESS MODEL</span>
                  <strong>Role based</strong>
                  <small>Controlled by user roles</small>
                </div>
              </div>
            </div>
          )}

          {settingsSection === 'Preferences' && (
            <div className="settings-standard-panel">
              <div className="settings-section-heading compact">
                <div>
                  <span>PREFERENCES</span>
                  <h2>Interface preferences</h2>
                  <p>Visual preferences for your RetailMax workspace.</p>
                </div>
              </div>

              <div className="settings-preference-list">
                <div className="settings-preference-row">
                  <div>
                    <strong>Theme</strong>
                    <small>Use the DARK / LIGHT control in the header to switch appearance.</small>
                  </div>
                  <span className="settings-preference-value">HEADER CONTROL</span>
                </div>
                <div className="settings-preference-row">
                  <div>
                    <strong>Cursor trail</strong>
                    <small>Use the TRAIL control in the header to enable the emerald cursor effect.</small>
                  </div>
                  <span className="settings-preference-value">HEADER CONTROL</span>
                </div>
                <div className="settings-preference-row">
                  <div>
                    <strong>Date format</strong>
                    <small>Dates are displayed using the workspace locale.</small>
                  </div>
                  <span className="settings-preference-value">INDIA / IN</span>
                </div>
              </div>
            </div>
          )}
        </section>
      </div>

      {showForm && (
        <UserForm
          initial={editing}
          onClose={() => {
            setShowForm(false)
            setEditing(null)
          }}
          onSave={save}
        />
      )}
    </div>
  )
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


function CursorTrail({ enabled }: { enabled: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const pointsRef = useRef<Array<{ x: number; y: number; life: number }>>([])
  const mouseRef = useRef({ x: -100, y: -100, active: false })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrame = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * dpr)
      canvas.height = Math.floor(window.innerHeight * dpr)
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const move = (event: MouseEvent) => {
      if (!enabled) return
      mouseRef.current = { x: event.clientX, y: event.clientY, active: true }
      const last = pointsRef.current[pointsRef.current.length - 1]
      const distance = last
        ? Math.hypot(event.clientX - last.x, event.clientY - last.y)
        : 999

      if (distance > 2) {
        pointsRef.current.push({ x: event.clientX, y: event.clientY, life: 1 })
        if (pointsRef.current.length > 34) pointsRef.current.shift()
      }
    }

    const leave = () => {
      mouseRef.current.active = false
    }

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      if (enabled) {
        const points = pointsRef.current

        for (let i = 0; i < points.length; i++) {
          const p = points[i]
          p.life -= 0.018
        }

        while (points.length && points[0].life <= 0) points.shift()

        if (points.length > 1) {
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'

          for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1]
            const point = points[i]
            const alpha = Math.max(0, Math.min(prev.life, point.life))
            const width = 1.5 + (i / points.length) * 5

            ctx.beginPath()
            ctx.moveTo(prev.x, prev.y)
            ctx.lineTo(point.x, point.y)
            ctx.strokeStyle = `rgba(16, 185, 129, ${alpha * 0.85})`
            ctx.lineWidth = width
            ctx.shadowColor = `rgba(16, 185, 129, ${alpha * 0.8})`
            ctx.shadowBlur = 9
            ctx.stroke()
          }

          const head = points[points.length - 1]
          if (mouseRef.current.active) {
            ctx.beginPath()
            ctx.arc(head.x, head.y, 4, 0, Math.PI * 2)
            ctx.fillStyle = '#34d399'
            ctx.shadowColor = '#10b981'
            ctx.shadowBlur = 16
            ctx.fill()
          }
        }
      } else {
        pointsRef.current = []
      }

      animationFrame = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', move)
    window.addEventListener('mouseleave', leave)
    animationFrame = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseleave', leave)
      cancelAnimationFrame(animationFrame)
    }
  }, [enabled])

  return <canvas ref={canvasRef} className="cursor-trail-canvas" aria-hidden="true" />
}

function App() {
  const [activePage, setActivePage] = useState('Dashboard')
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('retailmax-dark-mode') === 'true')
  const [cursorTrail, setCursorTrail] = useState(false)

  useEffect(() => {
    document.documentElement.classList.toggle('dark-mode', darkMode)
    localStorage.setItem('retailmax-dark-mode', String(darkMode))
  }, [darkMode])

  const nav = [
    { label: 'Dashboard', code: '01' },
    { label: 'Customers', code: '02' },
    { label: 'Leads', code: '03' },
    { label: 'Deals', code: '04' },
    { label: 'Tasks', code: '05' },
    { label: 'Campaigns', code: '06' },
    { label: 'Notifications', code: '07' },
    { label: 'Users & Settings', code: '08' },
  ]

  const renderPage = () => {
    switch (activePage) {
      case 'Customers': return <CustomersPage />
      case 'Leads': return <LeadsPage />
      case 'Deals': return <DealsPage />
      case 'Tasks': return <TasksPage />
      case 'Campaigns': return <CampaignsPage />
      case 'Notifications': return <NotificationsPage />
      case 'Users & Settings': return <UsersSettingsPage />
      default: return <Dashboard />
    }
  }

  return (
    <div className={`editorial-app ${darkMode ? 'dark-editorial' : ''}`}>
      <CursorTrail enabled={cursorTrail} />
      <header className="editorial-header">
        <button className="wordmark" type="button" onClick={() => setActivePage('Dashboard')}>
          <span className="wordmark-mark">RM</span>
          <span className="wordmark-name">retailmax</span>
        </button>

        <nav className="top-nav" aria-label="Primary navigation">
          {nav.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`top-nav-item ${activePage === item.label ? 'selected' : ''}`}
              onClick={() => setActivePage(item.label)}
            >
              <span>{item.code}</span>
              <b>{item.label}</b>
            </button>
          ))}
        </nav>

        <div className="header-tools">
          <button
            className={`trail-switch ${cursorTrail ? 'active' : ''}`}
            type="button"
            onClick={() => setCursorTrail((value) => !value)}
            title={cursorTrail ? 'Turn off emerald cursor trail' : 'Turn on emerald cursor trail'}
            aria-label={cursorTrail ? 'Turn off emerald cursor trail' : 'Turn on emerald cursor trail'}
          >
            <span className="trail-dot" />
            TRAIL
          </button>
          <button
            className="mode-switch"
            type="button"
            onClick={() => setDarkMode((value) => !value)}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? 'LIGHT' : 'DARK'}
          </button>
        </div>
      </header>

      <div className="editorial-strip">
        <span>CRM / OPERATIONS</span>
        <span>{activePage.toUpperCase()}</span>
        <span>{new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
      </div>

      <main className="editorial-main">
        <div className="page-number">
          <span>{String(nav.findIndex((item) => item.label === activePage) + 1).padStart(2, '0')}</span>
          <em>/</em>
          <small>08</small>
        </div>

        <div className="page-title-row">
          <h1>{activePage}</h1>
          <div className="title-rule" />
        </div>

        {renderPage()}
      </main>

      <footer className="editorial-footer">
        <span>RETAILMAX CRM</span>
        <span>WORKSPACE</span>
        <span>© 2026</span>
      </footer>
    </div>
  )
}

export default App

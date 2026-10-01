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
import { useState } from 'react'
import type { FormEvent } from 'react'
import './AuthPage.css'

const API_URL = 'http://localhost:8081'

type AuthPageProps = {
  onLogin: () => void
}

type AuthResponse = {
  token: string
  user: {
    id: number
    username: string
    email: string
    fullName: string
    role: string
  }
}

export default function AuthPage({ onLogin }: AuthPageProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login')

  const [showPassword, setShowPassword] = useState(false)

  const [loading, setLoading] = useState(false)

  const [error, setError] = useState('')

  const [message, setMessage] = useState('')

  const [form, setForm] = useState({
    username: '',
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  })

  const updateField = (
    field: keyof typeof form,
    value: string
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  const switchMode = () => {
    setMode((current) =>
      current === 'login'
        ? 'register'
        : 'login'
    )

    setError('')
    setMessage('')

    setForm({
      username: '',
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    })
  }

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    setError('')
    setMessage('')

    /*
     * LOGIN VALIDATION
     */

    if (
      !form.username.trim() ||
      !form.password
    ) {
      setError(
        'Username and password are required.'
      )

      return
    }

    /*
     * REGISTRATION VALIDATION
     */

    if (mode === 'register') {

      if (
        !form.fullName.trim() ||
        !form.email.trim()
      ) {
        setError(
          'Please complete all required fields.'
        )

        return
      }

      if (
        !/^\S+@\S+\.\S+$/.test(
          form.email.trim()
        )
      ) {
        setError(
          'Please enter a valid email address.'
        )

        return
      }

      if (form.password.length < 6) {
        setError(
          'Password must contain at least 6 characters.'
        )

        return
      }

      if (
        form.password !==
        form.confirmPassword
      ) {
        setError(
          'Passwords do not match.'
        )

        return
      }
    }

    setLoading(true)

    try {

      /*
       * SELECT BACKEND ENDPOINT
       */

      const endpoint =
        mode === 'login'
          ? `${API_URL}/api/auth/login`
          : `${API_URL}/api/auth/register`

      /*
       * REQUEST BODY
       */

      const body =
        mode === 'login'
          ? {
              username:
                form.username.trim(),

              password:
                form.password,
            }
          : {
              username:
                form.username.trim(),

              email:
                form.email
                  .trim()
                  .toLowerCase(),

              fullName:
                form.fullName.trim(),

              password:
                form.password,
            }

      /*
       * SEND REQUEST
       */

      const response =
        await fetch(endpoint, {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',
          },

          body: JSON.stringify(body),
        })

      /*
       * READ RESPONSE
       */

      const data =
        await response
          .json()
          .catch(() => ({}))

      /*
       * BACKEND ERROR
       */

      if (!response.ok) {
        throw new Error(
          data.message ||
          'Authentication failed.'
        )
      }

      /*
       * REGISTRATION SUCCESS
       */

      if (mode === 'register') {

        setMessage(
          'Account created successfully. You can now sign in.'
        )

        setMode('login')

        setForm((current) => ({
          ...current,

          password: '',

          confirmPassword: '',
        }))

        return
      }

      /*
       * LOGIN SUCCESS
       */

      const authData =
        data as AuthResponse

      /*
       * SAVE AUTHENTICATION
       */

      localStorage.setItem(
        'retailmax-authenticated',
        'true'
      )

      localStorage.setItem(
        'retailmax-token',
        authData.token
      )

      localStorage.setItem(
        'retailmax-user',
        JSON.stringify(
          authData.user
        )
      )

      /*
       * OPEN CRM
       */

      onLogin()

    } catch (err) {

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to connect to RetailMax.'
      )

    } finally {

      setLoading(false)

    }
  }

  return (
    <div className="rm-auth">

      {/* =========================================
          LEFT SIDE
          ========================================= */}

      <section className="rm-auth-visual">

        <div className="rm-auth-brand">

          <span className="rm-auth-mark">
            RM
          </span>

          <span>
            retailmax
          </span>

        </div>

        <div className="rm-auth-visual-copy">

          <span className="rm-auth-kicker">
            RETAIL OPERATIONS / CRM
          </span>

          <h1>
            Keep every
            <br />
            <em>relationship</em>
            <br />
            moving.
          </h1>

          <p>
            A single workspace for
            customers, leads, deals,
            tasks and campaigns.
          </p>

        </div>

        <div className="rm-auth-index">

          <span>
            01 / ACCESS
          </span>

          <span>
            RETAILMAX CRM
          </span>

        </div>

      </section>


      {/* =========================================
          RIGHT SIDE
          ========================================= */}

      <section className="rm-auth-panel">

        <div className="rm-auth-form-shell">

          {/* =====================================
              HEADING
              ===================================== */}

          <div className="rm-auth-heading">

            <div className="rm-auth-number">
              {mode === 'login'
                ? '01'
                : '02'}
            </div>

            <div>

              <span className="rm-auth-kicker">

                {mode === 'login'
                  ? 'WORKSPACE ACCESS'
                  : 'NEW ACCOUNT'}

              </span>

              <h2>

                {mode === 'login'
                  ? 'Welcome back.'
                  : 'Create your account.'}

              </h2>

            </div>

          </div>


          {/* =====================================
              FORM
              ===================================== */}

          <form
            onSubmit={handleSubmit}
            className="rm-auth-form"
          >

            {/* FULL NAME */}

            {mode === 'register' && (
              <>

                <label>

                  <span>
                    FULL NAME
                  </span>

                  <input
                    value={
                      form.fullName
                    }

                    onChange={(event) =>
                      updateField(
                        'fullName',
                        event.target.value
                      )
                    }

                    placeholder="Your full name"

                    autoComplete="name"
                  />

                </label>


                {/* EMAIL */}

                <label>

                  <span>
                    EMAIL
                  </span>

                  <input
                    type="email"

                    value={
                      form.email
                    }

                    onChange={(event) =>
                      updateField(
                        'email',
                        event.target.value
                      )
                    }

                    placeholder="you@company.com"

                    autoComplete="email"
                  />

                </label>

              </>
            )}


            {/* USERNAME */}

            <label>

              <span>
                USERNAME
              </span>

              <input
                value={
                  form.username
                }

                onChange={(event) =>
                  updateField(
                    'username',
                    event.target.value
                  )
                }

                placeholder="Enter username"

                autoComplete="username"
              />

            </label>


            {/* PASSWORD */}

            <label>

              <span>
                PASSWORD
              </span>

              <div className="rm-auth-password">

                <input
                  type={
                    showPassword
                      ? 'text'
                      : 'password'
                  }

                  value={
                    form.password
                  }

                  onChange={(event) =>
                    updateField(
                      'password',
                      event.target.value
                    )
                  }

                  placeholder="Enter password"

                  autoComplete={
                    mode === 'login'
                      ? 'current-password'
                      : 'new-password'
                  }

                />

                <button
                  type="button"

                  onClick={() =>
                    setShowPassword(
                      (value) =>
                        !value
                    )
                  }
                >

                  {showPassword
                    ? 'HIDE'
                    : 'SHOW'}

                </button>

              </div>

            </label>


            {/* CONFIRM PASSWORD */}

            {mode === 'register' && (
              <label>

                <span>
                  CONFIRM PASSWORD
                </span>

                <input
                  type="password"

                  value={
                    form.confirmPassword
                  }

                  onChange={(event) =>
                    updateField(
                      'confirmPassword',
                      event.target.value
                    )
                  }

                  placeholder="Confirm password"

                  autoComplete="new-password"
                />

              </label>
            )}


            {/* ERROR */}

            {error && (
              <div className="rm-auth-alert rm-auth-error">

                <strong>
                  !
                </strong>

                <span>
                  {error}
                </span>

              </div>
            )}


            {/* SUCCESS */}

            {message && (
              <div className="rm-auth-alert rm-auth-success">

                <strong>
                  ✓
                </strong>

                <span>
                  {message}
                </span>

              </div>
            )}


            {/* SUBMIT */}

            <button
              className="rm-auth-submit"

              type="submit"

              disabled={loading}
            >

              {loading
                ? 'PLEASE WAIT...'
                : mode === 'login'
                  ? 'ENTER WORKSPACE →'
                  : 'CREATE ACCOUNT →'}

            </button>

          </form>


          {/* =====================================
              SWITCH LOGIN / REGISTER
              ===================================== */}

          <div className="rm-auth-switch">

            <span>

              {mode === 'login'
                ? "Don't have an account?"
                : 'Already have an account?'}

            </span>

            <button
              type="button"
              onClick={switchMode}
            >

              {mode === 'login'
                ? 'Create account'
                : 'Sign in'}

            </button>

          </div>

        </div>

      </section>

    </div>
  )
}
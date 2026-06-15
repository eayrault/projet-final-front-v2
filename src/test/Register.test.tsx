import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import Register from '../components/Register'

const mockRegister = vi.fn()

vi.mock('../contexts/AuthContext', () => ({
  useAuth: () => ({ register: mockRegister }),
}))

describe('Composant Register', () => {
  beforeEach(() => {
    mockRegister.mockReset()
  })

  it("appelle register avec les bonnes données à la soumission", async () => {
    mockRegister.mockResolvedValue(undefined)
    render(<Register />)

    await userEvent.type(screen.getByLabelText(/username/i), 'johndoe')
    await userEvent.type(screen.getByLabelText(/first name/i), 'John')
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith({
        username: 'johndoe',
        first_name: 'John',
        last_name: 'Doe',
        email: 'john@example.com',
        password: 'secret123',
      })
    })
  })

  it("affiche un état de chargement pendant la soumission", async () => {
    // register ne se résout jamais → le composant reste en chargement
    mockRegister.mockReturnValue(new Promise(() => {}))
    render(<Register />)

    await userEvent.type(screen.getByLabelText(/username/i), 'johndoe')
    await userEvent.type(screen.getByLabelText(/first name/i), 'John')
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))

    expect(screen.getByRole('button', { name: /registering/i })).toBeDisabled()
  })

  it("affiche un message de succès après inscription réussie", async () => {
    mockRegister.mockResolvedValue(undefined)
    render(<Register />)

    await userEvent.type(screen.getByLabelText(/username/i), 'johndoe')
    await userEvent.type(screen.getByLabelText(/first name/i), 'John')
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'john@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(screen.getByText(/registration successful/i)).toBeInTheDocument()
    })
  })

  it("affiche une erreur si register échoue", async () => {
    mockRegister.mockRejectedValue(new Error('Email already used'))
    render(<Register />)

    await userEvent.type(screen.getByLabelText(/username/i), 'johndoe')
    await userEvent.type(screen.getByLabelText(/first name/i), 'John')
    await userEvent.type(screen.getByLabelText(/last name/i), 'Doe')
    await userEvent.type(screen.getByLabelText(/email/i), 'existing@example.com')
    await userEvent.type(screen.getByLabelText(/password/i), 'secret123')
    await userEvent.click(screen.getByRole('button', { name: /create account/i }))

    await waitFor(() => {
      expect(screen.getByText(/email already used/i)).toBeInTheDocument()
    })
  })
})

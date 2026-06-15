import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import * as api from '../services/api'

describe('api.register()', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("retourne les données utilisateur en cas de succès (201)", async () => {
    const mockData = { username: 'johndoe', email: 'john@example.com' }
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(mockData), { status: 201 })
    )

    const result = await api.register({
      username: 'johndoe',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john@example.com',
      password: 'secret123',
    })

    expect(result).toEqual(mockData)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/auth/register'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it("erreur si la réponse est 400 (email déjà utilisé)", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ message: 'Email already used' }), { status: 400 })
    )

    await expect(
      api.register({
        username: 'johndoe',
        first_name: 'John',
        last_name: 'Doe',
        email: 'existing@example.com',
        password: 'secret123',
      })
    ).rejects.toThrow('Email already used')
  })
})

describe('api.getEvents()', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("retourne la liste des évènements", async () => {
    const mockEvents = [
      { id: '1', name: 'Evo France 2026', attendees: 42 },
      { id: '2', name: 'Esport World Cup', attendees: 10 },
    ]
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify(mockEvents), { status: 200 })
    )

    const result = await api.getEvents()

    expect(result).toEqual(mockEvents)
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/events'),
      expect.any(Object)
    )
  })

  it("erreur si la réponse est 500", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ message: 'Internal Server Error' }), { status: 500 })
    )

    await expect(api.getEvents()).rejects.toThrow()
  })
})

describe('api.registerToEvent()', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn())
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it("pas d'erreur en cas de succès (200/201)", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ message: 'Successfully registered' }), { status: 201 })
    )

    await expect(api.registerToEvent('event-id-1')).resolves.toBeUndefined()
    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining('/event-registrations'),
      expect.objectContaining({ method: 'POST' })
    )
  })

  it("erreur 400 si l'utilisateur est déjà inscrit", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ message: 'Already registered' }), { status: 400 })
    )

    await expect(api.registerToEvent('event-id-1')).rejects.toThrow('Already registered')
  })

  it("erreur 401 si l'utilisateur n'est pas authentifié", async () => {
    vi.mocked(fetch).mockResolvedValue(
      new Response(JSON.stringify({ message: 'Unauthorized' }), { status: 401 })
    )

    await expect(api.registerToEvent('event-id-1')).rejects.toThrow()
  })
})

describe('api.isAuthenticated()', () => {
  afterEach(() => {
    localStorage.clear()
  })

  it("retourne false si localStorage est vide", () => {
    localStorage.clear()
    expect(api.isAuthenticated()).toBe(false)
  })

  it("retourne true si un accessToken est présent", () => {
    localStorage.setItem('accessToken', 'fake-token')
    expect(api.isAuthenticated()).toBe(true)
  })
})

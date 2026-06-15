import { test, expect, type Page } from '@playwright/test'

// Helper : connexion réutilisable dans les tests
async function login(page: Page, email = 'admin@test.com', password = 'motdepasse') {
  await page.goto('/login')
  await page.getByLabel(/email/i).fill(email)
  await page.getByLabel(/password/i).fill(password)
  await page.getByRole('button', { name: /login/i }).click()
  await expect(page).toHaveURL('/', { timeout: 5000 })
}

test.describe("Consultation des évènements (US2)", () => {
  test("la liste des évènements est accessible après connexion", async ({ page }) => {
    await login(page)
    await page.goto('/events')    // Vérifier le titre de la page "Events" (h2 spécifique)
    await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible()
    // Au moins un lien vers un évènement (données de la seed)
    await expect(page.locator('a[href*="/events/"]').first()).toBeVisible({ timeout: 5000 })
  })

  test("un joueur peut accéder au détail d'un évènement", async ({ page }) => {
    await login(page)
    await page.goto('/events')

    await page.locator('a[href*="/events/"]').first().click()

    await expect(page).toHaveURL(/\/events\/[\w-]+/)
    // Le h2 du titre de l'évènement doit être visible
    await expect(page.getByRole('heading', { level: 2 })).toBeVisible()
  })
})

test.describe("Inscription à un évènement (US3)", () => {
  test("un nouveau joueur peut s'inscrire à un évènement", async ({ page }) => {
    const unique = Date.now()

    // Créer un compte frais pour éviter les conflits d'inscription
    await page.goto('/register')
    await page.getByLabel(/username/i).fill(`player${unique}`)
    await page.getByLabel(/first name/i).fill('Player')
    await page.getByLabel(/last name/i).fill('Test')
    await page.getByLabel(/email/i).fill(`player${unique}@test.com`)
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /create account/i }).click()
    await expect(page.getByText(/registration successful/i)).toBeVisible()

    // Se connecter
    await page.goto('/login')
    await page.getByLabel(/email/i).fill(`player${unique}@test.com`)
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /login/i }).click()
    await expect(page).toHaveURL('/')

    // Accéder au premier évènement
    await page.goto('/events')
    await page.locator('a[href*="/events/"]').first().click()    // S'inscrire
    await page.getByRole('button', { name: /register|join|s'inscrire/i }).click()

    // Le bouton "Unregister" apparaît : l'inscription a bien été enregistrée
    await expect(
      page.getByRole('button', { name: /unregister/i })
    ).toBeVisible({ timeout: 5000 })
  })
  test("une tentative de double inscription retourne une erreur 400", async ({ page }) => {
    const unique = Date.now()

    // Créer un compte frais
    await page.goto('/register')
    await page.getByLabel(/username/i).fill(`player2${unique}`)
    await page.getByLabel(/first name/i).fill('Player')
    await page.getByLabel(/last name/i).fill('Test')
    await page.getByLabel(/email/i).fill(`player2${unique}@test.com`)
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /create account/i }).click()

    await page.goto('/login')
    await page.getByLabel(/email/i).fill(`player2${unique}@test.com`)
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /login/i }).click()
    await expect(page).toHaveURL('/')

    // Récupérer l'id du premier évènement et le token depuis le localStorage
    await page.goto('/events')
    const href = await page.locator('a[href*="/events/"]').first().getAttribute('href')
    const eventId = href?.split('/events/')[1]
    const token = await page.evaluate(() => localStorage.getItem('accessToken'))

    const headers = {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    }

    // Première inscription -> 201
    const first = await page.request.post('/api/event-registrations', {
      data: { event_id: eventId },
      headers,
    })
    expect(first.status()).toBe(201)

    // Deuxième inscription sur le même évènement -> 400
    const second = await page.request.post('/api/event-registrations', {
      data: { event_id: eventId },
      headers,
    })
    expect(second.status()).toBe(400)
  })
  test("US2 — /my-events affiche les évènements de l'utilisateur connecté", async ({ page }) => {
    await login(page)
    await page.goto('/my-events')

    await expect(page).toHaveURL('/my-events')
    // Vérifier le titre spécifique de la page
    await expect(page.getByRole('heading', { name: 'My Events' })).toBeVisible()
  })
})


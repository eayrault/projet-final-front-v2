import { test, expect } from '@playwright/test'

test.describe("Authentification", () => {
  test("US1 — un joueur peut créer un compte", async ({ page }) => {
    const unique = Date.now()

    await page.goto('/register')
    await page.getByLabel(/username/i).fill(`player${unique}`)
    await page.getByLabel(/first name/i).fill('Player')
    await page.getByLabel(/last name/i).fill('Test')
    await page.getByLabel(/email/i).fill(`player${unique}@test.com`)
    await page.getByLabel(/password/i).fill('password123')
    await page.getByRole('button', { name: /create account/i }).click()

    await expect(page.getByText(/registration successful/i)).toBeVisible({ timeout: 5000 })
  })
  test("un utilisateur peut se connecter avec des identifiants valides", async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('admin@test.com')
    await page.getByLabel(/password/i).fill('motdepasse')
    await page.getByRole('button', { name: /login/i }).click()

    // Redirection vers la page d'accueil après connexion
    await expect(page).toHaveURL('/', { timeout: 5000 })
  })

  test("des identifiants invalides affichent une erreur", async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('wrong@example.com')
    await page.getByLabel(/password/i).fill('wrongpassword')
    await page.getByRole('button', { name: /login/i }).click()

    await expect(page.getByRole('alert').or(page.locator('[class*="red"]'))).toBeVisible({ timeout: 5000 })
  })

  test("un utilisateur non connecté est redirigé vers /login", async ({ page }) => {
    // Accès direct à une route protégée sans session
    await page.goto('/my-events')
    await expect(page).toHaveURL(/\/login/, { timeout: 5000 })
  })
  test("un utilisateur connecté peut se déconnecter", async ({ page }) => {
    await page.goto('/login')
    await page.getByLabel(/email/i).fill('admin@test.com')
    await page.getByLabel(/password/i).fill('motdepasse')
    await page.getByRole('button', { name: /login/i }).click()
    await expect(page).toHaveURL('/', { timeout: 5000 })

    await page.getByRole('button', { name: /logout/i }).click()

    // Après déconnexion : retour sur login ou page publique
    await expect(page).toHaveURL(/\/(login)?$/, { timeout: 5000 })
  })
})

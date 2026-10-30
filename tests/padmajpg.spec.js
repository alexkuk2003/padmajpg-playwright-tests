const { test, expect } = require('@playwright/test');

test.describe('padmajpg.ru — E2E', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');

    const popup = page.locator('#puttyPopup');

    try {
      await popup.waitFor({ state: 'visible', timeout: 3000 });
      await page.keyboard.press('Escape');
      await popup.waitFor({ state: 'hidden', timeout: 3000 });
    } catch {
      // попапа нет — идём дальше
    }
  });

  test('1. Тексты на главной странице', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Войти и выйти');
    await expect(page.locator('body')).toContainText('Черрипикнуть в релиз');
    await expect(page.locator('body')).toContainText('работает на моей машине');
  });

  test('2. Ссылка «Как билдили» ведёт на страницу /build/', async ({ page }) => {
    const link = page.getByRole('link', { name: /как билдили/i });
    await expect(link).toBeVisible();
    await expect(link).toHaveAttribute('href', '/build/');
    await link.click();
    await expect(page).toHaveURL(/\/build\/?$/);
  });

  test('3. Переход на страницу Билд через шапку', async ({ page }) => {
    await page.getByRole('link', { name: 'Билд', exact: true }).click();
    await expect(page).toHaveURL(/\/build\/?$/);
    await expect(page.locator('h1')).toContainText('Сделали билд?');
  });

});
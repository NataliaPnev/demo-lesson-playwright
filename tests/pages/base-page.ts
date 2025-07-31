import { Locator, Page } from '@playwright/test'

export abstract class BasePage {
  readonly page: Page
  readonly languageSwitcher: Locator
  readonly privacyPolicyLink: Locator

  protected constructor(page: Page) {
    this.page = page
    this.languageSwitcher = page.locator('div.language')
    this.privacyPolicyLink = page.getByTestId('privacy-policy')
  }
}

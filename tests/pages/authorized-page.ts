import { BasePage } from './base-page'
import { Locator, Page } from '@playwright/test'

export class AuthorizedPage extends BasePage{
  readonly buttonStatus: Locator
  readonly buttonLogOut: Locator
  readonly inputOrderNumber: Locator
  readonly buttonTrackingOrder: Locator

  constructor(page: Page) {
    super(page)
    this.buttonStatus = page.locator('.header__button_check-order')
    this.buttonLogOut = page.locator('.header__button_exit')
    this.inputOrderNumber = page.getByTestId('searchOrder-input')
    this.buttonTrackingOrder = page.getByTestId('searchOrder-submitButton')
  }
}
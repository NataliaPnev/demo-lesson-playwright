import { Locator, Page } from '@playwright/test'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Locator
  readonly name: Locator
  readonly phone: Locator
  readonly comment: Locator
  readonly orderButton: Locator
  readonly logoutButton: Locator
  readonly notificationPopUp: Locator
  // add more locators here

  constructor(page: Page) {
    this.page = page
    this.statusButton = page.getByTestId('openStatusPopup-button')
    this.name = page.getByTestId('username-input')
    this.phone = page.getByTestId('phone-input')
    this.comment = page.getByTestId('comment-input')
    this.orderButton = page.getByTestId('createOrder-button')
    this.logoutButton = page.getByTestId('logout-button')
    this.notificationPopUp = page.getByTestId('orderSuccessfullyCreated-popup')
  }
}

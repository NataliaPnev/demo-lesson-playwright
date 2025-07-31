import { Locator, Page } from '@playwright/test'
import { AuthorizedPage } from './authorized-page'

export class OrderFound extends AuthorizedPage {
  readonly input: Locator
  readonly orderInformationName: Locator
  readonly orderInformationPhone: Locator
  readonly orderInformationComment: Locator

  constructor(page: Page) {
    super(page)
    this.input = page.locator('.order-details__input')
    this.orderInformationName = page.getByTestId('order-item-0')
    this.orderInformationPhone = page.getByTestId('order-item-1')
    this.orderInformationComment = page.getByTestId('order-item-2')
  }
}

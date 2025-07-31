import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/login-page'
import { faker } from '@faker-js/faker/locale/ar'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderNotFound } from '../pages/order-not-found'
import { OrderFound } from '../pages/order-found'

let authPage: LoginPage

test.beforeEach(async ({ page }) => {
  authPage = new LoginPage(page)
  await authPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(7))
  await expect(authPage.signInButton).toBeDisabled()
})

test('error message displayed when incorrect credentials used', async ({}) => {
  await authPage.usernameField.fill(faker.lorem.word(2))
  await authPage.passwordField.fill(faker.lorem.word(8))
  await authPage.signInButton.click()
  await expect(authPage.errorMassage).toHaveText('×Incorrect credentials')
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await expect.soft(orderCreationPage.buttonStatus).toBeVisible()
  await expect.soft(orderCreationPage.orderButton).toBeVisible({ timeout: 10000 })
  await expect.soft(orderCreationPage.name).toBeVisible()
  await expect.soft(orderCreationPage.phone).toBeVisible()
  await expect.soft(orderCreationPage.comment).toBeVisible()
  await expect.soft(orderCreationPage.buttonLogOut).toBeVisible()
})

test('login and create order', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.name.fill(faker.lorem.word(2))
  await orderCreationPage.phone.fill('123455789')
  await orderCreationPage.comment.fill('cake')
  await orderCreationPage.orderButton.click()
  await expect.soft(orderCreationPage.notificationPopUp).toBeVisible()
  //await expect
  //.soft(orderCreationPage.notificationPopUp)
  //.toHaveText('×Order has been created!Tracking code: undefinedok')
  await expect.soft(orderCreationPage.notificationPopUp).toHaveText(/Tracking code: \d+/)
})

test('login and logout', async ({}) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.buttonLogOut.click()
  await expect.soft(authPage.signInButton).toBeVisible()
})

test('Order not found page elements are visible', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.buttonStatus.click()
  await orderCreationPage.inputOrderNumber.fill('0000')
  await orderCreationPage.buttonTrackingOrder.click()
  const orderNotFoundPage = new OrderNotFound(page)
  await expect.soft(orderNotFoundPage.orderNotFoundTitle).toBeVisible()
})

test('Order found page elements are visible', async ({ page }) => {
  const orderCreationPage = await authPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.buttonStatus.click()
  await orderCreationPage.inputOrderNumber.fill('10571')
  await orderCreationPage.buttonTrackingOrder.click()
  const orderFoundPage = new OrderFound(page)
  await expect.soft(orderFoundPage.orderInformationName).toBeVisible()
  await expect.soft(orderFoundPage.orderInformationPhone).toBeVisible()
  await expect.soft(orderFoundPage.orderInformationComment).toBeVisible()
})

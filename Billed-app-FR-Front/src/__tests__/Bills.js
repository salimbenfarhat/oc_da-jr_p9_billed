/**
 * @jest-environment jsdom
 */

import {screen, fireEvent, waitFor} from "@testing-library/dom"
import { localStorageMock } from '../__mocks__/localStorage.js';
import mockStore from '../__mocks__/store.js';
import BillsUI from "../views/BillsUI.js"
import Bills from "../containers/Bills.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES, ROUTES_PATH} from "../constants/routes.js";

import router from "../app/Router.js";

// Mock the store module
jest.mock("../app/store", () => mockStore)

describe("Given I am connected as an employee", () => {
  describe("When I am on Bills Page", () => {
    test("Then bill icon in vertical layout should be highlighted", async () => {
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      router()
      window.onNavigate(ROUTES_PATH.Bills)
      await waitFor(() => screen.getByTestId('icon-window'))
      const windowIcon = screen.getByTestId('icon-window')
      // Check if the window icon is marked as active
      expect(windowIcon.classList.contains('active-icon')).toBe(true)

    })
    test("Then bills should be ordered from earliest to latest", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      const dates = screen.getAllByText(/^(19|20)\d\d[- /.](0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])$/i).map(a => a.innerHTML)
      const antiChrono = (a, b) => ((a < b) ? 1 : -1)
      const datesSorted = [...dates].sort(antiChrono)
      expect(dates).toEqual(datesSorted)
    })
  })
  describe("When I click on the new bill button", () => {
    test("Then it should navigate to the New Bill page", () => {
      // Simulate onNavigate function
      const onNavigate = (pathname) => { document.body.innerHTML = ROUTES({ pathname }) }
      // Init Bills with mocked onNavigate
      const bills = new Bills({
        document,
        onNavigate,
        store: null, 
        bills: [],
        localStorage: window.localStorage
      })
      // Simulate the clic on "Nouvelle Facture" button
      document.body.innerHTML = `<div data-testid="btn-new-bill"></div>`
      const newBillBtn = screen.getByTestId('btn-new-bill')
      newBillBtn.addEventListener('click', bills.handleClickNewBill)
      const onNavigateSpy = jest.spyOn(bills, "onNavigate")
      fireEvent.click(newBillBtn)
      // Check if onNavigate has been called with the path to new bill
      expect(onNavigateSpy).toHaveBeenCalledWith(ROUTES_PATH.NewBill);
    });
  })
  describe("When I click on the eye icon of a bill", () => {
    test("Then the modal should open with the bill's image", () => {
      document.body.innerHTML = BillsUI({ data: bills })
      // Simulate onNavigate function
      const onNavigate = (pathname) => { document.body.innerHTML = ROUTES({ pathname }) }
      // Initialization required to configure event listeners on eye icons
      const billsInstance = new Bills({
        document,
        onNavigate, 
        store: null,
        localStorage: window.localStorage
      })
      // Simulate modal display
      $.fn.modal = jest.fn()
      // Select the first eye icon
      const eyeIcon = screen.getAllByTestId("icon-eye")[0]
      // Set the event handling function for the eye icon click
      const handleClickIconEye = jest.fn(billsInstance.handleClickIconEye(eyeIcon))
      // Add the click event listener to the eye icon
      eyeIcon.addEventListener("click", handleClickIconEye)
      // Simulate the click on the eye icon
      fireEvent.click(eyeIcon)
      // Check if the modal has been called
      expect($.fn.modal).toHaveBeenCalledWith("show")
    })
  })
})

// GET integration test
describe("Given I am a user connected as Employee", () => {
  describe("When I navigate to Bills", () => {
    test("fetches bills from mock API GET", async () => {
      // Set up user as connected as an Employee
      localStorage.setItem("user", JSON.stringify({ type: "Employee", email: "e@e" }))
       // Create a root element for testing
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      // Start the application routing
      router()
      // Navigate to the bills page
      window.onNavigate(ROUTES_PATH.Bills)
       // Wait for the page title to appear
      await waitFor(() => screen.getByText("Mes notes de frais"))
      // Check if the page title is successfully displayed
      const contentTitle = await screen.getByText("Mes notes de frais")
      expect(contentTitle).toBeTruthy()
      // Check if the "New Bill" button is present
      expect(document.querySelector("[data-testid='btn-new-bill']")).toBeTruthy()
    })
    describe("When an error occurs on API", () => {
      beforeEach(() => {
        // Spy on the 'bills' method of mockStore to intercept calls to this method
        jest.spyOn(mockStore, "bills")
        // Set up user as connected as an Employee
        Object.defineProperty(
            window,
            'localStorage',
            { value: localStorageMock }
        )
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee',
          email: "e@e"
        }))
        // Create a root element for testing
        const root = document.createElement("div")
        root.setAttribute("id", "root")
        document.body.appendChild(root)
        // Start the application routing
        router()
      })
      test("fetches bills from an API and fails with 404 message error", async () => {
        // Mock the 'list' method of mockStore to return a promise rejected with a 404 error
        mockStore.bills.mockImplementationOnce(() => {
          return {
            list : () =>  { return Promise.reject(new Error("Erreur 404")) }
          }})
        // Navigate to the bills page
        window.onNavigate(ROUTES_PATH.Bills)
        // Wait for interface update after promise is rejected
        await new Promise(process.nextTick)
        // Check if the 404 error message is displayed
        const message = await screen.getByText(/Erreur 404/)
        expect(message).toBeTruthy()
      })
      test("fetches messages from an API and fails with 500 message error", async () => {
        // Mock the 'list' method of mockStore to return a promise rejected with a 500 error
        mockStore.bills.mockImplementationOnce(() => {
          return {
            list : () =>  { return Promise.reject(new Error("Erreur 500")) }
          }})
        // Navigate to the bills page
        window.onNavigate(ROUTES_PATH.Bills)
        // Wait for interface update after promise is rejected
        await new Promise(process.nextTick)
        // Check if the 500 error message is displayed
        const message = await screen.getByText(/Erreur 500/)
        expect(message).toBeTruthy()
      })
    })
  })
})
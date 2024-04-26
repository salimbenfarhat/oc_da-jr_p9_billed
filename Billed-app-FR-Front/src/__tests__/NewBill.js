/**
 * @jest-environment jsdom
 */

import { fireEvent, screen, waitFor} from "@testing-library/dom"
import userEvent from '@testing-library/user-event'
import { localStorageMock } from '../__mocks__/localStorage.js';
import mockStore from '../__mocks__/store.js';
import NewBillUI from "../views/NewBillUI.js"
import NewBill from "../containers/NewBill.js"
import { bills } from "../fixtures/bills.js"
import { ROUTES, ROUTES_PATH } from "../constants/routes.js";

import router from "../app/Router.js";

// Mock the store module
jest.mock("../app/store", () => mockStore)

describe("Given I am connected as an employee", () => {
  describe("When I am on NewBill Page", () => {
    test("Then mail icon in vertical layout should be highlighted", async () => {
      // Set up the user as connected as an Employee
      Object.defineProperty(window, 'localStorage', { value: localStorageMock })
      window.localStorage.setItem('user', JSON.stringify({
        type: 'Employee'
      }))
      // Create a root element for testing
      const root = document.createElement("div")
      root.setAttribute("id", "root")
      document.body.append(root)
      // Start the application routing
      router()
      // Navigate to the NewBill page
      window.onNavigate(ROUTES_PATH.NewBill)
      // Wait for the mail icon to appear
      await waitFor(() => screen.getByTestId('icon-mail'))
      const mailIcon = screen.getByTestId('icon-mail')
      // Check if the mail icon is marked as active
      expect(mailIcon.classList.contains('active-icon')).toBe(true)
    })

    describe('When I handle a file change', () => {
      test('should handle the file correctly if the file type is allowed', () => {
        // Set up the user as connected as an Employee
        document.body.innerHTML = NewBillUI()
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee'
        }))
        // Create NewBill instance
        document.body.innerHTML = NewBillUI({ data: [bills[0]] })
        const onNavigate = (pathname) => { document.body.innerHTML = ROUTES({ pathname }) }
        const testNewbill = new NewBill({
          document,
          onNavigate,
          store: mockStore,
          localStorage: window.localStorage
        })
        // Set up file input and file
        const addFileBtn = document.querySelector('input[data-testid="file"]')
        const file = new File(['image'], 'image.jpg', { type: 'image/jpeg' })
        const handleChangeFile = jest.fn(() => {
          testNewbill.handleChangeFile
        })
        addFileBtn.addEventListener('change', handleChangeFile)
        fireEvent.change(addFileBtn, { target: { files: [file] } })
        // Assertion checks
        expect(addFileBtn).toBeTruthy()
        expect(handleChangeFile).toHaveBeenCalled()
        expect(addFileBtn.files).toHaveLength(1)
        expect(addFileBtn.files[0].name).toBe('image.jpg')
      })
    
      test('should reset the file value and alert if the file type is not allowed', () => {
        // Mock the window.alert method
        document.body.innerHTML = NewBillUI()
        jest.spyOn(window, 'alert').mockImplementation(() => {})
        // Define a mock file object with an invalid file type
        const mockFile = { path: 'wrongFile.ext', type: 'ext' }
        // Create a NewBill instance
        const newBillController = new NewBill({
          document,
          onNavigate: () => {},
          store: null,
          localStorage: window.localStorage
        })
        // Define the handleChangeFile function and spy on it
        const handleChangeFile = jest.fn(newBillController.handleChangeFile)
        // Get the file input element
        const fileInput = document.querySelector('input[data-testid="file"]')
        // Add an event listener for file change
        fileInput.addEventListener('change', handleChangeFile)
        // Simulate a file change event with the mock file
        fireEvent.change(fileInput, {
          target: {
            files: [
              new File([mockFile['path']], mockFile['path'], { type: mockFile['type'] })
            ]
          }
        })
        // Assertion checks
        expect(handleChangeFile).toHaveBeenCalled()
        expect(window.alert).toHaveBeenCalledWith('Seuls les fichiers aux formats .JPG, .JPEG et .PNG sont acceptés')
      })
    })

    describe('When I submit a valid form', () => {
      test('should create a new bill', async () => {
        document.body.innerHTML = NewBillUI()
        // Set up the user as connected as an Employee
        Object.defineProperty(window, 'localStorage', { value: localStorageMock })
        window.localStorage.setItem('user', JSON.stringify({
          type: 'Employee'
        }))
        // Define the onNavigate function to simulate navigation
        const onNavigate = (pathname) => {
          document.body.innerHTML = ROUTES({ pathname })
        }
        // Create a NewBill instance
        const testNewbill = new NewBill({
          document,
          onNavigate,
          store: mockStore,
          localStorage: window.localStorage
        })
        // Spy on the handleSubmit and updateBill methods
        const handleSubmitSpy = jest.spyOn(testNewbill, 'handleSubmit')
        const updateBillSpy = jest.spyOn(testNewbill, 'updateBill')
        // Get the form and submit button elements
        const form = screen.getByTestId('form-new-bill')
        const submitBtn = form.querySelector('#btn-send-bill')
        // Add an event listener for form submission
        form.addEventListener('submit', (e) => {
          testNewbill.handleSubmit(e)
        })
        // Simulate a click on the submit button
        userEvent.click(submitBtn)
        // Wait for assertions to complete
        await waitFor(() => { 
          expect(handleSubmitSpy).toHaveBeenCalled()
          expect(updateBillSpy).toHaveBeenCalled()
        })
      })
    })
  })
})
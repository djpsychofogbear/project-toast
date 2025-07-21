import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import ToastPlayground from '../components/ToastPlayground'

describe('ToastPlayground - Exercise 1', () => {
  beforeEach(() => {
    render(<ToastPlayground />)
  })

  describe('Component Structure', () => {
    it('renders the toast playground with header and form controls', () => {
      expect(screen.getByRole('img', { name: /cute toast mascot/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /toast playground/i })).toBeInTheDocument()
      expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /pop toast!/i })).toBeInTheDocument()
    })
  })

  describe('Message Textarea - Controlled Input', () => {
    it('starts with an empty message', () => {
      const messageInput = screen.getByRole('textbox', { name: /message/i })
      expect(messageInput).toHaveValue('')
    })

    it('updates the message when typing in the textarea', async () => {
      const user = userEvent.setup()
      const messageInput = screen.getByRole('textbox', { name: /message/i })
      
      await user.type(messageInput, 'Test toast message')
      
      expect(messageInput).toHaveValue('Test toast message')
    })

    it('handles clearing the message', async () => {
      const user = userEvent.setup()
      const messageInput = screen.getByRole('textbox', { name: /message/i })
      
      await user.type(messageInput, 'Some text')
      expect(messageInput).toHaveValue('Some text')
      
      await user.clear(messageInput)
      expect(messageInput).toHaveValue('')
    })

    it('handles multiple changes to the message', async () => {
      const user = userEvent.setup()
      const messageInput = screen.getByRole('textbox', { name: /message/i })
      
      await user.type(messageInput, 'First message')
      expect(messageInput).toHaveValue('First message')
      
      await user.clear(messageInput)
      await user.type(messageInput, 'Second message')
      expect(messageInput).toHaveValue('Second message')
    })
  })

  describe('Variant Radio Buttons - Controlled Input', () => {
    it('renders all four variant radio buttons', () => {
      const expectedVariants = ['notice', 'warning', 'success', 'error']
      
      expectedVariants.forEach(variant => {
        expect(screen.getByRole('radio', { name: variant })).toBeInTheDocument()
      })
    })

    it('starts with notice variant selected by default', () => {
      const noticeRadio = screen.getByRole('radio', { name: 'notice' })
      const warningRadio = screen.getByRole('radio', { name: 'warning' })
      const successRadio = screen.getByRole('radio', { name: 'success' })
      const errorRadio = screen.getByRole('radio', { name: 'error' })
      
      expect(noticeRadio).toBeChecked()
      expect(warningRadio).not.toBeChecked()
      expect(successRadio).not.toBeChecked()
      expect(errorRadio).not.toBeChecked()
    })

    it('allows selecting different variants', async () => {
      const user = userEvent.setup()
      const warningRadio = screen.getByRole('radio', { name: 'warning' })
      const noticeRadio = screen.getByRole('radio', { name: 'notice' })
      
      await user.click(warningRadio)
      
      expect(warningRadio).toBeChecked()
      expect(noticeRadio).not.toBeChecked()
    })

    it('ensures only one radio button can be selected at a time', async () => {
      const user = userEvent.setup()
      const noticeRadio = screen.getByRole('radio', { name: 'notice' })
      const warningRadio = screen.getByRole('radio', { name: 'warning' })
      const successRadio = screen.getByRole('radio', { name: 'success' })
      const errorRadio = screen.getByRole('radio', { name: 'error' })
      
      // Initially notice is selected
      expect(noticeRadio).toBeChecked()
      
      // Select warning
      await user.click(warningRadio)
      expect(warningRadio).toBeChecked()
      expect(noticeRadio).not.toBeChecked()
      expect(successRadio).not.toBeChecked()
      expect(errorRadio).not.toBeChecked()
      
      // Select success
      await user.click(successRadio)
      expect(successRadio).toBeChecked()
      expect(noticeRadio).not.toBeChecked()
      expect(warningRadio).not.toBeChecked()
      expect(errorRadio).not.toBeChecked()
      
      // Select error
      await user.click(errorRadio)
      expect(errorRadio).toBeChecked()
      expect(noticeRadio).not.toBeChecked()
      expect(warningRadio).not.toBeChecked()
      expect(successRadio).not.toBeChecked()
    })

    it('has all radio buttons in the same group', () => {
      const radioButtons = screen.getAllByRole('radio')
      
      radioButtons.forEach(radio => {
        expect(radio).toHaveAttribute('name', 'variant')
      })
    })

    it('can cycle through all variants', async () => {
      const user = userEvent.setup()
      const variants = ['notice', 'warning', 'success', 'error']
      
      for (const variant of variants) {
        const radio = screen.getByRole('radio', { name: variant })
        await user.click(radio)
        expect(radio).toBeChecked()
        
        // Ensure all others are unchecked
        const otherVariants = variants.filter(v => v !== variant)
        otherVariants.forEach(otherVariant => {
          expect(screen.getByRole('radio', { name: otherVariant })).not.toBeChecked()
        })
      }
    })
  })

  describe('Form Integration', () => {
    it('maintains state independently for message and variant', async () => {
      const user = userEvent.setup()
      const messageInput = screen.getByRole('textbox', { name: /message/i })
      const warningRadio = screen.getByRole('radio', { name: 'warning' })
      
      // Change message
      await user.type(messageInput, 'Test message')
      expect(messageInput).toHaveValue('Test message')
      
      // Change variant
      await user.click(warningRadio)
      expect(warningRadio).toBeChecked()
      
      // Both should maintain their state
      expect(messageInput).toHaveValue('Test message')
      expect(warningRadio).toBeChecked()
    })

    it('handles form interactions without errors', async () => {
      const user = userEvent.setup()
      const messageInput = screen.getByRole('textbox', { name: /message/i })
      const successRadio = screen.getByRole('radio', { name: 'success' })
      const popButton = screen.getByRole('button', { name: /pop toast!/i })
      
      // Interact with all form elements
      await user.type(messageInput, 'Success message')
      await user.click(successRadio)
      await user.click(popButton)
      
      // Form should still be functional
      expect(messageInput).toHaveValue('Success message')
      expect(successRadio).toBeChecked()
    })
  })

  describe('Accessibility', () => {
    it('has proper labels for all form elements', () => {
      // Message textarea
      const messageLabel = screen.getByText('Message')
      const messageInput = screen.getByRole('textbox', { name: /message/i })
      expect(messageLabel).toBeInTheDocument()
      expect(messageInput).toHaveAttribute('id', 'message')
      
      // Radio buttons should have labels
      const variants = ['notice', 'warning', 'success', 'error']
      variants.forEach(variant => {
        const radio = screen.getByRole('radio', { name: variant })
        expect(radio).toHaveAttribute('id', `variant-${variant}`)
      })
    })

    it('has proper form structure', () => {
      // Check that variant section has a label
      expect(screen.getByText('Variant')).toBeInTheDocument()
    })
  })
}) 
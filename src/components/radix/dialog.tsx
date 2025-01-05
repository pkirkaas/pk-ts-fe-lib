/**
 * Popup Dialogs using Radix UI
 */

'use client'

// NPM Imports
import * as React from 'react'
import * as Dialog from '@radix-ui/react-dialog'

//Local Imports
import {cn, RButton,} from '../../index.js';

export interface PopupDialogProps {
  /**
   * The trigger element that opens the popup
   */
  trigger: React.ReactNode
  /**
   * The default text to show in the textarea
   */
  defaultText?: string
  /**
   * Callback function called when the form is submitted
   * @param text - The current textarea text value
   */
  onSave: (text: string) => void
  /**
   * Callback function called when the dialog is cancelled
   */
  onCancel?: () => void
  /**
   * Optional title for the popup
   */
  title?: string
  /**
   * Custom styles for the popup
   */
  styles?: PopupDialogStyles
  /**
   * Optional placeholder text for the textarea
   */
  placeholder?: string
  /**
   * Maximum length of the text
   * @default undefined
   */
  maxLength?: number
  className?: string
}

export interface PopupDialogStyles {
  /**
   * Width of the popup dialog
   * @default '500px'
   */
  width?: string
  /**
   * Height of the popup dialog
   * @default 'auto'
   */
  height?: string
  /**
   * Minimum height of the textarea
   * @default '150px'
   */
  textareaMinHeight?: string
  /**
   * Custom className for the dialog content
   */
  contentClassName?: string
  /**
   * Custom className for the textarea
   */
  textareaClassName?: string
}


/**
 * A reusable popup dialog component with textarea input
 * @param props - Component properties
 * @returns A popup dialog component
 */
export function PopupDialog({
  trigger,
  defaultText = '',
  onSave,
  onCancel,
  title = 'Enter Text',
  styles = {},
  placeholder = 'Enter your text here...',
  maxLength,
}: PopupDialogProps) {
  const [open, setOpen] = React.useState(false)
  const [text, setText] = React.useState(defaultText)
  const [error, setError] = React.useState<string | null>(null)

  const {
    width = '500px',
    height = 'auto',
    textareaMinHeight = '150px',
    contentClassName = '',
    textareaClassName = '',
  } = styles

  React.useEffect(() => {
    if (!open) {
      setText(defaultText)
      setError(null)
    }
  }, [open, defaultText])

  const handleSave = () => {
    try {
      if (!text.trim()) {
        setError('Text cannot be empty')
        return
      }
      onSave(text)
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleCancel = () => {
    try {
      onCancel?.()
      setOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave()
    } else if (e.key === 'Escape') {
      handleCancel()
    }
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content
          className={cn(
            "fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg",
            contentClassName
          )}
          style={{ width, height }}
        >
          <Dialog.Title className="text-lg font-bold mb-4">{title}</Dialog.Title>
          <div className="mb-4">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              className={cn(
                "w-full px-3 py-2 border rounded-md resize-none",
                textareaClassName
              )}
              style={{ minHeight: textareaMinHeight }}
              placeholder={placeholder}
              maxLength={maxLength}
              autoFocus
            />
            {maxLength && (
              <div className="text-sm text-gray-500 mt-1">
                {text.length}/{maxLength} characters
              </div>
            )}
            {error && (
              <div className="text-red-500 text-sm mt-1">{error}</div>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <RButton variant="secondary" onClick={handleCancel}>
              Cancel
            </RButton>
            <RButton onClick={handleSave}>Save</RButton>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}























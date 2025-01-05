/**
 * Popup Dialogs using Radix UI
 */
import * as React from 'react';
export interface PopupDialogProps {
    /**
     * The trigger element that opens the popup
     */
    trigger: React.ReactNode;
    /**
     * The default text to show in the textarea
     */
    defaultText?: string;
    /**
     * Callback function called when the form is submitted
     * @param text - The current textarea text value
     */
    onSave: (text: string) => void;
    /**
     * Callback function called when the dialog is cancelled
     */
    onCancel?: () => void;
    /**
     * Optional title for the popup
     */
    title?: string;
    /**
     * Custom styles for the popup
     */
    styles?: PopupDialogStyles;
    /**
     * Optional placeholder text for the textarea
     */
    placeholder?: string;
    /**
     * Maximum length of the text
     * @default undefined
     */
    maxLength?: number;
    className?: string;
}
export interface PopupDialogStyles {
    /**
     * Width of the popup dialog
     * @default '500px'
     */
    width?: string;
    /**
     * Height of the popup dialog
     * @default 'auto'
     */
    height?: string;
    /**
     * Minimum height of the textarea
     * @default '150px'
     */
    textareaMinHeight?: string;
    /**
     * Custom className for the dialog content
     */
    contentClassName?: string;
    /**
     * Custom className for the textarea
     */
    textareaClassName?: string;
}
/**
 * A reusable popup dialog component with textarea input
 * @param props - Component properties
 * @returns A popup dialog component
 */
export declare function PopupDialog({ trigger, defaultText, onSave, onCancel, title, styles, placeholder, maxLength, }: PopupDialogProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=dialog.d.ts.map
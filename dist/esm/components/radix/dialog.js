/**
 * Popup Dialogs using Radix UI
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// NPM Imports
import * as React from 'react';
import * as Dialog from '@radix-ui/react-dialog';
//Local Imports
import { cn, RButton, } from '../../index.js';
/**
 * A reusable popup dialog component with textarea input
 * @param props - Component properties
 * @returns A popup dialog component
 */
export function PopupDialog({ trigger, defaultText = '', onSave, onCancel, title = 'Enter Text', styles = {}, placeholder = 'Enter your text here...', maxLength, }) {
    const [open, setOpen] = React.useState(false);
    const [text, setText] = React.useState(defaultText);
    const [error, setError] = React.useState(null);
    const { width = '500px', height = 'auto', textareaMinHeight = '150px', contentClassName = '', textareaClassName = '', } = styles;
    React.useEffect(() => {
        if (!open) {
            setText(defaultText);
            setError(null);
        }
    }, [open, defaultText]);
    const handleSave = () => {
        try {
            if (!text.trim()) {
                setError('Text cannot be empty');
                return;
            }
            onSave(text);
            setOpen(false);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };
    const handleCancel = () => {
        try {
            onCancel?.();
            setOpen(false);
        }
        catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            handleSave();
        }
        else if (e.key === 'Escape') {
            handleCancel();
        }
    };
    return (_jsxs(Dialog.Root, { open: open, onOpenChange: setOpen, children: [_jsx(Dialog.Trigger, { asChild: true, children: trigger }), _jsxs(Dialog.Portal, { children: [_jsx(Dialog.Overlay, { className: "fixed inset-0 bg-black/50 backdrop-blur-sm" }), _jsxs(Dialog.Content, { className: cn("fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white p-6 shadow-lg", contentClassName), style: { width, height }, children: [_jsx(Dialog.Title, { className: "text-lg font-bold mb-4", children: title }), _jsxs("div", { className: "mb-4", children: [_jsx("textarea", { value: text, onChange: (e) => setText(e.target.value), onKeyDown: handleKeyDown, className: cn("w-full px-3 py-2 border rounded-md resize-none", textareaClassName), style: { minHeight: textareaMinHeight }, placeholder: placeholder, maxLength: maxLength, autoFocus: true }), maxLength && (_jsxs("div", { className: "text-sm text-gray-500 mt-1", children: [text.length, "/", maxLength, " characters"] })), error && (_jsx("div", { className: "text-red-500 text-sm mt-1", children: error }))] }), _jsxs("div", { className: "flex justify-end gap-2", children: [_jsx(RButton, { variant: "secondary", onClick: handleCancel, children: "Cancel" }), _jsx(RButton, { onClick: handleSave, children: "Save" })] })] })] })] }));
}
//# sourceMappingURL=dialog.js.map
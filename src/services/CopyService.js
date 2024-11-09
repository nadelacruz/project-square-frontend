import { toast } from 'react-toastify';

const TOAST_CONFIG = {
    autoClose: 3000,
    closeOnClick: true,
    hideProgressBar: true,
    position: 'bottom-right'
};

const copyToClipboard = (text) => {
    toast.dismiss(); 
    navigator.clipboard.writeText(text)
        .then(() => toast.info("Code copied to clipboard!", TOAST_CONFIG))
        .catch((err) => toast.error("Failed to copy code. Error: "+err, TOAST_CONFIG))
}

export {TOAST_CONFIG, copyToClipboard};
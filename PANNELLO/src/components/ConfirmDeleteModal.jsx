// Modale di conferma per eliminazioni
import React from 'react'

export const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, itemType, itemTitle }) => {
  if (!isOpen) return null

  const mapType = (t) => t === 'course' ? 'corso' : t === 'event' ? 'evento' : t === 'studyWeek' ? 'settimana studio' : 'elemento'

  return (
    <div className="fixed inset-0 bg-black/80 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <i className="bi bi-exclamation-triangle text-red-600 text-xl"></i>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Conferma Eliminazione</h3>
          <p className="text-sm text-gray-600 mb-6">
            Sei sicuro di voler eliminare il {mapType(itemType)} <strong>"{itemTitle}"</strong>?
            <br />
            <span className="text-red-600 font-medium">Questa azione non può essere annullata.</span>
          </p>
          <div className="flex space-x-3">
            <button onClick={onClose} className="flex-1 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors">Annulla</button>
            <button onClick={onConfirm} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors">Elimina</button>
          </div>
        </div>
      </div>
    </div>
  )
}

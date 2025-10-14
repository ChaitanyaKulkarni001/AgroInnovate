import React from 'react'

export default function FakeRazorpayModal({ open, amount, onClose, onConfirm }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-md rounded shadow-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Razorpay (Demo)</h3>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>
        <div className="space-y-2">
          <div className="text-sm text-gray-600">This is a demo payment UI. No real payment is made.</div>
          <div className="text-2xl font-semibold">₹ {amount}</div>
        </div>
        <div className="mt-4 flex gap-2">
          <button className="flex-1 bg-green-600 text-white py-2 rounded" onClick={()=>onConfirm(true)}>Pay Success</button>
          <button className="flex-1 bg-red-600 text-white py-2 rounded" onClick={()=>onConfirm(false)}>Fail Payment</button>
        </div>
      </div>
    </div>
  )
}

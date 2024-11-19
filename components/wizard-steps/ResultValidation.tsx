'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Check, X, Edit } from 'lucide-react'

export default function ResultValidation({ extractedResults, setExtractedResults }) {
  const [userFeedback, setUserFeedback] = useState({})

  const handleUserFeedback = (field, value) => {
    setUserFeedback({ ...userFeedback, [field]: value })
  }

  const handleApplyFeedback = () => {
    const updatedResults = { ...extractedResults, ...userFeedback }
    setExtractedResults(updatedResults)
    setUserFeedback({})
  }

  const [extractedResultsState, setExtractedResultsState] = useState({
    "Order Date": "June 15, 2023",
    "PO Number": "PO-2023-06-15-001",
    "Vendor": "ABC Supplies Inc.",
    "Ship To Address": "XYZ Corporation, 123 Business St, Cityville, State 12345",
    "Total Amount": "$3,250.00",
    "Payment Terms": "Net 30",
    "Items": [
      { "Name": "Widget A", "Quantity": 100, "Unit Price": "$10.00" },
      { "Name": "Gadget B", "Quantity": 50, "Unit Price": "$25.00" },
      { "Name": "Tool C", "Quantity": 25, "Unit Price": "$40.00" }
    ],
    "Special Instructions": "Please deliver during business hours (9 AM - 5 PM)."
  })

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Test Document</h3>
          <div className="border rounded p-4 h-64 overflow-auto bg-gray-50 dark:bg-gray-900 font-mono text-sm">
            <p className="text-blue-700 dark:text-blue-300">PURCHASE ORDER</p>
            <p className="text-blue-600 dark:text-blue-400 mt-2">Order Date: June 15, 2023</p>
            <p className="text-blue-600 dark:text-blue-400 mt-2">PO Number: PO-2023-06-15-001</p>
            <p className="text-blue-700 dark:text-blue-300 mt-2">Vendor: ABC Supplies Inc.</p>
            <p className="text-blue-700 dark:text-blue-300 mt-2">Ship To: XYZ Corporation, 123 Business St, Cityville, State 12345</p>
            <p className="text-blue-600 dark:text-blue-400 mt-4">Items:</p>
            <ol className="list-decimal list-inside mt-2">
              <li className="text-blue-600 dark:text-blue-400">Widget A - Quantity: 100, Unit Price: $10.00</li>
              <li className="text-blue-600 dark:text-blue-400">Gadget B - Quantity: 50, Unit Price: $25.00</li>
              <li className="text-blue-600 dark:text-blue-400">Tool C - Quantity: 25, Unit Price: $40.00</li>
            </ol>
            <p className="text-blue-700 dark:text-blue-300 mt-4">Total Amount: $3,250.00</p>
            <p className="text-blue-600 dark:text-blue-400 mt-2">Payment Terms: Net 30</p>
            <p className="text-blue-600 dark:text-blue-400 mt-2">Special Instructions: Please deliver during business hours (9 AM - 5 PM).</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Extracted Results</h3>
          <div className="border rounded p-4 h-64 overflow-auto bg-gray-50 dark:bg-gray-900 text-sm">
            {Object.entries(extractedResultsState).map(([key, value]) => (
              <div key={key} className="mb-2">
                <span className="font-semibold text-blue-700 dark:text-blue-300">{key}: </span>
                <span className="text-blue-600 dark:text-blue-400">
                  {Array.isArray(value)
                    ? value.map((item, index) => (
                      <div key={index} className="ml-4">
                        {Object.entries(item).map(([subKey, subValue]) => (
                          <div key={subKey}>
                            {subKey}: {subValue}
                          </div>
                        ))}
                      </div>
                    ))
                    : typeof value === 'object'
                      ? JSON.stringify(value, null, 2)
                      : value
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Human Feedback</h3>
        <div className="space-y-2">
          {Object.entries(extractedResultsState).map(([key, value]) => (
            <div key={key} className="flex items-center space-x-2">
              <label className="w-1/4 text-blue-700 dark:text-blue-300">{key}:</label>
              {Array.isArray(value) ? (
                <div className="w-2/4">
                  {value.map((item, index) => (
                    <div key={index} className="ml-4">
                      {Object.entries(item).map(([subKey, subValue]) => (
                        <div key={subKey} className="flex items-center space-x-2 mt-1">
                          <label className="w-1/4 text-blue-600 dark:text-blue-400">{subKey}:</label>
                          <Input
                            className="w-3/4"
                            value={userFeedback[`${key}.${index}.${subKey}`] || subValue}
                            onChange={(e) => handleUserFeedback(`${key}.${index}.${subKey}`, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <Input
                  className="w-2/4"
                  value={userFeedback[key] || value}
                  onChange={(e) => handleUserFeedback(key, e.target.value)}
                />
              )}
              <div className="w-1/4 flex justify-end space-x-1">
                <Button variant="outline" size="sm" className="text-green-600 hover:text-green-800">
                  <Check className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-red-600 hover:text-red-800">
                  <X className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className="text-blue-600 hover:text-blue-800">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
        <Button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white transition-colors" onClick={handleApplyFeedback}>
          Apply Feedback
        </Button>
      </div>
    </div>
  )
}
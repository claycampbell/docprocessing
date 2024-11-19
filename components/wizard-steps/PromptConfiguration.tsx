'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Edit, Trash2, Plus } from 'lucide-react'

export default function PromptConfiguration({ extractedResults, setExtractedResults }) {
  const [definedFields, setDefinedFields] = useState([
    { name: "Order Date", value: "", status: "Active" },
    { name: "PO Number", value: "", status: "Active" },
    { name: "Vendor", value: "", status: "Active" },
    { name: "Ship To Address", value: "", status: "Active" },
    { name: "Total Amount", value: "", status: "Active" },
    { name: "Payment Terms", value: "", status: "Active" },
  ])
  const [generatedPrompt, setGeneratedPrompt] = useState(
    "Extract the following fields from the purchase order document:\n" +
    "1. Order Date\n2. PO Number\n3. Vendor\n4. Ship To Address\n" +
    "5. Items (including Name, Quantity, and Unit Price for each)\n" +
    "6. Total Amount\n7. Payment Terms\n8. Special Instructions"
  )

  const handleAddField = () => {
    setDefinedFields([...definedFields, { name: "", value: "", status: "Active" }])
  }

  const handleDeleteField = (index) => {
    const newFields = [...definedFields]
    newFields.splice(index, 1)
    setDefinedFields(newFields)
  }

  const handleGeneratePrompt = () => {
    const newPrompt = "Extract the following fields from the document:\n" +
      definedFields.map((field, index) => `${index + 1}. ${field.name}`).join('\n')
    setGeneratedPrompt(newPrompt)
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Auto-Extracted Fields</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-700 dark:text-blue-300">Field Name</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Extracted Value</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Status</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {definedFields.map((field, index) => (
              <TableRow key={index} className={index % 2 === 0 ? 'bg-blue-50 dark:bg-blue-900/30' : ''}>
                <TableCell>{field.name}</TableCell>
                <TableCell>{field.value}</TableCell>
                <TableCell>
                <Badge variant={field.status === "Active" ? "secondary" : "default"}>
  {field.status}
</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200" onClick={() => handleDeleteField(index)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={4}>
                <Button variant="outline" className="w-full" onClick={handleAddField}>
                  <Plus className="mr-2 h-4 w-4" /> Add Field
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Suggested Prompt</h3>
        <Textarea
          className="w-full h-32 p-2 border rounded bg-gray-50 dark:bg-gray-900 text-blue-700 dark:text-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          value={generatedPrompt}
          onChange={(e) => setGeneratedPrompt(e.target.value)}
        />
        <div className="flex justify-end mt-2">
          <Button variant="outline" className="mr-2" onClick={handleGeneratePrompt}>Regenerate Prompt</Button>
          <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors">Save Prompt</Button>
        </div>
      </div>
    </div>
  )
}
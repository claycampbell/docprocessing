'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, CloudIcon, Search, Eye } from 'lucide-react'

export default function DocumentUpload({ uploadedDocuments, setUploadedDocuments }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [s3Documents, setS3Documents] = useState([
    { id: 1, name: "contract_2023.pdf", size: "3.1 MB", lastModified: "2023-06-01", selected: false },
    { id: 2, name: "invoice_may.pdf", size: "0.8 MB", lastModified: "2023-05-31", selected: false },
    { id: 3, name: "report_q2.docx", size: "2.3 MB", lastModified: "2023-06-02", selected: false },
    { id: 4, name: "agreement_v2.pdf", size: "1.5 MB", lastModified: "2023-06-03", selected: false },
  ])

  const handleFileUpload = (event) => {
    const newFiles = Array.from(event.target.files).map(file => ({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
      date: new Date().toISOString().split('T')[0],
      status: "Uploaded"
    }))
    setUploadedDocuments([...uploadedDocuments, ...newFiles])
  }

  const handleS3DocumentSelect = (id) => {
    setS3Documents(s3Documents.map(doc =>
      doc.id === id ? { ...doc, selected: !doc.selected } : doc
    ))
  }

  const handleImportSelected = () => {
    const selectedDocs = s3Documents.filter(doc => doc.selected)
    setUploadedDocuments([...uploadedDocuments, ...selectedDocs.map(doc => ({
      name: doc.name,
      size: doc.size,
      date: doc.lastModified,
      status: "Imported"
    }))])
    setS3Documents(s3Documents.map(doc => ({ ...doc, selected: false })))
  }

  const filteredDocuments = uploadedDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredS3Documents = s3Documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Local Upload</h3>
          <div className="border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-lg p-8 text-center transition-all duration-300 hover:border-blue-500 dark:hover:border-blue-500">
            <Upload className="mx-auto h-12 w-12 text-blue-400 dark:text-blue-500" />
            <p className="mt-2 text-sm text-blue-600 dark:text-blue-400">Drag and drop files here, or click to select files</p>
            <Input type="file" className="mt-4 text-blue-600 dark:text-blue-400 file:bg-blue-100 file:text-blue-700 dark:file:bg-blue-900 dark:file:text-blue-300 file:border-0 file:rounded-md file:px-4 file:py-2 file:mr-4 file:hover:bg-blue-200 dark:file:hover:bg-blue-800 transition-colors" onChange={handleFileUpload} multiple />
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">S3 Bucket Documents</h3>
          <div className="border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4">
            <div className="flex items-center mb-4">
              <CloudIcon className="h-6 w-6 text-blue-500 mr-2" />
              <span className="text-blue-700 dark:text-blue-300">Connected to S3 Bucket</span>
            </div>
            <div className="mb-4 flex items-center space-x-2">
              <Input
                type="text"
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button variant="outline" size="icon">
                <Search className="h-4 w-4" />
              </Button>
              <Select>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All types</SelectItem>
                  <SelectItem value="pdf">PDF</SelectItem>
                  <SelectItem value="docx">DOCX</SelectItem>
                  <SelectItem value="txt">TXT</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <ScrollArea className="h-48 w-full rounded-md border p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]"></TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Last Modified</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredS3Documents.map((doc) => (
                    <TableRow key={doc.id}>
                      <TableCell>
                        <Checkbox
                          checked={doc.selected}
                          onCheckedChange={() => handleS3DocumentSelect(doc.id)}
                        />
                      </TableCell>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>{doc.lastModified}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
            <div className="mt-4 flex justify-between">
              <Button variant="outline" onClick={() => setS3Documents(s3Documents.map(doc => ({ ...doc, selected: true })))}>
                Select All
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white transition-colors" onClick={handleImportSelected}>
                Import Selected
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Uploaded Documents</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-blue-700 dark:text-blue-300">File Name</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Size</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Upload Date</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Status</TableHead>
              <TableHead className="text-blue-700 dark:text-blue-300">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDocuments.map((doc, index) => (
              <TableRow key={index} className="hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors">
                <TableCell>{doc.name}</TableCell>
                <TableCell>{doc.size}</TableCell>
                <TableCell>{doc.date}</TableCell>
                <TableCell>
                  <Badge variant={doc.status === 'Completed' ? 'success' : 'warning'}>{doc.status}</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-200">
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
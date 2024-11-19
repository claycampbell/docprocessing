'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Sun, Moon, Upload, FileText, Edit, Trash2, Eye, CloudIcon, Search, AlertCircle, ChevronRight, ChevronLeft, ArrowRight, Plus, Check, X } from 'lucide-react'
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip as RechartsTooltip, Legend } from 'recharts'

export default function DocumentProcessingDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isWizardActive, setIsWizardActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [uploadedDocuments, setUploadedDocuments] = useState([
    { name: "document1.pdf", size: "1.2 MB", date: "2023-05-15", status: "Completed" },
    { name: "document2.pdf", size: "2.5 MB", date: "2023-05-16", status: "Processing" },
  ])
  const [s3Documents, setS3Documents] = useState([
    { id: 1, name: "contract_2023.pdf", size: "3.1 MB", lastModified: "2023-06-01", selected: false },
    { id: 2, name: "invoice_may.pdf", size: "0.8 MB", lastModified: "2023-05-31", selected: false },
    { id: 3, name: "report_q2.docx", size: "2.3 MB", lastModified: "2023-06-02", selected: false },
    { id: 4, name: "agreement_v2.pdf", size: "1.5 MB", lastModified: "2023-06-03", selected: false },
  ])
  const [extractedFields, setExtractedFields] = useState([
    { name: "Order Date", value: "June 15, 2023", status: "Pending" },
    { name: "PO Number", value: "PO-2023-06-15-001", status: "Pending" },
    { name: "Vendor", value: "ABC Supplies Inc.", status: "Pending" },
    { name: "Ship To Address", value: "XYZ Corporation, 123 Business St, Cityville, State 12345", status: "Pending" },
    { name: "Total Amount", value: "$3,250.00", status: "Pending" },
    { name: "Payment Terms", value: "Net 30", status: "Pending" },
  ])
  const [newFieldName, setNewFieldName] = useState("")
  const [newFieldValue, setNewFieldValue] = useState("")
  const [generatedPrompt, setGeneratedPrompt] = useState(
    "Extract the following fields from the purchase order document:\n" +
    "1. Order Date\n2. PO Number\n3. Vendor\n4. Ship To Address\n" +
    "5. Items (including Name, Quantity, and Unit Price for each)\n" +
    "6. Total Amount\n7. Payment Terms\n8. Special Instructions"
  )
  const [scheduleOptions, setScheduleOptions] = useState({
    frequency: "daily",
    time: "09:00",
    daysOfWeek: ["Monday", "Wednesday", "Friday"]
  })

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
    console.log("Importing selected documents:", selectedDocs)
    // Here you would typically send these to your backend for processing
  }

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1)
  }

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const handleFieldAction = (index, action) => {
    const updatedFields = [...extractedFields]
    switch (action) {
      case 'approve':
        updatedFields[index].status = 'Approved'
        break
      case 'decline':
        updatedFields[index].status = 'Declined'
        break
      case 'edit':
        // This would typically open an edit modal or inline edit
        console.log("Edit field:", updatedFields[index])
        break
      case 'remove':
        updatedFields.splice(index, 1)
        break
    }
    setExtractedFields(updatedFields)
  }

  const handleAddField = () => {
    if (newFieldName && newFieldValue) {
      setExtractedFields([...extractedFields, { name: newFieldName, value: newFieldValue, status: "Pending" }])
      setNewFieldName("")
      setNewFieldValue("")
    }
  }

  const handleScheduleChange = (key, value) => {
    setScheduleOptions({ ...scheduleOptions, [key]: value })
  }

  const steps = [
    { title: "Upload Documents", description: "Upload or select documents for processing" },
    { title: "Configure Prompt", description: "Review and refine the extraction prompt" },
    { title: "Validate Results", description: "Review and refine extracted information" },
    { title: "Schedule Workflow", description: "Set up automated processing schedule" }
  ]

  const dashboardData = [
    { name: 'Jan', documents: 65, fields: 240, completed: 50, processing: 10, queued: 5 },
    { name: 'Feb', documents: 59, fields: 218, completed: 45, processing: 8, queued: 6 },
    { name: 'Mar', documents: 80, fields: 280, completed: 60, processing: 15, queued: 5 },
    { name: 'Apr', documents: 81, fields: 290, completed: 70, processing: 8, queued: 3 },
    { name: 'May', documents: 56, fields: 200, completed: 40, processing: 10, queued: 6 },
    { name: 'Jun', documents: 55, fields: 210, completed: 35, processing: 15, queued: 5 },
    { name: 'Jul', documents: 40, fields: 180, completed: 30, processing: 5, queued: 5 },
  ]

  const documentTypesData = [
    { name: 'Contracts', value: 350 },
    { name: 'Invoices', value: 275 },
    { name: 'Reports', value: 200 },
    { name: 'Agreements', value: 150 },
    { name: 'Others', value: 100 },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8']

  const filteredDocuments = uploadedDocuments.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const filteredS3Documents = s3Documents.filter(doc =>
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 min-h-screen transition-colors duration-200">
        <div className="container mx-auto p-4">
          <header className="flex justify-between items-center mb-6">
            <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-300">Document Processing Dashboard</h1>
            <div className="flex items-center space-x-4">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" onClick={() => setIsDarkMode(!isDarkMode)} className="transition-all duration-200">
                      {isDarkMode ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle {isDarkMode ? 'light' : 'dark'} mode</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </header>

          {!isWizardActive ? (
            <div className="space-y-6">
              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">Welcome to Document Processing</CardTitle>
                  <CardDescription>Start extracting information from your documents with our advanced AI-powered system.</CardDescription>
                </CardHeader>
                <CardContent className="flex justify-center">
                  <Button
                    size="lg"
                    className="bg-blue-600 hover:bg-blue-700 text-white transition-colors text-lg py-6"
                    onClick={() => setIsWizardActive(true)}
                  >
                    Start Document Extraction <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </CardContent>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,234</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Processing Rate</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">98.5%</div>
                    <p className="text-xs text-muted-foreground">+2.5% from last week</p>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Fields Extracted</CardTitle>
                    <FileText className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">12,345</div>
                    <p className="text-xs text-muted-foreground">+15.2% from last month</p>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Accuracy Rate</CardTitle>
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">99.2%</div>
                    <p className="text-xs text-muted-foreground">+0.5% from last week</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Documents Processed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={dashboardData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Line type="monotone" dataKey="documents" stroke="#8884d8" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-gray-800 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Processing Status</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={dashboardData}>
                        <XAxis dataKey="name" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Bar dataKey="completed" stackId="a" fill="#8884d8" name="Completed" />
                        <Bar dataKey="processing" stackId="a" fill="#82ca9d" name="Processing" />
                        <Bar dataKey="queued" stackId="a" fill="#ffc658" name="Queued" />
                      </BarChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>
              </div>

              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600 dark:text-blue-400">Document Types</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      layout="vertical"
                      data={documentTypesData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <RechartsTooltip />
                      <Legend />
                      <Bar dataKey="value" fill="#8884d8" name="Count">
                        {documentTypesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="mb-8">
                <Progress value={(currentStep + 1) * 25} className="w-full" />
                <div className="flex justify-between mt-2">
                  {steps.map((step, index) => (
                    <div key={index} className={`text-sm ${index <= currentStep ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400'}`}>
                      {step.title}
                    </div>
                  ))}
                </div>
              </div>

              <Card className="bg-white dark:bg-gray-800 shadow-lg">
                <CardHeader>
                  <CardTitle className="text-2xl text-blue-700 dark:text-blue-300">{steps[currentStep].title}</CardTitle>
                  <CardDescription>{steps[currentStep].description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {currentStep === 0 && (
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
                  )}
                  {currentStep === 1 && (
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
                            {extractedFields.map((field, index) => (
                              <TableRow key={index} className={index % 2 === 0 ? 'bg-blue-50 dark:bg-blue-900/30' : ''}>
                                <TableCell>{field.name}</TableCell>
                                <TableCell>{field.value}</TableCell>
                                <TableCell>
                                  <Badge variant={field.status === 'Approved' ? 'success' : field.status === 'Declined' ? 'destructive' : 'secondary'}>{field.status}</Badge>
                                </TableCell>
                                <TableCell>
                                  <Button variant="ghost" size="sm" onClick={() => handleFieldAction(index, 'approve')}>
                                    <Check className="h-4 w-4 text-green-500" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleFieldAction(index, 'decline')}>
                                    <X className="h-4 w-4 text-red-500" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleFieldAction(index, 'edit')}>
                                    <Edit className="h-4 w-4 text-blue-500" />
                                  </Button>
                                  <Button variant="ghost" size="sm" onClick={() => handleFieldAction(index, 'remove')}>
                                    <Trash2 className="h-4 w-4 text-gray-500" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                        <div className="mt-4 flex items-center space-x-2">
                          <Input
                            placeholder="New field name"
                            value={newFieldName}
                            onChange={(e) => setNewFieldName(e.target.value)}
                            className="flex-grow"
                          />
                          <Input
                            placeholder="New field value"
                            value={newFieldValue}
                            onChange={(e) => setNewFieldValue(e.target.value)}
                            className="flex-grow"
                          />
                          <Button onClick={handleAddField}>
                            <Plus className="h-4 w-4 mr-2" /> Add Field
                          </Button>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Suggested Prompt</h3>
                        <Textarea
                          className="w-full h-32 p-2 border rounded bg-gray-50 dark:bg-gray-900 text-blue-700 dark:text-blue-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          value={generatedPrompt}
                          onChange={(e) => setGeneratedPrompt(e.target.value)}
                        />
                      </div>
                    </div>
                  )}
                  {currentStep === 2 && (
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
                            {extractedFields.map((field, index) => (
                              <div key={index} className="mb-2">
                                <span className="font-semibold text-blue-700 dark:text-blue-300">{field.name}: </span>
                                <span className="text-blue-600 dark:text-blue-400">{field.value}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Human Feedback</h3>
                        <div className="space-y-2">
                          {extractedFields.map((field, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <label className="w-1/4 text-blue-700 dark:text-blue-300">{field.name}:</label>
                              <Input
                                className="w-1/2"
                                value={field.value}
                                onChange={(e) => {
                                  const updatedFields = [...extractedFields];
                                  updatedFields[index].value = e.target.value;
                                  setExtractedFields(updatedFields);
                                }}
                              />
                              <Button variant="outline" size="sm" onClick={() => handleFieldAction(index, 'approve')}>
                                Approve
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleFieldAction(index, 'decline')}>
                                Decline
                              </Button>
                              <Button variant="outline" size="sm" onClick={() => handleFieldAction(index, 'edit')}>
                                Edit
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Schedule Automated Workflow</h3>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Frequency</label>
                            <Select value={scheduleOptions.frequency} onValueChange={(value) => handleScheduleChange('frequency', value)}>
                              <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select frequency" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="daily">Daily</SelectItem>
                                <SelectItem value="weekly">Weekly</SelectItem>
                                <SelectItem value="monthly">Monthly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Time</label>
                            <Input
                              type="time"
                              value={scheduleOptions.time}
                              onChange={(e) => handleScheduleChange('time', e.target.value)}
                            />
                          </div>
                          {scheduleOptions.frequency === 'weekly' && (
                            <div>
                              <label className="block text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">Days of Week</label>
                              <div className="flex flex-wrap gap-2">
                                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
                                  <Button
                                    key={day}
                                    variant={scheduleOptions.daysOfWeek.includes(day) ? 'default' : 'outline'}
                                    onClick={() => {
                                      const updatedDays = scheduleOptions.daysOfWeek.includes(day)
                                        ? scheduleOptions.daysOfWeek.filter(d => d !== day)
                                        : [...scheduleOptions.daysOfWeek, day];
                                      handleScheduleChange('daysOfWeek', updatedDays);
                                    }}
                                  >
                                    {day}
                                  </Button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors">
                        Save and Activate Workflow
                      </Button>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={currentStep === 0 ? () => setIsWizardActive(false) : handlePreviousStep}
                  >
                    <ChevronLeft className="mr-2 h-4 w-4" /> {currentStep === 0 ? 'Back to Dashboard' : 'Previous'}
                  </Button>
                  <Button
                    onClick={currentStep === steps.length - 1 ? () => setIsWizardActive(false) : handleNextStep}
                  >
                    {currentStep === steps.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
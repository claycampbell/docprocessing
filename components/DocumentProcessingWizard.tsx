'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import DocumentUpload from './wizard-steps/DocumentUpload'
import PromptConfiguration from './wizard-steps/PromptConfiguration'
import ResultValidation from './wizard-steps/ResultValidation'
import ProcessingOverview from './wizard-steps/ProcessingOverview'

const steps = [
  { title: "Upload Documents", description: "Upload or select documents for processing", component: DocumentUpload },
  { title: "Configure Prompt", description: "Review and refine the extraction prompt", component: PromptConfiguration },
  { title: "Validate Results", description: "Review and refine extracted information", component: ResultValidation },
  { title: "Processing Overview", description: "Monitor document processing status", component: ProcessingOverview }
]

export default function DocumentProcessingWizard({ onClose }: { onClose: () => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [uploadedDocuments, setUploadedDocuments] = useState([])
  const [extractedResults, setExtractedResults] = useState({})

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const CurrentStepComponent = steps[currentStep].component

  return (
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
          <CurrentStepComponent
            uploadedDocuments={uploadedDocuments}
            setUploadedDocuments={setUploadedDocuments}
            extractedResults={extractedResults}
            setExtractedResults={setExtractedResults}
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={currentStep === 0 ? onClose : handlePreviousStep}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> {currentStep === 0 ? 'Back to Dashboard' : 'Previous'}
          </Button>
          <Button
            onClick={currentStep === steps.length - 1 ? onClose : handleNextStep}
          >
            {currentStep === steps.length - 1 ? 'Finish' : 'Next'} <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
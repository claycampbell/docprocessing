'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Sun, Moon, ArrowRight } from 'lucide-react'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import DashboardContent from './DashboardContent'
import DocumentProcessingWizard from './DocumentProcessingWizard'

export default function DocumentProcessingDashboard() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isWizardActive, setIsWizardActive] = useState(false)

  return (
    <div className={`min-h-screen ${isDarkMode ? 'dark' : ''}`}>
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
          <>
            <Card className="bg-white dark:bg-gray-800 shadow-lg mb-6">
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
            <DashboardContent />
          </>
        ) : (
          <DocumentProcessingWizard onClose={() => setIsWizardActive(false)} />
        )}
      </div>
    </div>
  )
}
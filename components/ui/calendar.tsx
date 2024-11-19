'use client'

import * as React from "react"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker, SelectSingleEventHandler } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ScrollArea } from "@/components/ui/scroll-area"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [selectedDate, setSelectedDate] = React.useState<Date | undefined>(new Date())
  const [events, setEvents] = React.useState<{ date: Date; title: string }[]>([
    { date: new Date(2023, 5, 15), title: "Document Processing Batch #1" },
    { date: new Date(2023, 5, 22), title: "Team Meeting" },
    { date: new Date(2023, 5, 28), title: "End of Month Report" },
  ])

  const handleAddEvent = (date: Date) => {
    const eventTitle = prompt("Enter event title:")
    if (eventTitle) {
      setEvents([...events, { date, title: eventTitle }])
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <DayPicker
        showOutsideDays={showOutsideDays}
        className={cn("p-3", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            Button.defaultProps?.className,
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            Button.defaultProps?.className,
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside: "text-muted-foreground opacity-50",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" {...props} />,
          IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" {...props} />,
        }}
        selected={selectedDate}
        onSelect={(date, selectedDay, modifier) => {
          setSelectedDate(date);
          if (date) handleAddEvent(date);
        }} as SelectSingleEventHandler
        {...props}
      />
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2 text-blue-700 dark:text-blue-300">Events</h3>
        <ScrollArea className="h-[200px] w-full rounded-md border p-4">
          {events.map((event, index) => (
            <div key={index} className="mb-2 p-2 bg-gray-100 dark:bg-gray-800 rounded-md">
              <p className="font-semibold text-blue-600 dark:text-blue-400">{event.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {event.date.toLocaleDateString()}
              </p>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  )
}

export function CalendarDatePicker() {
  const [date, setDate] = React.useState<Date>()

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          {date ? date.toDateString() : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}

export { Calendar }
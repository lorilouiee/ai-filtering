import { useState, useEffect } from 'react'
import { Text } from '@koddidev/katalyst-ui'
import { Sidebar } from './components/Sidebar'
import { ChannelTabs } from './components/ChannelTabs'
import { FilterBar } from './components/FilterBar'
import { ReportGenerator } from './components/ReportGenerator'
import { ReviewChanges } from './components/ReviewChanges'
import type { ReviewChange } from './components/ReviewChanges'
import { DataTable } from './components/DataTable'
import type { TableColumn, TableRow } from './components/DataTable'
import { generateReport } from './reportGenerator'
import { Toast } from './components/Toast'

// Default table state
const defaultColumns: TableColumn[] = [
  { id: 'campaign', label: 'Campaign name', sortable: true },
  { id: 'col1', label: 'Column Name', sortable: true },
  { id: 'col2', label: 'Column Name', sortable: true },
  { id: 'col3', label: 'Column Name', sortable: true },
  { id: 'col4', label: 'Column Name', sortable: true },
]

const defaultRows: TableRow[] = [
  { id: '1', campaign: 'Ad group 1', col1: '12345', col2: '12345', col3: '12345', col4: '12345' },
  { id: '2', campaign: 'Ad group 2', col1: '12345', col2: '12345', col3: '12345', col4: '12345' },
  { id: '3', campaign: 'Ad group 3', col1: '12345', col2: '12345', col3: '12345', col4: '12345' },
  { id: '4', campaign: 'Ad group 4', col1: '12345', col2: '12345', col3: '12345', col4: '12345' },
  { id: '5', campaign: 'Ad group 5', col1: '12345', col2: '12345', col3: '12345', col4: '12345' },
  { id: '6', campaign: 'Ad group 5', col1: '12345', col2: '12345', col3: '12345', col4: '12345' },
  { id: '7', campaign: 'Ad group 5', col1: '12345', col2: '12345', col3: '12345', col4: '12345' },
]

function App() {
  const [activeChannel, setActiveChannel] = useState('All')
  const [columns, setColumns] = useState<TableColumn[]>(defaultColumns)
  const [rows, setRows] = useState<TableRow[]>(defaultRows)
  const [changes, setChanges] = useState<ReviewChange[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedDimensions, setSelectedDimensions] = useState<string[]>([])
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])
  const [isReportGeneratorOpen, setIsReportGeneratorOpen] = useState(true)
  const [showToast, setShowToast] = useState(false)
  const [showResetToast, setShowResetToast] = useState(false)
  const [showUndoToast, setShowUndoToast] = useState(false)
  const [toastVisible, setToastVisible] = useState(false)
  const [resetToastVisible, setResetToastVisible] = useState(false)
  const [undoToastVisible, setUndoToastVisible] = useState(false)
  
  // Previous state for undo
  const [previousColumns, setPreviousColumns] = useState<TableColumn[]>(defaultColumns)
  const [previousRows, setPreviousRows] = useState<TableRow[]>(defaultRows)
  const [previousChanges, setPreviousChanges] = useState<ReviewChange[]>([])

  const handleGenerate = async (prompt: string) => {
    setIsGenerating(true)
    
    // Save current state before updating
    setPreviousColumns(columns)
    setPreviousRows(rows)
    setPreviousChanges(changes)
    
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 800))
    
    const report = generateReport(prompt)
    setColumns(report.columns)
    setRows(report.rows)
    setChanges(report.changes)
    
    // Extract dimensions and metrics from columns
    // First column is typically the dimension (e.g., "Campaign name")
    // Remaining columns are metrics
    const dimensionColumn = report.columns[0]
    const metricColumns = report.columns.slice(1)
    
    setSelectedDimensions(dimensionColumn ? [dimensionColumn.label] : [])
    setSelectedMetrics(metricColumns.map(col => col.label))
    
    setIsGenerating(false)
    setShowToast(true)
    // Trigger animation after a brief delay to ensure DOM update
    setTimeout(() => setToastVisible(true), 10)
    
    // Hide toast after 3.5 seconds
    setTimeout(() => {
      setToastVisible(false)
      setTimeout(() => setShowToast(false), 300) // Wait for animation to complete
    }, 3500)
  }

  const handleUndo = () => {
    // Revert to previous state
    setColumns(previousColumns)
    setRows(previousRows)
    setChanges(previousChanges)
    
    // Revert dimensions and metrics
    const prevDimensionColumn = previousColumns[0]
    const prevMetricColumns = previousColumns.slice(1)
    setSelectedDimensions(prevDimensionColumn ? [prevDimensionColumn.label] : [])
    setSelectedMetrics(prevMetricColumns.map(col => col.label))
    
    // Show undo toast
    setShowUndoToast(true)
    // Trigger animation after a brief delay to ensure DOM update
    setTimeout(() => setUndoToastVisible(true), 10)
    
    // Hide toast after 3.5 seconds
    setTimeout(() => {
      setUndoToastVisible(false)
      setTimeout(() => setShowUndoToast(false), 300) // Wait for animation to complete
    }, 3500)
  }

  // Auto-hide undo toast after it's shown
  useEffect(() => {
    if (showUndoToast) {
      setUndoToastVisible(true)
      const timer = setTimeout(() => {
        setUndoToastVisible(false)
        setTimeout(() => setShowUndoToast(false), 300) // Wait for animation to complete
      }, 3500)
      return () => clearTimeout(timer)
    } else {
      setUndoToastVisible(false)
    }
  }, [showUndoToast])

  const handleReset = () => {
    // Reset to default state
    setColumns(defaultColumns)
    setRows(defaultRows)
    setChanges([])
    setSelectedDimensions([])
    setSelectedMetrics([])
    
    // Show reset toast
    setShowResetToast(true)
    // Trigger animation after a brief delay to ensure DOM update
    setTimeout(() => setResetToastVisible(true), 10)
    
    // Hide toast after 3.5 seconds
    setTimeout(() => {
      setResetToastVisible(false)
      setTimeout(() => setShowResetToast(false), 300) // Wait for animation to complete
    }, 3500)
  }

  // Auto-hide reset toast after it's shown
  useEffect(() => {
    if (showResetToast) {
      setResetToastVisible(true)
      const timer = setTimeout(() => {
        setResetToastVisible(false)
        setTimeout(() => setShowResetToast(false), 300) // Wait for animation to complete
      }, 3500)
      return () => clearTimeout(timer)
    } else {
      setResetToastVisible(false)
    }
  }, [showResetToast])

  // Auto-hide toast after it's shown
  useEffect(() => {
    if (showToast) {
      setToastVisible(true)
      const timer = setTimeout(() => {
        setToastVisible(false)
        setTimeout(() => setShowToast(false), 300) // Wait for animation to complete
      }, 3500)
      return () => clearTimeout(timer)
    } else {
      setToastVisible(false)
    }
  }, [showToast])

  const handleDownloadCSV = () => {
    // Generate CSV content
    const headers = columns.map(c => c.label).join(',')
    const rowsCSV = rows.map(row => 
      columns.map(col => row[col.id]).join(',')
    ).join('\n')
    const csv = `${headers}\n${rowsCSV}`

    // Download
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'report.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="min-h-screen bg-[#F7F8FC]">
      {/* Blue header bar - fixed at top, full width */}
      <div className="fixed top-0 left-0 right-0 h-[70px] bg-[#367DFE] z-40 shadow-[0px_1px_2px_-1px_rgba(0,0,0,0.1),0px_1px_3px_rgba(0,0,0,0.1)] border-b border-[#E5E7EB]" />
      
      {/* Sidebar */}
      <Sidebar activeItem="reporting" />

      {/* Main content - offset for header and sidebar */}
      <div className="ml-[60px] pt-[70px]">
        {/* Main Body with 24px padding and 24px gap */}
        <div className="flex flex-col items-start p-6 gap-6 bg-[#F7F8FC] min-h-[calc(100vh-70px)]">
          {/* Page title */}
          <Text size="2xl" weight="medium" className="text-[#131126]">
            Reporting
          </Text>

          {/* Channel tabs with integrated divider */}
          <ChannelTabs 
            activeChannel={activeChannel} 
            onChannelChange={setActiveChannel} 
          />

          {/* Toolbar */}
          <FilterBar filterCount={changes.filter(c => c.type === 'filter').length} />

          {/* Main content area */}
          <div className="bg-white border border-[#F3F4F6] rounded-lg flex w-full flex-1 overflow-hidden">
            {/* Main content - Data Table */}
            <div className="flex-1 min-w-0 transition-all duration-300 ease-in-out">
              <DataTable 
                columns={columns} 
                rows={rows} 
                onDownloadCSV={handleDownloadCSV}
                onToggleSidebar={() => setIsReportGeneratorOpen(!isReportGeneratorOpen)}
                isSidebarOpen={isReportGeneratorOpen}
                selectedDimensions={selectedDimensions}
                selectedMetrics={selectedMetrics}
                onDimensionsChange={setSelectedDimensions}
                onMetricsChange={setSelectedMetrics}
                isGenerating={isGenerating}
              />
            </div>

            {/* Right sidebar - Report Generator & Review Changes */}
            <div 
              className={`
                flex flex-col border-l border-[#F3F4F6] 
                transition-all duration-300 ease-in-out
                ${isReportGeneratorOpen 
                  ? 'w-1/4 opacity-100' 
                  : 'w-0 opacity-0 overflow-hidden'
                }
              `}
            >
              <div className="w-full flex flex-col h-full">
                <ReportGenerator 
                  onGenerate={handleGenerate} 
                  isGenerating={isGenerating}
                />
                <ReviewChanges changes={changes} isLoading={isGenerating} onUndo={handleUndo} onReset={handleReset} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Toast notification - Table configured */}
      {showToast && (() => {
        const metricsCount = changes.filter(c => c.type === 'metric').length
        const dimensionsCount = changes.filter(c => c.type === 'dimension').length
        const filtersCount = changes.filter(c => c.type === 'filter').length
        
        const messageParts = []
        if (dimensionsCount > 0) {
          messageParts.push(`${dimensionsCount} dimension${dimensionsCount !== 1 ? 's' : ''}`)
        }
        if (metricsCount > 0) {
          messageParts.push(`${metricsCount} metric${metricsCount !== 1 ? 's' : ''}`)
        }
        if (filtersCount > 0) {
          messageParts.push(`${filtersCount} filter${filtersCount !== 1 ? 's' : ''} applied`)
        }
        
        return (
          <Toast
            title="Table configured"
            message={messageParts.join(', ')}
            onClose={() => {
              setToastVisible(false)
              setTimeout(() => setShowToast(false), 300)
            }}
            isVisible={toastVisible}
          />
        )
      })()}

      {/* Toast notification - Table reset */}
      {showResetToast && (
        <Toast
          title="Table reset"
          message="The table was restored to its default state."
          onClose={() => {
            setResetToastVisible(false)
            setTimeout(() => setShowResetToast(false), 300)
          }}
          isVisible={resetToastVisible}
        />
      )}

      {/* Toast notification - Table reverted */}
      {showUndoToast && (
        <Toast
          title="Table reverted"
          message="The generated table has been undone."
          onClose={() => {
            setUndoToastVisible(false)
            setTimeout(() => setShowUndoToast(false), 300)
          }}
          isVisible={undoToastVisible}
        />
      )}
    </div>
  )
}

export default App

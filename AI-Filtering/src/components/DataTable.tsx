import { 
  Button
} from '@koddidev/katalyst-ui'
import { GroupedMultiSelect } from './GroupedMultiSelect'

export interface TableColumn {
  id: string
  label: string
  sortable?: boolean
}

export interface TableRow {
  id: string
  [key: string]: string | number
}

interface DataTableProps {
  columns: TableColumn[]
  rows: TableRow[]
  onDownloadCSV?: () => void
  onToggleSidebar?: () => void
  isSidebarOpen?: boolean
  selectedDimensions?: string[]
  selectedMetrics?: string[]
  onDimensionsChange?: (dimensions: string[]) => void
  onMetricsChange?: (metrics: string[]) => void
  isGenerating?: boolean
}

// Available options for dimensions and metrics
const availableDimensions = ['Campaign name', 'Ad group', 'Keyword', 'Device', 'Date']
const availableMetrics = ['Orders', 'Spend', 'Revenue', 'ROAS', 'Impressions', 'Clicks', 'CTR', 'Conversions', 'Transactions', 'Avg Order Value', 'Conv. Rate']

export function DataTable({ 
  columns, 
  rows, 
  onDownloadCSV, 
  onToggleSidebar, 
  isSidebarOpen = true,
  selectedDimensions = [],
  selectedMetrics = [],
  onDimensionsChange,
  onMetricsChange,
  isGenerating = false
}: DataTableProps) {
  return (
    <div className="p-6 w-full">
      {/* Table Toolbar */}
      <div className="flex items-center justify-between w-full mb-6">
        {/* Left side - Grid view and filters */}
        <div className="flex items-center gap-3">
          {/* Dimensions Select */}
          <GroupedMultiSelect
            label="Dimensions"
            selectedItems={selectedDimensions}
            options={availableDimensions}
            onSelectionChange={onDimensionsChange || (() => {})}
            testId="dimensions-select"
          />
          
          {/* Metrics Select */}
          <GroupedMultiSelect
            label="Metrics"
            selectedItems={selectedMetrics}
            options={availableMetrics}
            onSelectionChange={onMetricsChange || (() => {})}
            testId="metrics-select"
          />
        </div>

        {/* Right side - Download CSV Button and Sidebar Toggle */}
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onDownloadCSV}
            testId="download-csv-btn"
            className="border-[#DAE9FF] text-[#367DFE] font-medium"
          >
            <svg 
              width="20" 
              height="20" 
              viewBox="0 0 20 20" 
              fill="none" 
              className="mr-1 shrink-0"
            >
              <path 
                d="M10 3V13M10 13L6 9M10 13L14 9M3 16H17" 
                stroke="#367DFE" 
                strokeWidth="1.5" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            Download CSV
          </Button>
          
          {/* Sidebar Toggle */}
          <button 
            onClick={onToggleSidebar}
            className={`flex items-center justify-center p-2 w-9 h-9 rounded-lg transition-colors cursor-pointer ${
              isSidebarOpen 
                ? 'bg-[#183CB5] hover:bg-[#152A9A]' 
                : 'bg-[#367DFE] hover:bg-[#2E6FE8]'
            }`}
            data-testid="sidebar-toggle-btn"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <rect x="2.5" y="3.5" width="15" height="13" rx="2" stroke="white" strokeWidth="1.5"/>
              <path d="M7.5 3.5V16.5" stroke="white" strokeWidth="1.5"/>
              <path d="M10.5 7H14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
              <path d="M10.5 10H14.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className={`border border-[#E5E7EB] rounded-lg overflow-hidden w-full relative ${isGenerating ? 'table-sweep-animation' : ''}`}>
        <table className="w-full table-fixed">
          <thead>
            <tr className="border-b border-[#E5E7EB]">
              {columns.map((column, index) => (
                <th
                  key={column.id}
                  className={`px-4 py-4 text-left ${index === 0 ? 'w-[250px]' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {index > 0 && (
                        <div className="w-px h-[18px] bg-[#E5E7EB] -ml-4" />
                      )}
                      <span className="text-sm font-medium text-[#777E8C]">{column.label}</span>
                    </div>
                    {column.sortable && (
                      <div className="flex gap-2">
                        {/* First icon - Filter/Sort icon */}
                        <div className="flex items-center justify-center p-0.5 w-5 h-5 bg-white rounded-[6px]">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path 
                              d="M2 4H14M4 8H12M6 12H10" 
                              stroke="#6A7282" 
                              strokeWidth="1.5" 
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                        {/* Second icon - Three dots menu */}
                        <div className="flex items-center justify-center p-0.5 w-5 h-5 bg-white rounded-[6px]">
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <circle cx="8" cy="4" r="1.5" fill="#6A7282"/>
                            <circle cx="8" cy="8" r="1.5" fill="#6A7282"/>
                            <circle cx="8" cy="12" r="1.5" fill="#6A7282"/>
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="h-[70px]">
                {columns.map((column, colIndex) => (
                  <td
                    key={column.id}
                    className={`px-4 py-4 text-sm text-[#6A7282] ${colIndex === 0 ? 'w-[250px] bg-white' : 'text-right'}`}
                  >
                    {row[column.id]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {rows.length === 0 && (
        <div className="flex flex-col items-center py-12">
          <span className="text-sm text-[#6A7282]">
            No data to display. Use the report generator to create a report.
          </span>
        </div>
      )}
    </div>
  )
}

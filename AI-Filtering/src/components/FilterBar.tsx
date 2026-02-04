import { Button, AwesomeIcon } from '@koddidev/katalyst-ui'

interface FilterBarProps {
  dateRange?: string
  currency?: string
  filterCount?: number
  onShowGraph?: () => void
  onSaveSchedule?: () => void
}

export function FilterBar({ 
  dateRange = 'Last 7 days',
  currency = 'US Dollar (USD)',
  filterCount = 0,
  onShowGraph,
  onSaveSchedule 
}: FilterBarProps) {
  return (
    <div className="flex items-center justify-between w-full">
      {/* Toolbar Left */}
      <div className="flex items-center gap-4 flex-1">
        {/* Date Range Select - 256px width, 36px height */}
        <button 
          className="flex items-center justify-center gap-1 px-3 h-9 bg-white border border-[#E5E7EB] rounded-lg text-sm font-normal text-[#6A7282]"
          style={{ width: '256px', filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.03))' }}
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0">
            <rect x="2.25" y="3.375" width="13.5" height="12.375" rx="2" stroke="#6A7282" strokeWidth="1.5"/>
            <path d="M2.25 7.125H15.75" stroke="#6A7282" strokeWidth="1.5"/>
            <path d="M6.75 2.25V4.5" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round"/>
            <path d="M11.25 2.25V4.5" stroke="#6A7282" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
          <span className="flex-1 text-left leading-5">{dateRange}</span>
        </button>

        {/* Currency Select */}
        <button className="flex items-center gap-2 px-3 py-2 h-9 bg-white border border-[#E5E7EB] rounded-lg shadow-[0px_0px_4px_rgba(0,0,0,0.03)] text-sm text-[#6A7282] min-w-[208px]">
          <AwesomeIcon name="dollar-sign" iconFamily="sharp" size="sm" />
          <span className="flex-1 text-left">{currency}</span>
          <AwesomeIcon name="chevron-down" iconFamily="sharp" size="sm" />
        </button>

        {/* Filter Select */}
        <button className="flex items-center gap-2 px-3 py-2 h-9 bg-white border border-[#E5E7EB] rounded-lg shadow-[0px_0px_4px_rgba(0,0,0,0.03)] text-sm text-[#6A7282] min-w-[208px]">
          <span className="flex-1 text-left">
            {filterCount > 0 ? `Filters: ${filterCount} applied` : 'Filter'}
          </span>
          <AwesomeIcon name="chevron-down" iconFamily="sharp" size="sm" />
        </button>
      </div>

      {/* Toolbar Right */}
      <div className="flex items-center gap-4">
        {/* Show Graph Button */}
        <Button
          variant="outline"
          onClick={onShowGraph}
          testId="show-graph-btn"
          className="border-[#DAE9FF] text-[#367DFE]"
        >
          <AwesomeIcon name="eye" iconFamily="sharp" size="sm" className="mr-1" />
          Show graph
        </Button>

        {/* Save & Schedule Button */}
        <Button
          variant="primary"
          onClick={onSaveSchedule}
          testId="save-schedule-btn"
          className="bg-[#367DFE]"
        >
          Save & schedule
        </Button>
      </div>
    </div>
  )
}

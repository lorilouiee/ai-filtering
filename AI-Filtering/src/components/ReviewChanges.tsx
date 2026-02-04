import { 
  Text, 
  TabsRoot, 
  TabsList, 
  TabsTrigger, 
  TabsContent,
  Flex
} from '@koddidev/katalyst-ui'

export interface ReviewChange {
  type: 'metric' | 'dimension' | 'filter'
  label: string
  value: string
}

interface ReviewChangesProps {
  changes: ReviewChange[]
  isLoading?: boolean
  onUndo?: () => void
  onReset?: () => void
}

export function ReviewChanges({ changes, isLoading = false, onUndo, onReset }: ReviewChangesProps) {
  const metricsChanges = changes.filter((c) => c.type === 'metric')
  const dimensionsChanges = changes.filter((c) => c.type === 'dimension')
  const filtersChanges = changes.filter((c) => c.type === 'filter')

  // Generate summary text
  const summaryText = [
    dimensionsChanges.length > 0 && `${dimensionsChanges.length} dimension${dimensionsChanges.length !== 1 ? 's' : ''}`,
    metricsChanges.length > 0 && `${metricsChanges.length} metric${metricsChanges.length !== 1 ? 's' : ''}`,
    filtersChanges.length > 0 && `${filtersChanges.length} filter${filtersChanges.length !== 1 ? 's' : ''} applied`,
  ].filter(Boolean).join(', ')

  // Parse metric names from changes (e.g., "Orders, Spend, Revenue, ROAS" -> ["Orders", "Spend", "Revenue", "ROAS"])
  const getMetricNames = () => {
    const metricChange = metricsChanges.find(c => c.label === 'Added')
    if (metricChange) {
      return metricChange.value.split(',').map(m => m.trim())
    }
    return []
  }

  const getDimensionNames = () => {
    return dimensionsChanges.map(c => c.value)
  }

  const getFilterNames = () => {
    return filtersChanges.map(c => `${c.label} ${c.value}`)
  }

  const renderMetrics = () => {
    const metricNames = getMetricNames()
    if (metricNames.length === 0) {
      return (
        <Flex direction="column" align="center" justify="center" className="py-8 text-center flex-1">
          <Text size="xs" weight="semibold" className="text-[#6A7282] whitespace-nowrap">No changes yet</Text>
          <Text size="xs" className="text-[#6A7282] whitespace-nowrap">Updates to your report will appear here</Text>
        </Flex>
      )
    }

    // Display metrics as a vertical list
    return (
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto min-h-0" style={{ width: '228px' }}>
        {metricNames.map((name, index) => (
          <div key={index} className="text-xs text-[#99A1AF] leading-4" style={{ height: '16px' }}>
            {name}
          </div>
        ))}
      </div>
    )
  }

  const renderDimensions = () => {
    const dimensionNames = getDimensionNames()
    if (dimensionNames.length === 0) {
      return (
        <Flex direction="column" align="center" justify="center" className="py-8 text-center flex-1">
          <Text size="xs" weight="semibold" className="text-[#6A7282] whitespace-nowrap">No changes yet</Text>
          <Text size="xs" className="text-[#6A7282] whitespace-nowrap">Updates to your report will appear here</Text>
        </Flex>
      )
    }

    return (
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto min-h-0">
        {dimensionNames.map((name, index) => (
          <div key={index} className="text-xs text-[#99A1AF] leading-4">
            {name}
          </div>
        ))}
      </div>
    )
  }

  const renderFilters = () => {
    const filterNames = getFilterNames()
    if (filterNames.length === 0) {
      return (
        <Flex direction="column" align="center" justify="center" className="py-8 text-center flex-1">
          <Text size="xs" weight="semibold" className="text-[#6A7282] whitespace-nowrap">No changes yet</Text>
          <Text size="xs" className="text-[#6A7282] whitespace-nowrap">Updates to your report will appear here</Text>
        </Flex>
      )
    }

    return (
      <div className="flex flex-col gap-4 flex-1 overflow-y-auto min-h-0">
        {filterNames.map((name, index) => (
          <div key={index} className="text-xs text-[#99A1AF] leading-4">
            {name}
          </div>
        ))}
      </div>
    )
  }

  const renderSkeleton = () => (
    <div className="flex flex-col gap-4 overflow-y-auto min-h-0" style={{ maxHeight: '100%' }}>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <div key={i} className="h-3 bg-[#F3F4F6] rounded-lg w-full shrink-0" style={{ height: '12px' }} />
      ))}
    </div>
  )

  return (
    <div 
      data-testid="review-changes" 
      className="border border-[#F3F4F6] flex-1 bg-white rounded-br-lg min-h-0"
    >
      <div className="p-6 flex flex-col h-full min-h-0 gap-4">
        {/* Review Header - order 0 */}
        <div className="flex items-center shrink-0" style={{ width: '252px', height: '20px' }}>
          <Text weight="medium" size="sm" className="text-[#030712]">Review changes</Text>
        </div>

        {/* Container with gap 8px - order 1, flex-grow: 1 */}
        <div className="flex flex-col gap-2 flex-1 min-h-0" style={{ width: '252px' }}>
          {/* Summary text - order 0 */}
          {!isLoading && summaryText && (
            <div className="text-sm text-[#6A7282] leading-5 shrink-0 flex items-center" style={{ width: '252px', height: '40px' }}>
              {summaryText}
            </div>
          )}

          {/* Review changes box - order 1, flex-grow: 1 */}
          <div className="bg-white border border-[#F3F4F6] rounded-lg p-3 flex-1 flex flex-col min-h-0" style={{ width: '252px' }}>
            <TabsRoot defaultValue="metrics" className="flex-1 flex flex-col">
              <TabsList variant="pill" size="sm" className="mb-3 justify-start shrink-0">
                <TabsTrigger value="metrics">Metrics</TabsTrigger>
                <TabsTrigger value="dimensions">Dim.</TabsTrigger>
                <TabsTrigger value="filters">Filters</TabsTrigger>
              </TabsList>

              <TabsContent value="metrics" className="flex-1 min-h-0">
                {isLoading ? renderSkeleton() : renderMetrics()}
              </TabsContent>
              <TabsContent value="dimensions" className="flex-1 min-h-0">
                {isLoading ? renderSkeleton() : renderDimensions()}
              </TabsContent>
              <TabsContent value="filters" className="flex-1 min-h-0">
                {isLoading ? renderSkeleton() : renderFilters()}
              </TabsContent>
            </TabsRoot>
          </div>
        </div>

        {/* Bottom buttons - Reset (left), Undo and Keep (right) - order 2 */}
        {!isLoading && changes.length > 0 && (
          <div className="flex justify-between items-center gap-1.5 shrink-0" style={{ width: '252px', height: '28px' }}>
            {/* Reset button - left aligned */}
            <button 
              onClick={onReset}
              className="px-3 py-1.5 h-7 bg-white rounded-md text-xs text-[#6A7282] leading-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Reset
            </button>
            
            {/* Undo and Keep buttons - right aligned */}
            <div className="flex items-center gap-1.5">
              <button 
                onClick={onUndo}
                className="px-3 py-1.5 h-7 bg-white rounded-md text-xs text-[#6A7282] leading-4 hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Undo
              </button>
              <button className="px-3 py-1.5 h-7 bg-white border border-[#DAE9FF] rounded-md text-xs text-[#367DFE] leading-4">
                Keep
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

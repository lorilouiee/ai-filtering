import { AwesomeIcon } from '@koddidev/katalyst-ui'

interface GroupedMultiSelectProps {
  label: string
  selectedItems: string[]
  options?: string[]
  onSelectionChange: (items: string[]) => void
  testId: string
}

export function GroupedMultiSelect({
  label,
  selectedItems,
  onSelectionChange,
  testId
}: GroupedMultiSelectProps) {
  const handleRemove = (itemToRemove: string, e: React.MouseEvent) => {
    e.stopPropagation()
    onSelectionChange(selectedItems.filter(item => item !== itemToRemove))
  }

  const firstItem = selectedItems[0]
  const remainingCount = selectedItems.length - 1

  // Show regular button state when no items are selected
  if (selectedItems.length === 0) {
    return (
      <button 
        className="flex items-center gap-2 px-3 py-2 h-9 bg-white border border-[#E5E7EB] rounded-lg shadow-[0px_0px_4px_rgba(0,0,0,0.03)] text-sm text-[#6A7282] min-w-[176px]"
        data-testid={testId}
      >
        <span className="flex-1 text-left">{label}</span>
        <div className="shrink-0" style={{ width: '16px', height: '16px' }}>
          <AwesomeIcon 
            name="chevron-down" 
            iconFamily="sharp" 
            size="sm" 
            className="text-[#99A1AF]"
          />
        </div>
      </button>
    )
  }

  // Show grouped multi-select when items are selected
  return (
    <div 
      className="flex items-center"
      style={{ 
        height: '36px',
        filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.03))',
        borderRadius: '8px'
      }}
      data-testid={testId}
    >
      {/* Left part - Label */}
      <div
        className="flex items-center px-3 py-2 bg-white border border-[#E5E7EB] rounded-l-lg shrink-0"
        style={{
          width: '101px',
          height: '36px',
          marginRight: '-1px'
        }}
      >
        <span className="text-sm text-[#6A7282] leading-5" style={{ fontSize: '14px', lineHeight: '20px' }}>
          {label}
        </span>
      </div>

      {/* Right part - Chips */}
      <div
        className="flex items-center bg-white border border-[#E5E7EB] rounded-r-lg"
        style={{
          height: '36px',
          boxShadow: '0px 0px 4px rgba(0, 0, 0, 0.03)',
          padding: '8px 12px',
          gap: '8px'
        }}
      >
        <div className="flex items-center gap-1" style={{ gap: '4px' }}>
          {selectedItems.length > 0 ? (
            <>
              {/* First chip */}
              <div
                className="flex items-center px-2 py-1 gap-1.5 bg-[#F3F4F6] rounded-md shrink-0"
                style={{
                  padding: '4px 6px 4px 8px',
                  gap: '6px',
                  height: '24px'
                }}
              >
                <span className="text-xs text-[#030712] leading-4 whitespace-nowrap" style={{ fontSize: '12px', lineHeight: '16px' }}>
                  {firstItem}
                </span>
                <button
                  onClick={(e) => handleRemove(firstItem, e)}
                  className="flex items-center justify-center p-0.5 rounded-md hover:bg-gray-200 transition-colors shrink-0"
                  style={{ width: '16px', height: '16px' }}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M9 3L3 9M3 3L9 9" stroke="#99A1AF" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Overflow counter chip */}
              {remainingCount > 0 && (
                <div
                  className="flex items-center px-2 py-1 bg-[#F3F4F6] rounded-md shrink-0"
                  style={{
                    padding: '4px 6px 4px 8px',
                    height: '24px'
                  }}
                >
                  <span className="text-xs text-[#030712] leading-4 whitespace-nowrap" style={{ fontSize: '12px', lineHeight: '16px' }}>
                    +{remainingCount} more
                  </span>
                </div>
              )}
            </>
          ) : (
            <span className="text-sm text-[#6A7282] leading-5" style={{ fontSize: '14px', lineHeight: '20px' }}>
              Select {label.toLowerCase()}
            </span>
          )}
        </div>

        {/* Chevron down - centered */}
        <div className="flex items-center justify-center shrink-0" style={{ width: '16px', height: '16px' }}>
          <AwesomeIcon 
            name="chevron-down" 
            iconFamily="sharp" 
            size="sm" 
            className="text-[#99A1AF]"
          />
        </div>
      </div>
    </div>
  )
}

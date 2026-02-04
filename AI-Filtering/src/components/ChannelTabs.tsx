const channels = ['All', 'Onsite', 'Offsite', 'SSP']

interface ChannelTabsProps {
  activeChannel?: string
  onChannelChange?: (channel: string) => void
}

export function ChannelTabs({ activeChannel = 'All', onChannelChange }: ChannelTabsProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Filter Row */}
      <div className="flex items-center gap-[15px] h-8">
        {/* Filter Label */}
        <span className="text-sm font-normal text-[#6A7282] leading-5">
          Channels:
        </span>
        
        {/* Tabs */}
        <div className="flex items-center gap-2">
          {channels.map((channel) => {
            const isActive = channel === activeChannel
            return (
              <button
                key={channel}
                onClick={() => onChannelChange?.(channel)}
                className={`
                  flex items-center justify-center
                  px-3 py-1.5 h-8
                  text-sm font-normal leading-5
                  rounded-lg
                  transition-colors
                  ${isActive 
                    ? 'bg-[#EEF6FF] text-[#367DFE]' 
                    : 'text-[#6A7282] hover:bg-gray-50'
                  }
                `}
              >
                {channel}
              </button>
            )
          })}
        </div>
      </div>

      {/* Divider Line */}
      <div className="w-full h-px bg-[#E5E7EB]" />
    </div>
  )
}

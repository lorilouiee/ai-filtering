interface ToastProps {
  title: string
  message: string
  onClose?: () => void
  isVisible?: boolean
}

export function Toast({ title, message, isVisible = true }: ToastProps) {
  return (
    <div
      className={`fixed flex items-center p-4 gap-4 bg-white rounded-lg shadow-[0px_4px_20px_rgba(0,0,0,0.04)] z-50 transition-transform duration-300 ease-in-out ${
        isVisible ? 'translate-x-0' : 'translate-x-[calc(100%+24px)]'
      }`}
      style={{
        width: '512px',
        height: '78px',
        right: '24px',
        top: '93px',
      }}
    >
      {/* Checkmark icon - green circle with checkmark */}
      <div className="relative flex items-center justify-center shrink-0" style={{ width: '24px', height: '24px' }}>
        <div className="absolute inset-0 bg-[#008236] rounded-full" style={{ left: '10%', right: '10%', top: '10%', bottom: '10%' }} />
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="relative z-10">
          <path d="M11.6667 3.5L5.25 9.91667L2.33334 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col items-start gap-2 flex-1" style={{ width: '440px', height: '46px' }}>
        {/* Title */}
        <div className="flex items-center gap-1.5 w-full" style={{ width: '440px', height: '18px' }}>
          <span className="text-sm font-semibold text-[#6A7282] leading-[130%] flex-1" style={{ fontSize: '14px', lineHeight: '18px' }}>
            {title}
          </span>
        </div>

        {/* Message */}
        <div className="text-sm text-[#99A1AF] leading-5 whitespace-nowrap overflow-hidden text-ellipsis" style={{ width: '370px', height: '20px', fontSize: '14px', lineHeight: '20px' }}>
          {message}
        </div>
      </div>
    </div>
  )
}

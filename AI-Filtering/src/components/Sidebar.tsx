import { 
  IconButton,
  Stack
} from '@koddidev/katalyst-ui'

interface SidebarProps {
  activeItem?: string
}

export function Sidebar({ activeItem = 'reporting' }: SidebarProps) {
  const navItems = [
    { id: 'home', icon: 'house' as const },
    { id: 'insights', icon: 'lightbulb' as const },
    { id: 'reporting', icon: 'chart-simple' as const },
    { id: 'media', icon: 'image' as const },
    { id: 'documents', icon: 'file-lines' as const },
    { id: 'contact', icon: 'phone' as const },
  ]

  const bottomItems = [
    { id: 'users', icon: 'users' as const },
    { id: 'settings', icon: 'gear' as const },
  ]

  return (
    <div className="w-[60px] bg-white border-r border-[#E5E7EB] fixed left-0 top-[70px] bottom-0 z-30 flex flex-col justify-between py-4 px-3">
      {/* Top section */}
      <div className="flex flex-col gap-6">
        {/* Menu toggle */}
        <IconButton
          icon={{ name: 'bars', iconFamily: 'sharp' }}
          variant="ghost"
          size="md"
          testId="menu-toggle"
        />
        
        {/* Main nav items */}
        <Stack gap="sm">
          {navItems.map((item) => (
            <IconButton
              key={item.id}
              icon={{ name: item.icon, iconFamily: 'sharp' }}
              variant={item.id === activeItem ? 'primary' : 'ghost'}
              size="md"
              testId={`nav-${item.id}`}
              className={item.id === activeItem ? 'bg-[#EEF6FF] text-[#367DFE]' : 'text-[#6A7282]'}
            />
          ))}
        </Stack>
      </div>

      {/* Bottom section */}
      <div className="flex flex-col gap-6">
        <Stack gap="sm">
          {bottomItems.map((item) => (
            <IconButton
              key={item.id}
              icon={{ name: item.icon, iconFamily: 'sharp' }}
              variant="ghost"
              size="md"
              testId={`nav-${item.id}`}
              className="text-[#6A7282]"
            />
          ))}
        </Stack>
        
        {/* Add button */}
        <IconButton
          icon={{ name: 'plus', iconFamily: 'sharp' }}
          variant="primary"
          size="md"
          testId="add-button"
          className="bg-[#367DFE]"
        />
      </div>
    </div>
  )
}

# Component Reference

Complete list of Katalyst UI components organized by category.

## Core Components

### AnimatedBox
Framer Motion wrapper that provides animation capabilities to any element.

**Key Props:**
- `as?: ElementType` - HTML element or React component to render (default: "div")
- All standard HTMLMotionProps from Framer Motion

### AwesomeIcon
Renders Font Awesome icons with support for custom Koddi icons.

**Key Props:**
- `name: IconName` - Icon name (FontAwesome or Koddi icon)
- `variant?: 'solid' | 'regular' | 'light' | 'thin'` - Icon variant (default: 'solid')
- `iconFamily?: 'classic' | 'duotone' | 'sharp' | 'sharp-duotone' | 'koddi'` - Icon family
- `size?: SizeProp` - Icon size
- Animation props: `shouldSpin`, `shouldPulse`, `shouldBounce`, `shouldFade`, `shouldShake`

### FramedAwesomeIcon
Icon wrapped in a colored frame/background.

**Key Props:**
- `icon: Omit<CommonIconProps, 'size'>` - Icon props
- `size?: 'sm' | 'lg'` - Frame size (default: 'md')
- `color?: 'primary' | 'success' | 'warning' | 'error' | 'info' | 'inherit'` - Frame color

### Text
Typography component with size, weight, and color variants.

**Key Props:**
- `size?: 'xs' | 'sm' | 'md' | 'base' | 'lg' | 'xl' | '2xl'` - Text size (default: 'sm')
- `weight?: 'normal' | 'medium' | 'semibold' | 'bold' | 400 | 500` - Font weight
- `textColor?: 'inherit' | 'strong' | 'medium' | 'subtle' | 'muted' | 'light' | 'primary' | 'secondary' | 'alert' | 'success' | 'caution' | 'active'` - Text color
- `truncate?: 'lines-1' | 'lines-2' | 'lines-3'` - Line clamp truncation

## Data Display Components

### Badge
Badge component for displaying labels, status, or counts.

**Key Props:**
- `variant?: 'default' | 'neutral' | 'success' | 'error' | 'warning' | 'brand'` - Badge variant
- `size?: 'sm' | 'md' | 'lg'` - Badge size
- `shouldShowPill?: boolean` - Show pill background (default: true)
- `leftIcon?: CommonIconProps` - Icon on the left
- `rightIcon?: CommonIconProps` - Icon on the right

### Card
Card container with header, body, and footer sections.

**Sub-components:**
- `CardHeader` - Header section (accepts Flex props)
- `CardBody` - Body section (accepts Stack props)
- `CardFooter` - Footer section (accepts Flex props)

**Key Props:**
- `testId?: string` - Test identifier
- `asChild?: boolean` - Render as child component

### ClickableCard
Clickable variant of Card with selection and error states.

**Key Props:**
- All Card props
- `isSelected?: boolean` - Selected state
- `isDisabled?: boolean` - Disabled state
- `isError?: boolean` - Error state

### CardTitle
Styled badge component for card titles with optional tooltip.

**Key Props:**
- All Badge props
- `informationTooltip?: string` - Tooltip text

### Calendar
Calendar component for date selection (wraps react-day-picker).

**Key Props:**
- All props from `react-day-picker` Calendar component
- `className?: string` - Additional CSS classes

### GraphMetric
Metric display component with optional delta and metric selector.

**Key Props:**
- `value: string` - The metric value to display
- `selectedMetric: T` - Currently selected metric
- `metricOptions?: T[]` - Available metric options
- `onMetricSelect?: (metric: T) => void` - Metric selection callback
- `deltaValue?: string | number` - Delta value
- `deltaType?: 'positive' | 'negative' | 'neutral'` - Delta type

### SelectableTile
Selectable card tile with icon, header, and description.

**Key Props:**
- All ClickableCard props
- `icon?: CommonIconProps` - Icon to display
- `header: string` - Header text
- `description: string` - Description text
- `isSelected?: boolean` - Selected state
- `testId: string` - Test identifier (required)

## Input Components

### Button
Button component with multiple variants and loading states.

**Key Props:**
- `variant?: 'primary' | 'outline' | 'neutral' | 'ghost'` - Button variant
- `size?: 'sm' | 'md' | 'lg'` - Button size
- `isDisabled?: boolean` - Disabled state
- `isLoading?: boolean` - Loading state
- `loadingText?: string` - Text to show while loading
- `leftIcon?: CommonIconProps` - Icon on the left
- `rightIcon?: CommonIconProps` - Icon on the right
- `testId: string` - Test identifier (required)

### ClarifyingButton
Button that shows a tooltip with disabled reasons when disabled.

**Key Props:**
- All Button props
- `disabledReasons: string[]` - Array of reasons why button is disabled

### IconButton
Button that displays only an icon.

**Key Props:**
- All Button props (except children)
- `icon: CommonIconProps` - Icon to display (required)
- `iconColor?: TextProps['textColor']` - Icon color

### Input
Text input component with addons and password toggle.

**Key Props:**
- `type?: string` - Input type (default: 'text')
- `size?: 'sm' | 'md' | 'lg'` - Input size
- `hasError?: boolean` - Error state
- `isLoading?: boolean` - Loading state
- `isDisabled?: boolean` - Disabled state
- `rightAddon?: React.ReactNode` - Right side addon
- `leftAddon?: React.ReactNode` - Left side addon
- `testId: string` - Test identifier (required)

### GroupedInput
Groups multiple Input components together with shared styling.

**Key Props:**
- `children: ReactElement<InputProps>[]` - Array of Input components
- `size?: 'sm' | 'md' | 'lg'` - Size for all inputs
- `hasError?: boolean` - Error state for all inputs
- `isDisabled?: boolean` - Disabled state for all inputs

### Label
Label component for form inputs.

**Key Props:**
- `isDisabled?: boolean` - Disabled state
- `testId?: string` - Test identifier
- Standard Radix Label props

### Checkbox
Checkbox input component.

**Key Props:**
- `label?: string` - Label text
- `testId: string` - Test identifier (required)
- `hasError?: boolean` - Error state
- `isChecked?: boolean` - Checked state
- `isIndeterminate?: boolean` - Indeterminate state
- `isDisabled?: boolean` - Disabled state

### RadioGroup
Radio button group component.

**Key Props:**
- `options: RadioOption[]` - Array of radio options
- `value?: string` - Selected value
- `onValueChange?: (value: string) => void` - Change handler
- `size?: 'sm' | 'base'` - Size
- `layout?: 'stacked' | 'inline'` - Layout
- `testId: string` - Test identifier (required)

### Switch
Toggle switch component.

**Key Props:**
- `size?: 'default' | 'small'` - Switch size
- `isChecked?: boolean` - Checked state
- `isDisabled?: boolean` - Disabled state
- `label?: string` - Label text
- `labelPosition?: 'left' | 'right'` - Label position
- `testId: string` - Test identifier (required)

### Slider
Slider/range input component.

**Key Props:**
- `value?: number[]` - Controlled value (array for range)
- `min?: number` - Minimum value
- `max?: number` - Maximum value
- `step?: number` - Step value
- `isDisabled?: boolean` - Disabled state
- `recommendationSlot?: React.ReactNode` - Slot for recommendations
- `testId: string` - Test identifier (required)

### Select
Powerful select component with multi-select, search, grouping, and nested options.

**Key Props:**
- Single/Multi-select modes
- `options?: T[]` or `groups?: SelectOptionGroup<T>[]` - Options
- `canSearch?: boolean` - Enable search
- `renderSelectedOption?: (option: T) => React.ReactNode` - Custom renderer (for non-string types)
- `keyFunction?: (item: T) => string` - Unique key function
- `testId: string` - Test identifier (required)

### RangedDatePicker
Date range picker with preset options.

**Key Props:**
- `presetDateRanges?: RangedSelectableDateRange[]` - Preset options
- `dateRange?: DateRange` - Selected date range
- `onDateRangeChange: (dateRange: DateRange | undefined) => void` - Change handler
- `testId: string` - Test identifier (required)

### RangedComparisonDateRangePicker
Date range picker with comparison date range support.

**Key Props:**
- `dateRange: DateRange | undefined` - Primary date range
- `comparisonDateRange: DateRange | undefined` - Comparison date range
- `onDateRangesChange: (ranges: { dateRange?: DateRange; comparisonDateRange?: DateRange }) => void` - Change handler
- `isComparing?: boolean` - Comparison mode enabled
- `testId: string` - Test identifier (required)

### Pill
Pill-shaped button component.

**Key Props:**
- `size?: 'sm' | 'md' | 'lg'` - Pill size
- `isEnabled?: boolean` - Enabled/selected state
- `isError?: boolean` - Error state
- `isDisabled?: boolean` - Disabled state
- `leftIcon?: CommonIconProps` - Left icon
- `rightIcon?: CommonIconProps` - Right icon

## Navigation Components

### Breadcrumbs
Breadcrumb navigation component.

**Key Props:**
- `items: BreadcrumbsItem[]` - Array of breadcrumb items

**BreadcrumbsItem:**
- `label: string` - Item label
- `id: string` - Unique identifier
- `iconName?: IconName` - Optional icon
- `onClick: () => void` - Click handler

### Tabs
Tabs component with structured items.

**Key Props:**
- `items: TabItem[]` - Array of tab items
- `variant?: 'line' | 'enclosed'` - Tab variant
- `size?: 'sm' | 'md' | 'lg'` - Tab size
- `testId: string` - Test identifier (required)

**TabItem:**
- `id: string` - Tab ID
- `label: React.ReactNode` - Tab label
- `content: React.ReactNode` - Tab content
- `isDisabled?: boolean` - Disabled state
- `hasError?: boolean` - Error state
- `icon?: CommonIconProps` - Tab icon

### VerticalNavigation
Vertical navigation sidebar component.

**Key Props:**
- `selectedId?: string` - Selected navigation item ID
- `client?: { logoURL?: string; name: string }` - Client information
- `categories?: CategoryNavigationItem[]` - Navigation categories
- `createItems?: AlternativeNavigationItem[]` - Create action items
- `user?: NavigationUser` - User information and menu
- `isLoading?: boolean` - Loading state

## Overlay Components

### Dialog
Modal dialog component.

**Key Props:**
- `trigger: React.ReactNode` - Element that triggers the dialog
- `title?: string` - Dialog title
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Dialog size
- `isDismissible?: boolean` - Show dismiss button
- `submitButtonProps?: DialogButtonPropType` - Submit button props
- `closeButtonProps?: DialogButtonPropType` - Close button props
- `testId: string` - Test identifier (required)

### Drawer
Side drawer component.

**Key Props:**
- `trigger: React.ReactNode` - Element that triggers the drawer
- `title?: string` - Drawer title
- `description?: string` - Drawer description
- `size?: 'sm' | 'md' | 'lg' | 'xl'` - Drawer size
- `submitButtonProps?: DrawerButtonPropType` - Submit button props
- `testId: string` - Test identifier (required)

### DropdownMenu
Dropdown menu component.

**Key Props:**
- `trigger: React.ReactNode` - Element that triggers the menu
- `items?: DropdownMenuItemType[]` - Menu items
- `groups?: DropdownMenuGroupType[]` - Menu item groups
- `testId: string` - Test identifier (required)

### Popover
Popover component (wrapper around Radix Popover).

**Sub-components:**
- `PopoverTrigger` - Trigger element
- `PopoverContent` - Popover content
- `PopoverAnchor` - Anchor element
- `PopoverClose` - Close button

### Tooltip
Tooltip component.

**Key Props:**
- `content: React.ReactNode` - Tooltip content
- `side?: 'bottom' | 'left' | 'top' | 'right'` - Tooltip side
- `showArrow?: boolean` - Show arrow (default: true)
- `darkMode?: boolean` - Dark mode

## Feedback Components

### Callout
Alert/callout component for displaying messages.

**Key Props:**
- `title: string` - Callout title (required)
- `variant?: 'info' | 'success' | 'error' | 'warning' | 'neutral'` - Variant
- `icon?: CommonIconProps` - Icon to display
- `isDismissible?: boolean` - Show dismiss button
- `onDismiss?: () => void` - Dismiss handler

### EmptyState
Component for displaying empty states.

**Key Props:**
- `title: string` - Empty state title (required)
- `description: string` - Empty state description (required)
- `icon?: React.ReactNode` - Icon to display
- `primaryAction?: React.ReactNode` - Primary action button
- `secondaryAction?: React.ReactNode` - Secondary action button

### Skeleton
Skeleton loading component.

**Key Props:**
- `isLoading?: boolean` - Loading state (default: false)
- `children: React.ReactNode` - Content to show when not loading

### SkeletonControl
Wrapper component that controls skeleton state for child components.

**Key Props:**
- `children: React.ReactNode` - Child components
- `isLoading?: boolean` - Loading state

### Toast System
Toast notification system.

**Toaster Component:**
- `toastPosition?: ToastPosition` - Toast position

**useToast Hook:**
Returns `toast` function, `dismiss` function, and `toasts` array.

**Toast Props:**
- `title: string` - Toast title
- `description?: string` - Toast description
- `variant?: 'info' | 'success' | 'warning' | 'error'` - Toast variant
- `isImportant?: boolean` - Important styling
- `isDismissible?: boolean` - Show dismiss button
- `duration?: number` - Display duration in ms
- `testId: string` - Test identifier (required)

## Disclosure Components

### Accordion
Accordion component with structured items.

**Key Props:**
- `items: StructuredAccordionItem[]` - Array of accordion items

**StructuredAccordionItem:**
- `value: string` - Item value (required)
- `title: string` - Item title
- `titleIcon?: CommonIconProps` - Title icon
- `description?: string` - Item description
- `badgeContents?: React.ReactNode` - Badge content
- `content: React.ReactNode` - Accordion content (required)

## Layout Components

### Flex
Flexbox container component.

**Key Props:**
- `direction?: 'row' | 'column'` - Flex direction (default: 'row')
- `align?: 'start' | 'center' | 'end' | 'stretch'` - Align items
- `justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'` - Justify content
- `padding?: 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` - Padding
- `gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'` - Gap between items
- `isLoading?: boolean` - Loading state

### Stack
Vertical stack component (column Flex).

**Key Props:**
- All Flex props (direction is fixed to 'column')

### Grid
Grid container component.

**Key Props:**
- `columns?: 2 | 3 | 4 | 5 | 6 | 'auto'` - Number of columns
- `align?: 'start' | 'center' | 'end' | 'stretch'` - Align items
- `justify?: 'start' | 'center' | 'end' | 'stretch'` - Justify items
- `gap?: 'none' | 'sm' | 'md' | 'lg' | 'xl'` - Gap between items
- `padding?: 'none' | '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'` - Padding

### ButtonGroup
Container for grouping buttons.

**Key Props:**
- `testId?: string` - Test identifier
- All Flex props (except `gap` - fixed to 'sm')

### Divider
Divider/separator component.

**Key Props:**
- Standard HTML div props
- `children?: React.ReactNode` - Optional text content

## Complete API Documentation

For complete prop definitions, type information, and detailed usage examples for all components, see:
**`.cursor/rules/katayst-ui.md`**

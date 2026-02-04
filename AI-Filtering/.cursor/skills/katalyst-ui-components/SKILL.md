---
name: katalyst-ui-components
description: Use Katalyst UI components when building React interfaces. Use when creating UI components, forms, layouts, or when the user mentions Katalyst UI, UI components, or building interfaces. Reference the detailed component documentation for props and usage patterns.
---

# Katalyst UI Components

## Quick Start

When building UI with Katalyst UI components:

1. **Always use Katalyst components** instead of raw HTML or other UI libraries
2. **Reference component reference** in [component-reference.md](component-reference.md) for available components
3. **Follow patterns** in [patterns.md](patterns.md) for consistency
4. **See workflows** in [workflows.md](workflows.md) for common use cases
5. **Use Tailwind classes** - all components accept Tailwind classes for styling

## Component Categories Overview

- **Core**: AnimatedBox, AwesomeIcon, FramedAwesomeIcon, Text
- **Data Display**: Badge, Card, Calendar, GraphMetric, SelectableTile
- **Input**: Button, Input, Select, Checkbox, RadioGroup, Switch, DatePickers
- **Navigation**: Breadcrumbs, Tabs, VerticalNavigation
- **Overlays**: Dialog, Drawer, DropdownMenu, Popover, Tooltip
- **Feedback**: Callout, EmptyState, Skeleton, Toast
- **Layout**: Flex, Stack, Grid, ButtonGroup, Divider

For complete component list and descriptions, see [component-reference.md](component-reference.md).

## Essential Quick Reference

### Test IDs
Most components require `testId: string`. Always provide it:
```tsx
<Button testId="save-button" onClick={handleSave}>Save</Button>
```

### Icons
Use `CommonIconProps` structure:
```tsx
{ name: 'icon-name', variant: 'solid', iconFamily: 'classic' }
```

For detailed patterns, see [patterns.md](patterns.md).

## Common Use Cases

### Forms
See [workflows.md](workflows.md#forms) for form building patterns.

### Dialogs and Modals
See [workflows.md](workflows.md#dialogs) for dialog usage.

### Toast Notifications
See [workflows.md](workflows.md#toasts) for toast examples.

### Select Components
See [workflows.md](workflows.md#select) for select patterns.

## Additional Resources

- **Component Reference**: [component-reference.md](component-reference.md) - Complete component list
- **Patterns**: [patterns.md](patterns.md) - Icons, states, variants, sizes
- **Workflows**: [workflows.md](workflows.md) - Common use cases and examples
- **Best Practices**: [notes.md](notes.md) - Important notes and guidelines
- **Full API Docs**: `.cursor/rules/katayst-ui.md` - Complete component APIs with all props

## Quick Lookup

When you need specific component details:
1. Check [component-reference.md](component-reference.md) for component overview
2. See [patterns.md](patterns.md) for usage patterns
3. Review [workflows.md](workflows.md) for examples
4. Read `.cursor/rules/katayst-ui.md` for complete API documentation

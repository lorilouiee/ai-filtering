# Important Notes and Best Practices

Key guidelines and important information for using Katalyst UI components effectively.

## Required Props

### Test IDs

Components with `testId: string` (no `?`) **require** the testId prop:

```tsx
// ✅ Correct
<Button testId="save-button" onClick={handleSave}>Save</Button>
<Input testId="email-input" value={email} onChange={setEmail} />
<Select testId="category-select" options={options} value={selected} onChange={setSelected} />

// ❌ Incorrect - missing required testId
<Button onClick={handleSave}>Save</Button>
```

### Required Content Props

Some components require specific props:

- `EmptyState`: `title` and `description` are required
- `Callout`: `title` is required
- `SelectableTile`: `header`, `description`, and `testId` are required
- `GraphMetric`: `value` and `selectedMetric` are required

## Controlled vs Uncontrolled Components

Many components support both controlled and uncontrolled patterns:

### Controlled Pattern

Use `value` and `onChange` for controlled components:

```tsx
const [email, setEmail] = useState('');

<Input
  value={email}
  onChange={e => setEmail(e.target.value)}
  testId="email-input"
/>
```

### Uncontrolled Pattern

Use `defaultValue` for uncontrolled components:

```tsx
<Input
  defaultValue="initial@example.com"
  testId="email-input"
/>
```

**Best Practice**: Use controlled components when you need to:
- Validate input in real-time
- Transform or format values
- Sync with other components
- Reset form programmatically

## Async Actions

Some components support async actions that can return `false` to prevent closing:

### Dialog/Drawer

```tsx
<Dialog
  submitButtonProps={{
    text: 'Save',
    action: async () => {
      const success = await saveData();
      if (!success) {
        // Keep dialog open on error
        return false;
      }
      // Close dialog on success
      return true;
    },
  }}
  testId="save-dialog"
>
  Content
</Dialog>
```

### DropdownMenu

```tsx
<DropdownMenu
  items={[
    {
      label: 'Delete',
      onClick: async () => {
        const confirmed = await confirmDelete();
        if (!confirmed) {
          return false; // Keep menu open
        }
        await deleteItem();
        return true; // Close menu
      },
      testId: 'delete-item',
    },
  ]}
  testId="actions-menu"
/>
```

**Best Practice**: Always return `true` or `false` explicitly from async actions to control component behavior.

## TypeScript Generics

### Select Component

The Select component uses generics `<T>` for type safety with custom option types:

```tsx
interface User {
  id: string;
  name: string;
  email: string;
}

const users: User[] = [
  { id: '1', name: 'John', email: 'john@example.com' },
  { id: '2', name: 'Jane', email: 'jane@example.com' },
];

<Select<User>
  options={users}
  value={selectedUser}
  onChange={setSelectedUser}
  renderSelectedOption={(user) => user.name}
  keyFunction={(user) => user.id}
  testId="user-select"
/>
```

**Best Practice**: Always provide type parameters for Select when using custom option types.

## Radix UI Integration

Many components are built on Radix UI primitives and accept standard Radix props:

- `Dialog`, `Drawer` - Built on Radix Dialog
- `DropdownMenu`, `Popover`, `Tooltip` - Built on Radix primitives
- `Checkbox`, `RadioGroup`, `Switch` - Built on Radix form primitives
- `Select` - Uses Radix Select primitives

**Best Practice**: When you need advanced functionality, check Radix UI documentation for additional props that may be supported.

## Skeleton Loading

Components automatically show skeleton states when wrapped in `SkeletonControl`:

```tsx
<SkeletonControl isLoading={isLoading}>
  <Skeleton isLoading={isLoading}>
    <Text>Content</Text>
  </Skeleton>
  <Skeleton isLoading={isLoading}>
    <Button>Action</Button>
  </Skeleton>
</SkeletonControl>
```

**Best Practice**: Use `SkeletonControl` to manage loading states for multiple components consistently.

## Accessibility

All components follow accessibility best practices:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader support

**Best Practice**: 
- Always provide meaningful `testId` values
- Use semantic HTML structure
- Ensure proper label associations for form inputs
- Test keyboard navigation

## Tailwind Classes

All components accept Tailwind classes via `className`:

```tsx
<Button
  className="shadow-lg hover:shadow-xl transition-shadow"
  testId="styled-button"
>
  Styled Button
</Button>

<Card className="border-2 border-blue-500 rounded-lg">
  <CardBody className="bg-gray-50 p-6">
    Content
  </CardBody>
</Card>
```

**Best Practice**: 
- Use Tailwind for styling instead of inline styles
- Prefer component props (like `variant`, `size`) over custom classes when possible
- Use `className` for additional styling that isn't covered by component props

## Component Composition

### Card Components

Card components are designed to work together:

```tsx
<Card>
  <CardHeader>
    {/* Header content */}
  </CardHeader>
  <CardBody>
    {/* Body content */}
  </CardBody>
  <CardFooter>
    {/* Footer content */}
  </CardFooter>
</Card>
```

### Popover Components

Popover uses sub-components:

```tsx
<Popover>
  <PopoverTrigger asChild>
    <Button testId="trigger">Open</Button>
  </PopoverTrigger>
  <PopoverContent side="bottom" align="center">
    Popover content
  </PopoverContent>
</Popover>
```

**Best Practice**: Use components as designed - don't skip sub-components or use them incorrectly.

## Error Handling

### Form Validation

Always validate inputs and show errors appropriately:

```tsx
const [email, setEmail] = useState('');
const [error, setError] = useState('');

const handleChange = (e) => {
  const value = e.target.value;
  setEmail(value);
  
  // Validate
  if (value && !isValidEmail(value)) {
    setError('Invalid email format');
  } else {
    setError('');
  }
};

<Input
  value={email}
  onChange={handleChange}
  hasError={!!error}
  testId="email-input"
/>
```

### Error States

Use appropriate error variants:

```tsx
// For form errors
<Callout variant="error" title="Validation Error" testId="error-callout">
  Please fix the errors below
</Callout>

// For input errors
<Input hasError={hasError} testId="email-input" />

// For action errors
<Button
  variant="error"
  onClick={handleDelete}
  testId="delete-button"
>
  Delete
</Button>
```

## Performance Considerations

### Select Component

For large option lists, use virtualization:

```tsx
<Select
  options={largeOptions}
  itemHeight={40} // Set item height for virtualization
  testId="large-select"
/>
```

### Skeleton Loading

Use skeleton loading to improve perceived performance:

```tsx
<SkeletonControl isLoading={isLoading}>
  {/* Content */}
</SkeletonControl>
```

## Common Pitfalls

### 1. Missing Test IDs

❌ **Don't**: Skip required testId props
```tsx
<Button onClick={handleSave}>Save</Button>
```

✅ **Do**: Always provide testId
```tsx
<Button testId="save-button" onClick={handleSave}>Save</Button>
```

### 2. Incorrect Async Action Return

❌ **Don't**: Forget to return boolean from async actions
```tsx
action: async () => {
  await save();
  // Missing return statement
}
```

✅ **Do**: Explicitly return boolean
```tsx
action: async () => {
  const success = await save();
  return success;
}
```

### 3. Not Using Controlled Pattern When Needed

❌ **Don't**: Use uncontrolled when you need validation
```tsx
<Input defaultValue={email} testId="email-input" />
```

✅ **Do**: Use controlled pattern for validation
```tsx
<Input
  value={email}
  onChange={e => setEmail(e.target.value)}
  hasError={!!errors.email}
  testId="email-input"
/>
```

### 4. Missing Type Parameters

❌ **Don't**: Skip generics for Select with custom types
```tsx
<Select
  options={users}
  renderSelectedOption={(user) => user.name}
/>
```

✅ **Do**: Provide type parameter
```tsx
<Select<User>
  options={users}
  renderSelectedOption={(user) => user.name}
  keyFunction={(user) => user.id}
/>
```

## Complete API Documentation

For the most up-to-date and complete component APIs, always refer to:
**`.cursor/rules/katayst-ui.md`**

This file contains:
- Complete prop definitions
- All type information
- Detailed usage examples
- Sub-component documentation
- Edge cases and advanced usage

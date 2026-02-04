# Patterns and Conventions

Common patterns and conventions for using Katalyst UI components.

## Icon Patterns

### CommonIconProps Structure

Most components accept icons using the `CommonIconProps` structure:

```tsx
{
  name: IconName,           // Required: icon name
  iconFamily?: IconFamily,  // Optional: 'classic', 'duotone', 'sharp', 'sharp-duotone', 'koddi'
  variant?: IconVariant,    // Optional: 'solid', 'regular', 'light', 'thin' (default: 'solid')
  size?: SizeProp,          // Optional: FontAwesome size
  // ... other AwesomeIcon props
}
```

### Usage Examples

```tsx
// Basic icon
<AwesomeIcon name="user" variant="solid" />

// Icon with animation
<AwesomeIcon name="spinner" shouldSpin={isLoading} />

// Icon in button
<Button
  leftIcon={{ name: 'save', variant: 'solid' }}
  testId="save-button"
>
  Save
</Button>

// Framed icon
<FramedAwesomeIcon
  icon={{ name: 'check', variant: 'solid' }}
  size="lg"
  color="success"
/>
```

## Test ID Patterns

### Required Test IDs

Most components require `testId: string` (no `?`). Always provide it:

```tsx
<Button testId="save-button" onClick={handleSave}>Save</Button>
<Input testId="email-input" value={email} onChange={setEmail} />
<Select testId="category-select" options={options} value={selected} onChange={setSelected} />
```

### Optional Test IDs

Some components have optional test IDs:

```tsx
<Card testId="user-card">
  <CardHeader testId="user-card-header">...</CardHeader>
  <CardBody testId="user-card-body">...</CardBody>
</Card>
```

### Nested Test IDs

Components may use `expandTestId` internally to create nested test IDs automatically.

## State Patterns

### Loading States

Many components support loading states:

```tsx
// Button with loading
<Button
  isLoading={isSaving}
  loadingText="Saving..."
  testId="save-button"
>
  Save
</Button>

// Input with loading
<Input
  isLoading={isValidating}
  testId="email-input"
  value={email}
  onChange={setEmail}
/>

// Flex container with loading
<Flex isLoading={isLoading} loadingText="Loading data...">
  <Content />
</Flex>
```

### Error States

Input components typically use `hasError` or `isError`:

```tsx
// Input with error
<Input
  hasError={hasError}
  testId="email-input"
  value={email}
  onChange={setEmail}
/>

// Checkbox with error
<Checkbox
  hasError={hasError}
  isChecked={accepted}
  onCheckedChange={setAccepted}
  testId="terms-checkbox"
/>

// RadioGroup with error
<RadioGroup
  hasGroupError={hasError}
  options={options}
  value={selected}
  onValueChange={setSelected}
  testId="option-group"
/>
```

### Disabled States

Most interactive components support `isDisabled`:

```tsx
<Button isDisabled={!isValid} testId="submit-button">Submit</Button>
<Input isDisabled={isLoading} testId="email-input" value={email} />
<Select isDisabled={isLoading} testId="category-select" options={options} />
```

## Variant Patterns

### Button Variants

```tsx
<Button variant="primary" testId="primary-btn">Primary</Button>
<Button variant="outline" testId="outline-btn">Outline</Button>
<Button variant="neutral" testId="neutral-btn">Neutral</Button>
<Button variant="ghost" testId="ghost-btn">Ghost</Button>
```

### Badge Variants

```tsx
<Badge variant="default">Default</Badge>
<Badge variant="neutral">Neutral</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="error">Error</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="brand">Brand</Badge>
```

### Callout Variants

```tsx
<Callout variant="info" title="Information">Info message</Callout>
<Callout variant="success" title="Success">Success message</Callout>
<Callout variant="error" title="Error">Error message</Callout>
<Callout variant="warning" title="Warning">Warning message</Callout>
<Callout variant="neutral" title="Notice">Neutral message</Callout>
```

### Toast Variants

```tsx
toast({
  variant: "info",
  title: "Information",
  testId: "info-toast"
});

toast({
  variant: "success",
  title: "Success",
  testId: "success-toast"
});

toast({
  variant: "warning",
  title: "Warning",
  testId: "warning-toast"
});

toast({
  variant: "error",
  title: "Error",
  testId: "error-toast"
});
```

## Size Patterns

### Standard Sizes

Most components use standard sizes: `'sm' | 'md' | 'lg'`

```tsx
<Button size="sm" testId="small-btn">Small</Button>
<Button size="md" testId="medium-btn">Medium</Button>
<Button size="lg" testId="large-btn">Large</Button>

<Input size="sm" testId="small-input" />
<Input size="md" testId="medium-input" />
<Input size="lg" testId="large-input" />
```

### Extended Sizes

Some components have additional sizes:

```tsx
// Text component
<Text size="xs">Extra Small</Text>
<Text size="sm">Small</Text>
<Text size="md">Medium</Text>
<Text size="base">Base</Text>
<Text size="lg">Large</Text>
<Text size="xl">Extra Large</Text>
<Text size="2xl">2X Large</Text>

// Dialog/Drawer sizes
<Dialog size="sm" testId="small-dialog">...</Dialog>
<Dialog size="md" testId="medium-dialog">...</Dialog>
<Dialog size="lg" testId="large-dialog">...</Dialog>
<Dialog size="xl" testId="xl-dialog">...</Dialog>
```

## Controlled vs Uncontrolled Patterns

### Controlled Components

Use `value` and `onChange` for controlled components:

```tsx
const [email, setEmail] = useState('');

<Input
  value={email}
  onChange={e => setEmail(e.target.value)}
  testId="email-input"
/>

const [selected, setSelected] = useState('');

<Select
  value={selected}
  onChange={setSelected}
  options={options}
  testId="category-select"
/>
```

### Uncontrolled Components

Use `defaultValue` for uncontrolled components:

```tsx
<Input
  defaultValue="initial value"
  testId="email-input"
/>

<Select
  defaultValue="option1"
  options={options}
  testId="category-select"
/>
```

## Async Action Patterns

Some components (Dialog, Drawer, DropdownMenu) support async actions that can return `false` to prevent closing:

```tsx
<Dialog
  submitButtonProps={{
    text: 'Save',
    action: async () => {
      const success = await saveData();
      if (!success) {
        // Return false to keep dialog open
        return false;
      }
      // Return true or nothing to close dialog
      return true;
    },
  }}
  testId="save-dialog"
>
  Content
</Dialog>

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

## TypeScript Generic Patterns

### Select Component with Generics

The Select component uses generics `<T>` for type safety with custom option types:

```tsx
interface Option {
  id: string;
  label: string;
  value: number;
}

const options: Option[] = [
  { id: '1', label: 'Option 1', value: 100 },
  { id: '2', label: 'Option 2', value: 200 },
];

<Select<Option>
  options={options}
  value={selected}
  onChange={setSelected}
  renderSelectedOption={(opt) => opt.label}
  keyFunction={(opt) => opt.id}
  testId="typed-select"
/>
```

## Tailwind Class Patterns

All components accept Tailwind classes via `className`:

```tsx
<Button
  className="shadow-lg hover:shadow-xl"
  testId="styled-button"
>
  Styled Button
</Button>

<Card className="border-2 border-blue-500">
  <CardBody className="bg-gray-50">
    Content
  </CardBody>
</Card>

<Text className="font-mono text-red-500">
  Custom Styled Text
</Text>
```

## Accessibility Patterns

Components follow accessibility best practices:

- Proper ARIA attributes
- Keyboard navigation support
- Focus management
- Screen reader support

Always ensure proper semantic HTML structure and use components as intended.

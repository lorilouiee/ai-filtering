# Common Workflows

Real-world usage examples and workflows for Katalyst UI components.

## Forms

### Basic Form

```tsx
import { Stack, Label, Input, Button } from '@katalyst/ui';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Submit logic
    setIsSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack gap="md">
        <Label htmlFor="email" testId="email-label">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          hasError={!!errors.email}
          testId="email-input"
        />

        <Label htmlFor="password" testId="password-label">Password</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          hasError={!!errors.password}
          testId="password-input"
        />

        <Button
          type="submit"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          testId="submit-button"
        >
          Sign In
        </Button>
      </Stack>
    </form>
  );
}
```

### Form with Validation

```tsx
import { Stack, Label, Input, Button, Callout } from '@katalyst/ui';

function RegistrationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setIsSubmitting(true);
    // Submit logic
    setIsSubmitting(false);
  };

  return (
    <Stack gap="lg">
      {errors.general && (
        <Callout variant="error" title="Error" testId="error-callout">
          {errors.general}
        </Callout>
      )}

      <Label htmlFor="name" testId="name-label">Name</Label>
      <Input
        id="name"
        value={formData.name}
        onChange={e => setFormData({ ...formData, name: e.target.value })}
        hasError={!!errors.name}
        testId="name-input"
      />

      <Label htmlFor="email" testId="email-label">Email</Label>
      <Input
        id="email"
        type="email"
        value={formData.email}
        onChange={e => setFormData({ ...formData, email: e.target.value })}
        hasError={!!errors.email}
        testId="email-input"
      />

      <Label htmlFor="password" testId="password-label">Password</Label>
      <Input
        id="password"
        type="password"
        value={formData.password}
        onChange={e => setFormData({ ...formData, password: e.target.value })}
        hasError={!!errors.password}
        testId="password-input"
      />

      <Button
        onClick={handleSubmit}
        isLoading={isSubmitting}
        testId="submit-button"
      >
        Register
      </Button>
    </Stack>
  );
}
```

### Form with Grouped Inputs

```tsx
import { Stack, Label, GroupedInput, Input, Button } from '@katalyst/ui';

function AddressForm() {
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');

  return (
    <Stack gap="md">
      <Label testId="address-label">Address</Label>
      <GroupedInput size="md" hasError={false}>
        <Input
          testId="street-input"
          value={street}
          onChange={e => setStreet(e.target.value)}
          placeholder="Street"
        />
        <Input
          testId="city-input"
          value={city}
          onChange={e => setCity(e.target.value)}
          placeholder="City"
        />
        <Input
          testId="zip-input"
          value={zip}
          onChange={e => setZip(e.target.value)}
          placeholder="ZIP"
        />
      </GroupedInput>

      <Button testId="save-button">Save Address</Button>
    </Stack>
  );
}
```

## Dialogs

### Confirmation Dialog

```tsx
import { Dialog, Button } from '@katalyst/ui';

function DeleteConfirmation({ itemId, onDelete }) {
  const handleDelete = async () => {
    const success = await onDelete(itemId);
    return success; // Return true to close, false to keep open
  };

  return (
    <Dialog
      trigger={<Button testId="delete-button">Delete</Button>}
      title="Confirm Delete"
      submitButtonProps={{
        text: 'Delete',
        variant: 'error',
        action: handleDelete,
      }}
      closeButtonProps={{ text: 'Cancel' }}
      testId="delete-dialog"
    >
      Are you sure you want to delete this item? This action cannot be undone.
    </Dialog>
  );
}
```

### Form Dialog

```tsx
import { Dialog, Button, Stack, Input, Label } from '@katalyst/ui';

function EditUserDialog({ user, onSave }) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    const success = await onSave({ name, email });
    return success; // Close dialog on success
  };

  return (
    <Dialog
      trigger={<Button testId="edit-button">Edit User</Button>}
      title="Edit User"
      size="md"
      submitButtonProps={{
        text: 'Save',
        action: handleSave,
      }}
      closeButtonProps={{ text: 'Cancel' }}
      testId="edit-dialog"
    >
      <Stack gap="md">
        <Label htmlFor="name" testId="name-label">Name</Label>
        <Input
          id="name"
          value={name}
          onChange={e => setName(e.target.value)}
          testId="name-input"
        />

        <Label htmlFor="email" testId="email-label">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          testId="email-input"
        />
      </Stack>
    </Dialog>
  );
}
```

### Drawer for Settings

```tsx
import { Drawer, Button, Stack, Switch, Label } from '@katalyst/ui';

function SettingsDrawer({ isOpen, onOpenChange }) {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const handleSave = async () => {
    await saveSettings({ notifications, darkMode });
    return true; // Close drawer
  };

  return (
    <Drawer
      trigger={<Button testId="settings-button">Settings</Button>}
      title="Settings"
      description="Manage your application settings"
      open={isOpen}
      onOpenChange={onOpenChange}
      submitButtonProps={{
        text: 'Save',
        action: handleSave,
      }}
      closeButtonProps={{ text: 'Cancel' }}
      testId="settings-drawer"
    >
      <Stack gap="lg">
        <Flex justify="between" align="center">
          <Label testId="notifications-label">Email Notifications</Label>
          <Switch
            isChecked={notifications}
            onCheckedChange={setNotifications}
            testId="notifications-switch"
          />
        </Flex>

        <Flex justify="between" align="center">
          <Label testId="dark-mode-label">Dark Mode</Label>
          <Switch
            isChecked={darkMode}
            onCheckedChange={setDarkMode}
            testId="dark-mode-switch"
          />
        </Flex>
      </Stack>
    </Drawer>
  );
}
```

## Toasts

### Basic Toast Usage

```tsx
import { useToast } from '@katalyst/ui';

function MyComponent() {
  const { toast } = useToast();

  const handleSuccess = () => {
    toast({
      title: "Success",
      description: "Your changes have been saved",
      variant: "success",
      testId: "success-toast"
    });
  };

  const handleError = () => {
    toast({
      title: "Error",
      description: "Something went wrong",
      variant: "error",
      testId: "error-toast"
    });
  };

  return (
    <>
      <Button onClick={handleSuccess} testId="success-btn">Success</Button>
      <Button onClick={handleError} testId="error-btn">Error</Button>
    </>
  );
}
```

### Toast with Actions

```tsx
import { useToast } from '@katalyst/ui';

function ActionToast() {
  const { toast } = useToast();

  const showToast = () => {
    const { id, dismiss } = toast({
      title: "File uploaded",
      description: "Your file has been uploaded successfully",
      variant: "success",
      testId: "upload-toast"
    });

    // Dismiss after 10 seconds
    setTimeout(() => dismiss(), 10000);
  };

  return <Button onClick={showToast} testId="upload-btn">Upload</Button>;
}
```

### Toast with Update

```tsx
import { useToast } from '@katalyst/ui';

function ProgressToast() {
  const { toast } = useToast();

  const startUpload = () => {
    const { id, update } = toast({
      title: "Uploading...",
      description: "0% complete",
      variant: "info",
      testId: "progress-toast"
    });

    // Simulate progress
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      update({
        description: `${progress}% complete`
      });

      if (progress >= 100) {
        clearInterval(interval);
        update({
          title: "Upload complete",
          description: "Your file has been uploaded",
          variant: "success"
        });
      }
    }, 500);
  };

  return <Button onClick={startUpload} testId="start-upload-btn">Start Upload</Button>;
}
```

## Select

### Simple String Select

```tsx
import { Select, Label } from '@katalyst/ui';

function CategorySelect() {
  const [category, setCategory] = useState('');

  return (
    <>
      <Label testId="category-label">Category</Label>
      <Select
        options={['Electronics', 'Clothing', 'Books', 'Home']}
        value={category}
        onChange={setCategory}
        placeholder="Select a category"
        testId="category-select"
      />
    </>
  );
}
```

### Multi-Select with Search

```tsx
import { Select, Label } from '@katalyst/ui';

interface Tag {
  id: string;
  label: string;
  color: string;
}

function TagSelector() {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const tags: Tag[] = [
    { id: '1', label: 'React', color: 'blue' },
    { id: '2', label: 'TypeScript', color: 'blue' },
    { id: '3', label: 'Node.js', color: 'green' },
  ];

  return (
    <>
      <Label testId="tags-label">Tags</Label>
      <Select<Tag>
        isMultiSelect
        options={tags}
        values={selectedTags}
        onChange={setSelectedTags}
        renderSelectedOption={(tag) => tag.label}
        keyFunction={(tag) => tag.id}
        canSearch
        searchFilterFunction={(tag, query) =>
          tag.label.toLowerCase().includes(query.toLowerCase())
        }
        placeholder="Select tags"
        testId="tags-select"
      />
    </>
  );
}
```

### Select with Custom Renderer

```tsx
import { Select, SelectOption, AwesomeIcon } from '@katalyst/ui';

function CustomSelect() {
  const [selected, setSelected] = useState(null);
  const options = [
    { id: '1', label: 'Option 1', icon: 'check' },
    { id: '2', label: 'Option 2', icon: 'star' },
  ];

  return (
    <Select
      options={options}
      value={selected}
      onChange={setSelected}
      renderSelectedOption={(opt) => opt.label}
      keyFunction={(opt) => opt.id}
      children={(option, isSelected, isDisabled) => (
        <SelectOption
          label={option.label}
          icon={<AwesomeIcon name={option.icon} />}
          isOptionSelected={isSelected}
          isDisabled={isDisabled}
        />
      )}
      testId="custom-select"
    />
  );
}
```

## Data Display

### Card Layout

```tsx
import { Card, CardHeader, CardBody, CardFooter, Text, Button } from '@katalyst/ui';

function UserCard({ user }) {
  return (
    <Card testId="user-card">
      <CardHeader testId="user-card-header">
        <Text size="lg" weight="bold">{user.name}</Text>
      </CardHeader>
      <CardBody testId="user-card-body">
        <Text>{user.email}</Text>
        <Text textColor="subtle">{user.role}</Text>
      </CardBody>
      <CardFooter testId="user-card-footer">
        <Button variant="outline" testId="edit-button">Edit</Button>
        <Button variant="primary" testId="view-button">View</Button>
      </CardFooter>
    </Card>
  );
}
```

### Loading States

```tsx
import { Skeleton, SkeletonControl, Text, Button } from '@katalyst/ui';

function DataDisplay({ data, isLoading }) {
  return (
    <SkeletonControl isLoading={isLoading}>
      <Skeleton isLoading={isLoading}>
        <Text size="lg">{data?.title}</Text>
      </Skeleton>
      <Skeleton isLoading={isLoading}>
        <Text>{data?.description}</Text>
      </Skeleton>
      <Skeleton isLoading={isLoading}>
        <Button testId="action-button">Action</Button>
      </Skeleton>
    </SkeletonControl>
  );
}
```

### Empty State

```tsx
import { EmptyState, Button, AwesomeIcon } from '@katalyst/ui';

function EmptyList({ onCreate }) {
  return (
    <EmptyState
      title="No items found"
      description="Get started by creating your first item"
      icon={<AwesomeIcon name="inbox" size="3x" />}
      primaryAction={
        <Button onClick={onCreate} testId="create-button">
          Create Item
        </Button>
      }
      secondaryAction={
        <Button variant="outline" testId="learn-button">
          Learn More
        </Button>
      }
    />
  );
}
```

## Navigation

### Tabs

```tsx
import { Tabs } from '@katalyst/ui';

function TabbedContent() {
  return (
    <Tabs
      items={[
        {
          id: 'overview',
          label: 'Overview',
          content: <div>Overview content</div>,
        },
        {
          id: 'details',
          label: 'Details',
          content: <div>Details content</div>,
        },
        {
          id: 'settings',
          label: 'Settings',
          content: <div>Settings content</div>,
        },
      ]}
      variant="line"
      testId="main-tabs"
    />
  );
}
```

### Breadcrumbs

```tsx
import { Breadcrumbs } from '@katalyst/ui';

function NavigationBreadcrumbs() {
  return (
    <Breadcrumbs
      items={[
        {
          id: 'home',
          label: 'Home',
          onClick: () => navigate('/'),
        },
        {
          id: 'products',
          label: 'Products',
          onClick: () => navigate('/products'),
        },
        {
          id: 'product-detail',
          label: 'Product Name',
          onClick: () => navigate('/products/123'),
        },
      ]}
    />
  );
}
```

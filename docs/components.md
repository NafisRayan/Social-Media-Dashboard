# 📦 Component Documentation

## Overview
This document provides detailed information about all components in the Social Media Dashboard application.

## Component Architecture

### 🏗️ **Core Components**

#### `DashboardHome.tsx`
**Purpose**: Main dashboard router component that renders different sections based on user selection.

**Props**:
- `section: string` - The currently selected dashboard section

**Features**:
- Route-based section rendering
- Lazy loading of sections
- Error boundary handling

#### `Sidebar.tsx`
**Purpose**: Navigation sidebar with menu items and responsive behavior.

**Props**:
- `selected: string` - Currently selected menu item
- `onSelect: (section: string) => void` - Callback for menu selection
- `isOpen: boolean` - Mobile sidebar open state
- `onClose: () => void` - Mobile sidebar close callback

**Features**:
- Responsive design (desktop/mobile)
- Smooth animations
- Active state indicators
- Keyboard navigation

#### `ThemeToggler.tsx`
**Purpose**: Dark/light mode theme switcher.

**Features**:
- System theme detection
- Smooth theme transitions
- Persistent theme storage
- Accessibility support

### 📊 **Dashboard Sections**

#### `OverviewSection.tsx`
**Purpose**: Comprehensive analytics overview with 8 main components.

**Key Features**:
- Real-time statistics with animations
- Interactive calendar heatmap
- Tab-based data views (locations/age)
- Toast notifications
- Modal dialogs
- Data export functionality
- Keyboard shortcuts
- Online/offline status monitoring

**State Management**:
```typescript
const [activeTab, setActiveTab] = useState<'locations' | 'age'>('locations');
const [showAddAccountModal, setShowAddAccountModal] = useState(false);
const [showHelpModal, setShowHelpModal] = useState(false);
const [isRefreshing, setIsRefreshing] = useState(false);
const [animatedStats, setAnimatedStats] = useState({
  followers: 0,
  reach: 0,
  engagement: 0
});
const [notifications, setNotifications] = useState([...]);
const [currentTime, setCurrentTime] = useState(new Date());
const [isOnline, setIsOnline] = useState(true);
```

**Keyboard Shortcuts**:
- `Ctrl+R` - Refresh data
- `Ctrl+Shift+A` - Add account
- `Ctrl+H` - Show help
- `1/2` - Switch tabs
- `Escape` - Close modals

#### `AnalyticsSection.tsx`
**Purpose**: Detailed analytics and performance metrics.

#### `PostsSection.tsx`
**Purpose**: Social media post management and analytics.

#### `EngagementSection.tsx`
**Purpose**: User engagement metrics and analysis.

#### `CampaignsSection.tsx`
**Purpose**: Marketing campaign management and tracking.

#### `CustomersSection.tsx`
**Purpose**: Customer analytics and demographics.

#### `UsersSection.tsx`
**Purpose**: User management and permissions.

#### `SettingsSection.tsx`
**Purpose**: Application settings and user preferences.

### 🎨 **UI Components**

#### `Button.tsx`
**Purpose**: Flexible button component with multiple variants.

**Variants**:
- `default` - Primary button style
- `destructive` - Danger/error button
- `outline` - Outlined button
- `secondary` - Secondary button style
- `ghost` - Transparent button
- `link` - Link-styled button

**Sizes**:
- `default` - Standard size
- `sm` - Small button
- `lg` - Large button
- `icon` - Icon-only button

**Usage**:
```tsx
<Button variant="outline" size="sm" onClick={handleClick}>
  Click me
</Button>
```

#### `Card.tsx`
**Purpose**: Container component for content sections.

**Features**:
- Responsive padding
- Shadow effects
- Hover animations
- Dark mode support

**Usage**:
```tsx
<Card className="p-6">
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
  <CardContent>
    Content goes here
  </CardContent>
</Card>
```

#### `Badge.tsx`
**Purpose**: Small status or category indicators.

**Variants**:
- `default` - Primary badge
- `secondary` - Secondary badge
- `destructive` - Error badge
- `outline` - Outlined badge

#### `Toast.tsx`
**Purpose**: Notification system for user feedback.

**Types**:
- `success` - Success notifications
- `error` - Error notifications
- `info` - Information notifications
- `warning` - Warning notifications

**Usage**:
```tsx
const { addToast, ToastContainer } = useToast();

addToast({
  type: 'success',
  description: 'Action completed successfully!'
});

return (
  <div>
    {/* Your content */}
    <ToastContainer />
  </div>
);
```

#### `Tooltip.tsx`
**Purpose**: Contextual help and information display.

**Props**:
- `content: string` - Tooltip text
- `children: ReactNode` - Trigger element
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Tooltip position

**Usage**:
```tsx
<Tooltip content="This is helpful information" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

#### `Dialog.tsx`
**Purpose**: Modal dialog component for forms and confirmations.

**Features**:
- Backdrop blur effect
- Focus trapping
- Escape key handling
- Accessibility support

#### `Progress.tsx`
**Purpose**: Progress bar component for loading states.

#### `Skeleton.tsx`
**Purpose**: Loading placeholder components.

#### `LoadingSpinner.tsx`
**Purpose**: Animated loading indicators.

### 🎣 **Custom Hooks**

#### `useResponsive.ts`
**Purpose**: Responsive breakpoint detection.

**Returns**:
```typescript
{
  isMobile: boolean;    // < 768px
  isTablet: boolean;    // 768px - 1024px
  isDesktop: boolean;   // > 1024px
  breakpoint: string;   // Current breakpoint name
}
```

**Usage**:
```tsx
const { isMobile, isTablet } = useResponsive();

return (
  <div className={isMobile ? 'mobile-layout' : 'desktop-layout'}>
    Content
  </div>
);
```

#### `useAccessibility.ts`
**Purpose**: Accessibility features and keyboard shortcuts.

**Functions**:
- `useKeyboardShortcuts(shortcuts: ShortcutConfig[])` - Register keyboard shortcuts
- `useFocusManagement()` - Focus management utilities

**Shortcut Configuration**:
```typescript
interface ShortcutConfig {
  key: string;
  ctrlKey?: boolean;
  shiftKey?: boolean;
  altKey?: boolean;
  callback: () => void;
  description: string;
}
```

**Usage**:
```tsx
useKeyboardShortcuts([
  {
    key: 'r',
    ctrlKey: true,
    callback: () => handleRefresh(),
    description: 'Refresh data'
  }
]);
```

### 🎯 **Component Best Practices**

#### **Naming Conventions**
- Use PascalCase for component names
- Use descriptive names that indicate purpose
- Suffix with component type (e.g., `LoginForm`, `UserCard`)

#### **File Structure**
```
components/
├── ui/           # Reusable UI components
├── sections/     # Page sections
├── forms/        # Form components
└── layout/       # Layout components
```

#### **Props Interface**
Always define TypeScript interfaces for props:

```typescript
interface ButtonProps {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'default' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}
```

#### **Error Handling**
Implement error boundaries and graceful fallbacks:

```tsx
const Component = () => {
  try {
    return <Content />;
  } catch (error) {
    return <ErrorFallback error={error} />;
  }
};
```

#### **Performance Optimization**
- Use `React.memo` for expensive components
- Implement `useCallback` for event handlers
- Use `useMemo` for expensive calculations
- Lazy load components with `React.lazy`

#### **Accessibility**
- Include ARIA labels and roles
- Ensure keyboard navigation
- Provide screen reader support
- Maintain proper color contrast
- Use semantic HTML elements

### 📱 **Responsive Design**

#### **Breakpoint System**
```css
xs: 0px      /* Extra small devices */
sm: 640px    /* Small devices */
md: 768px    /* Medium devices */
lg: 1024px   /* Large devices */
xl: 1280px   /* Extra large devices */
2xl: 1536px  /* 2X large devices */
```

#### **Mobile-First Approach**
Always design for mobile first, then enhance for larger screens:

```tsx
<div className="
  grid grid-cols-1 gap-3           // Mobile
  sm:grid-cols-2 sm:gap-4          // Small screens
  lg:grid-cols-3 lg:gap-6          // Large screens
">
```

#### **Touch-Friendly Design**
- Minimum touch target: 44x44px
- Adequate spacing between interactive elements
- Swipe gestures for mobile navigation
- Optimized hover states for touch devices

This documentation serves as a reference for developers working with the Social Media Dashboard components. For specific implementation details, refer to the individual component files in the codebase.

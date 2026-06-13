# THE BEST VIDEO - Mobile App Design

## Overview

THE BEST VIDEO is a user-controlled, AI-powered video creation application that puts creators in complete control. No automatic or random video creation—every aspect is driven by user input, choices, and uploaded content.

## Design Principles

- **User-First Control**: Every feature is opt-in; users decide what AI tools to enable
- **Mobile-First**: Portrait orientation (9:16), optimized for one-handed usage
- **iOS-Native Feel**: Follows Apple Human Interface Guidelines for a polished, first-party app experience
- **Clarity Over Complexity**: Progressive disclosure—advanced tools appear when needed
- **Responsive**: Works seamlessly on mobile, tablet, and desktop web

---

## Screen List

### 1. **Onboarding / Auth Screens**
- **Splash Screen**: App logo, brand name
- **Welcome Screen**: Brief introduction to THE BEST VIDEO
- **Sign Up / Login**: Email/password or OAuth (optional)
- **Profile Setup**: User preferences, theme selection

### 2. **Main Navigation (Tab Bar)**
- **Home**: Dashboard with recent projects and quick actions
- **Create**: Start a new video project
- **Projects**: Browse saved projects
- **Settings**: User preferences, account, export options

### 3. **Create Flow Screens**
- **Create Start**: Choose project type (new video, edit existing, import)
- **Project Setup**: Name, resolution, format, duration
- **Content Input**: Upload images, videos, audio; add text descriptions
- **AI Tools Selection**: Enable/disable AI features (text-to-video, auto-captions, etc.)
- **Style & Effects**: Choose colors, transitions, filters, music

### 4. **Video Editor Screens**
- **Timeline Editor**: Arrange clips, trim, cut, split, merge
- **Effects Panel**: Apply filters, transitions, speed control, cropping, resizing
- **Text & Captions**: Add text overlays, captions with custom fonts and animations
- **Audio Editor**: Background music, voice-over, sound effects, narration
- **Preview**: Real-time video preview with playback controls

### 5. **Export & Sharing**
- **Export Settings**: Choose format (MP4/MOV), resolution (HD/Full HD/4K)
- **Export Progress**: Show upload/processing status
- **Share Options**: Download, share to social media, save to cloud

### 6. **Projects & Management**
- **Projects List**: All saved projects with thumbnails
- **Project Detail**: View, edit, duplicate, delete projects
- **Admin Dashboard** (if user is admin): Manage users, view analytics

### 7. **Settings & Account**
- **Profile Settings**: Edit name, email, preferences
- **Theme**: Light/dark mode toggle
- **Privacy & Security**: Account security, data privacy
- **Help & Support**: FAQ, contact support

---

## Primary Content and Functionality

### Home Screen
- **Welcome Message**: Personalized greeting
- **Recent Projects**: Grid of 3-4 recent projects with thumbnails
- **Quick Actions**: 
  - "Create New Video" button (prominent)
  - "Browse Projects" link
  - "Templates" (if available)
- **Stats**: Videos created, total duration, storage used

### Create Flow
1. **Project Setup**
   - Project name (text input)
   - Resolution: HD (1280×720), Full HD (1920×1080), 4K (3840×2160)
   - Format: MP4, MOV
   - Duration: Auto or custom (5s–60m)
   - Aspect ratio: 16:9, 9:16, 1:1

2. **Content Input**
   - Upload images (JPG, PNG, WebP)
   - Upload videos (MP4, MOV, WebM)
   - Upload audio (MP3, WAV, M4A)
   - Add text descriptions (for AI processing)
   - Voice input (record or upload)

3. **AI Tools**
   - Text-to-Video: Generate video from text description
   - Auto-Captions: Automatically add captions
   - Narration: Generate voice-over from text
   - Background Removal: Remove backgrounds from images/videos
   - Scene Generation: AI-generated scenes (optional)

4. **Style & Effects**
   - Color Scheme: Primary, secondary, accent colors
   - Transitions: Fade, slide, zoom, wipe, etc.
   - Filters: Brightness, contrast, saturation, blur, etc.
   - Music: Upload or choose from library
   - Voice: Select voice type for narration

### Video Editor
- **Timeline**: Horizontal timeline with clips, audio tracks
- **Trim/Cut**: Drag handles to trim clips
- **Split**: Cut clips at playhead position
- **Merge**: Combine adjacent clips
- **Crop/Resize**: Adjust clip dimensions
- **Speed Control**: Adjust playback speed (0.5x–2x)
- **Filters**: Apply visual effects
- **Transitions**: Add transitions between clips
- **Text Overlay**: Add text with animation
- **Captions**: Add/edit captions
- **Audio Tracks**: Background music, voice-over, sound effects

### Export & Sharing
- **Export Settings**:
  - Format: MP4 or MOV
  - Resolution: HD, Full HD, or 4K
  - Quality: High, Medium, Low
  - Codec: H.264 or H.265
- **Export Progress**: Show percentage, estimated time
- **Download**: Save to device
- **Share**: Copy link, share to social media, email

---

## Key User Flows

### Flow 1: Create a Video from Scratch
1. User taps "Create New Video" on Home
2. Selects project type (new video)
3. Sets project name, resolution, format
4. Uploads images, videos, audio
5. Optionally enables AI tools (text-to-video, auto-captions)
6. Chooses style (colors, transitions, music)
7. Enters editor to arrange and refine
8. Previews video
9. Exports in desired format and resolution
10. Downloads or shares

### Flow 2: Edit an Existing Video
1. User navigates to Projects
2. Selects a saved project
3. Opens editor
4. Trims, cuts, adds effects, adjusts audio
5. Previews changes
6. Exports updated video

### Flow 3: Use AI to Generate a Video
1. User taps "Create New Video"
2. Enters text description (e.g., "A sunset over mountains with calm music")
3. Enables "Text-to-Video" AI tool
4. Selects style and music
5. AI generates initial video
6. User refines in editor if needed
7. Exports final video

### Flow 4: Add Captions and Narration
1. User uploads a video
2. Enables "Auto-Captions" AI tool
3. AI generates captions automatically
4. User enables "Narration" AI tool
5. Enters text for voice-over
6. AI generates narration
7. User adjusts timing and styling
8. Exports with captions and narration

---

## Color Choices

### Brand Palette (Light Mode)
- **Primary**: `#6366F1` (Indigo) — Main actions, highlights
- **Secondary**: `#EC4899` (Pink) — Accents, secondary actions
- **Accent**: `#F59E0B` (Amber) — Warnings, important notices
- **Background**: `#FFFFFF` (White) — Main background
- **Surface**: `#F3F4F6` (Light Gray) — Cards, panels
- **Foreground**: `#111827` (Dark Gray) — Text
- **Muted**: `#6B7280` (Gray) — Secondary text
- **Border**: `#E5E7EB` (Light Border) — Dividers
- **Success**: `#10B981` (Green) — Success states
- **Error**: `#EF4444` (Red) — Errors, destructive actions

### Brand Palette (Dark Mode)
- **Primary**: `#818CF8` (Light Indigo) — Main actions
- **Secondary**: `#F472B6` (Light Pink) — Accents
- **Accent**: `#FBBF24` (Light Amber) — Warnings
- **Background**: `#0F172A` (Very Dark Blue) — Main background
- **Surface**: `#1E293B` (Dark Slate) — Cards, panels
- **Foreground**: `#F1F5F9` (Off-White) — Text
- **Muted**: `#94A3B8` (Light Gray) — Secondary text
- **Border**: `#334155` (Dark Border) — Dividers
- **Success**: `#34D399` (Light Green) — Success states
- **Error**: `#F87171` (Light Red) — Errors

---

## Interaction Patterns

### Buttons
- **Primary**: Indigo background, white text, rounded corners
- **Secondary**: Gray background, dark text
- **Destructive**: Red background, white text
- **Disabled**: Gray, 50% opacity

### Cards
- Rounded corners (12px), subtle shadow, border (light gray in light mode)
- Tap feedback: Scale 0.97, opacity 0.9

### Lists
- Use FlatList for performance
- Swipe actions for delete/edit (if needed)
- Pull-to-refresh on main lists

### Modals
- Slide up from bottom (sheet style)
- Dimmed background
- Dismiss by tapping outside or swipe down

### Feedback
- Loading spinners for async operations
- Toast notifications for success/error
- Progress bars for uploads/exports

---

## Navigation Structure

```
Root Layout (_layout.tsx)
├── Onboarding (if not logged in)
│   ├── Splash
│   ├── Welcome
│   ├── Sign Up / Login
│   └── Profile Setup
└── Main App (if logged in)
    ├── Tabs (_layout.tsx)
    │   ├── Home (index.tsx)
    │   ├── Create (create/index.tsx)
    │   ├── Projects (projects/index.tsx)
    │   └── Settings (settings/index.tsx)
    ├── Create Flow
    │   ├── Project Setup (create/setup.tsx)
    │   ├── Content Input (create/content.tsx)
    │   ├── AI Tools (create/ai-tools.tsx)
    │   └── Style & Effects (create/style.tsx)
    ├── Editor
    │   ├── Timeline Editor (editor/timeline.tsx)
    │   ├── Effects Panel (editor/effects.tsx)
    │   ├── Text & Captions (editor/text.tsx)
    │   ├── Audio Editor (editor/audio.tsx)
    │   └── Preview (editor/preview.tsx)
    ├── Export
    │   ├── Export Settings (export/settings.tsx)
    │   └── Export Progress (export/progress.tsx)
    └── Account
        ├── Profile (account/profile.tsx)
        ├── Admin Dashboard (account/admin.tsx)
        └── Help (account/help.tsx)
```

---

## Technical Considerations

### Video Processing
- Use Expo Video for playback
- FFmpeg for video editing (via native module or API)
- Consider cloud processing for AI features

### File Storage
- Local AsyncStorage for project metadata
- S3/Cloud storage for video files
- User-owned content, no automatic sharing

### AI Integration
- Use server-side LLM for text-to-video, captions, narration
- Background removal via ML model
- All AI features are opt-in

### Performance
- Lazy load heavy components (editor, effects)
- Optimize video preview rendering
- Cache project thumbnails

### Security & Privacy
- Secure user authentication
- Encrypted file storage
- No data collection without consent
- Admin dashboard for account management

---

## Accessibility

- High contrast text (WCAG AA standard)
- Large touch targets (minimum 44×44 pt)
- Haptic feedback for interactions
- Voice input for accessibility
- Screen reader support

---

## Future Enhancements

- Templates and presets
- Collaboration (share projects with others)
- Social media integration
- Analytics dashboard
- Mobile app store distribution
- Desktop app (Electron)

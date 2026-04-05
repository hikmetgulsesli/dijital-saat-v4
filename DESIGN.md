# Design System Document: The Chronos Editorial

## 1. Overview & Creative North Star: "The Temporal Monolith"
This design system rejects the "widget" aesthetic of typical utility apps in favor of a high-end, editorial experience. The Creative North Star is **The Temporal Monolith**—an interface that feels less like a software tool and more like a physical installation of light and shadow.

By utilizing extreme typographic scales, intentional asymmetry, and "No-Line" architecture, we move away from a traditional grid. The UI should feel like a dark, infinite gallery where time is the only subject. Turkish language support is integrated through careful handling of descenders and unique character widths in the Inter typeface, ensuring the "Editorial" feel remains consistent regardless of character length (e.g., "Pazartesi" vs "Mon").

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in `slate-950`, but we avoid a "flat" black. Instead, we use a sophisticated hierarchy of slate tones to create depth.

### The Palette (Material Design Tokens)
*   **Background (`surface`):** `#0c1324` (Deep Slate)
*   **Primary Time (`on_surface`):** `#dce1fb` (Off-white with a hint of coolness)
*   **Secondary Text (`on_secondary_container`):** `#a7b6cc` (Slate-400 equivalent)
*   **Accent/Interactive (`tertiary`):** `#3cddc7` (Subtle Teal for action highlights)

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders to section off parts of the clock (e.g., separating the alarm list from the world clock). Boundaries must be defined solely through background color shifts.
*   Use `surface_container_low` for the main background.
*   Use `surface_container_highest` for active or "lifted" elements.
*   **The Glass & Gradient Rule:** For floating modals or "Set Alarm" sheets, use a `surface_variant` with a 60% opacity and a `24px` backdrop-blur. This creates a "frosted obsidian" effect that feels premium and bespoke.

## 3. Typography: The Scale of Importance
Typography is the primary visual anchor. We use **Inter** for its neutral, architectural quality, but we apply it with non-standard weights and sizes.

*   **Display-LG (The Hero Time):** `3.5rem` / Bold. This is the heartbeat of the app. It should have a slightly tight letter-spacing (`-0.02em`) to feel like a singular graphic element.
*   **Headline-MD (Turkish Day/Date):** `1.75rem` / Medium. Used for "12 HAZİRAN PAZARTESİ". In Turkish, avoid all-caps for words with "i" to prevent "İ" dots from clashing with tight line heights.
*   **Body-MD (Secondary Info):** `0.875rem` / Regular. Used for secondary time zones or alarm descriptions.
*   **Label-SM (Micro-data):** `0.6875rem` / Bold / All-caps. Used for AM/PM indicators or "SNOOZE" status.

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are prohibited. We achieve "lift" through the **Layering Principle**.

*   **Stacking Surfaces:** Place a `surface_container_highest` card on top of a `surface_dim` background to create a "soft lift." The difference in tonal value provides enough contrast for the eye to perceive depth without structural clutter.
*   **The Ghost Border:** If an element requires a boundary for accessibility (e.g., an input field), use the `outline_variant` token at **15% opacity**. This creates a "breath" of a line rather than a hard edge.
*   **Ambient Glow:** For the active state of a toggle or a ringing alarm, use a very large, diffused shadow (`blur: 40px`) using the `tertiary` (Teal) color at only **8% opacity**. This mimics the glow of a digital LED in a dark room.

## 5. Components

### Buttons & Interactivity
*   **Primary CTA:** Floating Action Button (FAB) style. Use `tertiary_container` with `on_tertiary_container` (Teal on Dark Teal). No borders. `xl` (1.5rem) roundedness.
*   **Ghost Buttons:** For secondary actions like "Cancel." Use `on_surface_variant` text with no background.

### Cards & Lists (Alarms / World Clock)
*   **The List Principle:** Forbid divider lines. Separate alarm entries using `24px` of vertical white space or a subtle shift from `surface_container_low` to `surface_container`.
*   **Typography Over Icons:** Where possible, use text labels (e.g., "ERTELE" for Snooze) in `label-md` instead of generic icons to maintain the editorial look.

### Interactive Elements
*   **Checkboxes/Radios:** Replace standard boxes with "Pill Toggles." A selected state uses `tertiary` (Teal) background; an unselected state uses `surface_container_highest`.
*   **Input Fields:** Time entry should not use "boxes." Use a single `display-sm` typographic element that changes color to `primary` when active.

### Contextual Components: The "Pulse" Indicator
*   For a digital clock, a subtle "pulse" animation on the `tertiary` color can indicate a running stopwatch or an active alarm, replacing the need for loud, jarring UI flashes.

## 6. Do's and Don'ts

### Do:
*   **Embrace Asymmetry:** Place the main time off-center or aligned to a specific typographic margin to create a "magazine" feel.
*   **Respect Turkish Diacritics:** Ensure line-height (leading) for `headline-md` accounts for characters like `Ş`, `Ğ`, and `İ`.
*   **Use Subtle Gradients:** Apply a linear gradient from `surface` to `surface_container_high` on long lists to "fade out" content at the bottom of the screen.

### Don't:
*   **Never use 100% white (#FFFFFF) for body text.** It causes "halo" eye strain in dark themes. Use `on_surface_variant` (`#c6c6cd`).
*   **Avoid "Bento Box" Layouts:** Do not trap every piece of info in a rounded box. Let the typography breathe against the `slate-950` background.
*   **No Hard Shadows:** If you can see the edge of the shadow, it’s too dark. Blur it further and reduce opacity.
import { extendTailwindMerge } from 'tailwind-merge'

/*
 * tailwind-merge needs to know the custom @theme tokens from index.css; otherwise it
 * cannot tell e.g. `text-h1` (font size) from `text-heading` (colour) and would drop one.
 * Keep these lists in sync with the @theme block.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: [
        'display-1',
        'display-2',
        'display-3',
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'lead',
        'body-xl',
        'body-l',
        'body-m',
        'body-s',
        'body-xs',
        'nav',
      ],
      color: [
        'primary',
        'primary-hover',
        'gradient-from',
        'gradient-via',
        'gradient-to',
        'success',
        'danger',
        'warning',
        'info',
        'surface',
        'surface-alt',
        'card',
        'subtle',
        'heading',
        'title',
        'body',
        'muted',
        'placeholder',
        'border',
        'input',
        'inverse',
        'accent-pink',
        'accent-sky',
        'accent-teal',
        'accent-night',
        'facebook',
        'instagram',
        'twitter',
        'linkedin',
        'youtube',
        'dribbble',
        'google',
      ],
      shadow: ['card', 'brand', 'secondary', 'md', 'nav'],
      container: ['site', 'wide'],
      spacing: ['nav'],
      blur: ['nav'],
    },
  },
  override: {
    // 'card' is also a colour token, so `shadow-card` would be read as a shadow *colour*.
    // Keep only colours that are not shadow names in the shadow-color group.
    classGroups: {
      'shadow-color': [{ shadow: ['primary', 'heading', 'gray-900', 'black', 'white'] }],
    },
  },
})

type ClassValue = string | false | null | undefined

/** Joins class names; later classes override earlier ones for the same CSS property. */
export function cn(...classes: ClassValue[]): string {
  return twMerge(classes.filter(Boolean).join(' '))
}

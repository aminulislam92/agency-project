import type { ComponentPropsWithRef, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router'
import { BiLoaderAlt } from 'react-icons/bi'
import { buttonStyles, type ButtonSize, type ButtonVariant } from './buttonStyles'

interface StyleProps {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

type ButtonProps = StyleProps & ComponentPropsWithRef<'button'> & { loading?: boolean }

export function Button({
  variant,
  size,
  fullWidth,
  leftIcon,
  rightIcon,
  loading = false,
  className,
  children,
  disabled,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={buttonStyles({ variant, size, fullWidth, className })}
      disabled={disabled ?? loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? <BiLoaderAlt className="size-5 animate-spin" aria-hidden /> : leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}

type ButtonLinkProps = StyleProps & LinkProps

/** Router link styled as a button. */
export function ButtonLink({
  variant,
  size,
  fullWidth,
  leftIcon,
  rightIcon,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonStyles({ variant, size, fullWidth, className })} {...props}>
      {leftIcon}
      {children}
      {rightIcon}
    </Link>
  )
}

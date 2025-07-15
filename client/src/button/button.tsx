import React, { ReactNode } from 'react'
import { Button, ButtonProps, makeStyles, mergeClasses, tokens } from '@fluentui/react-components'

export type BaseProps = {
  label: ReactNode
  className?: string
  appearance: 'primary' | 'secondary' | 'transparent' | 'subtle'
  shape: 'square' | 'circular' | 'rounded'
  size: 'small' | 'medium' | 'large'
  disabled?: boolean
  onClick?: () => void
} & ButtonProps

const useStyles = makeStyles({
  primary: {
    backgroundColor: tokens.colorBrandBackground,
    color: tokens.colorNeutralForegroundOnBrand,
    ':hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
    ':active:hover': {
      backgroundColor: tokens.colorBrandBackgroundHover,
    },
  },

  secondary: {
    backgroundColor: tokens.colorNeutralBackground1,
    color: tokens.colorBrandForeground1,
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground3,
    },
  },
  transparent: {
    backgroundColor: 'transparent',
    color: tokens.colorNeutralForeground3,
  },
  subtle: {
    backgroundColor: '#d13438',
    color: 'white',
    ':hover': {
      backgroundColor: tokens.colorNeutralBackground2,
    },
  },
  buttonSize: {
    fontSize: '1rem',
  },
})

export const FluentButton: React.FC<BaseProps> = ({
  label,
  className,
  appearance,
  shape,
  size,
  disabled = false,
  ...props
}) => {
  const styles = useStyles()

  const combinedClassName = mergeClasses(
    !disabled ? styles[appearance] : '',
    styles.buttonSize,
    className,
  )

  return (
    <Button
      appearance={appearance}
      className={combinedClassName}
      disabled={disabled}
      shape={shape}
      size={size}
      {...props}
    >
      {label}
    </Button>
  )
}

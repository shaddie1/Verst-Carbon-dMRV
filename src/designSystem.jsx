// Verst Carbon design system — UI primitives.
// Ported from the mockup; bodies unchanged, now exported as an ES module.
/* eslint-disable */
import React from 'react';

/**
 * Verst Carbon icon set — a curated subset of Lucide glyphs (24×24,
 * 2px stroke, round caps) inlined so components stay self-contained.
 * Render at any size with `size`; colour follows `currentColor`.
 */

const PATHS = {
  // navigation / app
  dashboard: '<rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/>',
  cpu: '<rect width="16" height="16" x="4" y="4" rx="2"/><rect width="6" height="6" x="9" y="9" rx="1"/><path d="M15 2v2"/><path d="M15 20v2"/><path d="M2 15h2"/><path d="M2 9h2"/><path d="M20 15h2"/><path d="M20 9h2"/><path d="M9 2v2"/><path d="M9 20v2"/>',
  home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',
  building: '<path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>',
  file: '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/>',
  bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
  user: '<circle cx="12" cy="8" r="5"/><path d="M20 21a8 8 0 0 0-16 0"/>',
  settings: '<path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2Z"/><circle cx="12" cy="12" r="3"/>',
  // actions
  search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
  filter: '<polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/>',
  download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
  plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  more: '<circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/>',
  chevronDown: '<path d="m6 9 6 6 6-6"/>',
  chevronRight: '<path d="m9 18 6-6-6-6"/>',
  selector: '<path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/>',
  logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/>',
  // status / telemetry
  wifi: '<path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.86a10 10 0 0 1 14 0"/><path d="M8.5 16.43a5 5 0 0 1 7 0"/>',
  battery: '<rect width="16" height="10" x="2" y="7" rx="2" ry="2"/><line x1="22" x2="22" y1="11" y2="13"/>',
  signal: '<path d="M2 20h.01"/><path d="M7 20v-4"/><path d="M12 20v-8"/><path d="M17 20V8"/><path d="M22 4v16"/>',
  mapPin: '<path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
  alert: '<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/><path d="M12 9v4"/><path d="M12 17h.01"/>',
  checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',
  circle: '<circle cx="12" cy="12" r="10"/>',
  inbox: '<polyline points="22 12 16 12 14 15 10 15 8 12 2 12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/>',
  trendingUp: '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
  trendingDown: '<polyline points="22 17 13.5 8.5 8.5 13.5 2 7"/><polyline points="16 17 22 17 22 11"/>',
  clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
  // fuels
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  zap: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  fuelTank: '<line x1="3" x2="15" y1="22" y2="22"/><line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  droplet: '<path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/>',
  package: '<path d="M11 21.73a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73z"/><path d="M12 22V12"/><polyline points="3.29 7 12 12 20.71 7"/><path d="m7.5 4.27 9 5.15"/>',
  leaf: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/>',
  sprout: '<path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 0 0-1.1 4c1.9-.1 3.3-.6 4.3-1.4 1-1 1.6-2.3 1.7-4.6-2.7.1-4 1-4.9 2z"/>',
};

function Icon({ name, size = 18, strokeWidth = 2, className = '', style = {}, ...rest }) {
  const inner = PATHS[name] || PATHS.circle;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      style={{ display: 'block', flex: 'none', ...style }}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: inner }}
      {...rest}
    />
  );
}



/**
 * Primary action button. Forest green is the only filled colour;
 * secondary/ghost stay quiet so green reads as "the action" on a
 * dense white surface.
 */

const BTN_SIZES = {
  sm: { height: 30, padding: '0 12px', font: 'var(--fs-sm)', gap: 6, icon: 15 },
  md: { height: 38, padding: '0 16px', font: 'var(--fs-body)', gap: 7, icon: 17 },
  lg: { height: 44, padding: '0 20px', font: 'var(--fs-h3)', gap: 8, icon: 19 },
};

function variantStyle(variant) {
  switch (variant) {
    case 'secondary':
      return { background: 'var(--white)', color: 'var(--ink-900)', border: '1px solid var(--border-default)' };
    case 'ghost':
      return { background: 'transparent', color: 'var(--text-body)', border: '1px solid transparent' };
    case 'danger':
      return { background: 'var(--danger-500)', color: 'var(--white)', border: '1px solid transparent' };
    case 'primary':
    default:
      return { background: 'var(--brand-primary)', color: 'var(--text-on-brand)', border: '1px solid transparent' };
  }
}

function Button({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  disabled = false,
  fullWidth = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const s = BTN_SIZES[size] || BTN_SIZES.md;
  const v = variantStyle(variant);
  const [hover, setHover] = React.useState(false);

  const hoverBg = {
    primary: 'var(--brand-primary-hover)',
    danger: 'var(--danger-600)',
    secondary: 'var(--surface-hover)',
    ghost: 'var(--surface-hover)',
  }[variant];

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: s.gap,
        height: s.height,
        padding: s.padding,
        width: fullWidth ? '100%' : 'auto',
        fontFamily: 'var(--font-sans)',
        fontSize: s.font,
        fontWeight: 'var(--weight-semibold)',
        lineHeight: 1,
        letterSpacing: '0.01em',
        borderRadius: 'var(--radius-sm)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-fast) var(--ease-standard), box-shadow var(--dur-fast)',
        whiteSpace: 'nowrap',
        ...v,
        ...(hover && !disabled ? { background: hoverBg } : null),
        ...style,
      }}
      {...rest}
    >
      {iconLeft && <Icon name={iconLeft} size={s.icon} />}
      {children}
      {iconRight && <Icon name={iconRight} size={s.icon} />}
    </button>
  );
}



/**
 * Square icon-only button for toolbars and table rows. Defaults to a
 * quiet ghost treatment; pass variant="outline" for a bordered chip.
 */

const IB_SIZES = { sm: 28, md: 34, lg: 40 };
const IB_ICON = { sm: 16, md: 18, lg: 20 };

function IconButton({
  icon,
  size = 'md',
  variant = 'ghost',
  active = false,
  disabled = false,
  label,
  onClick,
  style = {},
  ...rest
}) {
  const dim = IB_SIZES[size] || IB_SIZES.md;
  const [hover, setHover] = React.useState(false);

  const base = variant === 'outline'
    ? { background: 'var(--white)', border: '1px solid var(--border-default)' }
    : { background: active ? 'var(--surface-selected)' : 'transparent', border: '1px solid transparent' };

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: 'var(--radius-sm)',
        color: active ? 'var(--brand-primary)' : 'var(--text-secondary)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transition: 'background var(--dur-fast), color var(--dur-fast)',
        ...base,
        ...(hover && !disabled ? { background: 'var(--surface-hover)', color: 'var(--ink-900)' } : null),
        ...style,
      }}
      {...rest}
    >
      <Icon name={icon} size={IB_ICON[size] || IB_ICON.md} />
    </button>
  );
}



/**
 * Text input with optional label, leading icon, suffix and error.
 * Designed for dense forms (device registration, search bars).
 */

function Input({
  label,
  hint,
  error,
  iconLeft,
  suffix,
  size = 'md',
  required = false,
  id,
  style = {},
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const height = size === 'sm' ? 32 : 38;
  const inputId = id || (label ? 'in-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const borderColor = error ? 'var(--danger-500)' : focus ? 'var(--border-focus)' : 'var(--border-default)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...containerStyle }}>
      {label && (
        <label htmlFor={inputId} style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)' }}>
          {label}
          {required && <span style={{ color: 'var(--danger-500)', marginLeft: 3 }}>*</span>}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          height,
          padding: '0 10px',
          background: 'var(--white)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-sm)',
          boxShadow: focus ? 'var(--shadow-focus)' : 'none',
          transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
        }}
      >
        {iconLeft && <Icon name={iconLeft} size={16} style={{ color: 'var(--text-muted)' }} />}
        <input
          id={inputId}
          onFocus={(e) => { setFocus(true); rest.onFocus && rest.onFocus(e); }}
          onBlur={(e) => { setFocus(false); rest.onBlur && rest.onBlur(e); }}
          style={{
            flex: 1,
            minWidth: 0,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--fs-body)',
            color: 'var(--text-body)',
            ...style,
          }}
          {...rest}
        />
        {suffix && <span style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-muted)', fontFamily: 'var(--font-data)' }}>{suffix}</span>}
      </div>
      {(error || hint) && (
        <span style={{ fontSize: 'var(--fs-xs)', color: error ? 'var(--danger-600)' : 'var(--text-secondary)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}



/**
 * Styled native select — same shell as Input, with a chevron affordance.
 * Use for fuel filters, device-model pickers, proponent assignment.
 */

function Select({
  label,
  hint,
  error,
  options = [],
  placeholder,
  size = 'md',
  required = false,
  id,
  value,
  onChange,
  style = {},
  containerStyle = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const height = size === 'sm' ? 32 : 38;
  const selectId = id || (label ? 'sel-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const borderColor = error ? 'var(--danger-500)' : focus ? 'var(--border-focus)' : 'var(--border-default)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, ...containerStyle }}>
      {label && (
        <label htmlFor={selectId} style={{ fontSize: 'var(--fs-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)' }}>
          {label}
          {required && <span style={{ color: 'var(--danger-500)', marginLeft: 3 }}>*</span>}
        </label>
      )}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height,
          background: 'var(--white)',
          border: `1px solid ${borderColor}`,
          borderRadius: 'var(--radius-sm)',
          boxShadow: focus ? 'var(--shadow-focus)' : 'none',
          transition: 'border-color var(--dur-fast), box-shadow var(--dur-fast)',
        }}
      >
        <select
          id={selectId}
          value={value}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            flex: 1,
            height: '100%',
            padding: '0 34px 0 10px',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-sans)',
            fontSize: 'var(--fs-body)',
            color: value === '' || value == null ? 'var(--text-muted)' : 'var(--text-body)',
            cursor: 'pointer',
            ...style,
          }}
          {...rest}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => {
            const opt = typeof o === 'string' ? { value: o, label: o } : o;
            return <option key={opt.value} value={opt.value}>{opt.label}</option>;
          })}
        </select>
        <Icon name="chevronDown" size={16} style={{ position: 'absolute', right: 10, color: 'var(--text-muted)', pointerEvents: 'none' }} />
      </div>
      {(error || hint) && (
        <span style={{ fontSize: 'var(--fs-xs)', color: error ? 'var(--danger-600)' : 'var(--text-secondary)' }}>
          {error || hint}
        </span>
      )}
    </div>
  );
}



/**
 * Checkbox with label — used in table row selection and filter lists.
 * Controlled via `checked` / `onChange`.
 */

function Checkbox({ checked = false, indeterminate = false, label, disabled = false, onChange, id, style = {} }) {
  const boxId = id || (label ? 'cb-' + String(label).replace(/\s+/g, '-').toLowerCase() : undefined);
  const on = checked || indeterminate;
  return (
    <label
      htmlFor={boxId}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontSize: 'var(--fs-body)',
        color: 'var(--text-body)',
        userSelect: 'none',
        ...style,
      }}
    >
      <input
        id={boxId}
        type="checkbox"
        checked={checked}
        disabled={disabled}
        onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 18,
          height: 18,
          flex: 'none',
          borderRadius: 'var(--radius-xs)',
          border: `1.5px solid ${on ? 'var(--brand-primary)' : 'var(--border-strong)'}`,
          background: on ? 'var(--brand-primary)' : 'var(--white)',
          color: 'var(--white)',
          transition: 'background var(--dur-fast), border-color var(--dur-fast)',
        }}
      >
        {indeterminate ? (
          <span style={{ width: 9, height: 2, background: 'var(--white)', borderRadius: 1 }} />
        ) : checked ? (
          <Icon name="check" size={13} strokeWidth={3} />
        ) : null}
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}



/**
 * Switch toggle for binary settings (e.g. "alerts enabled",
 * "device active"). Controlled via `checked` / `onChange`.
 */

function Switch({ checked = false, onChange, label, disabled = false, id, style = {} }) {
  const swId = id || (label ? 'sw-' + String(label).replace(/\s+/g, '-').toLowerCase() : undefined);
  return (
    <label
      htmlFor={swId}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontSize: 'var(--fs-body)',
        color: 'var(--text-body)',
        userSelect: 'none',
        ...style,
      }}
    >
      <input id={swId} type="checkbox" checked={checked} disabled={disabled} onChange={onChange}
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }} />
      <span
        style={{
          position: 'relative',
          width: 36,
          height: 20,
          flex: 'none',
          borderRadius: 'var(--radius-pill)',
          background: checked ? 'var(--brand-primary)' : 'var(--grey-300)',
          transition: 'background var(--dur-base) var(--ease-standard)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2,
            left: checked ? 18 : 2,
            width: 16,
            height: 16,
            borderRadius: 'var(--radius-pill)',
            background: 'var(--white)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'left var(--dur-base) var(--ease-out)',
          }}
        />
      </span>
      {label && <span>{label}</span>}
    </label>
  );
}



/**
 * Compact status/label pill. Soft (tinted) by default; `solid` for
 * emphasis, `outline` for the quietest treatment. Optional leading
 * dot or icon.
 */

const BADGE_TONES = {
  neutral: { soft: ['var(--grey-100)', 'var(--ink-700)'], solid: ['var(--ink-700)', 'var(--white)'], dot: 'var(--grey-400)' },
  brand: { soft: ['var(--green-tint)', 'var(--green-700)'], solid: ['var(--brand-primary)', 'var(--white)'], dot: 'var(--brand-primary)' },
  success: { soft: ['var(--success-050)', 'var(--success-600)'], solid: ['var(--success-500)', 'var(--white)'], dot: 'var(--success-500)' },
  warning: { soft: ['var(--warning-050)', 'var(--warning-600)'], solid: ['var(--warning-500)', 'var(--white)'], dot: 'var(--warning-500)' },
  danger: { soft: ['var(--danger-050)', 'var(--danger-600)'], solid: ['var(--danger-500)', 'var(--white)'], dot: 'var(--danger-500)' },
  info: { soft: ['var(--info-050)', 'var(--info-600)'], solid: ['var(--info-500)', 'var(--white)'], dot: 'var(--info-500)' },
};

function Badge({ children, tone = 'neutral', variant = 'soft', dot = false, icon, size = 'md', style = {} }) {
  const t = BADGE_TONES[tone] || BADGE_TONES.neutral;
  const small = size === 'sm';
  let bg, fg, border = '1px solid transparent';
  if (variant === 'solid') { [bg, fg] = t.solid; }
  else if (variant === 'outline') { bg = 'transparent'; fg = t.soft[1]; border = `1px solid ${t.dot}`; }
  else { [bg, fg] = t.soft; }

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: small ? 4 : 5,
        height: small ? 18 : 22,
        padding: small ? '0 7px' : '0 9px',
        background: bg,
        color: fg,
        border,
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: small ? 'var(--fs-2xs)' : 'var(--fs-xs)',
        fontWeight: 'var(--weight-semibold)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: 999, background: variant === 'solid' ? 'currentColor' : t.dot, flex: 'none' }} />}
      {icon && <Icon name={icon} size={small ? 11 : 13} />}
      {children}
    </span>
  );
}



/**
 * Device connectivity dot. One consistent colour language across the
 * platform: green online, grey offline, red fault. Optional label and
 * a soft pulse on online devices.
 */

const STATUS = {
  online: { color: 'var(--status-online)', label: 'Online' },
  offline: { color: 'var(--status-offline)', label: 'Offline' },
  fault: { color: 'var(--status-fault)', label: 'Fault' },
  pending: { color: 'var(--warning-500)', label: 'Pending' },
};

function StatusDot({ status = 'offline', label, showLabel = false, pulse = false, size = 9, style = {} }) {
  const s = STATUS[status] || STATUS.offline;
  const text = label != null ? label : s.label;
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 7, ...style }}>
      <span style={{ position: 'relative', display: 'inline-flex', width: size, height: size, flex: 'none' }}>
        {pulse && status === 'online' && (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 999,
              background: s.color,
              opacity: 0.35,
              animation: 'vc-pulse 1.8s var(--ease-out) infinite',
            }}
          />
        )}
        <span style={{ position: 'relative', width: size, height: size, borderRadius: 999, background: s.color }} />
        <style>{'@keyframes vc-pulse{0%{transform:scale(1);opacity:.35}70%{transform:scale(2.4);opacity:0}100%{opacity:0}}'}</style>
      </span>
      {showLabel && (
        <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-body)' }}>{text}</span>
      )}
    </span>
  );
}



/**
 * Fuel-type badge. The single source of truth for fuel colour + icon +
 * label across every screen. Pass a fuel key; the badge stays visually
 * identical wherever that fuel appears.
 *
 * Fuels: biomass · electric · lpg · ethanol · pellets · biogas
 */

const FUELS = {
  biomass: { label: 'Improved biomass', short: 'Biomass', icon: 'flame', color: 'var(--fuel-biomass)', strong: 'var(--fuel-biomass-strong)', soft: 'var(--fuel-biomass-soft)' },
  electric: { label: 'Electric', short: 'Electric', icon: 'zap', color: 'var(--fuel-electric)', strong: 'var(--fuel-electric-strong)', soft: 'var(--fuel-electric-soft)' },
  lpg: { label: 'LPG', short: 'LPG', icon: 'fuelTank', color: 'var(--fuel-lpg)', strong: 'var(--fuel-lpg-strong)', soft: 'var(--fuel-lpg-soft)' },
  ethanol: { label: 'Bio-ethanol', short: 'Ethanol', icon: 'droplet', color: 'var(--fuel-ethanol)', strong: 'var(--fuel-ethanol-strong)', soft: 'var(--fuel-ethanol-soft)' },
  pellets: { label: 'Briquettes / pellets', short: 'Pellets', icon: 'package', color: 'var(--fuel-pellets)', strong: 'var(--fuel-pellets-strong)', soft: 'var(--fuel-pellets-soft)' },
  biogas: { label: 'Biogas', short: 'Biogas', icon: 'leaf', color: 'var(--fuel-biogas)', strong: 'var(--fuel-biogas-strong)', soft: 'var(--fuel-biogas-soft)' },
  biochar: { label: 'Biochar', short: 'Biochar', icon: 'sprout', color: 'var(--fuel-biochar)', strong: 'var(--fuel-biochar-strong)', soft: 'var(--fuel-biochar-soft)' },
};

function FuelBadge({ fuel, short = false, showIcon = true, size = 'md', style = {} }) {
  const f = FUELS[fuel];
  if (!f) return null;
  const small = size === 'sm';
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: small ? 4 : 6,
        height: small ? 18 : 22,
        padding: small ? '0 8px' : '0 10px',
        background: f.soft,
        color: f.strong,
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        fontSize: small ? 'var(--fs-2xs)' : 'var(--fs-xs)',
        fontWeight: 'var(--weight-semibold)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...style,
      }}
    >
      {showIcon && <Icon name={f.icon} size={small ? 11 : 13} style={{ color: f.color }} />}
      {short ? f.short : f.label}
    </span>
  );
}



/**
 * KPI card for dashboard headers — eyebrow label, large tabular value,
 * optional unit and trend delta. Keep one metric per card.
 */

function KpiCard({ label, value, unit, delta, deltaDirection, icon, hint, style = {} }) {
  const up = deltaDirection === 'up';
  const down = deltaDirection === 'down';
  const deltaColor = up ? 'var(--success-600)' : down ? 'var(--danger-600)' : 'var(--text-secondary)';
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        padding: 'var(--space-5)',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-xs)',
        minWidth: 0,
        ...style,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ fontSize: 'var(--fs-2xs)', fontWeight: 'var(--weight-semibold)', letterSpacing: 'var(--tracking-caps)', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </span>
        {icon && (
          <span style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 26, height: 26, borderRadius: 'var(--radius-sm)', background: 'var(--green-050)', color: 'var(--brand-primary)' }}>
            <Icon name={icon} size={15} />
          </span>
        )}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: 'var(--font-data)', fontVariantNumeric: 'tabular-nums', fontSize: 'var(--fs-display)', fontWeight: 'var(--weight-extrabold)', letterSpacing: '-0.01em', color: 'var(--ink-900)', lineHeight: 1 }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-secondary)' }}>{unit}</span>}
      </div>
      {(delta || hint) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {delta && (
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 3, fontSize: 'var(--fs-xs)', fontWeight: 'var(--weight-semibold)', color: deltaColor }}>
              {(up || down) && <Icon name={up ? 'trendingUp' : 'trendingDown'} size={13} />}
              {delta}
            </span>
          )}
          {hint && <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{hint}</span>}
        </div>
      )}
    </div>
  );
}



/**
 * Initials avatar for user menus and proponent rows. Deterministic
 * green-family tint derived from the name; no images required.
 */

const TINTS = [
  ['var(--green-100)', 'var(--green-700)'],
  ['var(--fuel-ethanol-soft)', 'var(--fuel-ethanol-strong)'],
  ['var(--fuel-biogas-soft)', 'var(--fuel-biogas-strong)'],
  ['var(--fuel-pellets-soft)', 'var(--fuel-pellets-strong)'],
  ['var(--fuel-electric-soft)', 'var(--fuel-electric-strong)'],
  ['var(--fuel-lpg-soft)', 'var(--fuel-lpg-strong)'],
];

function initials(name = '') {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function Avatar({ name = '', size = 32, style = {} }) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const [bg, fg] = TINTS[h % TINTS.length];
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flex: 'none',
        borderRadius: 'var(--radius-pill)',
        background: bg,
        color: fg,
        fontFamily: 'var(--font-sans)',
        fontSize: Math.round(size * 0.4),
        fontWeight: 'var(--weight-bold)',
        letterSpacing: '0.01em',
        userSelect: 'none',
        ...style,
      }}
    >
      {initials(name)}
    </span>
  );
}



/**
 * Proponent logo holder — a rounded brand tile that shows an uploaded
 * logo when `src` is provided, and falls back to a deterministic
 * monogram on a brand-tinted background. This is the consistent
 * "logo slot" for every proponent across the platform (nav switcher,
 * tables, dashboard headers, application review).
 *
 * Distinct from Avatar (which is a circular tile for people).
 */

const TILES = [
  ['#e7f1dd', '#005825'], // moss
  ['#e2f4f3', '#0a7975'], // teal
  ['#f1f4e2', '#647c12'], // olive
  ['#fbf0e0', '#b06814'], // amber
  ['#e8eefe', '#1d52c4'], // blue
  ['#efeafb', '#5f43b0'], // violet
  ['#f3ebe2', '#7c5230'], // brown
];

function monogram(name = '') {
  const parts = name.replace(/\b(ltd|limited|inc|llc|plc|energy|clean|cooking|co)\b/gi, '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return (name[0] || '?').toUpperCase();
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function ProponentLogo({ name = '', src, size = 36, radius, color, style = {} }) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  const [bg, fg] = TILES[h % TILES.length];
  const r = radius != null ? radius : Math.max(6, Math.round(size * 0.24));

  if (src) {
    return (
      <span style={{ display: 'inline-block', width: size, height: size, flex: 'none', borderRadius: r, overflow: 'hidden', border: '1px solid var(--border-subtle)', background: 'var(--white)', ...style }}>
        <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </span>
    );
  }
  return (
    <span
      aria-label={name}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flex: 'none',
        borderRadius: r,
        background: color || bg,
        color: color ? '#fff' : fg,
        fontFamily: 'var(--font-sans)',
        fontSize: Math.round(size * 0.4),
        fontWeight: 'var(--weight-extrabold)',
        letterSpacing: '-0.01em',
        userSelect: 'none',
        ...style,
      }}
    >
      {monogram(name)}
    </span>
  );
}



/**
 * Signal-strength bars (0–4) for the devices table. Colour follows
 * strength: green strong, moss medium, amber weak, grey none.
 */

function SignalBars({ level = 0, showLabel = false, style = {} }) {
  const lv = Math.max(0, Math.min(4, level));
  const color = lv >= 3 ? 'var(--success-500)' : lv === 2 ? 'var(--green-400)' : lv === 1 ? 'var(--warning-500)' : 'var(--grey-400)';
  const heights = [6, 9, 12, 15];
  const labels = ['No signal', 'Weak', 'Fair', 'Good', 'Strong'];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 5, ...style }}>
      <span style={{ display: 'inline-flex', alignItems: 'flex-end', gap: 2, height: 15 }}>
        {heights.map((h, i) => (
          <span
            key={i}
            style={{
              width: 3,
              height: h,
              borderRadius: 1,
              background: i < lv ? color : 'var(--grey-200)',
            }}
          />
        ))}
      </span>
      {showLabel && <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-secondary)' }}>{labels[lv]}</span>}
    </span>
  );
}



/**
 * Thin level meter for battery / TEG charge. Colour thresholds:
 * ≥50% green, 20–49% amber, <20% red. Show the percent inline.
 */

function LevelMeter({ value = 0, label, width = 96, showValue = true, style = {} }) {
  const v = Math.max(0, Math.min(100, value));
  const color = v >= 50 ? 'var(--success-500)' : v >= 20 ? 'var(--warning-500)' : 'var(--danger-500)';
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, ...style }}>
      <span style={{ position: 'relative', width, height: 6, borderRadius: 999, background: 'var(--grey-200)', overflow: 'hidden', flex: 'none' }}>
        <span style={{ position: 'absolute', inset: 0, width: v + '%', background: color, borderRadius: 999 }} />
      </span>
      {showValue && (
        <span style={{ fontFamily: 'var(--font-data)', fontVariantNumeric: 'tabular-nums', fontSize: 'var(--fs-xs)', fontWeight: 'var(--weight-semibold)', color: 'var(--text-body)', minWidth: 30 }}>
          {Math.round(v)}%
        </span>
      )}
      {label && <span style={{ fontSize: 'var(--fs-xs)', color: 'var(--text-muted)' }}>{label}</span>}
    </span>
  );
}



/**
 * Underline tabs for device-detail and report sections. Active tab
 * gets a forest-green underline; optional count chip per tab.
 */

function Tabs({ tabs = [], value, onChange, style = {} }) {
  return (
    <div
      role="tablist"
      style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--border-subtle)', ...style }}
    >
      {tabs.map((t) => {
        const tab = typeof t === 'string' ? { value: t, label: t } : t;
        const active = tab.value === value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={active}
            onClick={() => onChange && onChange(tab.value)}
            style={{
              position: 'relative',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '10px 12px',
              marginBottom: -1,
              background: 'transparent',
              border: 'none',
              borderBottom: `2px solid ${active ? 'var(--brand-primary)' : 'transparent'}`,
              cursor: 'pointer',
              fontFamily: 'var(--font-sans)',
              fontSize: 'var(--fs-body)',
              fontWeight: active ? 'var(--weight-semibold)' : 'var(--weight-medium)',
              color: active ? 'var(--ink-900)' : 'var(--text-secondary)',
              transition: 'color var(--dur-fast)',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.icon && <Icon name={tab.icon} size={16} />}
            {tab.label}
            {tab.count != null && (
              <span
                style={{
                  fontFamily: 'var(--font-data)',
                  fontSize: 'var(--fs-2xs)',
                  fontWeight: 'var(--weight-semibold)',
                  padding: '1px 6px',
                  borderRadius: 'var(--radius-pill)',
                  background: active ? 'var(--green-tint)' : 'var(--grey-100)',
                  color: active ? 'var(--green-700)' : 'var(--text-secondary)',
                }}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}



/**
 * Breadcrumb trail for scoped views (e.g. proponent → device). Last
 * item is the current page (non-interactive, ink-900).
 */

function Breadcrumb({ items = [], style = {} }) {
  return (
    <nav aria-label="Breadcrumb" style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap', ...style }}>
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <React.Fragment key={i}>
            {it.href && !last ? (
              <a href={it.href} style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--weight-medium)', color: 'var(--text-secondary)', textDecoration: 'none' }}>{it.label}</a>
            ) : (
              <span style={{ fontSize: 'var(--fs-sm)', fontWeight: last ? 'var(--weight-semibold)' : 'var(--weight-medium)', color: last ? 'var(--ink-900)' : 'var(--text-secondary)' }}>{it.label}</span>
            )}
            {!last && <Icon name="chevronRight" size={14} style={{ color: 'var(--grey-400)' }} />}
          </React.Fragment>
        );
      })}
    </nav>
  );
}



/**
 * Toast notification — used for the offline-device alert and
 * confirmations. Left status rail + icon, title, optional message,
 * dismiss. Render inside a fixed bottom-right stack in the app shell.
 */

const TOAST_TONES = {
  info: { color: 'var(--info-500)', icon: 'activity' },
  success: { color: 'var(--success-500)', icon: 'checkCircle' },
  warning: { color: 'var(--warning-500)', icon: 'alert' },
  danger: { color: 'var(--danger-500)', icon: 'alert' },
};

function Toast({ tone = 'info', title, message, icon, onDismiss, action, style = {} }) {
  const t = TOAST_TONES[tone] || TOAST_TONES.info;
  return (
    <div
      role="status"
      style={{
        position: 'relative',
        display: 'flex',
        gap: 12,
        width: 380,
        maxWidth: '100%',
        padding: '14px 14px 14px 16px',
        background: 'var(--white)',
        border: '1px solid var(--border-subtle)',
        borderLeft: `3px solid ${t.color}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-lg)',
        ...style,
      }}
    >
      <span style={{ color: t.color, flex: 'none', marginTop: 1 }}>
        <Icon name={icon || t.icon} size={18} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 'var(--fs-body)', fontWeight: 'var(--weight-semibold)', color: 'var(--ink-900)' }}>{title}</div>}
        {message && <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', marginTop: 2 }}>{message}</div>}
        {action && (
          <button
            onClick={action.onClick}
            style={{ marginTop: 8, padding: 0, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', fontWeight: 'var(--weight-semibold)', color: 'var(--brand-primary)' }}
          >
            {action.label}
          </button>
        )}
      </div>
      {onDismiss && (
        <button
          aria-label="Dismiss"
          onClick={onDismiss}
          style={{ flex: 'none', display: 'inline-flex', padding: 2, background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', height: 'fit-content' }}
        >
          <Icon name="x" size={16} />
        </button>
      )}
    </div>
  );
}



/**
 * Inline alert banner for in-page notices (e.g. "raw telemetry is
 * immutable", anomaly summaries). Tinted soft background per tone.
 */

const ALERT_TONES = {
  info: { bg: 'var(--info-050)', border: 'var(--info-500)', fg: 'var(--info-600)', icon: 'activity' },
  success: { bg: 'var(--success-050)', border: 'var(--success-500)', fg: 'var(--success-600)', icon: 'checkCircle' },
  warning: { bg: 'var(--warning-050)', border: 'var(--warning-500)', fg: 'var(--warning-600)', icon: 'alert' },
  danger: { bg: 'var(--danger-050)', border: 'var(--danger-500)', fg: 'var(--danger-600)', icon: 'alert' },
  neutral: { bg: 'var(--grey-050)', border: 'var(--grey-300)', fg: 'var(--ink-700)', icon: 'file' },
};

function Alert({ tone = 'info', title, children, icon, style = {} }) {
  const t = ALERT_TONES[tone] || ALERT_TONES.info;
  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        padding: '12px 14px',
        background: t.bg,
        border: `1px solid ${t.border}33`,
        borderRadius: 'var(--radius-md)',
        ...style,
      }}
    >
      <span style={{ color: t.border, flex: 'none', marginTop: 1 }}>
        <Icon name={icon || t.icon} size={17} />
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div style={{ fontSize: 'var(--fs-sm)', fontWeight: 'var(--weight-semibold)', color: t.fg }}>{title}</div>}
        {children && <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-body)', marginTop: title ? 2 : 0 }}>{children}</div>}
      </div>
    </div>
  );
}



/**
 * Empty state for filtered tables, new proponents with no devices,
 * and zero-result searches. Quiet circular icon, title, supporting
 * line, optional primary action (passed as children).
 */

function EmptyState({ icon = 'inbox', title, description, children, compact = false, style = {} }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: 6,
        padding: compact ? '32px 24px' : '56px 24px',
        ...style,
      }}
    >
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 48,
          height: 48,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--green-050)',
          color: 'var(--brand-secondary)',
          marginBottom: 6,
        }}
      >
        <Icon name={icon} size={22} />
      </span>
      {title && <div style={{ fontSize: 'var(--fs-h3)', fontWeight: 'var(--weight-bold)', color: 'var(--ink-900)' }}>{title}</div>}
      {description && <div style={{ fontSize: 'var(--fs-sm)', color: 'var(--text-secondary)', maxWidth: 360 }}>{description}</div>}
      {children && <div style={{ marginTop: 10, display: 'flex', gap: 8 }}>{children}</div>}
    </div>
  );
}



/**
 * Lightweight time-series line/area chart for telemetry (temperature,
 * mass, kWh). Pure SVG, no dependencies. Pass one or more series; the
 * first series fills with a soft area by default.
 *
 * series: [{ name, color, data: [{ x: string, y: number }] }]
 */

function TimeSeriesChart({
  series = [],
  height = 220,
  yUnit,
  area = true,
  yTicks = 4,
  style = {},
}) {
  const W = 720;
  const H = height;
  const padL = 44, padR = 16, padT = 12, padB = 26;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const all = series.flatMap((s) => s.data.map((d) => d.y));
  const rawMax = all.length ? Math.max(...all) : 1;
  const rawMin = Math.min(0, ...(all.length ? all : [0]));
  const max = rawMax === rawMin ? rawMax + 1 : rawMax;
  const min = rawMin;
  const n = series[0]?.data.length || 1;

  const xAt = (i) => padL + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const yAt = (v) => padT + plotH - ((v - min) / (max - min)) * plotH;

  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => min + ((max - min) * i) / yTicks);
  const labels = series[0]?.data.map((d) => d.x) || [];
  const labelEvery = Math.ceil(labels.length / 8);

  return (
    <div style={{ width: '100%', ...style }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img" style={{ display: 'block', fontFamily: 'var(--font-data)' }}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={yAt(t)} y2={yAt(t)} stroke="var(--grey-200)" strokeWidth="1" />
            <text x={padL - 8} y={yAt(t) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)">
              {Math.round(t * 10) / 10}
            </text>
          </g>
        ))}
        {yUnit && (
          <text x={4} y={10} textAnchor="start" fontSize="9" fill="var(--text-muted)" fontWeight="600">{yUnit}</text>
        )}
        {labels.map((lb, i) => (
          i % labelEvery === 0 ? (
            <text key={i} x={xAt(i)} y={H - 8} textAnchor="middle" fontSize="10" fill="var(--text-muted)">{lb}</text>
          ) : null
        ))}
        {series.map((s, si) => {
          const color = s.color || 'var(--brand-primary)';
          const pts = s.data.map((d, i) => `${xAt(i)},${yAt(d.y)}`).join(' ');
          const areaPath = `M ${xAt(0)},${yAt(min)} L ${s.data.map((d, i) => `${xAt(i)},${yAt(d.y)}`).join(' L ')} L ${xAt(s.data.length - 1)},${yAt(min)} Z`;
          return (
            <g key={si}>
              {area && si === 0 && <path d={areaPath} fill={color} opacity="0.08" />}
              <polyline points={pts} fill="none" stroke={color} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
              {s.data.map((d, i) => (
                (s.data.length <= 24) ? <circle key={i} cx={xAt(i)} cy={yAt(d.y)} r="2.5" fill="var(--white)" stroke={color} strokeWidth="1.5" /> : null
              ))}
            </g>
          );
        })}
      </svg>
    </div>
  );
}



/**
 * Stacked bar chart — devices (or fuel volume) by category, segmented
 * by fuel type. Pure SVG. Pass categories (x groups) and a stack of
 * fuel segments per category.
 *
 * data: [{ label, segments: [{ key, value, color }] }]
 */

function StackedBarChart({ data = [], height = 240, yUnit, yTicks = 4, style = {} }) {
  const W = 720;
  const H = height;
  const padL = 40, padR = 14, padT = 12, padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const totals = data.map((d) => d.segments.reduce((a, s) => a + s.value, 0));
  const rawMax = totals.length ? Math.max(...totals) : 1;
  // round up to a tidy axis max
  const mag = Math.pow(10, Math.floor(Math.log10(rawMax || 1)));
  const max = Math.ceil(rawMax / mag) * mag || 1;

  const groupW = plotW / data.length;
  const barW = Math.min(46, groupW * 0.6);
  const yAt = (v) => padT + plotH - (v / max) * plotH;
  const ticks = Array.from({ length: yTicks + 1 }, (_, i) => (max * i) / yTicks);

  return (
    <div style={{ width: '100%', ...style }}>
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} role="img" style={{ display: 'block', fontFamily: 'var(--font-data)' }}>
        {ticks.map((t, i) => (
          <g key={i}>
            <line x1={padL} x2={W - padR} y1={yAt(t)} y2={yAt(t)} stroke="var(--grey-200)" strokeWidth="1" />
            <text x={padL - 8} y={yAt(t) + 3} textAnchor="end" fontSize="10" fill="var(--text-muted)">{Math.round(t)}</text>
          </g>
        ))}
        {yUnit && <text x={4} y={10} textAnchor="start" fontSize="9" fill="var(--text-muted)" fontWeight="600">{yUnit}</text>}
        {data.map((d, gi) => {
          const cx = padL + groupW * gi + groupW / 2;
          let acc = 0;
          return (
            <g key={gi}>
              {d.segments.map((s, si) => {
                const y0 = yAt(acc);
                acc += s.value;
                const y1 = yAt(acc);
                const h = Math.max(0, y0 - y1);
                const isTop = si === d.segments.length - 1;
                return (
                  <rect
                    key={si}
                    x={cx - barW / 2}
                    y={y1}
                    width={barW}
                    height={h}
                    fill={s.color}
                    rx={isTop ? 3 : 0}
                  />
                );
              })}
              <text x={cx} y={H - 9} textAnchor="middle" fontSize="10" fill="var(--text-secondary)" fontWeight="500">{d.label}</text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export { Icon, Button, IconButton, Input, Select, Checkbox, Switch, Badge, StatusDot, FuelBadge, FUELS, KpiCard, Avatar, ProponentLogo, SignalBars, LevelMeter, Tabs, Breadcrumb, Toast, Alert, EmptyState, TimeSeriesChart, StackedBarChart };

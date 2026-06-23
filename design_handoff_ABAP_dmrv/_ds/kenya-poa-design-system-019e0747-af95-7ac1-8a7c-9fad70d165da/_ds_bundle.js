/* @ds-bundle: {"format":3,"namespace":"KenyaPOADesignSystem_019e07","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Tag","sourcePath":"components/core/Tag.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"MetricCard","sourcePath":"components/data/MetricCard.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"357d9c72a9b8","components/core/Badge.jsx":"03b807dd64f7","components/core/Button.jsx":"b69e597a491e","components/core/IconButton.jsx":"992a07f28e46","components/core/Tag.jsx":"bcda92d3e745","components/data/Card.jsx":"3c7d379f35e2","components/data/MetricCard.jsx":"bc2a3d310cca","components/data/ProgressBar.jsx":"4bdeaf7b5d88","components/feedback/Tooltip.jsx":"0a74a8a07684","components/forms/Checkbox.jsx":"b4d2f345ce69","components/forms/Input.jsx":"842915bca01e","components/forms/Select.jsx":"ebd3ad4aea1b","components/forms/Switch.jsx":"94c2c16bb810","components/navigation/Tabs.jsx":"1f5fb03cce89","ui_kits/dmrv-platform/AppShell.jsx":"77a5c83aeed5","ui_kits/dmrv-platform/DashboardScreen.jsx":"1c6912080700","ui_kits/dmrv-platform/DevicesScreen.jsx":"bf075bf4180f","ui_kits/dmrv-platform/ProjectsScreen.jsx":"bb05d779b51b","ui_kits/dmrv-platform/RegistryScreen.jsx":"15088553a056","ui_kits/dmrv-platform/kit-ui.jsx":"fad9f41984fd"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.KenyaPOADesignSystem_019e07 = window.KenyaPOADesignSystem_019e07 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function initials(name = '') {
  return name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
}

/** Avatar — user / operator / verifier identity. Renders image or initials. */
function Avatar({
  name = '',
  src = null,
  size = 'md',
  tone = 'brand',
  square = false,
  className = '',
  ...rest
}) {
  const cls = ['poa-avatar', size !== 'md' && `sz-${size}`, tone !== 'brand' && `tone-${tone}`, square && 'is-square', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls,
    title: name
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name
  }) : initials(name));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Status pill / label. Use tone for semantic state, solid for high emphasis. */
function Badge({
  tone = 'neutral',
  solid = false,
  dot = false,
  square = false,
  className = '',
  children,
  ...rest
}) {
  const cls = ['poa-badge', tone !== 'neutral' && `tone-${tone}`, solid && 'is-solid', square && 'is-square', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    className: "poa-badge__dot"
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Primary action control for the Kenya POA platform. */
function Button({
  variant = 'primary',
  size = 'md',
  icon = null,
  iconRight = null,
  block = false,
  disabled = false,
  type = 'button',
  className = '',
  children,
  ...rest
}) {
  const cls = ['poa-btn', variant !== 'primary' && `is-${variant}`, size !== 'md' && `sz-${size}`, block && 'is-block', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    className: cls,
    disabled: disabled
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "poa-btn__icon"
  }, icon), children && /*#__PURE__*/React.createElement("span", null, children), iconRight && /*#__PURE__*/React.createElement("span", {
    className: "poa-btn__icon"
  }, iconRight));
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Square icon-only button for toolbars, table rows, and card headers. */
function IconButton({
  icon,
  label,
  size = 'md',
  bordered = false,
  className = '',
  ...rest
}) {
  const cls = ['poa-iconbtn', size !== 'md' && `sz-${size}`, bordered && 'is-bordered', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    className: cls,
    "aria-label": label,
    title: label
  }, rest), icon);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/core/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Removable chip — filters, selected facets, assigned labels. */
function Tag({
  onRemove,
  icon = null,
  className = '',
  children,
  ...rest
}) {
  const cls = ['poa-tag', !onRemove && 'no-remove', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("span", _extends({
    className: cls
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--text-subtle)'
    }
  }, icon), children, onRemove && /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "poa-tag__x",
    "aria-label": "Remove",
    onClick: onRemove
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))));
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tag.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Generic surface container with optional header (title + action) and body. */
function Card({
  title,
  action = null,
  flat = false,
  bodyPad = true,
  className = '',
  children,
  ...rest
}) {
  const cls = ['poa-card', flat && 'is-flat', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cls
  }, rest), (title || action) && /*#__PURE__*/React.createElement("div", {
    className: "poa-card__head"
  }, title && /*#__PURE__*/React.createElement("span", {
    className: "poa-card__title"
  }, title), action), bodyPad ? /*#__PURE__*/React.createElement("div", {
    className: "poa-card__body"
  }, children) : children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/MetricCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Headline KPI tile — the dMRV dashboard workhorse. */
function MetricCard({
  icon = null,
  label,
  value,
  unit,
  delta = null,
  footnote = null,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['poa-metric', className].filter(Boolean).join(' ')
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "poa-metric__top"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "poa-metric__icon"
  }, icon), /*#__PURE__*/React.createElement("span", {
    className: "poa-metric__label"
  }, label)), /*#__PURE__*/React.createElement("div", {
    className: "poa-metric__value"
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, unit)), /*#__PURE__*/React.createElement("div", {
    className: "poa-metric__foot"
  }, delta && /*#__PURE__*/React.createElement("span", {
    className: ['poa-metric__delta', delta.dir].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, delta.dir === 'down' ? /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M19 12l-7 7-7-7"
  }) : /*#__PURE__*/React.createElement("path", {
    d: "M12 19V5M5 12l7-7 7 7"
  })), delta.value), footnote && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, footnote)));
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Linear progress / completion meter — crediting progress, % reporting, data completeness. */
function ProgressBar({
  value = 0,
  max = 100,
  tone = 'brand',
  label,
  showValue = true,
  valueLabel,
  size = 'md',
  className = '',
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['poa-progress', size === 'sm' && 'is-sm', className].filter(Boolean).join(' ')
  }, rest), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    className: "poa-progress__meta"
  }, /*#__PURE__*/React.createElement("span", null, label), showValue && /*#__PURE__*/React.createElement("b", null, valueLabel || Math.round(pct) + '%')), /*#__PURE__*/React.createElement("div", {
    className: "poa-progress__track",
    role: "progressbar",
    "aria-valuenow": value,
    "aria-valuemax": max
  }, /*#__PURE__*/React.createElement("div", {
    className: ['poa-progress__fill', tone !== 'brand' && `tone-${tone}`].filter(Boolean).join(' '),
    style: {
      width: pct + '%'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Lightweight hover/focus tooltip. Wraps a trigger; pass label text. */
function Tooltip({
  label,
  children,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({
    className: ['poa-tip', className].filter(Boolean).join(' '),
    tabIndex: 0
  }, rest), children, /*#__PURE__*/React.createElement("span", {
    className: "poa-tip__bubble",
    role: "tooltip"
  }, label));
}
Object.assign(__ds_scope, { Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with label. Controlled or uncontrolled. */
function Checkbox({
  label,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['poa-check', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "poa-check__box"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "3",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  }))), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Text input with optional label, leading icon, hint and error. */
function Input({
  label,
  hint,
  error,
  icon = null,
  mono = false,
  id,
  className = '',
  wrapClassName = '',
  ...rest
}) {
  const inputId = id || (label ? 'in-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const cls = ['poa-input', icon && 'has-icon', mono && 'is-mono', error && 'is-invalid', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: ['poa-field', wrapClassName].filter(Boolean).join(' ')
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "poa-field__label",
    htmlFor: inputId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "poa-inputwrap"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "poa-inputwrap__icon"
  }, icon), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    className: cls,
    "aria-invalid": !!error
  }, rest))), error ? /*#__PURE__*/React.createElement("span", {
    className: "poa-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "poa-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Native select styled to match the design system, with chevron + label. */
function Select({
  label,
  hint,
  error,
  id,
  className = '',
  children,
  ...rest
}) {
  const selId = id || (label ? 'sel-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const cls = ['poa-input', error && 'is-invalid', className].filter(Boolean).join(' ');
  return /*#__PURE__*/React.createElement("div", {
    className: "poa-field"
  }, label && /*#__PURE__*/React.createElement("label", {
    className: "poa-field__label",
    htmlFor: selId
  }, label), /*#__PURE__*/React.createElement("div", {
    className: "poa-selectwrap"
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    className: cls
  }, rest), children), /*#__PURE__*/React.createElement("span", {
    className: "poa-selectwrap__chev"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })))), error ? /*#__PURE__*/React.createElement("span", {
    className: "poa-field__error"
  }, error) : hint ? /*#__PURE__*/React.createElement("span", {
    className: "poa-field__hint"
  }, hint) : null);
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Toggle switch for binary settings. */
function Switch({
  label,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("label", {
    className: ['poa-switch', className].filter(Boolean).join(' ')
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    role: "switch"
  }, rest)), /*#__PURE__*/React.createElement("span", {
    className: "poa-switch__track"
  }), label && /*#__PURE__*/React.createElement("span", null, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Horizontal tab strip with active underline + optional counts. */
function Tabs({
  items = [],
  value,
  onChange,
  className = '',
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: ['poa-tabs', className].filter(Boolean).join(' '),
    role: "tablist"
  }, rest), items.map(it => {
    const active = it.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.id,
      type: "button",
      role: "tab",
      "aria-selected": active,
      className: ['poa-tab', active && 'is-active'].filter(Boolean).join(' '),
      onClick: () => onChange && onChange(it.id)
    }, it.icon && /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        width: 16,
        height: 16
      }
    }, it.icon), it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      className: "poa-tab__count"
    }, it.count));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dmrv-platform/AppShell.jsx
try { (() => {
/* dMRV Platform — app chrome: sidebar nav + top bar. */

const NAV = [{
  id: 'dashboard',
  label: 'Dashboard',
  icon: 'dashboard'
}, {
  id: 'devices',
  label: 'Devices',
  icon: 'device'
}, {
  id: 'projects',
  label: 'Projects',
  icon: 'project'
}, {
  id: 'registry',
  label: 'Registry',
  icon: 'registry'
}];
const NAV_MUTED = [{
  id: 'monitoring',
  label: 'Monitoring',
  icon: 'monitor'
}, {
  id: 'reports',
  label: 'Reports',
  icon: 'report'
}, {
  id: 'settings',
  label: 'Settings',
  icon: 'settings'
}];
function Sidebar({
  active,
  onNav
}) {
  const item = (n, muted) => {
    const I = Icons[n.icon];
    const on = active === n.id;
    return /*#__PURE__*/React.createElement("button", {
      key: n.id,
      className: cx('nav-item', on && 'is-active'),
      onClick: () => onNav(n.id)
    }, /*#__PURE__*/React.createElement(I, {
      size: 18
    }), /*#__PURE__*/React.createElement("span", null, n.label));
  };
  return /*#__PURE__*/React.createElement("aside", {
    className: "kp-sidebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-brand"
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark-white.svg",
    width: "30",
    height: "30",
    alt: ""
  }), /*#__PURE__*/React.createElement("div", {
    className: "kp-brand__wm"
  }, /*#__PURE__*/React.createElement("span", {
    className: "name"
  }, "Kenya POA"), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, "dMRV Platform"))), /*#__PURE__*/React.createElement("nav", {
    className: "kp-nav"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-nav__label"
  }, "Programme"), NAV.map(n => item(n)), /*#__PURE__*/React.createElement("div", {
    className: "kp-nav__label",
    style: {
      marginTop: 16
    }
  }, "Operations"), NAV_MUTED.map(n => item(n))), /*#__PURE__*/React.createElement("div", {
    className: "kp-side-foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-side-status"
  }, /*#__PURE__*/React.createElement("span", {
    className: "kp-pulse"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-sm",
    style: {
      color: '#EAF3EC',
      fontWeight: 600
    }
  }, "2,143 / 2,180 online"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#7E9286'
    }
  }, "Synced 4 min ago"))), /*#__PURE__*/React.createElement("div", {
    className: "kp-account"
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Achieng Otieno",
    tone: "teal",
    size: "sm"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      lineHeight: 1.3,
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "t-sm",
    style: {
      color: '#EAF3EC',
      fontWeight: 600,
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, "Achieng Otieno"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11,
      color: '#7E9286'
    }
  }, "Programme operator")))));
}
function Topbar({
  title,
  sub,
  period,
  onPeriod,
  actions
}) {
  return /*#__PURE__*/React.createElement("header", {
    className: "kp-topbar"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-overline",
    style: {
      marginBottom: 2
    }
  }, sub), /*#__PURE__*/React.createElement("h1", {
    className: "t-h2",
    style: {
      lineHeight: 1.1
    }
  }, title)), /*#__PURE__*/React.createElement("div", {
    className: "kp-topbar__right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-search"
  }, /*#__PURE__*/React.createElement(Icons.search, {
    size: 16
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search devices, projects, serials\u2026"
  })), /*#__PURE__*/React.createElement("div", {
    className: "poa-selectwrap"
  }, /*#__PURE__*/React.createElement("select", {
    className: "poa-input",
    value: period,
    onChange: e => onPeriod(e.target.value),
    style: {
      width: 150,
      height: 36
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "2026-q2"
  }, "Apr\u2013Jun 2026"), /*#__PURE__*/React.createElement("option", {
    value: "2026-q1"
  }, "Jan\u2013Mar 2026"), /*#__PURE__*/React.createElement("option", {
    value: "2025-h2"
  }, "Jul\u2013Dec 2025"), /*#__PURE__*/React.createElement("option", {
    value: "ytd"
  }, "Year to date")), /*#__PURE__*/React.createElement("span", {
    className: "poa-selectwrap__chev"
  }, /*#__PURE__*/React.createElement(Icons.chevDown, {
    size: 16
  }))), /*#__PURE__*/React.createElement(IconBtn, {
    label: "Notifications",
    icon: /*#__PURE__*/React.createElement(Icons.bell, {
      size: 18
    }),
    bordered: true
  }), actions));
}
function AppShell({
  active,
  onNav,
  title,
  sub,
  period,
  onPeriod,
  actions,
  children
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "kp-app"
  }, /*#__PURE__*/React.createElement(Sidebar, {
    active: active,
    onNav: onNav
  }), /*#__PURE__*/React.createElement("div", {
    className: "kp-main"
  }, /*#__PURE__*/React.createElement(Topbar, {
    title: title,
    sub: sub,
    period: period,
    onPeriod: onPeriod,
    actions: actions
  }), /*#__PURE__*/React.createElement("div", {
    className: "kp-content"
  }, children)));
}
Object.assign(window, {
  AppShell
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dmrv-platform/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dmrv-platform/DashboardScreen.jsx
try { (() => {
/* dMRV Platform — Dashboard view. */

/* Simple monthly emission-reductions chart: bars (monthly) + cumulative line. */
function ReductionsChart() {
  const data = [{
    m: 'Jul',
    v: 7.8
  }, {
    m: 'Aug',
    v: 8.9
  }, {
    m: 'Sep',
    v: 9.6
  }, {
    m: 'Oct',
    v: 10.4
  }, {
    m: 'Nov',
    v: 11.2
  }, {
    m: 'Dec',
    v: 12.1
  }, {
    m: 'Jan',
    v: 11.6
  }, {
    m: 'Feb',
    v: 12.8
  }, {
    m: 'Mar',
    v: 13.9
  }, {
    m: 'Apr',
    v: 14.6
  }, {
    m: 'May',
    v: 15.7
  }, {
    m: 'Jun',
    v: 16.4
  }];
  const W = 720,
    H = 230,
    padL = 40,
    padB = 28,
    padT = 12,
    padR = 8;
  const max = 18;
  const bw = (W - padL - padR) / data.length;
  const x = i => padL + i * bw + bw / 2;
  const y = v => padT + (H - padT - padB) * (1 - v / max);
  let cum = 0;
  const cumMax = data.reduce((a, d) => a + d.v, 0);
  const pts = data.map((d, i) => {
    cum += d.v;
    return [x(i), padT + (H - padT - padB) * (1 - cum / cumMax)];
  });
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ');
  const area = `M${padL} ${H - padB} ` + pts.map(p => `L${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ') + ` L${x(data.length - 1)} ${H - padB} Z`;
  return /*#__PURE__*/React.createElement("svg", {
    className: "kp-chart",
    viewBox: `0 0 ${W} ${H}`,
    preserveAspectRatio: "xMidYMid meet",
    role: "img",
    "aria-label": "Emission reductions over time"
  }, /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
    id: "cumFill",
    x1: "0",
    y1: "0",
    x2: "0",
    y2: "1"
  }, /*#__PURE__*/React.createElement("stop", {
    offset: "0%",
    stopColor: "var(--teal-600)",
    stopOpacity: "0.18"
  }), /*#__PURE__*/React.createElement("stop", {
    offset: "100%",
    stopColor: "var(--teal-600)",
    stopOpacity: "0"
  }))), [0, 4.5, 9, 13.5, 18].map(g => /*#__PURE__*/React.createElement("g", {
    key: g
  }, /*#__PURE__*/React.createElement("line", {
    x1: padL,
    x2: W - padR,
    y1: y(g),
    y2: y(g),
    stroke: "var(--line-soft)"
  }), /*#__PURE__*/React.createElement("text", {
    x: padL - 8,
    y: y(g) + 4,
    textAnchor: "end",
    fontSize: "10",
    fontFamily: "var(--font-mono)",
    fill: "var(--text-subtle)"
  }, g, "k"))), data.map((d, i) => /*#__PURE__*/React.createElement("rect", {
    key: d.m,
    x: x(i) - bw * 0.3,
    y: y(d.v),
    width: bw * 0.6,
    height: H - padB - y(d.v),
    rx: "2.5",
    fill: "var(--brand)",
    opacity: i === data.length - 1 ? 1 : 0.82
  })), data.map((d, i) => /*#__PURE__*/React.createElement("text", {
    key: d.m,
    x: x(i),
    y: H - 9,
    textAnchor: "middle",
    fontSize: "10",
    fontFamily: "var(--font-mono)",
    fill: "var(--text-subtle)"
  }, d.m)), /*#__PURE__*/React.createElement("path", {
    d: area,
    fill: "url(#cumFill)"
  }), /*#__PURE__*/React.createElement("path", {
    d: line,
    fill: "none",
    stroke: "var(--teal-600)",
    strokeWidth: "2.2",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }), pts.map((p, i) => /*#__PURE__*/React.createElement("circle", {
    key: i,
    cx: p[0],
    cy: p[1],
    r: i === pts.length - 1 ? 3.5 : 0,
    fill: "var(--teal-600)"
  })));
}
function DashboardScreen() {
  const counties = [{
    nm: 'Nairobi',
    v: 412,
    p: 100
  }, {
    nm: 'Kiambu',
    v: 318,
    p: 77
  }, {
    nm: 'Nakuru',
    v: 286,
    p: 69
  }, {
    nm: 'Kisumu',
    v: 241,
    p: 58
  }, {
    nm: 'Machakos',
    v: 198,
    p: 48
  }, {
    nm: 'Uasin Gishu',
    v: 154,
    p: 37
  }];
  const events = [{
    ic: 'shield',
    tone: 'ok',
    t: '2h',
    txt: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      className: "cell-strong"
    }, "Monitoring report VPA-02"), " submitted for verification")
  }, {
    ic: 'coins',
    tone: 'brand',
    t: '5h',
    txt: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      className: "cell-strong"
    }, "8,200 tCO\u2082e"), " issued \u2014 vintage 2025")
  }, {
    ic: 'device',
    tone: 'warn',
    t: '1d',
    txt: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      className: "cell-strong"
    }, "37 devices"), " flagged: no data > 72h")
  }, {
    ic: 'check',
    tone: 'ok',
    t: '2d',
    txt: /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
      className: "cell-strong"
    }, "VPA-04"), " onboarding completed \xB7 420 cookers")
  }];
  const toneBg = {
    ok: 'var(--ok-bg)',
    brand: 'var(--brand-tint)',
    warn: 'var(--warn-bg)'
  };
  const toneFg = {
    ok: 'var(--ok-fg)',
    brand: 'var(--brand-strong)',
    warn: 'var(--warn-fg)'
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "kp-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-kpis"
  }, /*#__PURE__*/React.createElement(MetricCard, {
    icon: /*#__PURE__*/React.createElement(Icons.leaf, {
      size: 17
    }),
    label: "Verified reductions",
    value: "128,400",
    unit: "tCO\u2082e",
    delta: {
      value: '12.4%',
      dir: 'up'
    },
    footnote: "this period"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: /*#__PURE__*/React.createElement(Icons.device, {
      size: 17
    }),
    label: "Registered devices",
    value: "2,180",
    delta: {
      value: '180',
      dir: 'up'
    },
    footnote: "vs last period"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: /*#__PURE__*/React.createElement(Icons.flame, {
      size: 17
    }),
    label: "Cooking events / day",
    value: "46,210",
    delta: {
      value: '3.1%',
      dir: 'down'
    },
    footnote: "7-day avg"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: /*#__PURE__*/React.createElement(Icons.coins, {
      size: 17
    }),
    label: "Credits issued",
    value: "96,000",
    unit: "tCO\u2082e",
    delta: {
      value: '8,200',
      dir: 'up'
    },
    footnote: "vintage 2025"
  })), /*#__PURE__*/React.createElement("div", {
    className: "kp-2col"
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Emission reductions over time",
    action: /*#__PURE__*/React.createElement("div", {
      className: "kp-legend"
    }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: 'var(--brand)'
      }
    }), "Monthly"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("i", {
      style: {
        background: 'var(--teal-600)'
      }
    }), "Cumulative"))
  }, /*#__PURE__*/React.createElement(ReductionsChart, null)), /*#__PURE__*/React.createElement(Card, {
    title: "Monitoring health",
    action: /*#__PURE__*/React.createElement(Badge, {
      tone: "ok",
      dot: true
    }, "Healthy")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Progress, {
    label: "Devices reporting",
    value: 2143,
    max: 2180,
    valueLabel: "2,143 / 2,180"
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Crediting period elapsed",
    value: 64,
    tone: "teal"
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Data completeness",
    value: 92,
    tone: "amber"
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Verification readiness",
    value: 78,
    tone: "clay"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8,
      paddingTop: 4
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "ok",
    dot: true
  }, "2,143 online"), /*#__PURE__*/React.createElement(Badge, {
    tone: "danger",
    dot: true
  }, "37 offline"))))), /*#__PURE__*/React.createElement("div", {
    className: "kp-2col"
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Devices by county",
    action: /*#__PURE__*/React.createElement("span", {
      className: "t-sm t-muted"
    }, "Top 6 of 24")
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-county"
  }, counties.map(c => /*#__PURE__*/React.createElement("div", {
    className: "kp-county__row",
    key: c.nm
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, c.nm), /*#__PURE__*/React.createElement("span", {
    className: "kp-bar"
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: c.p + '%'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "vl"
  }, c.v))))), /*#__PURE__*/React.createElement(Card, {
    title: "Recent activity",
    action: /*#__PURE__*/React.createElement("a", {
      className: "t-sm",
      style: {
        color: 'var(--text-link)',
        fontWeight: 600,
        textDecoration: 'none'
      }
    }, "View all")
  }, /*#__PURE__*/React.createElement("div", null, events.map((e, i) => {
    const I = Icons[e.ic];
    return /*#__PURE__*/React.createElement("div", {
      className: "kp-event",
      key: i
    }, /*#__PURE__*/React.createElement("span", {
      className: "kp-event__ic",
      style: {
        background: toneBg[e.tone],
        color: toneFg[e.tone]
      }
    }, /*#__PURE__*/React.createElement(I, {
      size: 15
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "t-sm"
    }, e.txt)), /*#__PURE__*/React.createElement("span", {
      className: "kp-event__t"
    }, e.t));
  })))));
}
Object.assign(window, {
  DashboardScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dmrv-platform/DashboardScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dmrv-platform/DevicesScreen.jsx
try { (() => {
/* dMRV Platform — Devices fleet view. */

const DEVICES = [{
  sn: 'VC2-8830-1147',
  type: 'EPC',
  place: 'Olympic Primary School',
  county: 'Nairobi',
  status: 'online',
  sync: '3 min',
  events: 142,
  signal: 4
}, {
  sn: 'VC2-8830-1182',
  type: 'EPC',
  place: 'St. Mary\u2019s Boarding',
  county: 'Kiambu',
  status: 'online',
  sync: '6 min',
  events: 98,
  signal: 3
}, {
  sn: 'VC2-7741-0094',
  type: 'Steam',
  place: 'Nakuru Day Secondary',
  county: 'Nakuru',
  status: 'online',
  sync: '2 min',
  events: 211,
  signal: 4
}, {
  sn: 'VC2-8830-1205',
  type: 'EPC',
  place: 'Kisumu Girls High',
  county: 'Kisumu',
  status: 'pending',
  sync: '\u2014',
  events: 0,
  signal: 0
}, {
  sn: 'VC2-6620-3318',
  type: 'EPC',
  place: 'Machakos Junior Academy',
  county: 'Machakos',
  status: 'offline',
  sync: '4 days',
  events: 0,
  signal: 0
}, {
  sn: 'VC2-7741-0121',
  type: 'Steam',
  place: 'Eldoret Mixed School',
  county: 'Uasin Gishu',
  status: 'online',
  sync: '8 min',
  events: 176,
  signal: 2
}, {
  sn: 'VC2-8830-1240',
  type: 'EPC',
  place: 'Thika Road Primary',
  county: 'Kiambu',
  status: 'online',
  sync: '1 min',
  events: 130,
  signal: 4
}, {
  sn: 'VC2-6620-3402',
  type: 'EPC',
  place: 'Athi River Academy',
  county: 'Machakos',
  status: 'review',
  sync: '12 min',
  events: 64,
  signal: 3
}];
const DEV_STATUS = {
  online: {
    tone: 'ok',
    label: 'Online'
  },
  offline: {
    tone: 'danger',
    label: 'Offline'
  },
  pending: {
    tone: 'neutral',
    label: 'Pending'
  },
  review: {
    tone: 'info',
    label: 'In review'
  }
};
function Signal({
  n
}) {
  return /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'flex-end',
      gap: 2,
      height: 14
    }
  }, [5, 8, 11, 14].map((h, i) => /*#__PURE__*/React.createElement("i", {
    key: i,
    style: {
      width: 3,
      height: h,
      borderRadius: 1,
      background: i < n ? 'var(--brand)' : 'var(--stone-200)'
    }
  })));
}
function DevicesScreen() {
  const [tab, setTab] = React.useState('all');
  const counts = {
    all: 2180,
    online: 2143,
    offline: 37,
    review: 12
  };
  const rows = DEVICES.filter(d => tab === 'all' ? true : tab === 'review' ? d.status === 'review' : d.status === tab);
  return /*#__PURE__*/React.createElement("div", {
    className: "kp-page"
  }, /*#__PURE__*/React.createElement(Card, {
    flat: true,
    style: {
      overflow: 'visible'
    },
    bodyPad: false
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '4px 16px 0'
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    value: tab,
    onChange: setTab,
    items: [{
      id: 'all',
      label: 'All devices',
      count: counts.all
    }, {
      id: 'online',
      label: 'Online',
      count: counts.online
    }, {
      id: 'offline',
      label: 'Offline',
      count: counts.offline
    }, {
      id: 'review',
      label: 'In review',
      count: counts.review
    }]
  }))), /*#__PURE__*/React.createElement(Card, {
    bodyPad: false
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-tablebar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-toolgroup"
  }, /*#__PURE__*/React.createElement("div", {
    className: "poa-inputwrap",
    style: {
      width: 240
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "poa-inputwrap__icon"
  }, /*#__PURE__*/React.createElement(Icons.search, {
    size: 16
  })), /*#__PURE__*/React.createElement("input", {
    className: "poa-input has-icon is-mono",
    placeholder: "Serial or school\u2026",
    style: {
      height: 34
    }
  })), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Icons.filter, {
      size: 15
    })
  }, "County"), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Icons.filter, {
      size: 15
    })
  }, "Device type"), /*#__PURE__*/React.createElement("span", {
    className: "poa-tag no-remove",
    style: {
      height: 30
    }
  }, "County: Nairobi ", /*#__PURE__*/React.createElement("button", {
    className: "poa-tag__x",
    "aria-label": "remove"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "12",
    height: "12",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M18 6 6 18M6 6l12 12"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "kp-toolgroup"
  }, /*#__PURE__*/React.createElement(IconBtn, {
    label: "Refresh",
    icon: /*#__PURE__*/React.createElement(Icons.refresh, {
      size: 16
    }),
    size: "sm",
    bordered: true
  }), /*#__PURE__*/React.createElement(Btn, {
    variant: "subtle",
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Icons.download, {
      size: 15
    })
  }, "Export"), /*#__PURE__*/React.createElement(Btn, {
    size: "sm",
    icon: /*#__PURE__*/React.createElement(Icons.plus, {
      size: 15
    })
  }, "Register device"))), /*#__PURE__*/React.createElement("table", {
    className: "poa-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    style: {
      width: 30
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    className: "",
    "aria-label": "select all"
  })), /*#__PURE__*/React.createElement("th", null, "Serial"), /*#__PURE__*/React.createElement("th", null, "Type"), /*#__PURE__*/React.createElement("th", null, "Installation"), /*#__PURE__*/React.createElement("th", null, "County"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Events / day"), /*#__PURE__*/React.createElement("th", null, "Signal"), /*#__PURE__*/React.createElement("th", null, "Last sync"), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 40
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, rows.map(d => {
    const st = DEV_STATUS[d.status];
    return /*#__PURE__*/React.createElement("tr", {
      key: d.sn
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      "aria-label": d.sn
    })), /*#__PURE__*/React.createElement("td", {
      className: "mono"
    }, d.sn), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
      tone: "neutral",
      square: true
    }, d.type)), /*#__PURE__*/React.createElement("td", {
      className: "cell-strong"
    }, d.place), /*#__PURE__*/React.createElement("td", null, d.county), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
      tone: st.tone,
      dot: true
    }, st.label)), /*#__PURE__*/React.createElement("td", {
      className: "num cell-strong"
    }, d.events || '\u2014'), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Signal, {
      n: d.signal
    })), /*#__PURE__*/React.createElement("td", {
      className: "cell-sub"
    }, d.sync), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(IconBtn, {
      label: "Row actions",
      icon: /*#__PURE__*/React.createElement(Icons.dots, {
        size: 16
      }),
      size: "sm"
    })));
  }))), /*#__PURE__*/React.createElement("div", {
    className: "kp-foot"
  }, /*#__PURE__*/React.createElement("span", null, "Showing ", /*#__PURE__*/React.createElement("b", {
    className: "cell-strong"
  }, rows.length), " of ", counts.all.toLocaleString(), " devices"), /*#__PURE__*/React.createElement("div", {
    className: "kp-pager"
  }, /*#__PURE__*/React.createElement("button", null, "\u2039"), /*#__PURE__*/React.createElement("button", {
    className: "is-active"
  }, "1"), /*#__PURE__*/React.createElement("button", null, "2"), /*#__PURE__*/React.createElement("button", null, "3"), /*#__PURE__*/React.createElement("button", null, "\u2026"), /*#__PURE__*/React.createElement("button", null, "218"), /*#__PURE__*/React.createElement("button", null, "\u203A")))));
}
Object.assign(window, {
  DevicesScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dmrv-platform/DevicesScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dmrv-platform/ProjectsScreen.jsx
try { (() => {
/* dMRV Platform — Projects (VPA component projects under the POA) view. */

const PROJECTS = [{
  id: 'VPA-01',
  name: 'Climate-Smart School Meals — Central',
  meth: 'GS Metered & Measured',
  status: 'crediting',
  tone: 'ok',
  stLabel: 'Crediting',
  devices: 842,
  red: '52,100',
  prog: 64,
  county: 'Central Kenya'
}, {
  id: 'VPA-02',
  name: 'NACONEK Institutional Cooking — Nyanza',
  meth: 'GS Metered & Measured',
  status: 'verification',
  tone: 'info',
  stLabel: 'Under verification',
  devices: 610,
  red: '38,400',
  prog: 88,
  county: 'Nyanza'
}, {
  id: 'VPA-03',
  name: 'Clean Cooking for Schools — Rift Valley',
  meth: 'GS Metered & Measured',
  status: 'monitoring',
  tone: 'warn',
  stLabel: 'Monitoring',
  devices: 528,
  red: '24,900',
  prog: 41,
  county: 'Rift Valley'
}, {
  id: 'VPA-04',
  name: 'EPC Household Programme — Nairobi Metro',
  meth: 'GS Metered Methodology',
  status: 'onboarding',
  tone: 'neutral',
  stLabel: 'Onboarding',
  devices: 200,
  red: '6,200',
  prog: 12,
  county: 'Nairobi'
}];
function ProjectsScreen() {
  return /*#__PURE__*/React.createElement("div", {
    className: "kp-page"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-3col"
  }, /*#__PURE__*/React.createElement(MetricCard, {
    icon: /*#__PURE__*/React.createElement(Icons.project, {
      size: 17
    }),
    label: "Active VPAs",
    value: "4",
    footnote: "under the Kenya POA"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: /*#__PURE__*/React.createElement(Icons.device, {
      size: 17
    }),
    label: "Devices across projects",
    value: "2,180",
    delta: {
      value: '180',
      dir: 'up'
    },
    footnote: "this period"
  }), /*#__PURE__*/React.createElement(MetricCard, {
    icon: /*#__PURE__*/React.createElement(Icons.leaf, {
      size: 17
    }),
    label: "Programme reductions",
    value: "121,600",
    unit: "tCO\u2082e",
    footnote: "cumulative"
  })), /*#__PURE__*/React.createElement("div", {
    className: "kp-projgrid"
  }, PROJECTS.map(p => /*#__PURE__*/React.createElement(Card, {
    key: p.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-proj__head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "t-overline",
    style: {
      marginBottom: 5
    }
  }, p.id, " \xB7 ", p.county), /*#__PURE__*/React.createElement("div", {
    className: "t-h3",
    style: {
      lineHeight: 1.2,
      marginBottom: 6
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    className: "t-sm t-muted",
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icons.shield, {
    size: 14
  }), p.meth)), /*#__PURE__*/React.createElement(Badge, {
    tone: p.tone,
    dot: true
  }, p.stLabel)), /*#__PURE__*/React.createElement("div", {
    className: "kp-proj__stats"
  }, /*#__PURE__*/React.createElement("div", {
    className: "kp-proj__stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, p.devices), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, "Devices")), /*#__PURE__*/React.createElement("div", {
    className: "kp-proj__stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, p.red), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, "tCO\u2082e reduced")), /*#__PURE__*/React.createElement("div", {
    className: "kp-proj__stat"
  }, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, p.prog, "%"), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, "Period elapsed"))), /*#__PURE__*/React.createElement(Progress, {
    value: p.prog,
    tone: p.tone === 'ok' ? 'brand' : p.tone === 'info' ? 'teal' : p.tone === 'warn' ? 'amber' : 'clay',
    showValue: false
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 16
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "t-sm t-muted"
  }, "Crediting period to Dec 2027"), /*#__PURE__*/React.createElement(Btn, {
    variant: "ghost",
    size: "sm",
    iconRight: /*#__PURE__*/React.createElement(Icons.chevRight, {
      size: 15
    })
  }, "Open project"))))));
}
Object.assign(window, {
  ProjectsScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dmrv-platform/ProjectsScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dmrv-platform/RegistryScreen.jsx
try { (() => {
/* dMRV Platform — Carbon registry & credit ledger view. */

const ISSUANCES = [{
  vintage: '2025',
  serial: 'KE-POA-2025-000001 → 008200',
  vpa: 'VPA-01',
  qty: '8,200',
  date: '02 Jun 2026',
  status: 'issued',
  tone: 'ok'
}, {
  vintage: '2025',
  serial: 'KE-POA-2025-008201 → 012600',
  vpa: 'VPA-02',
  qty: '4,400',
  date: '02 Jun 2026',
  status: 'issued',
  tone: 'ok'
}, {
  vintage: '2024',
  serial: 'KE-POA-2024-040120 → 052400',
  vpa: 'VPA-01',
  qty: '12,280',
  date: '14 Jan 2026',
  status: 'retired',
  tone: 'neutral'
}, {
  vintage: '2025',
  serial: 'KE-POA-2025-012601 → 020800',
  vpa: 'VPA-03',
  qty: '8,200',
  date: 'Pending',
  status: 'pending',
  tone: 'warn'
}, {
  vintage: '2024',
  serial: 'KE-POA-2024-028900 → 040119',
  vpa: 'VPA-02',
  qty: '11,220',
  date: '14 Jan 2026',
  status: 'transferred',
  tone: 'info'
}];
const LEDGER_STATUS = {
  issued: 'Issued',
  retired: 'Retired',
  pending: 'Pending issuance',
  transferred: 'Transferred'
};
const REPORTS = [{
  period: 'Apr–Jun 2026',
  vpa: 'VPA-01',
  status: 'In verification',
  tone: 'info'
}, {
  period: 'Jan–Mar 2026',
  vpa: 'VPA-01',
  status: 'Verified',
  tone: 'ok'
}, {
  period: 'Jan–Mar 2026',
  vpa: 'VPA-02',
  status: 'Verified',
  tone: 'ok'
}];
function RegistryScreen() {
  return /*#__PURE__*/React.createElement("div", {
    className: "kp-page"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    className: "kp-ledgersum"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v",
    style: {
      color: 'var(--brand-strong)'
    }
  }, "96,000"), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, "tCO\u2082e issued \xB7 all vintages")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "12,280"), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, "Retired")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "v"
  }, "71,520"), /*#__PURE__*/React.createElement("div", {
    className: "l"
  }, "Available for transfer")))), /*#__PURE__*/React.createElement("div", {
    className: "kp-2col"
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Credit issuance ledger",
    bodyPad: false,
    action: /*#__PURE__*/React.createElement(Btn, {
      variant: "subtle",
      size: "sm",
      icon: /*#__PURE__*/React.createElement(Icons.download, {
        size: 15
      })
    }, "Export ledger")
  }, /*#__PURE__*/React.createElement("table", {
    className: "poa-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Serial range"), /*#__PURE__*/React.createElement("th", null, "VPA"), /*#__PURE__*/React.createElement("th", null, "Vintage"), /*#__PURE__*/React.createElement("th", {
    className: "num"
  }, "Quantity"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Date"))), /*#__PURE__*/React.createElement("tbody", null, ISSUANCES.map((r, i) => /*#__PURE__*/React.createElement("tr", {
    key: i
  }, /*#__PURE__*/React.createElement("td", {
    className: "mono"
  }, r.serial), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: "neutral",
    square: true
  }, r.vpa)), /*#__PURE__*/React.createElement("td", {
    className: "cell-sub"
  }, r.vintage), /*#__PURE__*/React.createElement("td", {
    className: "num cell-strong"
  }, r.qty), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement(Badge, {
    tone: r.tone,
    dot: true
  }, LEDGER_STATUS[r.status])), /*#__PURE__*/React.createElement("td", {
    className: "cell-sub"
  }, r.date))))), /*#__PURE__*/React.createElement("div", {
    className: "kp-foot"
  }, /*#__PURE__*/React.createElement("span", null, "5 of 38 issuance records"), /*#__PURE__*/React.createElement("a", {
    className: "t-sm",
    style: {
      color: 'var(--text-link)',
      fontWeight: 600,
      textDecoration: 'none'
    }
  }, "View full registry \u2192"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, /*#__PURE__*/React.createElement(Card, {
    title: "Registry"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "poa-metric__icon"
  }, /*#__PURE__*/React.createElement(Icons.shield, {
    size: 17
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cell-strong t-sm"
  }, "Gold Standard Impact Registry"), /*#__PURE__*/React.createElement("div", {
    className: "cell-sub"
  }, "GS11892 \xB7 Kenya POA"))), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      background: 'var(--line-soft)'
    }
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Vintage 2025 verified",
    value: 76,
    tone: "brand"
  }), /*#__PURE__*/React.createElement(Progress, {
    label: "Buffer pool contribution",
    value: 20,
    tone: "teal",
    valueLabel: "20%"
  }), /*#__PURE__*/React.createElement(Btn, {
    variant: "secondary",
    size: "sm",
    block: true,
    iconRight: /*#__PURE__*/React.createElement(Icons.external, {
      size: 15
    })
  }, "Open registry record"))), /*#__PURE__*/React.createElement(Card, {
    title: "Monitoring reports",
    action: /*#__PURE__*/React.createElement(Badge, {
      tone: "info"
    }, "3 active")
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column'
    }
  }, REPORTS.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '11px 0',
      borderBottom: i < REPORTS.length - 1 ? '1px solid var(--line-soft)' : 0
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "cell-strong t-sm"
  }, r.period), /*#__PURE__*/React.createElement("div", {
    className: "cell-sub"
  }, r.vpa)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: r.tone,
    dot: true
  }, r.status), /*#__PURE__*/React.createElement(IconBtn, {
    label: "Download report",
    icon: /*#__PURE__*/React.createElement(Icons.download, {
      size: 15
    }),
    size: "sm"
  })))))))));
}
Object.assign(window, {
  RegistryScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dmrv-platform/RegistryScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/dmrv-platform/kit-ui.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Kenya POA dMRV — UI kit shared primitives + icons.
   Local presentational components mirror the design-system bundle API
   (Button → poa-btn, Badge → poa-badge, …) so the kit renders standalone.
   In production these map to window.KenyaPOADesignSystem_019e07.* */

const Icon = ({
  d,
  size = 18,
  sw = 2,
  fill = 'none',
  children,
  ...rest
}) => /*#__PURE__*/React.createElement("svg", _extends({
  viewBox: "0 0 24 24",
  width: size,
  height: size,
  fill: fill,
  stroke: "currentColor",
  strokeWidth: sw,
  strokeLinecap: "round",
  strokeLinejoin: "round"
}, rest), children || /*#__PURE__*/React.createElement("path", {
  d: d
}));

/* Lucide-style stroke icons (1.75–2px), matching the leaf mark's rounded stroke. */
const Icons = {
  dashboard: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "3",
    width: "7",
    height: "9",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "3",
    width: "7",
    height: "5",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "14",
    y: "12",
    width: "7",
    height: "9",
    rx: "1.5"
  }), /*#__PURE__*/React.createElement("rect", {
    x: "3",
    y: "16",
    width: "7",
    height: "5",
    rx: "1.5"
  })),
  device: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("rect", {
    x: "5",
    y: "2",
    width: "14",
    height: "20",
    rx: "2.5"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M9 6h6M12 18h.01"
  })),
  cooker: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M4 10h16M5 10v8a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-8M8 10V7a4 4 0 0 1 8 0v3M9 4.5 8 3M15 4.5 16 3"
  })),
  project: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z"
  })),
  monitor: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 12h4l2 6 4-16 2 10 2-4h4"
  })),
  registry: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M4 5a2 2 0 0 1 2-2h9l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M14 3v5h5M8 13h8M8 17h5"
  })),
  report: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M7 3h7l5 5v11a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M13 3v5h5"
  })),
  settings: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "3"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-2.82 1.17V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 8 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 3.6 15H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9 1.65 1.65 0 0 0 4.27 7.18l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6V3a2 2 0 0 1 4 0v.09A1.65 1.65 0 0 0 15 4.6a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z"
  })),
  leaf: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M2 21c0-3 1.85-5.36 5.08-6"
  })),
  flame: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5Z"
  })),
  coins: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "8",
    cy: "8",
    r: "6"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M18.09 10.37A6 6 0 1 1 10.34 18M7 6h1v4M16.71 13.88l.7.71-2.82 2.82"
  })),
  search: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "11",
    cy: "11",
    r: "7"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m21 21-4.3-4.3"
  })),
  bell: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10.3 21a1.94 1.94 0 0 0 3.4 0"
  })),
  chevDown: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "m6 9 6 6 6-6"
  })),
  chevRight: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "m9 18 6-6-6-6"
  })),
  download: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
  })),
  plus: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M5 12h14"
  })),
  filter: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 5h18l-7 8v6l-4 2v-8Z"
  })),
  dots: p => /*#__PURE__*/React.createElement(Icon, _extends({}, p, {
    fill: "currentColor",
    sw: 0
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "5",
    cy: "12",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "1.6"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "19",
    cy: "12",
    r: "1.6"
  })),
  refresh: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5"
  })),
  signal: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M2 20h.01M7 20v-4M12 20v-8M17 20V8M22 4v16"
  })),
  check: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M20 6 9 17l-5-5"
  })),
  shield: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"
  }), /*#__PURE__*/React.createElement("path", {
    d: "m9 12 2 2 4-4"
  })),
  pin: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "10",
    r: "3"
  })),
  external: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("path", {
    d: "M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
  })),
  clock: p => /*#__PURE__*/React.createElement(Icon, p, /*#__PURE__*/React.createElement("circle", {
    cx: "12",
    cy: "12",
    r: "9"
  }), /*#__PURE__*/React.createElement("path", {
    d: "M12 7v5l3 2"
  }))
};

/* ---- thin component wrappers over the shipped poa-* classes ---- */
const cx = (...a) => a.filter(Boolean).join(' ');
function Btn({
  variant = 'primary',
  size = 'md',
  icon,
  iconRight,
  block,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cx('poa-btn', variant !== 'primary' && `is-${variant}`, size !== 'md' && `sz-${size}`, block && 'is-block')
  }, rest), icon && /*#__PURE__*/React.createElement("span", {
    className: "poa-btn__icon"
  }, icon), children && /*#__PURE__*/React.createElement("span", null, children), iconRight && /*#__PURE__*/React.createElement("span", {
    className: "poa-btn__icon"
  }, iconRight));
}
function IconBtn({
  icon,
  label,
  size = 'md',
  bordered,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("button", _extends({
    className: cx('poa-iconbtn', size !== 'md' && `sz-${size}`, bordered && 'is-bordered'),
    "aria-label": label,
    title: label
  }, rest), icon);
}
function Badge({
  tone = 'neutral',
  solid,
  dot,
  square,
  children
}) {
  return /*#__PURE__*/React.createElement("span", {
    className: cx('poa-badge', tone !== 'neutral' && `tone-${tone}`, solid && 'is-solid', square && 'is-square')
  }, dot && /*#__PURE__*/React.createElement("span", {
    className: "poa-badge__dot"
  }), children);
}
function Avatar({
  name = '',
  tone = 'brand',
  size = 'md',
  square
}) {
  const init = name.trim().split(/\s+/).slice(0, 2).map(w => w[0] || '').join('').toUpperCase();
  return /*#__PURE__*/React.createElement("span", {
    className: cx('poa-avatar', tone !== 'brand' && `tone-${tone}`, size !== 'md' && `sz-${size}`, square && 'is-square'),
    title: name
  }, init);
}
function Card({
  title,
  action,
  flat,
  bodyPad = true,
  className,
  children,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: cx('poa-card', flat && 'is-flat', className)
  }, rest), (title || action) && /*#__PURE__*/React.createElement("div", {
    className: "poa-card__head"
  }, title && /*#__PURE__*/React.createElement("span", {
    className: "poa-card__title"
  }, title), action), bodyPad ? /*#__PURE__*/React.createElement("div", {
    className: "poa-card__body"
  }, children) : children);
}
function MetricCard({
  icon,
  label,
  value,
  unit,
  delta,
  footnote
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "poa-metric"
  }, /*#__PURE__*/React.createElement("div", {
    className: "poa-metric__top"
  }, icon && /*#__PURE__*/React.createElement("span", {
    className: "poa-metric__icon"
  }, icon), /*#__PURE__*/React.createElement("span", {
    className: "poa-metric__label"
  }, label)), /*#__PURE__*/React.createElement("div", {
    className: "poa-metric__value"
  }, value, unit && /*#__PURE__*/React.createElement("span", {
    className: "unit"
  }, unit)), /*#__PURE__*/React.createElement("div", {
    className: "poa-metric__foot"
  }, delta && /*#__PURE__*/React.createElement("span", {
    className: cx('poa-metric__delta', delta.dir)
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 24 24",
    width: "14",
    height: "14",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.4",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, delta.dir === 'down' ? /*#__PURE__*/React.createElement("path", {
    d: "M12 5v14M19 12l-7 7-7-7"
  }) : /*#__PURE__*/React.createElement("path", {
    d: "M12 19V5M5 12l7-7 7 7"
  })), delta.value), footnote && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, footnote)));
}
function Progress({
  value = 0,
  max = 100,
  tone = 'brand',
  label,
  valueLabel,
  showValue = true,
  size
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  return /*#__PURE__*/React.createElement("div", {
    className: cx('poa-progress', size === 'sm' && 'is-sm')
  }, (label || showValue) && /*#__PURE__*/React.createElement("div", {
    className: "poa-progress__meta"
  }, /*#__PURE__*/React.createElement("span", null, label), showValue && /*#__PURE__*/React.createElement("b", null, valueLabel || Math.round(pct) + '%')), /*#__PURE__*/React.createElement("div", {
    className: "poa-progress__track"
  }, /*#__PURE__*/React.createElement("div", {
    className: cx('poa-progress__fill', tone !== 'brand' && `tone-${tone}`),
    style: {
      width: pct + '%'
    }
  })));
}
function Tabs({
  items,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "poa-tabs",
    role: "tablist"
  }, items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it.id,
    className: cx('poa-tab', it.id === value && 'is-active'),
    onClick: () => onChange(it.id)
  }, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
    className: "poa-tab__count"
  }, it.count))));
}
Object.assign(window, {
  Icon,
  Icons,
  cx,
  Btn,
  IconBtn,
  Badge,
  Avatar,
  Card,
  MetricCard,
  Progress,
  Tabs
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/dmrv-platform/kit-ui.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Tabs = __ds_scope.Tabs;

})();

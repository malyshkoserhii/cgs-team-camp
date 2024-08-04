export const BREAKPOINTS = {
    mobile: 320,
    tablet: 768,
    smallTablet: 576,
    desktop: 1200
  };
  
  export const VIEW = {
    mobile: `(min-width: ${BREAKPOINTS.mobile}px)`,
    smallTablet: `(min-width: ${BREAKPOINTS.smallTablet}px)`,
    tablet: `(min-width: ${BREAKPOINTS.tablet}px)`,
    desktop: `(min-width: ${BREAKPOINTS.desktop}px)`,

    tabletToDesktop: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${BREAKPOINTS.desktop}px)`,
    mobileToTablet: `(min-width: ${BREAKPOINTS.mobile}px) and (max-width: ${BREAKPOINTS.tablet}px)`
  };
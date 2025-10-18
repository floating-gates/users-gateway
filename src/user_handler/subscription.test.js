import { describe, it, expect } from 'vitest'
import { derive_menu_from_features } from './subscription.js'

describe('derive_menu_from_features', () => {
  const baseMenu = [
    'Summary',
    'Machines',
    'Materials',
    'Features',
    'Subscription',
    'Details',
    'Issues'
  ];

  it('returns base menu when no features are enabled', () => {
    expect(derive_menu_from_features({})).toEqual(baseMenu);
  });

  it('adds AutoQuote when automatic_quotation is true', () => {
    expect(derive_menu_from_features({ automatic_quotation: true })).toEqual([...baseMenu, 'AutoQuote']);
  });

  it('adds Devices when parametric_design is true', () => {
    expect(derive_menu_from_features({ parametric_design: true })).toEqual([...baseMenu, 'Devices']);
  });

  it('adds both Quotation and Devices when both features are true', () => {
    expect(
      derive_menu_from_features({ automatic_quotation: true, parametric_design: true })
    ).toEqual([...baseMenu, 'AutoQuote', 'Devices']);
  });

  it('ignores unknown features', () => {
    expect(derive_menu_from_features({ unknown_feature: true })).toEqual(baseMenu);
  });
});

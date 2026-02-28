import defaultMdxComponents from 'fumadocs-ui/mdx';
import { Tab, Tabs } from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import Rebalancer from '@/components/rebalancer';
import { BadgeButton as MadeWithInkWebBadge } from '@/components/ui/made-with-ink-web';

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    Tab,
    Tabs,
    Rebalancer,
    MadeWithInkWebBadge,
    ...components,
  };
}

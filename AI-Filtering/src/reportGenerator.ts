import type { TableColumn, TableRow } from './components/DataTable'
import type { ReviewChange } from './components/ReviewChanges'

interface GeneratedReport {
  columns: TableColumn[]
  rows: TableRow[]
  changes: ReviewChange[]
}

// AI Report Generation - simulates parsing user prompts and generating report configurations
export function generateReport(prompt: string): GeneratedReport {
  const promptLower = prompt.toLowerCase()

  // Check for "at least 1 order" filter
  if (promptLower.includes('at least 1 order') || promptLower.includes('orders')) {
    return {
      columns: [
        { id: 'campaign', label: 'Campaign name', sortable: true },
        { id: 'orders', label: 'Orders', sortable: true },
        { id: 'spend', label: 'Spend', sortable: true },
        { id: 'revenue', label: 'Revenue', sortable: true },
        { id: 'roas', label: 'ROAS', sortable: true },
      ],
      rows: [
        { id: '1', campaign: 'Summer Sale Campaign', orders: '156', spend: '$4,230', revenue: '$18,450', roas: '4.36' },
        { id: '2', campaign: 'Brand Awareness Q1', orders: '89', spend: '$2,150', revenue: '$9,870', roas: '4.59' },
        { id: '3', campaign: 'Product Launch 2026', orders: '234', spend: '$6,780', revenue: '$28,560', roas: '4.21' },
        { id: '4', campaign: 'Holiday Promotions', orders: '312', spend: '$8,900', revenue: '$42,100', roas: '4.73' },
        { id: '5', campaign: 'Retargeting Users', orders: '67', spend: '$1,890', revenue: '$7,340', roas: '3.88' },
      ],
      changes: [
        { type: 'filter', label: 'Orders', value: '≥ 1' },
        { type: 'metric', label: 'Added', value: 'Orders, Spend, Revenue, ROAS' },
      ],
    }
  }

  // Check for "revenue" filter
  if (promptLower.includes('revenue') || promptLower.includes('drove revenue')) {
    return {
      columns: [
        { id: 'campaign', label: 'Campaign name', sortable: true },
        { id: 'revenue', label: 'Revenue', sortable: true },
        { id: 'transactions', label: 'Transactions', sortable: true },
        { id: 'avgOrderValue', label: 'Avg Order Value', sortable: true },
        { id: 'conversionRate', label: 'Conv. Rate', sortable: true },
      ],
      rows: [
        { id: '1', campaign: 'Top Performer Alpha', revenue: '$52,340', transactions: '423', avgOrderValue: '$123.74', conversionRate: '5.2%' },
        { id: '2', campaign: 'Seasonal Winter', revenue: '$38,920', transactions: '298', avgOrderValue: '$130.61', conversionRate: '4.8%' },
        { id: '3', campaign: 'New Customer Promo', revenue: '$24,670', transactions: '187', avgOrderValue: '$131.93', conversionRate: '3.9%' },
        { id: '4', campaign: 'Flash Sale March', revenue: '$18,450', transactions: '156', avgOrderValue: '$118.27', conversionRate: '6.1%' },
      ],
      changes: [
        { type: 'filter', label: 'Revenue', value: '> $0' },
        { type: 'metric', label: 'Added', value: 'Revenue, Transactions, AOV, Conv. Rate' },
        { type: 'dimension', label: 'Sorted by', value: 'Revenue (descending)' },
      ],
    }
  }

  // Check for "high spend" and "low ROAS" filter
  if (promptLower.includes('high spend') || promptLower.includes('low roas')) {
    return {
      columns: [
        { id: 'campaign', label: 'Campaign name', sortable: true },
        { id: 'spend', label: 'Spend', sortable: true },
        { id: 'roas', label: 'ROAS', sortable: true },
        { id: 'impressions', label: 'Impressions', sortable: true },
        { id: 'clicks', label: 'Clicks', sortable: true },
        { id: 'ctr', label: 'CTR', sortable: true },
      ],
      rows: [
        { id: '1', campaign: 'Underperforming Campaign A', spend: '$12,450', roas: '0.82', impressions: '234,500', clicks: '1,234', ctr: '0.53%' },
        { id: '2', campaign: 'Test Campaign Beta', spend: '$8,920', roas: '1.15', impressions: '189,200', clicks: '945', ctr: '0.50%' },
        { id: '3', campaign: 'Broad Targeting Exp', spend: '$15,670', roas: '0.67', impressions: '456,780', clicks: '2,890', ctr: '0.63%' },
        { id: '4', campaign: 'New Market Entry', spend: '$9,340', roas: '0.94', impressions: '167,890', clicks: '756', ctr: '0.45%' },
        { id: '5', campaign: 'Brand Generic Terms', spend: '$11,200', roas: '1.02', impressions: '312,400', clicks: '1,562', ctr: '0.50%' },
      ],
      changes: [
        { type: 'filter', label: 'Spend', value: '> $5,000' },
        { type: 'filter', label: 'ROAS', value: '< 1.5' },
        { type: 'metric', label: 'Added', value: 'Spend, ROAS, Impressions, Clicks, CTR' },
      ],
    }
  }

  // Default fallback - generate based on general prompt
  return {
    columns: [
      { id: 'campaign', label: 'Campaign name', sortable: true },
      { id: 'impressions', label: 'Impressions', sortable: true },
      { id: 'clicks', label: 'Clicks', sortable: true },
      { id: 'spend', label: 'Spend', sortable: true },
      { id: 'conversions', label: 'Conversions', sortable: true },
    ],
    rows: [
      { id: '1', campaign: 'Campaign Alpha', impressions: '125,400', clicks: '3,456', spend: '$2,340', conversions: '89' },
      { id: '2', campaign: 'Campaign Beta', impressions: '98,200', clicks: '2,890', spend: '$1,890', conversions: '67' },
      { id: '3', campaign: 'Campaign Gamma', impressions: '156,780', clicks: '4,120', spend: '$3,120', conversions: '112' },
      { id: '4', campaign: 'Campaign Delta', impressions: '87,650', clicks: '2,340', spend: '$1,560', conversions: '54' },
      { id: '5', campaign: 'Campaign Epsilon', impressions: '203,400', clicks: '5,670', spend: '$4,230', conversions: '143' },
    ],
    changes: [
      { type: 'metric', label: 'Added', value: 'Impressions, Clicks, Spend, Conversions' },
      { type: 'dimension', label: 'Grouped by', value: 'Campaign' },
    ],
  }
}

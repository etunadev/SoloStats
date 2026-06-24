export interface AdMobMetricHeader {
  metric: string;
  type: string;
}

export interface AdMobRowMetricValue {
  integerValue?: number;
  doubleValue?: number;
  microsValue?: string; // Para birimleri API'de micros olarak tutulur
}

export interface AdMobReportRow {
  dimensionValues: Record<string, { value: string }>;
  metricValues: Record<string, AdMobRowMetricValue>;
}

export interface AdMobReportResponse {
  rows?: AdMobReportRow[];
}

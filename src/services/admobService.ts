import { AdMobReportResponse } from "../types/admob";

export const fetchAdMobDailyReport = async (): Promise<AdMobReportResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // admobService.ts içindeki mockData'yı şu şekilde güncelleyebilirsin:
      const mockData: AdMobReportResponse = {
        rows: [
          {
            dimensionValues: { DATE: { value: "2026-06-24" } },
            metricValues: {
              ESTIMATED_EARNINGS: { microsValue: "24500000" }, // $24.50
              PAGE_RPM: { microsValue: "2100000" },           // $2.10
              IMPRESSIONS: { integerValue: 11600 },           // 11.6K için
              AD_REQUESTS: { integerValue: 14200 },           // 14.2K için
              CLICKS: { integerValue: 340 }
            }
          }
        ]
      };
      resolve(mockData);
    }, 1000);
  });
};

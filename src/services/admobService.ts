import { AdMobReportResponse } from "../types/admob";

export const fetchAdMobDailyReport = async (): Promise<AdMobReportResponse> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: AdMobReportResponse = {
        rows: [
          {
            dimensionValues: {
              DATE: { value: "2024-06-24" },
            },
            metricValues: {
              ESTIMATED_EARNINGS: { microsValue: "24500000" },
              IMPRESSIONS: { integerValue: 116000 },
              CLICKS: { integerValue: 340 },
            },
          },
        ],
      };
      resolve(mockData);
    }, 1000);
  });
};

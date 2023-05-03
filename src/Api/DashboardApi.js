import { apiSlice } from "./ApiSlice";

export const dashboardApi = apiSlice.injectEndpoints({
  tagtypes: [],
  endpoints: (builder) => ({
    dailyStats: builder.query({
      query: () => "/email/dailystats/",
    }),
    subscriberStats: builder.query({
      query: () => "/email/subscriberstats/",
    }),
  }),
});

export const { useDailyStatsQuery, useSubscriberStatsQuery } = dashboardApi;

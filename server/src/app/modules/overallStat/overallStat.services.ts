import { IOverallStat } from './overallStat.interfaces';
import { OverallStat } from './overallStat.model';

const getSales = async (): Promise<IOverallStat[] | null> => {
  // Fetch overall stats
  const overallStats = await OverallStat.find().lean(); // Returns plain JavaScript objects

  // Transform salesByCategory back into a Map for each document
  const formattedStats = overallStats.map((stat) => ({
    ...stat,
    salesByCategory: new Map(Object.entries(stat.salesByCategory)),
  }));

  return formattedStats;
};

export const OverallStatServices = {
  getSales,
};

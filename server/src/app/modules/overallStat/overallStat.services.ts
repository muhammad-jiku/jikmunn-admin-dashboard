import { IOverallStat } from './overallStat.interfaces';
import { OverallStat } from './overallStat.model';

const getSales = async (): Promise<IOverallStat[] | null> => {
  const overallStats = await OverallStat.find().lean();

  // Convert salesByCategory to Map<string, number>
  const formattedStats = overallStats.map((stat) => ({
    ...stat,
    salesByCategory:
      stat.salesByCategory && Object.keys(stat.salesByCategory).length > 0
        ? stat.salesByCategory
        : { defaultCategory: 0 }, // Provide a meaningful default
  }));

  return formattedStats as IOverallStat[];
};

export const OverallStatServices = {
  getSales,
};

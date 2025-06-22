import { ChartAreaInteractive } from './ChartStatistic';
import { rekomendasiBeranda } from "@/types/beranda";

const StatisticSections = ({item} : { item: rekomendasiBeranda[] }) => {
    return (
        <>
        <ChartAreaInteractive itemStatistik={item}></ChartAreaInteractive>
        </>
    )
}

export default StatisticSections;
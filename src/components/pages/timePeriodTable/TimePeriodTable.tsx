import { useEffect, useState } from 'react';
import india_agriculture_data from '../../../data/india_agriculture_data.json';
import { Table, ScrollArea } from '@mantine/core';
import cx from 'clsx';
import classes from './TimePeriodTable.module.css';

interface CropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number | string;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
    "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}

interface YearlyCropProduction {
    Crop: string | null;
    AverageYield: number;
    AverageCultivationArea: number;
}

const getCropData = (data: CropData[]): YearlyCropProduction[] => {
    const cropGroups: { [crop: string]: CropData[] } = {};

    data.forEach(item => {
        const cropName = item['Crop Name'];
        if (!cropGroups[cropName]) {
            cropGroups[cropName] = [];
        }
        cropGroups[cropName].push(item);
    });

    const result: YearlyCropProduction[] = Object.keys(cropGroups).map((crop) => {
        const cropData = cropGroups[crop];
        let totalYield = 0;
        let totalCultivationArea = 0;

        cropData.forEach((data) => {
            const yieldValue = parseFloat(data['Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))'] as string);
            const areaValue = parseFloat(data['Area Under Cultivation (UOM:Ha(Hectares))'] as string);

            totalYield += isNaN(yieldValue) ? 0 : yieldValue;
            totalCultivationArea += isNaN(areaValue) ? 0 : areaValue;
        });

        return {
            Crop: crop,
            AverageYield: parseFloat((totalYield / cropData.length).toFixed(3)),
            AverageCultivationArea: parseFloat((totalCultivationArea / cropData.length).toFixed(3)),
        };
    });

    return result;
};

const TimePeriodTable = () => {

    const [filterData, setFilterData] = useState<YearlyCropProduction[]>([]);

    useEffect(() => {
        console.log('getCropData', getCropData(india_agriculture_data));
        setFilterData(getCropData(india_agriculture_data));
    }, []);

    const rows = filterData.map((row) => (
        <Table.Tr key={row.Crop}>
            <Table.Td style={{ textAlign: 'start' }}>{row.Crop}</Table.Td>
            <Table.Td>{row.AverageYield}</Table.Td>
            <Table.Td>{row.AverageCultivationArea}</Table.Td>
        </Table.Tr>
    ));

    return (
        <div>
            {filterData &&
                (<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem', marginBottom: '2rem' }}>
                    <div style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: '#ced4da', padding: '0.5rem 2rem' }}>
                        <ScrollArea h={400}>
                            <Table maw={500}>
                                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scroll })}>
                                    <Table.Tr style={{ textAlign: 'center', }} >
                                        <Table.Th style={{ padding: '0.4rem, 0.8rem', fontSize: '1rem', fontWeight: 400, textAlign: 'start' }} >Crop</Table.Th>
                                        <Table.Th style={{ padding: '0.4rem, 0.8rem', fontSize: '1rem', fontWeight: 400, textAlign: 'center' }} >Average Yield of the Crop between 1950-2020</Table.Th>
                                        <Table.Th style={{ padding: '0.4rem, 0.8rem', fontSize: '1rem', fontWeight: 400, textAlign: 'center' }} >Average Yield of the Crop between 1950-2020</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody style={{ textAlign: 'center' }}>{rows}</Table.Tbody>
                            </Table>
                        </ScrollArea>
                    </div>
                </div>)}
        </div>
    );
};

export default TimePeriodTable;

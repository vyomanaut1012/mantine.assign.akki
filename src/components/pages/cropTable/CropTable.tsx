import { useEffect, useState } from 'react';
import { Table, ScrollArea } from '@mantine/core';
import india_agriculture_data from '../../../data/india_agriculture_data.json';
import cx from 'clsx';
import classes from './TableScrollArea.module.css';

interface CropData {
    Country: string;
    Year: string;
    "Crop Name": string;
    "Crop Production (UOM:t(Tonnes))": number | string;
    "Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))": number | string;
    "Area Under Cultivation (UOM:Ha(Hectares))": number | string;
}

interface YearlyCropProduction {
    Year: string;
    MaxCrop: string | null;
    MaxProduction: number;
    MinCrop: string | null;
    MinProduction: number;
}

const getMaxAndMinCropsByYear = (data: CropData[]): YearlyCropProduction[] => {
    const yearGroups: { [year: string]: CropData[] } = {};

    data.forEach(item => {

        const yearMatch = item.Year.match(/\d{4}/);
        const year = yearMatch ? yearMatch[0] : item.Year;

        if (!yearGroups[year]) {
            yearGroups[year] = [];
        }
        yearGroups[year].push(item);
    });

    const result: YearlyCropProduction[] = Object.keys(yearGroups).map(year => {
        const crops = yearGroups[year];

        let maxCrop = null;
        let minCrop = null;
        let maxProduction = Number.NEGATIVE_INFINITY;
        let minProduction = Number.POSITIVE_INFINITY;

        crops.forEach(crop => {
            const production = typeof crop["Crop Production (UOM:t(Tonnes))"] === "number"
                ? crop["Crop Production (UOM:t(Tonnes))"]
                : 0;

            if (production > maxProduction) {
                maxProduction = production;
                maxCrop = crop["Crop Name"];
            }

            if (production < minProduction && production > 0) {
                minProduction = production;
                minCrop = crop["Crop Name"];
            }
        });

        return {
            Year: year,
            MaxCrop: maxCrop,
            MaxProduction: maxProduction,
            MinCrop: minCrop,
            MinProduction: minProduction
        };
    });

    return result;
}

const CropTable = () => {

    const [filterData, setFilterData] = useState<YearlyCropProduction[]>([]);

    useEffect(() => {
        console.log('getMaxAndMinCropsByYear', getMaxAndMinCropsByYear(india_agriculture_data));
        setFilterData(getMaxAndMinCropsByYear(india_agriculture_data));
    }, []);

    const rows = filterData.map((row) => (
        <Table.Tr key={row.Year}>
            <Table.Td>{row.Year}</Table.Td>
            <Table.Td>{row.MaxCrop}</Table.Td>
            <Table.Td>{row.MinCrop}</Table.Td>
        </Table.Tr>
    ));

    return (
        <>
            {filterData &&
                (<div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
                    <div style={{ borderWidth: '2px', borderStyle: 'solid', borderColor: '#ced4da', padding:'0.5rem 2rem' }}>
                        <ScrollArea h={400}>
                            <Table maw={500}>
                                <Table.Thead className={cx(classes.header, { [classes.scrolled]: scroll })}>
                                    <Table.Tr style={{ textAlign: 'center', }} >
                                        <Table.Th style={{ padding: '0.4rem, 0.8rem', fontSize:'1rem', fontWeight:400, textAlign:'center' }} >Year</Table.Th>
                                        <Table.Th style={{ padding: '0.4rem, 0.8rem', fontSize:'1rem', fontWeight:400, textAlign:'center' }} >Crop with Maximum Production in that Year</Table.Th>
                                        <Table.Th style={{ padding: '0.4rem, 0.8rem', fontSize:'1rem', fontWeight:400, textAlign:'center' }} >Crop with Minimum Production in that Year</Table.Th>
                                    </Table.Tr>
                                </Table.Thead>
                                <Table.Tbody style={{ textAlign:'center'}}>{rows}</Table.Tbody>
                            </Table>
                        </ScrollArea>
                    </div>
                </div>)}
        </>
    );
}

export default CropTable;
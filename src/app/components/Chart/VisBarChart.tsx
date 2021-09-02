import {ResponsiveBar} from '@nivo/bar';
import * as React from 'react';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';

const VisBarChart = () => {
    // const { data } = useSelector((state:RootState) => state.bar);
    const {data, groupMode, layout, reverse, padding, margin, innerPadding} = useSelector(
        (state: RootState) => state.bar
    );

    return (
        <ResponsiveBar
            groupMode={groupMode}
            layout={layout}
            reverse={reverse}
            data={data}
            keys={['hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut']}
            onClick={(e) => {
                console.log(e);
            }}
            indexBy="country"
            margin={margin}
            padding={padding}
            innerPadding={innerPadding}
            valueScale={{type: 'linear'}}
            indexScale={{type: 'band', round: true}}
            // valueFormat={{format: '', enabled: false}}
            colors={{scheme: 'nivo'}}
            defs={[
                {
                    id: 'dots',
                    type: 'patternDots',
                    background: 'inherit',
                    color: '#38bcb2',
                    size: 4,
                    padding: 1,
                    stagger: true,
                },
                {
                    id: 'lines',
                    type: 'patternLines',
                    background: 'inherit',
                    color: '#eed312',
                    rotation: -45,
                    lineWidth: 6,
                    spacing: 10,
                },
            ]}
            fill={[
                {
                    match: {
                        id: 'fries',
                    },
                    id: 'dots',
                },
                {
                    match: {
                        id: 'sandwich',
                    },
                    id: 'lines',
                },
            ]}
            borderColor={{from: 'color', modifiers: [['darker', 1.6]]}}
            axisTop={null}
            axisRight={null}
            axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'country',
                legendPosition: 'middle',
                legendOffset: 32,
            }}
            axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: 'food',
                legendPosition: 'middle',
                legendOffset: -40,
            }}
            labelSkipWidth={12}
            labelSkipHeight={12}
            labelTextColor={{from: 'color', modifiers: [['darker', 1.6]]}}
            legends={[
                {
                    dataFrom: 'keys',
                    anchor: 'bottom-right',
                    direction: 'column',
                    justify: false,
                    translateX: 120,
                    translateY: 0,
                    itemsSpacing: 2,
                    itemWidth: 100,
                    itemHeight: 20,
                    itemDirection: 'left-to-right',
                    itemOpacity: 0.85,
                    symbolSize: 20,
                    effects: [
                        {
                            on: 'hover',
                            style: {
                                itemOpacity: 1,
                            },
                        },
                    ],
                },
            ]}
        />
    );
};

export default VisBarChart;

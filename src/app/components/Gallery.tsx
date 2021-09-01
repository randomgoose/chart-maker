import {Button, Slider, Space, Tabs} from 'antd';
import * as React from 'react';
import {FcPuzzle} from 'react-icons/fc';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import DataMock from './Data/DataMock';
import DataSource from './Data/DataSource';
import DataTable from './Data/DataTable';
import DataUpload from './Data/DataUpload';
import {Rnd} from 'react-rnd';
import {Handle} from './StyledComponents/StyledComponents';
import {setScale} from '../features/chart/lineChartSlice';
import {ArrowsAltOutlined, ZoomInOutlined, ZoomOutOutlined} from '@ant-design/icons';

function Sample({title}: {title: string}) {
    return (
        <div className={'Sample'}>
            <div
                style={{
                    background: 'lightgray',
                    borderRadius: 8,
                    marginBottom: 8,
                    height: 120,
                }}
                className={'Sample__image'}
            ></div>
            <div className={'Sample__title'}>{title}</div>
        </div>
    );
}

export default function Gallery() {
    const {dataSource} = useSelector((state: RootState) => state.app);
    const {scale} = useSelector((state: RootState) => state.line);
    const [height, setHeight] = React.useState('320px');
    const [width, setWidth] = React.useState('100%');
    const [x, setX] = React.useState(0);
    const [y, setY] = React.useState(window.innerHeight - 320);
    const [showSlider, setShowSlider] = React.useState(false);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setShowSlider(true);

        const timer = setTimeout(() => setShowSlider(false), 3000);

        return () => {
            clearTimeout(timer);
        };
    }, [scale]);

    return (
        <Rnd
            dragAxis={'none'}
            onResizeStop={(_e, _direction, ref, _delta, position) => {
                setHeight(ref.style.height);
                setWidth(ref.style.width);
                setX(position.x);
                setY(position.y);
            }}
            resizeHandleComponent={{
                top: <Handle pos={'top'} hovering={true} scale={1} />,
            }}
            position={{
                x: x,
                y: y,
            }}
            size={{
                width: width,
                height: height,
            }}
        >
            <div
                className={'Gallery'}
                style={{padding: '0 12px', width: '100%', height: '100%', background: 'white'}}
                onMouseOver={() => setShowSlider(true)}
                onMouseOut={() => setShowSlider(false)}
            >
                <Space
                    align={'center'}
                    style={{
                        position: 'absolute',
                        top: -72,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        background: `rgba(255, 255, 255, ${showSlider ? 0.8 : 0})`,
                        padding: '8px 16px',
                        borderRadius: 100,
                        opacity: showSlider ? 1 : 0,
                        transition: 'opacity .4s',
                    }}
                >
                    <ZoomOutOutlined style={{color: 'gray'}} />
                    <Slider
                        min={0.1}
                        max={3}
                        step={0.01}
                        value={scale}
                        onChange={(value) => {
                            dispatch(setScale(value));
                        }}
                        style={{width: 196}}
                    />
                    <ZoomInOutlined style={{color: 'gray'}} />
                </Space>
                <Button icon={<ArrowsAltOutlined rotate={90} />} style={{position: 'absolute', top: -48, right: 24}} />
                <Tabs defaultActiveKey={'data'}>
                    <Tabs.TabPane key={'data'} tab={'数据'}>
                        {!dataSource ? (
                            <DataSource />
                        ) : dataSource === 'mock' ? (
                            <>
                                <DataMock />
                                <DataTable />
                            </>
                        ) : dataSource === 'file' ? (
                            <DataUpload />
                        ) : null}
                    </Tabs.TabPane>
                    <Tabs.TabPane key={'gallery'} tab={'示例图表'}>
                        <div
                            style={{display: 'flex', alignItems: 'center', marginBottom: 8}}
                            className={'Gallery__title'}
                        >
                            <FcPuzzle style={{marginRight: 8}} />
                            <span style={{fontSize: 16, lineHeight: 1.5, fontWeight: 'bold'}}>示例图表</span>
                        </div>
                        <div
                            style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(4, 1fr)',
                                justifyContent: 'flex-start',
                                alignItems: 'flex-start',
                                columnGap: 8,
                                rowGap: 8,
                                width: '100%',
                                height: 240,
                            }}
                            className={'Gallery__display'}
                        >
                            <Sample title={'双线图'} />
                            <Sample title={'双线图'} />
                            <Sample title={'双线图'} />
                            <Sample title={'双线图'} />
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </div>
        </Rnd>
    );
}

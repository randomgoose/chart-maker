import * as React from 'react';
import StyledRnd from '../StyledComponents/StyledRnd';
import _ from 'lodash';
import {appAtom, Param} from '../../atoms/appAtom';
import {useAtom} from 'jotai';
import {useImmerAtom} from 'jotai/immer';
import DimensionIndicator from '../DimensionIndicator';
import {ResponsiveRadar} from '@nivo/radar';
import {radarAtomFamily, RadarState} from '../../atoms/radarAtomFamily';

const VisRadar = ({id, initialState}: Param & {initialState?: RadarState}) => {
    const [radar, setRadar] = useImmerAtom(radarAtomFamily({id}));
    const [app, setApp] = useAtom(appAtom);

    React.useEffect(() => {
        if (initialState)
            setRadar((radar) => {
                Object.assign(radar, initialState);
            });
    }, []);

    function onDragStop(_e, d) {
        setRadar((radar) => {
            radar.x = d.x;
            radar.y = d.y;
        });
    }

    function onResize(_e, _direction, ref, _delta, position) {
        setRadar((radar) => {
            radar.width = parseFloat(ref.style.width);
            radar.height = parseFloat(ref.style.height);
            radar.x = position.x;
            radar.y = position.y;
        });
    }

    return (
        <StyledRnd
            scale={app.scale}
            width={radar.width}
            height={radar.height}
            x={radar.x}
            y={radar.y}
            onDragStop={onDragStop}
            onResize={onResize}
            style={{background: id === app.activeKey ? 'rgba(123, 97, 255, .05)' : ''}}
            showHandles={id === app.activeKey}
            onMouseDown={() => {
                setApp((app) => ({...app, activeKey: id}));
            }}
        >
            <ResponsiveRadar {...radar} />
            {id === app.activeKey ? <DimensionIndicator width={radar.width} height={radar.height} /> : null}
        </StyledRnd>
    );
};

export default VisRadar;

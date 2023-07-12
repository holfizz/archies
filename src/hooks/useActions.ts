import {useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {useMemo} from 'react';

export const useActions = <T extends {}>(actions: T) => {
    const dispatch = useDispatch();
    return useMemo(
        () => bindActionCreators(actions as any, dispatch),
        [actions, dispatch]
    ) as unknown as T;
};
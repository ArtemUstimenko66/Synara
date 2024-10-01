import { RefObject } from 'react';
import { debounce } from 'lodash';

export const handleScroll = (
    chatContainerRef: RefObject<HTMLDivElement>,
    loading: boolean,
    hasMore: boolean,
    loadMessages: () => void,
) => {
    debounce(() => {
        const element = chatContainerRef.current;
        if (element && element.scrollTop === 0 && !loading && hasMore) {
            loadMessages();
        }
    }, 300)();
};

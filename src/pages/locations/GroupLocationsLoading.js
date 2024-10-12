import React from 'react';
import GroupLocationsHeaderLoading from '../../components/headers/GroupLocationsHeaderLoading';
import SectionHeaderLoading from '../../components/headers/SectionHeaderLoading';
import PlaceholderItem from '../../components/items/PlaceholderItem';

const GroupLocationsLoading = () => {

    const renderPlaceholderItems = (count, aspectRatio) => {
        const items = [];
        for (let i = 0; i < count; i++) {
            items.push(
                <PlaceholderItem
                    aspectRatio={aspectRatio}
                    key={i}
                />
            );
        }
        return items;
    };

    return (
        <div 
            className={`group-locations-container fade-in animate-wave`}
        >
            <div className='group-locations-header-area'>
                <GroupLocationsHeaderLoading />
            </div>
            <div className='group-analytics-area '>
                <SectionHeaderLoading />
                <div className='group-grid-display'>
                    {renderPlaceholderItems(4, '4 / 2')}
                </div>
            </div>
            <div className='group-locations-area'>
                <SectionHeaderLoading />
                <div className='group-grid-display'>
                    {renderPlaceholderItems(6, '6 / 5')}
                </div>
            </div>
        </div>
    );
}

export default GroupLocationsLoading;

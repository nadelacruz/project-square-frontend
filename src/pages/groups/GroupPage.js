import React, { useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

import MainContainer from '../../components/containers/MainContainer';
import NotFoundPage from '../NotFoundPage';
import GroupPageLoading from './GroupPageLoading';
import MainBreadcrumbs from '../../components/tabs/MainBreadcrumbs';

import GroupIndex from './GroupIndex';
import GroupSettings from './GroupSettings';
import GroupMembers from './GroupMembers';

import CreateLocationModal from '../../components/modals/CreateLocationModal';

import { useLocation } from '../../hooks/useLocation'
// import { useRecognize } from '../../hooks/useRecognize';
import { useBreadcrumbs } from '../../hooks/useBreadcrumbs';

const GroupPage = ({ content }) => {
    const { id } = useParams();
    let isFetching = false;

    const [owner, setOwner] = useState(null);
    const [group, setGroup] = useState(null);
    const [locations, setLocations] = useState([]);
    const [members, setMembers] = useState([]);
    const [notFound, setNotFound] = useState(false);

    const { setBreadcrumbs, clearBreadcrumbs, addBreadcrumb } = useBreadcrumbs();
    // const { getImageUrl } = useRecognize();

    const {
        getGroupLocations,
        toggleCreateLocation,
        reload,
        showCreateLocation,
        handleToast
    } = useLocation();
    
    useEffect(() => {
        if (!isFetching) {
            isFetching = true;

            getGroupLocations(id)
                .then((res) => {
                    setOwner(res.owner);
                    setGroup(res.group);
                    setLocations(res.locations);
                    setMembers(res.members);
                    handleBreadcrumbs(res.group);
                })
                .catch((e) => {
                    handleToast(e.response.data.error, "error");
                    if(e.response.status === 404) setNotFound(true);
                })
                .finally(() => isFetching = false)
        }

        return () => {
            setGroup(null);
            setOwner(null);
            setLocations([]);
            setMembers([]);
            setNotFound(false);
        };
    }, [id, reload]);

    const handleBreadcrumbs = (group) => {
        clearBreadcrumbs();
        setBreadcrumbs([
            { label: "Groups", link: "/groups" },
            { label: group.name, link: "/groups/" + group.id },
        ]);
        if (content === "settings") {
            addBreadcrumb("Settings", "/groups/"+group.id+"/settings");
        }
        if (content === "members") {
            addBreadcrumb("Members", "/groups/"+group.id+"/members");
        }
    };


    return (
        <>
            <CreateLocationModal
                show={showCreateLocation}
                onClose={toggleCreateLocation}
                group={group}
            />

            <MainContainer>
                {!group && !notFound && (
                    <GroupPageLoading />
                )}
                {!group && notFound && (
                    <NotFoundPage content={"noGroup"} />
                )}
                {group && (
                    <div className={`group-locations-container fade-in`} id="grploc">
                        <div
                            className='group-locations-breadcrumbs-area'
                            style={{ backgroundColor: (content !== "index") ? "white" : "" }}
                        >
                            <MainBreadcrumbs />
                        </div>
                        {content === "index" && (<GroupIndex group={group} owner={owner} locations={locations}/>)}
                        {content === "settings" && (<GroupSettings group={group} />)}
                        {content === "members" && (<GroupMembers members={members} owner={owner} />)}
                    </div>
                )}
            </MainContainer>
        </>
    );
}

export default GroupPage;

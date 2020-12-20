import React from 'react';

let getLinkSocialPlatform = (idPublisherPlatform: number, pageId: string): JSX.Element => {

    switch (+idPublisherPlatform) {
        
        case 0: return (
            <a 
                href={ "https://www.facebook.com/profile.php?id=" + pageId }
                target="_blank"
            >
                <span className="font-weight-bold">fb://</span>{ pageId }
            </a>
        );
        case 1: return (
            <a 
                href={ "https://www.instagram.com" + pageId }
                target="_blank"
            >
                <span className="font-weight-bold">ig://</span>{ pageId }
            </a>
        );
        default: return <span>{idPublisherPlatform} - {pageId}</span>;
    }
    
}

export default {
    getLinkSocialPlatform: getLinkSocialPlatform,
};
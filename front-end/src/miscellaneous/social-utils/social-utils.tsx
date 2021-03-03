let getLinkSocialPlatform = (idPublisherPlatform: number, pageId: string): string => {

    switch (+idPublisherPlatform) {
        
        case 0: return "https://www.facebook.com/profile.php?id=" + pageId;
        case 1: return "https://www.instagram.com" + pageId;
        default: return "javascript: void(0)";
    }
    
}

export default {
    getLinkSocialPlatform: getLinkSocialPlatform,
};
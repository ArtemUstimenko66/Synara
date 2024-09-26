export const determineMessageType = (content: string): 'text' | 'image' => {
    const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    try {
        const url = new URL(content, window.location.href);
        const extension = url.pathname.split('.').pop()?.toLowerCase();
        if (imageExtensions.includes(extension || '')) {
            return 'image';
        } else {
            return 'text';
        }
    } catch (e) {
        return 'text';
    }
};
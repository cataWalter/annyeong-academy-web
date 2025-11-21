export const getEmbedUrl = (url) => {
  if (!url) return null;

  // YouTube (Standard)
  if (url.includes('youtube.com/watch?v=')) {
    return url.replace('watch?v=', 'embed/');
  }
  
  // YouTube (Short)
  if (url.includes('youtu.be/')) {
    return url.replace('youtu.be/', 'youtube.com/embed/');
  }
  
  // Vimeo
  if (url.includes('vimeo.com')) {
    // Handle standard vimeo url to player url conversion if needed
    // Usually vimeo embed codes are different, but if user pastes "vimeo.com/12345", 
    // we try to convert to player.vimeo.com/video/12345
    const vimeoId = url.split('.com/')[1];
    if (vimeoId && !url.includes('player.vimeo.com')) {
      return `https://player.vimeo.com/video/${vimeoId}`;
    }
  }

  // Google Drive
  if (url.includes('drive.google.com')) {
    return url.replace('/view', '/preview');
  }

  return url;
}

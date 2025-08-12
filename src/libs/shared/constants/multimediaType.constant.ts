export enum MultimediaType {
  Photo = 'Photo',
  Video = 'Video',
  Document = 'Document',
}

export const LIST_OF_ALL_MULTIMEDIA_TYPES: MultimediaType[] = Object.values(MultimediaType);

export const VideoExtensions: Record<string, string> = {
  '3gp': 'video/3gpp',
  avi: 'video/x-msvideo',
  flv: 'video/x-flv',
  mkv: 'video/x-matroska',
  mov: 'video/quicktime',
  mp4: 'video/mp4',
  mpeg: 'video/mpeg',
  mpg: 'video/mpeg',
  ts: 'video/MP2T',
  webm: 'video/webm',
  wmv: 'video/x-ms-wmv',
};

export const PhotoExtensions: Record<string, string> = {
  gif: 'image/gif',
  heic: 'image/heic',
  heif: 'image/heif',
  jpeg: 'image/jpeg',
  jpg: 'image/jpeg',
  png: 'image/png',
  webp: 'image/webp',
};

export const DocumentExtensions: Record<string, string> = {
  pdf: 'application/pdf',
};

export const AllExtensions: Record<string, string> = {
  ...VideoExtensions,
  ...PhotoExtensions,
  ...DocumentExtensions,
};

export const getExtensionsFromMediaTypes = (multimediaTypes: MultimediaType[]): string[] => {
  let allowedFileTypes: string[] = [];

  if (multimediaTypes.includes(MultimediaType.Photo)) {
    allowedFileTypes = [...allowedFileTypes, ...Object.values(PhotoExtensions)];
  }

  if (multimediaTypes.includes(MultimediaType.Video)) {
    allowedFileTypes = [...allowedFileTypes, ...Object.values(VideoExtensions)];
  }

  if (multimediaTypes.includes(MultimediaType.Document)) {
    allowedFileTypes = [...allowedFileTypes, ...Object.keys(DocumentExtensions)];
  }

  return allowedFileTypes;
};

export const getMediaTypeFromFileType = (fileType: string): MultimediaType | undefined => {
  if (Object.values(PhotoExtensions).includes(fileType)) return MultimediaType.Photo;
  if (Object.values(VideoExtensions).includes(fileType)) return MultimediaType.Video;
  if (Object.values(DocumentExtensions).includes(fileType)) return MultimediaType.Document;
  return undefined;
};

export const getExtensionFromFilename = (filename: string): string | undefined => {
  const filenameSplit = filename.split('.');
  return filenameSplit.length >= 2
    ? filenameSplit[filenameSplit.length - 1].toLowerCase()
    : undefined;
};

export const getMimeTypeFromFilename = (filename: string): string => {
  const ext = getExtensionFromFilename(filename);
  return (ext && AllExtensions[ext]) || 'application/octet-stream';
};

export const getNameFromFilename = (filename: string): string => {
  const filenameSplit = filename.split('.');
  return filenameSplit.length >= 1 ? filenameSplit[0] : filename;
};

export const getExtensionFromMimeType = (mimeType: string): string | undefined => {
  const indexExtension = Object.values(AllExtensions).indexOf(mimeType);
  return indexExtension >= 0 ? Object.keys(AllExtensions)[indexExtension] : undefined;
};

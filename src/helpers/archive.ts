import {
  Archive,
  ArchiveRef,
  NestedArchive,
} from '@models/entities/archives/archive';
import { OBJECT_ID_REGEX } from '@models/schema/base.schema';
import { BASE_API_URL } from '@services/shared/instance';
import { ModuleFolderName } from '../models/requests/archive.req';

const archiveBreadcrumbs = (
  archives: Omit<NestedArchive, 'children'>[],
  archiveId: string,
) => {
  const breadcrumbs: { label: string; url: string }[] = [
    { label: '根目錄', url: '' },
  ];
  let parentId: string | undefined = archiveId;
  while (parentId) {
    const parent = archives?.find((archive) => archive._id === parentId);
    if (!parent) break;

    breadcrumbs.splice(1, 0, {
      label: archiveFolderName(parent),
      url: `${parent._id}`,
    });
    parentId = parent.parentId;
  }
  return breadcrumbs;
};

const archiveIcon = (archive: Archive) => {
  if (archive.type === 'Folder') return 'folder';
  switch (archive.extension) {
    case 'txt':
    case 'csv':
    case 'odp':
    case 'ppt':
    case 'pptx':
      return 'file-text2';
    case 'odt':
    case 'doc':
    case 'docx':
      return 'file-word';
    case 'ods':
    case 'xls':
    case 'xlsx':
      return 'file-excel';
    case 'pdf':
      return 'file-pdf';
    case 'jpg':
    case 'png':
    case 'gif':
      return 'file-picture';
    case 'mp3':
      return 'file-music';
    // case '':
    //   return 'file-play';
    case 'mp4':
      return 'file-video';
    case 'zip':
    case 'rar':
    case '7z':
      return 'file-zip';
    default:
      return 'files-empty';
  }
};

const archiveIsImage = (archive: Archive) =>
  ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(archive.extension as string);

const moduleFolderNameMap: { [key: string]: string } = {
  carousels: '廣告輪播',
  catalogs: '新書通報',
  faq: '常見問題',
  feedbacks: '意見反映',
  news: '最新消息',
  temporary: '臨時性公告',
  pages: '頁面管理',
  questionnaires: '問卷',
  rooms: '空間管理',
  statistics: '統計報表',
  albums: '相簿管理',
  temp: '暫存區',
};

const archiveFolderName = (archive: Archive) => {
  const prefix = !archive.parentId
    ? archive.isModuleFolder
      ? '[模組] '
      : '[自訂] '
    : '';
  return `${prefix}${moduleFolderNameMap[archive.name] || archive.name}`;
};

const archiveSize = (archive: Archive) => {
  const fileSize = archive.size;
  if (!fileSize) return '0';

  const i = Math.floor(Math.log(fileSize) / Math.log(1024));
  const unitSize = (fileSize / Math.pow(1024, i)).toFixed(2);
  const unit = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'][i];
  return `${unitSize} ${unit}`;
};

const getModuleUrl = (ref: ArchiveRef) => {
  switch (ref.module) {
    case ModuleFolderName.carousels:
      return `/zigong/carousel-management`;
    case ModuleFolderName.catalogs:
      return `/zigong/catalog-management/${ref._id}`;
    case ModuleFolderName.faq:
      return `/zigong/faq-management/${ref._id}`;
    case ModuleFolderName.feedbacks:
      return `/zigong/feedback-management/${ref._id}`;
    case ModuleFolderName.news:
      return `/zigong/news-management/${ref._id}`;
    case ModuleFolderName.temporary:
      return `/zigong/opening-management`;
    case ModuleFolderName.pages:
      return `/zigong/route-management/${ref._id}`;
    case ModuleFolderName.questionnaires:
      return `/zigong/questionnaire-management/${ref._id}`;
    case ModuleFolderName.rooms:
      return `/zigong/space-management/room-reservation`;
    case ModuleFolderName.statistics:
      return `/zigong/statistics-management`;
    case ModuleFolderName.albums:
      return `/zigong/album-management/${ref._id}`;
    default:
      return '/zigong';
  }
};

const getFileUrl = (url: string, full: boolean = false) =>
  OBJECT_ID_REGEX.test(url)
    ? `${full ? window.location.origin : ''}${BASE_API_URL}/archives/${url}`
    : url;

export {
  archiveBreadcrumbs,
  archiveFolderName,
  archiveIcon,
  archiveIsImage,
  archiveSize,
  getFileUrl,
  getModuleUrl,
  moduleFolderNameMap,
};

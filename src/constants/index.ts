export const ACCESS_TOKEN = 'access_token';
export const REFRESH_TOKEN = 'refresh_token';

export const JWT_REFRESH_SECRET = 'JWT_REFRESH_SECRET';
export const JWT_ACCESS_SECRET = 'JWT_ACCESS_SECRET';
export const JWT_ACCESS_EXPIRES = 'JWT_ACCESS_EXPIRES';
export const JWT_REFRESH_EXPIRES = 'JWT_REFRESH_EXPIRES';

export const BCRYPT_HASH_ROUNDS = 10;

/**
 * Контроллер для загрузки файлов.
 *
 * Поддерживаются следующие форматы файлов:
 *
 * Изображения:
 * - image/png
 * - image/jpeg или image/jpg
 * - image/gif
 * - image/bmp
 * - image/svg+xml
 *
 * Документы:
 * - application/pdf (PDF)
 * - application/msword (старый формат DOC)
 * - application/vnd.openxmlformats-officedocument.wordprocessingml.document (DOCX)
 *
 * Аудио:
 * - audio/mpeg (MP3)
 *
 * Текстовые файлы:
 * - text/plain (TXT)
 *
 * Видео:
 * - video/mp4 (MP4)
 *
 */

export const FILE_TYPE =
  /^(image\/(png|jpe?g|gif|bmp|svg\+xml)|application\/(pdf|msword|vnd\.openxmlformats-officedocument\.wordprocessingml\.document)|audio\/mpeg|text\/plain|video\/mp4)$/;

/**
 * Каталог для сохранения загруженных файлов (от корня проекта)
 */
export const UPLOAD_FOLDER = 'storage';

/**
 * Сейчас 50MB
 */
export const MAX_FILE_SIZE = 1024 * 1024 * 50;

/**
 * Максимальное количество файлов для загрузки за раз
 */
export const MAX_FILES_PER_UPLOAD = 5;

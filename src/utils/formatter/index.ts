/* eslint-disable @typescript-eslint/no-unused-vars */
// Преобразует текст в нижний регистр
export const lowerCase = (text: string): string => text.toLowerCase();

// Возвращает сообщение для валидации формы
export const formMessage = (text: string): string =>
  `Пожалуйста, заполните поле ${lowerCase(text)}!`;

// Убирает пробелы из строки
export const formatStringJoin = (value: string): string => value.replace(/\s+/g, '');

// Форматирует телефонный номер, добавляя код страны +998
export const formatPhoneStringJoin = (value: string): string => `+998${formatStringJoin(value)}`;

// Форматирует число как цену с разделением тысяч и указанием валюты
export const formatPrice = (number: number, type: string): string =>
  number ? `${number.toLocaleString('en-AU')} ${type}` : `0 ${type}`;

// Форматирует число с разделением тысяч (например, 1000 -> 1,000)
export const formatNum = <T extends number | string>(value: T): string =>
  `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

// Возвращает значение или дефолтное значение '-'
export const formatEmptyValue = (value?: string): string => value || '-';

export function removeProperties(obj: any, props: string[], deleteProps?: string[]) {
  const newObj = { ...obj };

  // Удаляем свойства из props с проверкой
  props.forEach((prop) => {
    if (newObj[prop] === undefined || newObj[prop] === null || newObj[prop] === '') {
      delete newObj[prop];
    }
  });

  // Удаляем свойства из deleteProps без проверки
  deleteProps?.forEach((prop) => {
    delete newObj[prop];
  });

  return newObj;
}
export function capitalizeFirstLetter(str: string) {
  if (!str) return ''; // Проверка на пустую строку
  return str.charAt(0).toUpperCase() + str.slice(1);
}
export function isValidImage(url: string) {
  const img = new Image();
  img.onload = () => true; // Успешно загружено
  img.onerror = () => false; // Ошибка загрузки
  img.src = url;
}
export function isYouTubeVideoUrl(url: string) {
  try {
    const parsedUrl = new URL(url);
    const hostname = parsedUrl.hostname;

    // Проверяем, принадлежит ли URL YouTube
    const isYouTube =
      hostname === 'www.youtube.com' || hostname === 'youtube.com' || hostname === 'youtu.be';

    // Проверяем наличие параметра `v` для основного URL (www.youtube.com или youtube.com)
    const isVideo =
      isYouTube && (hostname === 'www.youtube.com' || hostname === 'youtube.com')
        ? parsedUrl.searchParams.has('v')
        : hostname === 'youtu.be'; // Сокращенные ссылки YouTube

    return isYouTube && isVideo;
  } catch (e) {
    // Если URL некорректный, возвращаем false
    return false;
  }
}
export function convertToEmbedUrl(url: string) {
  try {
    const parsedUrl = new URL(url);

    // Извлекаем ID видео в зависимости от формата ссылки
    const videoId =
      parsedUrl.hostname === 'youtu.be'
        ? parsedUrl.pathname.slice(1)
        : parsedUrl.searchParams.get('v');

    // Формируем embed URL, если найден ID
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  } catch {
    // Возвращаем исходный URL, если произошла ошибка
    return url;
  }
}

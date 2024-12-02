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

export function removeProperties(obj: any, props: string[]) {
  const newObj = { ...obj }; // Создаем копию объекта
  props.forEach((prop) => delete newObj[prop]); // Удаляем каждое свойство из массива
  return newObj; // Возвращаем новый объект
}

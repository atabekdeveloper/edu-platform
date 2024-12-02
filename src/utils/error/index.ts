import { message } from 'antd';

interface ApiError {
  response?: {
    status?: number;
    data?: {
      message?: string;
      code?: string;
    };
  };
  message?: string; // Ошибка верхнего уровня
}

export const handleError = (err: ApiError): string => {
  const { response, message: topLevelMessage } = err;

  // Обработка HTTP-статусов
  const statusMessages: Record<number, string> = {
    400: 'Bad request. Please check your input.',
    401: 'Unauthorized. Please log in again.',
    403: 'Forbidden. You do not have access.',
    404: 'Not found. Please try again later.',
    500: 'Internal server error. Try again later.',
  };

  const errorMessage =
    response?.data?.message || // Сообщение от API
    statusMessages[response?.status || 0] || // Кастомные сообщения по статусу
    topLevelMessage || // Ошибка верхнего уровня
    'Something went wrong'; // Фолбек-сообщение

  // Показ сообщения пользователю
  message.error(errorMessage);

  // Логирование ошибки (можно добавить интеграцию с Sentry или консоль)
  if (import.meta.env.NODE_ENV === 'development') {
    console.error('API Error:', err);
  }

  return errorMessage;
};

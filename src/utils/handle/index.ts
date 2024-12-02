export const handleNumericInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>): void => {
  const allowedKeys = [
    'Backspace', // Удаление
    'Delete', // Удаление вперед
    'ArrowLeft', // Левая стрелка
    'ArrowRight', // Правая стрелка
    'Tab', // Табуляция
  ];

  if (
    !allowedKeys.includes(event.key) && // Разрешённые клавиши
    (event.key < '0' || event.key > '9') // Числовые символы
  ) {
    event.preventDefault(); // Блокируем ввод неподходящих символов
  }
};

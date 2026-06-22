// src/components/MessageHistory.tsx
import React from 'react';
import './MessageHistory.css'; // стили будут в отдельном файле (или можно в App.css)

// --- Типизация данных ---

// Тип для автора сообщения
interface From {
  name: string;
}

// Тип для одного сообщения
interface Message {
  id: string;
  from: From;
  type: 'response' | 'message' | 'typing'; // ограничиваем возможные значения
  time: string;
  text?: string; // может отсутствовать для типа 'typing'
}

// Тип для пропсов компонента
interface MessageHistoryProps {
  list?: Message[]; // по умолчанию пустой массив
}

// --- Компонент ---
const MessageHistory: React.FC<MessageHistoryProps> = ({ list = [] }) => {
  // Если список пуст – ничего не рендерим
  if (!list || list.length === 0) {
    return null;
  }

  return (
    <div className="chat-history">
      {list.map((msg) => {
        // Определяем CSS-класс в зависимости от типа
        let messageClass = '';
        switch (msg.type) {
          case 'message':
            messageClass = 'message-own';
            break;
          case 'response':
            messageClass = 'message-response';
            break;
          case 'typing':
            messageClass = 'message-typing';
            break;
          default:
            messageClass = '';
        }

        return (
          <div key={msg.id} className={`message-item ${messageClass}`}>
            <div className="message-header">
              <span className="message-author">{msg.from.name}</span>
              <span className="message-time">{msg.time}</span>
            </div>
            {msg.type === 'typing' ? (
              <div className="typing-indicator">
                <span>печатает...</span>
              </div>
            ) : (
              <div className="message-bubble">{msg.text}</div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default MessageHistory;
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor() { }

  showNotification(message: string, type: 'success' | 'error' | 'info' | 'warning' = 'info'): void {
    // Remove any existing notification
    const existingNotification = document.getElementById('custom-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.id = 'custom-notification';
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-content">
        <span class="notification-message">${message}</span>
        <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Add styles
    const style = document.createElement('style');
    style.textContent = `
      .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 9999;
        min-width: 300px;
        max-width: 400px;
        padding: 16px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        animation: slideIn 0.3s ease-out;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      
      .notification-success {
        background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
        color: white;
      }
      
      .notification-error {
        background: linear-gradient(135deg, #dc3545 0%, #c82333 100%);
        color: white;
      }
      
      .notification-info {
        background: linear-gradient(135deg, #17a2b8 0%, #138496 100%);
        color: white;
      }
      
      .notification-warning {
        background: linear-gradient(135deg, #ffc107 0%, #e0a800 100%);
        color: #212529;
      }
      
      .notification-content {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      
      .notification-message {
        flex: 1;
        font-size: 14px;
        font-weight: 500;
        line-height: 1.4;
      }
      
      .notification-close {
        background: none;
        border: none;
        color: inherit;
        font-size: 20px;
        font-weight: bold;
        cursor: pointer;
        padding: 0;
        width: 24px;
        height: 24px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        transition: background-color 0.2s ease;
      }
      
      .notification-close:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
      
      @keyframes slideIn {
        from {
          transform: translateX(100%);
          opacity: 0;
        }
        to {
          transform: translateX(0);
          opacity: 1;
        }
      }
      
      @keyframes slideOut {
        from {
          transform: translateX(0);
          opacity: 1;
        }
        to {
          transform: translateX(100%);
          opacity: 0;
        }
      }
    `;

    // Add to document
    document.head.appendChild(style);
    document.body.appendChild(notification);

    // Auto remove after 5 seconds
    setTimeout(() => {
      if (notification && notification.parentElement) {
        notification.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
          if (notification && notification.parentElement) {
            notification.remove();
          }
        }, 300);
      }
    }, 5000);
  }

  success(message: string): void {
    this.showNotification(message, 'success');
  }

  error(message: string): void {
    this.showNotification(message, 'error');
  }

  info(message: string): void {
    this.showNotification(message, 'info');
  }

  warning(message: string): void {
    this.showNotification(message, 'warning');
  }
}

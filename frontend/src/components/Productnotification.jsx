import React, { useState } from "react";

const NotificationBell = ({ notifications, markNotificationAsSeen }) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prevState) => !prevState);
  };

  const unseenNotifications = notifications.filter(
    (notification) => !notification.seen
  );

  return (
    <div className="bell-container">
      {/* Bell Icon */}
      <div className="bell-icon" onClick={toggleDropdown}>
        <span role="img" aria-label="bell">🔔</span>

        {/* Show notification badge if there are unseen notifications */}
        {unseenNotifications.length > 0 && (
          <span className="notification-badge">{unseenNotifications.length}</span>
        )}
      </div>

      {/* Notification Dropdown */}
      {dropdownVisible && (
        <div className="notification-dropdown">
          {unseenNotifications.length > 0 ? (
            <ul>
              {unseenNotifications.map((notification) => (
                <li
                  key={notification.id}
                  onClick={() => {
                    markNotificationAsSeen(notification.id); // Mark as seen when clicked
                    toggleDropdown(); // Close dropdown after clicking
                  }}
                >
                  {notification.message}
                </li>
              ))}
            </ul>
          ) : (
            <p>No new notifications.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationBell;

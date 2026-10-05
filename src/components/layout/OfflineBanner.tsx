import { useEffect, useState } from 'react';

/**
 * Tells the student when the app is offline.
 *
 * Progress is stored locally, so nothing is lost without a connection — the
 * banner says exactly that rather than just warning about the network. The plan
 * asks for offline study with a later sync, and this is the honest version of
 * it while there is no backend to sync to.
 */
const OfflineBanner = () => {
  const [offline, setOffline] = useState(
    typeof navigator !== 'undefined' ? !navigator.onLine : false,
  );

  useEffect(() => {
    const goOffline = () => setOffline(true);
    const goOnline = () => setOffline(false);

    window.addEventListener('offline', goOffline);
    window.addEventListener('online', goOnline);

    return () => {
      window.removeEventListener('offline', goOffline);
      window.removeEventListener('online', goOnline);
    };
  }, []);

  if (!offline) return null;

  return (
    <div
      role="status"
      className="bg-amber-100 border-b border-amber-300 px-4 py-2 text-center text-sm text-amber-900"
    >
      You are offline. Lessons and questions you have already opened still work, and your progress
      is saved on this device.
    </div>
  );
};

export default OfflineBanner;

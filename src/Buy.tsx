import { useEffect, useRef } from 'react';

export default function InvenieWidget() {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const host = container.current;
    if (!host) return;
    const script = document.createElement("script");
    script.src = "https://api.invenie.com/widget-assets/embed.js";
    script.dataset.widget = "6a751578ff5ae1e68adfe80a3700b4bf3025102927f39cc6";
    script.async = true;
    host.appendChild(script);
    return () => { host.replaceChildren(); };
  }, []);
  return (
    <section className="buy-page">
      <div className="container">
        <a href={`${import.meta.env.BASE_URL}#home`} className="back-link">← Back to home</a>
        <div className="buy-page-content" ref={container} />
      </div>
    </section>
  );
}
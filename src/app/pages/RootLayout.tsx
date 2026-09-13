import { Outlet, ScrollRestoration } from 'react-router';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

/**
 * ScrollRestoration is not optional here, and its absence was a real bug.
 *
 * The router does not reset scroll position on navigation by itself. Clicking
 * the FAQ link in the footer — which sits ~2000px down the home page — changed
 * the route but left the window exactly where it was, so the visitor landed
 * below the FAQ's heading and saw what looked like a page that had not loaded.
 * The "Delivery & returns" link beside it appeared to work only because
 * /faq#delivery makes FaqPage scroll to its anchor by itself.
 *
 * This was never specific to the FAQ. Every link on the site behaved this way;
 * the FAQ is simply short enough that the failure was total rather than merely
 * disorienting.
 *
 * ScrollRestoration handles all three cases in the right order: it restores the
 * saved position on back/forward, scrolls to the element when the URL carries a
 * hash, and otherwise goes to the top. Because it scrolls to the hash target
 * itself, it does not fight FaqPage's own smooth scroll — both aim at the same
 * element, and the page's runs afterwards.
 */
export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollRestoration />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

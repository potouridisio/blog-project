/* eslint-disable react-refresh/only-export-components */
import { Outlet, useLoaderData } from 'react-router';

import Avatar from '../components/Avatar';

export function loader() {
  return fetch('/api/session');
}

function Root() {
  const session = useLoaderData();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <header className="fixed left-0 top-0 z-50 w-full bg-white shadow">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <h1 className="text-xl font-semibold">Blog Project</h1>
          <Avatar component="button">{session.user.name}</Avatar>
        </div>
      </header>
      <main className="mx-auto max-w-6xl grow p-6">
        <div className="h-16" />
        <Outlet context={session} />
      </main>
    </div>
  );
}

export default Root;

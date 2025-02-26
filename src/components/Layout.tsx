import { PropsWithChildren } from 'react';

import { Bell, FileText, Home, Image, Key, Mail } from 'lucide-react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import useDomainStore from '@/store';
import { cn } from '@/utils/cn';

import DomainDisplay from './DomainTooltip';
import ServerInputModal from './ServerInputModal';

const menuItems = [
  { path: '/crud', label: 'CRUD', icon: <Home className='h-5 w-5' /> },
  {
    path: '/paging/offset/1',
    label: 'Paging',
    icon: <FileText className='h-5 w-5' />,
  },
  { path: '/email', label: 'Email', icon: <Mail className='h-5 w-5' /> },
  { path: '/oauth', label: 'OAuth', icon: <Key className='h-5 w-5' /> },
  {
    path: '/imageuploader',
    label: 'Image Uploader',
    icon: <Image className='h-5 w-5' />,
  },
  { path: '/fcm', label: 'FCM', icon: <Bell className='h-5 w-5' /> },
] as const;

const Layout = ({ children }: PropsWithChildren) => {
  const { domain } = useDomainStore();
  const { pathname } = useLocation();

  // Tutorial check
  if (
    localStorage.getItem('tutorial_end') !== 'end' &&
    pathname !== '/tutorial'
  ) {
    return <Navigate to='/tutorial' replace />;
  }

  const isActiveRoute = (path: string) => {
    if (path.startsWith('/paging') && pathname.startsWith('/paging'))
      return true;
    if (path.startsWith('/oauth') && pathname.startsWith('/oauth')) return true;
    return pathname.includes(path);
  };

  return (
    <div className='flex h-screen flex-col'>
      <header className='flex items-center justify-between border-b bg-white p-[20px] shadow-sm'>
        <Link to='/'>
          <span className='text-2xl font-bold text-zinc-800'>
            SSAFY SANDBOX
          </span>
        </Link>
        <div className='flex items-center gap-[20px]'>
          <ServerInputModal />
          {domain && <DomainDisplay domain={domain} />}
        </div>
      </header>
      <div className='flex w-full grow'>
        <nav className='flex h-full min-w-[200px] flex-col border-r bg-white py-[20px]'>
          <div className='flex grow flex-col gap-2 px-3 text-zinc-500'>
            {menuItems.map(item => (
              <Link key={item.path} to={item.path}>
                <div
                  className={cn(
                    'flex cursor-pointer items-center gap-3 rounded p-3 text-[15px]',
                    isActiveRoute(item.path)
                      ? 'bg-zinc-100 font-medium text-zinc-900'
                      : 'hover:bg-zinc-50 hover:text-zinc-900',
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </div>
              </Link>
            ))}
          </div>
          <Link to='/qualityAssurance'>
            <div
              className={cn(
                'mx-3 flex cursor-pointer items-center gap-3 rounded p-3 text-[15px]',
                pathname === '/qualityAssurance'
                  ? 'bg-zinc-100 font-medium text-zinc-900'
                  : 'text-zinc-500 hover:bg-zinc-50 hover:text-zinc-900',
              )}
            >
              <FileText className='h-5 w-5' />
              <span>Quality Assurance</span>
            </div>
          </Link>
        </nav>
        <div className='flex w-full flex-col bg-white'>{children}</div>
      </div>
    </div>
  );
};

export default Layout;

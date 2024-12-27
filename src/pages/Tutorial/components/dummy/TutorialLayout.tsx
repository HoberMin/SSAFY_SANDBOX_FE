import { ReactNode, useEffect } from 'react';

import { FileText, Home, Image, Key, Mail } from 'lucide-react';
import { Link, Navigate, useLocation } from 'react-router-dom';

import DomainDisplay from '@/components/DomainTooltip';
import { Button } from '@/components/ui/button';
import useDomainStore from '@/store';
import { cn } from '@/utils/cn';

interface Tprops {
  children: ReactNode;
  currentStep: number;
}

const menuItems = [
  { path: '/crud', label: 'CRUD', icon: <Home className='h-5 w-5' /> },
  {
    path: '/paging/offset/1',
    label: 'Paging',
    icon: <FileText className='h-5 w-5' />,
  },
  { path: '/email', label: 'Email', icon: <Mail className='h-5 w-5' /> },
  { path: '/oauth/1', label: 'OAuth', icon: <Key className='h-5 w-5' /> },
  {
    path: '/imageuploader',
    label: 'Image Uploader',
    icon: <Image className='h-5 w-5' />,
  },
  // { path: '/fcm', label: 'FCM', icon: <Bell className='w-5 h-5' /> },
] as const;
const TutorialLayout = ({ children, currentStep }: Tprops) => {
  const { domain, setDomain } = useDomainStore();
  const { pathname } = useLocation();

  useEffect(() => {
    if (currentStep === 0) {
      setDomain('');
    }
    if (currentStep === 3) setDomain('http://localhost:8080');
  }, [currentStep]);

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
    <div className='pointer-events-none flex h-screen flex-col'>
      <header className='flex items-center justify-between border-b bg-white p-[20px] shadow-sm'>
        <Link to='/'>
          <span className='text-2xl font-bold text-zinc-800'>
            SSAFY SANDBOX
          </span>
        </Link>
        <div className='flex items-center gap-[20px]'>
          <Button
            variant='outline'
            className={cn(
              'border-zinc-200 bg-white text-zinc-800 hover:bg-zinc-50',
              currentStep === 0 ? 'z-40' : 'z-10',
            )}
          >
            Edit Base URL
          </Button>

          {domain && currentStep >= 3 && (
            <div className={currentStep === 3 ? 'z-40' : 'z-10'}>
              <DomainDisplay domain={domain} />
            </div>
          )}
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

export default TutorialLayout;

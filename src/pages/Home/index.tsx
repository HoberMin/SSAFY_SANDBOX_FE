import { Code2, Laptop2, Users } from 'lucide-react';

const Home = () => {
  return (
    <main className='flex h-full w-full flex-col items-center justify-center bg-white'>
      <div className='mx-auto flex max-w-4xl flex-col items-center space-y-12 px-4'>
        {/* Title Section */}
        <div className='animate-fade-in flex items-center gap-3'>
          <h1 className='text-5xl font-bold text-zinc-900'>SSAFY SANDBOX</h1>
        </div>

        {/* Main Description */}
        <p className='animate-fade-in-delay text-center text-lg text-zinc-500'>
          SSAFY의 백엔드 개발자들을 위한 API 테스트 플랫폼입니다.
        </p>

        {/* Feature Cards */}
        <div className='animate-fade-in-delay grid w-full grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='flex flex-col items-center space-y-4 rounded-lg border border-zinc-100 bg-white p-8 text-center transition-all hover:border-zinc-200'>
            <Users className='h-8 w-8 text-zinc-700' />
            <div>
              <h3 className='mb-2 font-semibold text-zinc-900'>
                효과적인 협업
              </h3>
              <p className='text-sm text-zinc-500'>
                백엔드와 프론트엔드 개발자 간의
                <br />
                원활한 소통을 지원합니다
              </p>
            </div>
          </div>

          <div className='flex flex-col items-center space-y-4 rounded-lg border border-zinc-100 bg-white p-8 text-center transition-all hover:border-zinc-200'>
            <Code2 className='h-8 w-8 text-zinc-700' />
            <div>
              <h3 className='mb-2 font-semibold text-zinc-900'>
                실시간 테스트
              </h3>
              <p className='text-sm text-zinc-500'>
                API 응답을 실시간으로 확인하며
                <br />
                빠른 개발이 가능합니다
              </p>
            </div>
          </div>

          <div className='flex flex-col items-center space-y-4 rounded-lg border border-zinc-100 bg-white p-8 text-center transition-all hover:border-zinc-200'>
            <Laptop2 className='h-8 w-8 text-zinc-700' />
            <div>
              <h3 className='mb-2 font-semibold text-zinc-900'>
                직관적인 검증
              </h3>
              <p className='text-sm text-zinc-500'>
                UI를 통해 손쉽게 기능을
                <br />
                테스트할 수 있습니다
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Description */}
        <p className='animate-fade-in-delay-2 max-w-2xl text-center text-zinc-500'>
          백엔드 개발자로서 필요한 다양한 기능들을 구현하고 테스트하며, 실제
          협업 환경에서의 경험을 쌓아보세요.
        </p>
      </div>
    </main>
  );
};

export default Home;

/* 애니메이션 스타일 */
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }

  .animate-fade-in-delay {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
    animation-delay: 0.2s;
  }

  .animate-fade-in-delay-2 {
    opacity: 0;
    animation: fadeIn 0.6s ease-out forwards;
    animation-delay: 0.4s;
  }
`;
document.head.appendChild(style);

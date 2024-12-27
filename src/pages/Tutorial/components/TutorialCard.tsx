import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import useDomainStore from '@/store';
import { cn } from '@/utils/cn';

const tutorialData = [
  {
    title: 'Base URL',
    content:
      '초기 상태는 서버의 Base URL이 클라이언트와 연결되어 있지 않은 상태입니다. Edit Base URL 을 누르고 Base URL을 입력해주세요.',
  },
  {
    title: 'Local Server',
    content:
      '로컬 서버는 첫번째 탭에서 http 기반으로 도메인을 작성해주세요. http 기반의 로컬 서버를 사용할 경우 일부 기능은 동작되지 않을 수 있습니다. (ex. 쿠키를 활용한 통신)',
  },
  {
    title: 'Deployed Server',
    content: '배포 서버는 두번째 탭에서 https 기반으로 작성해주세요.',
  },
  {
    title: 'My Base URL',
    content: '자신이 입력한 도메인을 확인할 수 있습니다.',
  },
  {
    title: '명세 및 기대 효과',
    content: '명세를 읽고 서버 로직을 구현해주세요.',
  },
  {
    title: '정상 동작 확인',
    content: 'UI를 활용해 통신 결과를 확인할 수 있습니다.',
  },
  {
    title: '디버깅',
    content:
      '개발자 도구의 네트워크 탭이나 애플리케이션 탭을 활용해 디버깅해보세요!',
  },
  {
    title: '문의 사항 및 이슈 전달',
    content:
      'QA탭에서 궁금한 점이나 에러사항을 전달할 수 있습니다. \n 익명도 가능하니, 편하게 참여해주세요!',
  },
];

interface Tprops {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  className: string;
}
const TutorialCard = ({ currentStep, setCurrentStep, className }: Tprops) => {
  const navigate = useNavigate();
  const { setDomain } = useDomainStore();

  const handleNext = () => {
    if (currentStep < tutorialData.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleExit = () => {
    localStorage.setItem('tutorial_end', 'end');
    setDomain('');
    navigate('/');
    setCurrentStep(0);
  };

  return (
    <Card
      className={cn(
        'pointer-events-auto absolute z-50 flex w-[366px] flex-col bg-white shadow-xl shadow-indigo-200/40',
        className,
      )}
    >
      <CardHeader>
        <div className='flex justify-between'>
          <div>
            <CardTitle className='text-md pb-4 text-base'>
              {tutorialData[currentStep].title}
            </CardTitle>
          </div>
          <button
            className='text-xs text-gray-400 underline underline-offset-1'
            onClick={handleExit}
          >
            스킵하기
          </button>
        </div>
      </CardHeader>

      <CardContent className='text-md pb-4 text-sm'>
        {tutorialData[currentStep].content}
      </CardContent>
      <CardFooter className='flex justify-between'>
        {currentStep > 0 ? (
          <Button variant='outline' onClick={handlePrev}>
            이전
          </Button>
        ) : (
          <Button className='invisible' variant='outline' onClick={handlePrev}>
            이전
          </Button>
        )}

        {currentStep === tutorialData.length - 1 ? (
          <Button onClick={handleExit}>종료</Button>
        ) : (
          <Button onClick={handleNext}>다음</Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default TutorialCard;

import { useState } from 'react';

import Overlay from './Overlay';
import TutorialCard from './components/TutorialCard';
import CRUD from './components/dummy/CRUD';
import ServerInputHttp from './components/dummy/ServerInputHttp';
import ServerInputHttps from './components/dummy/ServerInputHttps';
import TutorialLayout from './components/dummy/TutorialLayout';

const TutorialPage = () => {
  const [currentStep, setCurrentStep] = useState(0);

  if (currentStep === 0)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-12 top-24'
          />
        </TutorialLayout>
      </>
    );
  if (currentStep === 1)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='left-[30%] top-[18%]'
          />
          <ServerInputHttp />
        </TutorialLayout>
      </>
    );
  else if (currentStep === 2)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-[20%] top-[24%]'
          />
          <ServerInputHttps />
        </TutorialLayout>
      </>
    );
  else if (currentStep === 3)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-12 top-24'
          />
        </TutorialLayout>
      </>
    );
  else if (currentStep === 4)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-40 top-24'
          />
          <CRUD currentStep={currentStep} />
        </TutorialLayout>
      </>
    );
  else if (currentStep === 5)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='left-[42%] top-8'
          />
          <CRUD currentStep={currentStep} />
        </TutorialLayout>
      </>
    );
  else if (currentStep === 6)
    return (
      <>
        <Overlay />
        <TutorialLayout currentStep={currentStep}>
          <TutorialCard
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            className='right-10 top-24'
          />
          <CRUD currentStep={currentStep} />
        </TutorialLayout>
      </>
    );
  return (
    <>
      <Overlay />
      <TutorialLayout currentStep={currentStep}>
        <TutorialCard
          currentStep={currentStep}
          setCurrentStep={setCurrentStep}
          className='bottom-24 left-20'
        />
        <CRUD currentStep={currentStep} />
      </TutorialLayout>
    </>
  );
};

export default TutorialPage;

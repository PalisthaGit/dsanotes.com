"use client";

import { SimpleBreadcrumb } from '@/components/ui/SimpleBreadcrumb';
import { SearchVisualizer } from '@/components/visualizers/searching/search-visualizer';
import { SearchControls } from '@/components/visualizers/searching/searching-control';
import { useSearchVisualization } from '@/hooks/use-search-visualization';

function SearchPageContent() {
  const {
    array,
    setSortedArray,
    searchValue,
    setSearchValue,
    algorithm,
    setAlgorithm,
    speed,
    setSpeed,
    isStepMode,
    setIsStepMode,
    steps,
    currentStep,
    isRunning,
    isPaused,
    startSearch,
    handlePauseResume,
    handleStopSearch,
    stepForward,
  } = useSearchVisualization();

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-6">
      <h1 className="text-2xl font-bold text-center">Search Algorithms</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <SearchControls
          array={array}
          setSortedArray={(arr) => {
            handleStopSearch();
            setSortedArray(arr);
          }}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          speed={speed}
          setSpeed={setSpeed}
          isStepMode={isStepMode}
          setIsStepMode={setIsStepMode}
          steps={steps}
          currentStep={currentStep}
          isRunning={isRunning}
          isPaused={isPaused}
          onStart={startSearch}
          handlePauseResume={handlePauseResume}
          stepForward={stepForward}
        />

        <SearchVisualizer
          array={array}
          steps={steps}
          currentStep={currentStep}
          algorithm={algorithm}
          searchValue={searchValue}
        />
      </div>
    </div>
  );
}

export default function SearchingPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <SimpleBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Visualizer', href: '/visualizer' },
        { label: 'Search Algorithms' }
      ]} />
      <SearchPageContent />
    </div>
  );
}

"use client";

import { SimpleBreadcrumb } from '@/components/ui/SimpleBreadcrumb';
import { SortVisualizer } from '@/components/visualizers/sorting/sort-visualizer';
import { SortingControls } from '@/components/visualizers/sorting/sorting-control';
import { useSortVisualization } from '@/hooks/use-sort-visualization';
import { useCallback } from 'react';

function SortPageContent() {
  const {
    array,
    generateArray,
    resetArray,
    comparisons,
    swaps,
    setCustomArray,
    arraySize,
    setArraySize,
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
    startSorting,
    handlePauseResume,
    handleStopSorting,
    stepForward,
  } = useSortVisualization(20);

  const handleReset = useCallback(() => {
    handleStopSorting();
    resetArray();
  }, [handleStopSorting, resetArray]);

  const handleShuffle = useCallback(() => {
    handleStopSorting();
    generateArray();
  }, [handleStopSorting, generateArray]);

  return (
    <div className="max-w-7xl mx-auto space-y-4 p-3 sm:p-4 lg:p-6">
      <h1 className="text-2xl font-bold text-center">Sorting Algorithms</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="order-2 lg:order-1">
        <SortingControls
          arraySize={arraySize}
          setArraySize={setArraySize}
          onReset={handleReset}
          onShuffle={handleShuffle}
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
          comparisons={comparisons}
          swaps={swaps}
          startSorting={startSorting}
          handlePauseResume={handlePauseResume}
          stepForward={stepForward}
          setCustomArray={setCustomArray}
        />
        </div>

        <div className="order-1 lg:order-2 lg:col-span-3">
          <SortVisualizer array={array} steps={steps} currentStep={currentStep} />
        </div>
      </div>
    </div>
  );
}

export default function SortingPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <SimpleBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Visualizer', href: '/visualizer' },
        { label: 'Sorting Algorithms' }
      ]} />
      <SortPageContent />
    </div>
  );
}

"use client";

import { SimpleBreadcrumb } from '@/components/ui/SimpleBreadcrumb';
import { getAlgorithmsByCategory } from '@/algorithms/registry/graph-algorithms-registry';
import GraphCanvas from '@/components/visualizers/graph/graph-canvas';
import GraphControls from '@/components/visualizers/graph/graph-controls';
import GraphEditor from '@/components/visualizers/graph/graph-editor';
import SCCStepDisplay from '@/components/visualizers/graph/scc-step-display';
import { useSCCVisualization } from '@/hooks/use-scc-visualization';

const SCC_ALGORITHM_OPTIONS = getAlgorithmsByCategory('scc').map((def) => ({
  value: def.key,
  label: def.name,
}));

function SCCPageContent() {
  const {
    graphData,
    updateNodePosition,
    handleAddNode,
    handleAddEdge,
    handleClearGraph,
    handleGenerateRandom,
    edgeForm,
    handleEdgeFormChange,
    nodeCount,
    setNodeCount,
    edgeCount,
    setEdgeCount,
    algorithm,
    setAlgorithm,
    steps,
    currentStep,
    isRunning,
    isPaused,
    nodeStates,
    edgeStates,
    currentStepData,
    metadata,
    speed,
    setSpeed,
    isStepMode,
    setIsStepMode,
    startVisualization,
    handlePauseResume,
    stepForward,
    stepBackward,
  } = useSCCVisualization();

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold text-center">Strongly Connected Components</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="space-y-4">
          <GraphControls
            algorithms={SCC_ALGORITHM_OPTIONS}
            selectedAlgorithm={algorithm}
            setSelectedAlgorithm={setAlgorithm}
            speed={speed}
            setSpeed={setSpeed}
            isStepMode={isStepMode}
            setIsStepMode={setIsStepMode}
            steps={steps}
            currentStep={currentStep}
            isRunning={isRunning}
            isPaused={isPaused}
            onStart={startVisualization}
            onPauseResume={handlePauseResume}
            onStepForward={stepForward}
            onStepBackward={stepBackward}
          />

          <GraphEditor
            graphData={graphData}
            addNode={handleAddNode}
            addEdge={handleAddEdge}
            clearGraph={handleClearGraph}
            generateRandom={handleGenerateRandom}
            edgeForm={edgeForm}
            handleEdgeFormChange={handleEdgeFormChange}
            nodeCount={nodeCount}
            setNodeCount={setNodeCount}
            edgeCount={edgeCount}
            setEdgeCount={setEdgeCount}
          />
        </div>

        <div className="lg:col-span-3 space-y-4">
          <GraphCanvas
            graph={graphData}
            nodeStates={nodeStates}
            edgeStates={edgeStates}
            onNodeMove={updateNodePosition}
            directed
          />

          {currentStepData && (
            <SCCStepDisplay
              step={currentStepData}
              metadata={metadata}
              algorithm={algorithm}
              graphData={graphData}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default function SCCPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <SimpleBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Visualizer', href: '/visualizer' },
        { label: 'Strongly Connected Components' }
      ]} />
      <SCCPageContent />
    </div>
  );
}

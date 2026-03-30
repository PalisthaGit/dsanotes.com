"use client";

import { SimpleBreadcrumb } from '@/components/ui/SimpleBreadcrumb';
import { getAlgorithmsByCategory } from '@/algorithms/registry/graph-algorithms-registry';
import GraphCanvas from '@/components/visualizers/graph/graph-canvas';
import GraphControls from '@/components/visualizers/graph/graph-controls';
import GraphEditor from '@/components/visualizers/graph/graph-editor';
import MSTStepDisplay from '@/components/visualizers/graph/mst-step-display';
import { useMSTVisualization } from '@/hooks/use-mst-visualization';
import { useMemo } from 'react';

const MST_ALGORITHM_OPTIONS = getAlgorithmsByCategory('mst').map((def) => ({
  value: def.key,
  label: def.name,
}));

function MSTPageContent() {
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
    speed,
    setSpeed,
    isStepMode,
    setIsStepMode,
    startNodeId,
    setStartNodeId,
    nodeStates,
    edgeStates,
    currentStepData,
    metadata,
    startVisualization,
    handlePauseResume,
    stepForward,
    stepBackward,
  } = useMSTVisualization();

  const additionalSelects = useMemo(() => {
    if (algorithm !== 'prim') return [];
    return [
      {
        label: 'Start Node',
        value: startNodeId ?? graphData.nodes[0]?.id ?? '',
        onChange: (id: string) => setStartNodeId(id),
        options: graphData.nodes.map((n) => ({
          value: n.id,
          label: n.label ?? n.id,
        })),
      },
    ];
  }, [algorithm, startNodeId, graphData.nodes, setStartNodeId]);

  return (
    <div className="space-y-4 p-6">
      <h1 className="text-2xl font-bold text-center">MST Algorithms</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <div className="space-y-4">
          <GraphControls
            algorithms={MST_ALGORITHM_OPTIONS}
            selectedAlgorithm={algorithm}
            setSelectedAlgorithm={setAlgorithm}
            additionalSelects={additionalSelects}
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
          />

          {currentStepData && (
            <MSTStepDisplay
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

export default function MSTPage() {
  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <SimpleBreadcrumb items={[
        { label: 'Home', href: '/' },
        { label: 'Visualizer', href: '/visualizer' },
        { label: 'MST Algorithms' }
      ]} />
      <MSTPageContent />
    </div>
  );
}

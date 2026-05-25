import { useState } from 'react';
import { Play, Square, GitBranch, Circle, Save, Plus, Settings } from 'lucide-react';
import Card from '../../../shared/components/cards/Card';
import Button from '../../../shared/components/buttons/Button';

interface WorkflowNode {
  id: string;
  type: 'start' | 'task' | 'gateway' | 'end';
  label: string;
  x: number;
  y: number;
}

const workflowNodes: WorkflowNode[] = [
  { id: '1', type: 'start', label: 'Start', x: 100, y: 100 },
  { id: '2', type: 'task', label: 'Request Cuti', x: 100, y: 200 },
  { id: '3', type: 'gateway', label: 'Approval Manager?', x: 100, y: 300 },
  { id: '4', type: 'task', label: 'Approve', x: 50, y: 400 },
  { id: '5', type: 'task', label: 'Reject', x: 150, y: 400 },
  { id: '6', type: 'end', label: 'End', x: 100, y: 500 },
];

const activeWorkflows = [
  { id: 1, name: 'Workflow Cuti', status: 'active', instances: 12 },
  { id: 2, name: 'Workflow Purchase Order', status: 'active', instances: 8 },
  { id: 3, name: 'Workflow Expense Approval', status: 'active', instances: 23 },
  { id: 4, name: 'Workflow Invoice Validation', status: 'draft', instances: 0 },
  { id: 5, name: 'Workflow Recruitment', status: 'active', instances: 5 },
];

export default function BPMWorkflowStudioPage() {
  const [selectedNode, setSelectedNode] = useState<WorkflowNode | null>(null);

  const getNodeIcon = (type: string) => {
    switch (type) {
      case 'start':
        return <Play className="w-5 h-5" />;
      case 'task':
        return <Square className="w-5 h-5" />;
      case 'gateway':
        return <GitBranch className="w-5 h-5" />;
      case 'end':
        return <Circle className="w-5 h-5" />;
      default:
        return null;
    }
  };

  const getNodeColor = (type: string) => {
    switch (type) {
      case 'start':
        return 'bg-green-500';
      case 'task':
        return 'bg-[#7B2D8B]';
      case 'gateway':
        return 'bg-amber-500';
      case 'end':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>BPM (Workflow)</span>
        <span>/</span>
        <span className="text-foreground">BPM Studio</span>
      </div>

      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl mb-1">BPM Workflow Studio</h1>
          <p className="text-sm text-muted-foreground">Workflow Cuti</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="secondary" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Properties
          </Button>
          <Button variant="primary" className="flex items-center gap-2">
            <Save className="w-4 h-4" />
            Save Workflow
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Workflow List */}
        <Card title="Active Workflows" className="lg:col-span-1">
          <div className="space-y-2">
            {activeWorkflows.map((workflow) => (
              <div
                key={workflow.id}
                className={`p-3 border border-border rounded-lg cursor-pointer hover:bg-secondary transition-colors ${
                  workflow.id === 1 ? 'bg-[#7B2D8B] text-white hover:bg-[#7B2D8B]' : ''
                }`}
              >
                <div className="text-sm mb-1">{workflow.name}</div>
                <div className="flex items-center justify-between text-xs">
                  <span className={workflow.id === 1 ? 'text-white/80' : 'text-muted-foreground'}>
                    {workflow.status === 'active' ? 'Active' : 'Draft'}
                  </span>
                  <span className={workflow.id === 1 ? 'text-white/80' : 'text-muted-foreground'}>
                    {workflow.instances} instances
                  </span>
                </div>
              </div>
            ))}
            <Button variant="secondary" className="w-full flex items-center justify-center gap-2 mt-4">
              <Plus className="w-4 h-4" />
              New Workflow
            </Button>
          </div>
        </Card>

        {/* Canvas */}
        <Card title="Workflow Canvas" className="lg:col-span-2">
          <div className="relative bg-[#f5f5f7] rounded-lg border-2 border-dashed border-border h-[600px] overflow-hidden">
            {/* Grid pattern */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: 'radial-gradient(circle, #ccc 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Workflow nodes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {/* Connections */}
              <line x1="100" y1="120" x2="100" y2="200" stroke="#7B2D8B" strokeWidth="2" />
              <line x1="100" y1="220" x2="100" y2="300" stroke="#7B2D8B" strokeWidth="2" />
              <line x1="100" y1="320" x2="70" y2="400" stroke="#7B2D8B" strokeWidth="2" />
              <line x1="100" y1="320" x2="170" y2="400" stroke="#7B2D8B" strokeWidth="2" />
              <line x1="70" y1="420" x2="100" y2="500" stroke="#7B2D8B" strokeWidth="2" />
              <line x1="170" y1="420" x2="100" y2="500" stroke="#7B2D8B" strokeWidth="2" />
            </svg>

            {workflowNodes.map((node) => (
              <div
                key={node.id}
                className={`absolute flex flex-col items-center cursor-pointer pointer-events-auto ${
                  selectedNode?.id === node.id ? 'ring-2 ring-[#E91E8C]' : ''
                }`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                  transform: 'translate(-50%, -50%)',
                }}
                onClick={() => setSelectedNode(node)}
              >
                <div
                  className={`w-12 h-12 ${getNodeColor(
                    node.type
                  )} rounded-lg flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow`}
                >
                  {getNodeIcon(node.type)}
                </div>
                <span className="mt-2 text-xs bg-white px-2 py-1 rounded shadow-sm whitespace-nowrap">
                  {node.label}
                </span>
              </div>
            ))}
          </div>
        </Card>

        {/* Properties Panel */}
        <Card title="Node Properties" className="lg:col-span-1">
          {selectedNode ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm mb-2">Node Type</label>
                <input
                  type="text"
                  value={selectedNode.type}
                  readOnly
                  className="w-full px-3 py-2 bg-secondary border border-border rounded-lg"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Label</label>
                <input
                  type="text"
                  value={selectedNode.label}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Position X</label>
                <input
                  type="number"
                  value={selectedNode.x}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
                />
              </div>
              <div>
                <label className="block text-sm mb-2">Position Y</label>
                <input
                  type="number"
                  value={selectedNode.y}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
                />
              </div>
              {selectedNode.type === 'task' && (
                <>
                  <div>
                    <label className="block text-sm mb-2">Assigned To</label>
                    <select className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]">
                      <option>Manager</option>
                      <option>HR</option>
                      <option>Finance</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-2">Due Days</label>
                    <input
                      type="number"
                      placeholder="5"
                      className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7B2D8B]"
                    />
                  </div>
                </>
              )}
              <Button variant="danger" className="w-full">
                Delete Node
              </Button>
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-8">
              <GitBranch className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-sm">Pilih node untuk melihat properties</p>
            </div>
          )}
        </Card>
      </div>

      {/* Node Palette */}
      <Card title="Node Palette">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg hover:bg-secondary cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-green-500 rounded flex items-center justify-center text-white">
              <Play className="w-4 h-4" />
            </div>
            <span className="text-sm">Start</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg hover:bg-secondary cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-[#7B2D8B] rounded flex items-center justify-center text-white">
              <Square className="w-4 h-4" />
            </div>
            <span className="text-sm">Task</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg hover:bg-secondary cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-amber-500 rounded flex items-center justify-center text-white">
              <GitBranch className="w-4 h-4" />
            </div>
            <span className="text-sm">Gateway</span>
          </div>
          <div className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg hover:bg-secondary cursor-pointer transition-colors">
            <div className="w-8 h-8 bg-red-500 rounded flex items-center justify-center text-white">
              <Circle className="w-4 h-4" />
            </div>
            <span className="text-sm">End</span>
          </div>
        </div>
      </Card>
    </div>
  );
}

// SSE event types from SupportAtlas API

export type SSEEventType =
  | 'token'
  | 'tool_start'
  | 'tool_end'
  | 'action_card'
  | 'done'
  | 'error';

export interface TokenEvent {
  type: 'token';
  content: string;
}

export interface ToolStartEvent {
  type: 'tool_start';
  agentName: string;
  toolName: string;
  input: Record<string, unknown>;
}

export interface ToolEndEvent {
  type: 'tool_end';
  result: Record<string, unknown>;
}

export interface ActionCardEvent {
  type: 'action_card';
  actionId: string;
  description: string;
  payload: Record<string, unknown>;
}

export interface DoneEvent {
  type: 'done';
}

export interface ErrorEvent {
  type: 'error';
  message: string;
}

export type SSEEvent =
  | TokenEvent
  | ToolStartEvent
  | ToolEndEvent
  | ActionCardEvent
  | DoneEvent
  | ErrorEvent;

// Message types for chat history

export type MessageRole = 'user' | 'assistant' | 'system';

export interface AgentBadge {
  agentName: string;
  toolName: string;
  status: 'running' | 'done';
}

export interface ActionCard {
  actionId: string;
  description: string;
  payload: Record<string, unknown>;
  approved?: boolean;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
  streaming?: boolean;
  agentBadges?: AgentBadge[];
  actionCards?: ActionCard[];
}

// Session persistence

export interface ChatSession {
  sessionId: string;
  messages: ChatMessage[];
  createdAt: number;
  lastActiveAt: number;
}

// Widget config

export interface WidgetConfig {
  apiUrl: string;
  productSlug: string;
}

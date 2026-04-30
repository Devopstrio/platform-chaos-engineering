export enum ExperimentStatus {
  DRAFT = "DRAFT",
  SCHEDULED = "SCHEDULED",
  RUNNING = "RUNNING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
  ROLLING_BACK = "ROLLING_BACK",
  ROLLED_BACK = "ROLLED_BACK",
  STOPPED = "STOPPED"
}

export enum InjectionType {
  NETWORK_LATENCY = "NETWORK_LATENCY",
  NETWORK_LOSS = "NETWORK_LOSS",
  CPU_EXHAUSTION = "CPU_EXHAUSTION",
  MEMORY_EXHAUSTION = "MEMORY_EXHAUSTION",
  POD_KILL = "POD_KILL",
  SERVICE_STOP = "SERVICE_STOP",
  DISK_FILL = "DISK_FILL",
  DNS_FAILURE = "DNS_FAILURE"
}

export interface ChaosInjection {
  id: string;
  type: InjectionType;
  target: string; // e.g., "service-name", "pod-id"
  durationSeconds: number;
  parameters: Record<string, any>; // e.g., { latency: "200ms" }
}

export interface ExperimentScenario {
  id: string;
  name: string;
  hypothesis: string;
  steadyStateQueries: string[]; // Prometheus queries to validate stability
  injections: ChaosInjection[];
  rollbackCondition: string; // e.g., "error_rate > 5%"
  blastRadiusScore: number; // 1-10
}

export interface ExperimentExecution {
  executionId: string;
  experimentId: string;
  status: ExperimentStatus;
  startTime: string;
  endTime?: string;
  metricsCaptured: Record<string, any>;
  findings: string;
  riskMitigated: boolean;
}

export interface ResilienceKPIs {
  totalExperiments: number;
  recoverySuccessRate: number; // Percentage
  avgRollbackTimeSeconds: number;
  criticalBugsFound: number;
  resilienceScore: number; // 0-100
}

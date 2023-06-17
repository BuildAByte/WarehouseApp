interface loginResponse {
  token: string;
  user: user;
}

export enum Milliseconds {
  SECOND = 1000,
  MINUTE = 60 * SECOND,
  HOUR = 60 * MINUTE,
  DAY = 24 * HOUR,
  WEEK = 7 * DAY,
  MONTH = 30 * DAY,
}

// const url = "http://localhost:3000";
const url = "https://warehousebackend-production-7bd5.up.railway.app";

export interface user {
  id: number;
  name: string;
  admin: boolean;
  password?: string;
}

export type userWithTime = user & { time: number };

export enum WorkType {
  PICKING = "picking",
  PACKING = "packing",
  LABELLING = "labelling",
  "LIQUID PRODUCTION" = "liquid production",
  PREPARATION = "preparation",
  CHECKING = "checking",
  RESTOCKING = "restocking",
  "SUB DIVISION" = "sub division",
}

type WorkTypesToTimeSpent = Record<WorkType, number>;
export type WorkerToWorkTypeMapped = Record<string, WorkTypesToTimeSpent>;

export interface work {
  id: number;
  work_type: WorkType;
  start_timestamp: string;
  end_timestamp: string;
  worker_id: number;
}

export async function loginWorker(
  name: string,
  password: string
): Promise<loginResponse> {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, password }),
  };
  const result = await fetch(`${url}/worker/login`, options);
  return result.json();
}

export async function getWorkers(): Promise<user[]> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };

  const result = await fetch(`${url}/worker`, options);
  return result.json();
}

export async function addWorker(name: string, password: string) {
  const token = localStorage.getItem("token");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({ name, password }),
  };
  const result = await fetch(`${url}/worker`, options);
  return result.json();
}

export async function getWorks(): Promise<work[]> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(`${url}/picking`, options);
  return result.json();
}

export async function assignWorkToWorker(
  workerId: number,
  workType: string
): Promise<work> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify({ workerId, workType }),
  };
  const result = await fetch(`${url}/picking/assign`, options);
  return result.json();
}

export async function getWorkTypes(): Promise<string[]> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(`${url}/picking/work`, options);
  return result.json();
}

export async function createWork(workType: string): Promise<work> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "POST",
    body: JSON.stringify({
      workType: workType,
    }),
  };
  console.log(options);
  const result = await fetch(`${url}/picking`, options);
  return result.json();
}

export async function deleteWork(workId: number) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
  };
  const result = await fetch(`${url}/picking/` + workId, options);
  return result.json();
}

export async function getActiveWork(): Promise<work[]> {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(`${url}/picking/active`, options);
  return result.json();
}

export async function updateWork(
  workId: number,
  subtask?: string,
  subtaskQuantity?: number
) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "PUT",
    body: JSON.stringify({ subtask, subtaskQuantity }),
  };
  const result = await fetch(`${url}/picking/` + workId, options);
  return result.json();
}

export async function getSubTasks(workType: WorkType) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(`${url}/picking/subtasks/${workType}`, options);
  return result.json();
}

export async function getTimeSpentByWorkers(
  startTimestamp = new Date(Date.now() - Milliseconds.MONTH),
  endTimestamp = new Date()
) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };

  const result = await fetch(
    `${url}/picking/time/${startTimestamp.toISOString()}/${endTimestamp.toISOString()}`,
    options
  );
  return (await result.json()) as WorkerToWorkTypeMapped;
}

export async function updateWorker(worker: user) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "PUT",
    body: JSON.stringify(worker),
  };
  const result = await fetch(`${url}/worker/` + worker.id, options);
  return result.json();
}

export async function deleteWorker(worker: user) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "DELETE",
    body: JSON.stringify(worker),
  };
  const result = await fetch(`${url}/worker/` + worker.id, options);
  return result.json();
}

export async function getAllPickingsAdmin() {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(`${url}/picking/all`, options);
  return result.json() as Promise<Array<work & { worker_name: string }>>;
}

export async function downloadCsv(
  startTimestamp = new Date(Date.now() - Milliseconds.MONTH),
  endTimestamp = new Date()
) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(
    `${url}/picking/csv/${startTimestamp.toISOString()}/${endTimestamp.toISOString()}`,
    options
  );
  return result.blob();
}

export async function downloadSubtaskCsv(
  startTimestamp = new Date(Date.now() - Milliseconds.MONTH),
  endTimestamp = new Date()
) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    method: "GET",
  };
  const result = await fetch(
    `${url}/picking/subtasks_csv/${startTimestamp.toISOString()}/${endTimestamp.toISOString()}`,
    options
  );
  return result.blob();
}

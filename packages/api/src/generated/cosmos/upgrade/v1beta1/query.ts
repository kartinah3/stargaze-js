/* eslint-disable */
import { Plan } from "../../../cosmos/upgrade/v1beta1/upgrade";
import * as Long from "long";
import { Reader, Writer } from "protobufjs/minimal";

export const protobufPackage = "cosmos.upgrade.v1beta1";

/**
 * QueryCurrentPlanRequest is the request type for the Query/CurrentPlan RPC
 * method.
 */
export interface QueryCurrentPlanRequest {}

/**
 * QueryCurrentPlanResponse is the response type for the Query/CurrentPlan RPC
 * method.
 */
export interface QueryCurrentPlanResponse {
  /** plan is the current upgrade plan. */
  plan?: Plan;
}

/**
 * QueryCurrentPlanRequest is the request type for the Query/AppliedPlan RPC
 * method.
 */
export interface QueryAppliedPlanRequest {
  /** name is the name of the applied plan to query for. */
  name: string;
}

/**
 * QueryAppliedPlanResponse is the response type for the Query/AppliedPlan RPC
 * method.
 */
export interface QueryAppliedPlanResponse {
  /** height is the block height at which the plan was applied. */
  height: Long;
}

/**
 * QueryUpgradedConsensusStateRequest is the request type for the Query/UpgradedConsensusState
 * RPC method.
 */
export interface QueryUpgradedConsensusStateRequest {
  /**
   * last height of the current chain must be sent in request
   * as this is the height under which next consensus state is stored
   */
  lastHeight: Long;
}

/**
 * QueryUpgradedConsensusStateResponse is the response type for the Query/UpgradedConsensusState
 * RPC method.
 */
export interface QueryUpgradedConsensusStateResponse {
  upgradedConsensusState: Uint8Array;
}

const baseQueryCurrentPlanRequest: object = {};

export const QueryCurrentPlanRequest = {
  encode(_: QueryCurrentPlanRequest, writer: Writer = Writer.create()): Writer {
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryCurrentPlanRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseQueryCurrentPlanRequest
    ) as QueryCurrentPlanRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(_: any): QueryCurrentPlanRequest {
    const message = globalThis.Object.create(
      baseQueryCurrentPlanRequest
    ) as QueryCurrentPlanRequest;
    return message;
  },

  fromPartial(
    _: DeepPartial<QueryCurrentPlanRequest>
  ): QueryCurrentPlanRequest {
    const message = {
      ...baseQueryCurrentPlanRequest,
    } as QueryCurrentPlanRequest;
    return message;
  },

  toJSON(_: QueryCurrentPlanRequest): unknown {
    const obj: any = {};
    return obj;
  },
};

const baseQueryCurrentPlanResponse: object = {};

export const QueryCurrentPlanResponse = {
  encode(
    message: QueryCurrentPlanResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.plan !== undefined) {
      Plan.encode(message.plan, writer.uint32(10).fork()).ldelim();
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryCurrentPlanResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseQueryCurrentPlanResponse
    ) as QueryCurrentPlanResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.plan = Plan.decode(reader, reader.uint32());
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryCurrentPlanResponse {
    const message = globalThis.Object.create(
      baseQueryCurrentPlanResponse
    ) as QueryCurrentPlanResponse;
    if (object.plan !== undefined && object.plan !== null) {
      message.plan = Plan.fromJSON(object.plan);
    } else {
      message.plan = undefined;
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<QueryCurrentPlanResponse>
  ): QueryCurrentPlanResponse {
    const message = {
      ...baseQueryCurrentPlanResponse,
    } as QueryCurrentPlanResponse;
    if (object.plan !== undefined && object.plan !== null) {
      message.plan = Plan.fromPartial(object.plan);
    } else {
      message.plan = undefined;
    }
    return message;
  },

  toJSON(message: QueryCurrentPlanResponse): unknown {
    const obj: any = {};
    message.plan !== undefined &&
      (obj.plan = message.plan ? Plan.toJSON(message.plan) : undefined);
    return obj;
  },
};

const baseQueryAppliedPlanRequest: object = { name: "" };

export const QueryAppliedPlanRequest = {
  encode(
    message: QueryAppliedPlanRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): QueryAppliedPlanRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseQueryAppliedPlanRequest
    ) as QueryAppliedPlanRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.name = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAppliedPlanRequest {
    const message = globalThis.Object.create(
      baseQueryAppliedPlanRequest
    ) as QueryAppliedPlanRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = String(object.name);
    } else {
      message.name = "";
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<QueryAppliedPlanRequest>
  ): QueryAppliedPlanRequest {
    const message = {
      ...baseQueryAppliedPlanRequest,
    } as QueryAppliedPlanRequest;
    if (object.name !== undefined && object.name !== null) {
      message.name = object.name;
    } else {
      message.name = "";
    }
    return message;
  },

  toJSON(message: QueryAppliedPlanRequest): unknown {
    const obj: any = {};
    message.name !== undefined && (obj.name = message.name);
    return obj;
  },
};

const baseQueryAppliedPlanResponse: object = { height: Long.ZERO };

export const QueryAppliedPlanResponse = {
  encode(
    message: QueryAppliedPlanResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).int64(message.height);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryAppliedPlanResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseQueryAppliedPlanResponse
    ) as QueryAppliedPlanResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryAppliedPlanResponse {
    const message = globalThis.Object.create(
      baseQueryAppliedPlanResponse
    ) as QueryAppliedPlanResponse;
    if (object.height !== undefined && object.height !== null) {
      message.height = Long.fromString(object.height);
    } else {
      message.height = Long.ZERO;
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<QueryAppliedPlanResponse>
  ): QueryAppliedPlanResponse {
    const message = {
      ...baseQueryAppliedPlanResponse,
    } as QueryAppliedPlanResponse;
    if (object.height !== undefined && object.height !== null) {
      message.height = object.height as Long;
    } else {
      message.height = Long.ZERO;
    }
    return message;
  },

  toJSON(message: QueryAppliedPlanResponse): unknown {
    const obj: any = {};
    message.height !== undefined &&
      (obj.height = (message.height || Long.ZERO).toString());
    return obj;
  },
};

const baseQueryUpgradedConsensusStateRequest: object = {
  lastHeight: Long.ZERO,
};

export const QueryUpgradedConsensusStateRequest = {
  encode(
    message: QueryUpgradedConsensusStateRequest,
    writer: Writer = Writer.create()
  ): Writer {
    if (!message.lastHeight.isZero()) {
      writer.uint32(8).int64(message.lastHeight);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryUpgradedConsensusStateRequest {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseQueryUpgradedConsensusStateRequest
    ) as QueryUpgradedConsensusStateRequest;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.lastHeight = reader.int64() as Long;
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradedConsensusStateRequest {
    const message = globalThis.Object.create(
      baseQueryUpgradedConsensusStateRequest
    ) as QueryUpgradedConsensusStateRequest;
    if (object.lastHeight !== undefined && object.lastHeight !== null) {
      message.lastHeight = Long.fromString(object.lastHeight);
    } else {
      message.lastHeight = Long.ZERO;
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<QueryUpgradedConsensusStateRequest>
  ): QueryUpgradedConsensusStateRequest {
    const message = {
      ...baseQueryUpgradedConsensusStateRequest,
    } as QueryUpgradedConsensusStateRequest;
    if (object.lastHeight !== undefined && object.lastHeight !== null) {
      message.lastHeight = object.lastHeight as Long;
    } else {
      message.lastHeight = Long.ZERO;
    }
    return message;
  },

  toJSON(message: QueryUpgradedConsensusStateRequest): unknown {
    const obj: any = {};
    message.lastHeight !== undefined &&
      (obj.lastHeight = (message.lastHeight || Long.ZERO).toString());
    return obj;
  },
};

const baseQueryUpgradedConsensusStateResponse: object = {};

export const QueryUpgradedConsensusStateResponse = {
  encode(
    message: QueryUpgradedConsensusStateResponse,
    writer: Writer = Writer.create()
  ): Writer {
    if (message.upgradedConsensusState.length !== 0) {
      writer.uint32(18).bytes(message.upgradedConsensusState);
    }
    return writer;
  },

  decode(
    input: Reader | Uint8Array,
    length?: number
  ): QueryUpgradedConsensusStateResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseQueryUpgradedConsensusStateResponse
    ) as QueryUpgradedConsensusStateResponse;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.upgradedConsensusState = reader.bytes();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): QueryUpgradedConsensusStateResponse {
    const message = globalThis.Object.create(
      baseQueryUpgradedConsensusStateResponse
    ) as QueryUpgradedConsensusStateResponse;
    if (
      object.upgradedConsensusState !== undefined &&
      object.upgradedConsensusState !== null
    ) {
      message.upgradedConsensusState = bytesFromBase64(
        object.upgradedConsensusState
      );
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<QueryUpgradedConsensusStateResponse>
  ): QueryUpgradedConsensusStateResponse {
    const message = {
      ...baseQueryUpgradedConsensusStateResponse,
    } as QueryUpgradedConsensusStateResponse;
    if (
      object.upgradedConsensusState !== undefined &&
      object.upgradedConsensusState !== null
    ) {
      message.upgradedConsensusState = object.upgradedConsensusState;
    } else {
      message.upgradedConsensusState = new Uint8Array();
    }
    return message;
  },

  toJSON(message: QueryUpgradedConsensusStateResponse): unknown {
    const obj: any = {};
    message.upgradedConsensusState !== undefined &&
      (obj.upgradedConsensusState = base64FromBytes(
        message.upgradedConsensusState !== undefined
          ? message.upgradedConsensusState
          : new Uint8Array()
      ));
    return obj;
  },
};

/** Query defines the gRPC upgrade querier service. */
export interface Query {
  /** CurrentPlan queries the current upgrade plan. */
  CurrentPlan(
    request: QueryCurrentPlanRequest
  ): Promise<QueryCurrentPlanResponse>;
  /** AppliedPlan queries a previously applied upgrade plan by its name. */
  AppliedPlan(
    request: QueryAppliedPlanRequest
  ): Promise<QueryAppliedPlanResponse>;
  /**
   * UpgradedConsensusState queries the consensus state that will serve
   * as a trusted kernel for the next version of this chain. It will only be
   * stored at the last height of this chain.
   * UpgradedConsensusState RPC not supported with legacy querier
   */
  UpgradedConsensusState(
    request: QueryUpgradedConsensusStateRequest
  ): Promise<QueryUpgradedConsensusStateResponse>;
}

export class QueryClientImpl implements Query {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  CurrentPlan(
    request: QueryCurrentPlanRequest
  ): Promise<QueryCurrentPlanResponse> {
    const data = QueryCurrentPlanRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.upgrade.v1beta1.Query",
      "CurrentPlan",
      data
    );
    return promise.then((data) =>
      QueryCurrentPlanResponse.decode(new Reader(data))
    );
  }

  AppliedPlan(
    request: QueryAppliedPlanRequest
  ): Promise<QueryAppliedPlanResponse> {
    const data = QueryAppliedPlanRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.upgrade.v1beta1.Query",
      "AppliedPlan",
      data
    );
    return promise.then((data) =>
      QueryAppliedPlanResponse.decode(new Reader(data))
    );
  }

  UpgradedConsensusState(
    request: QueryUpgradedConsensusStateRequest
  ): Promise<QueryUpgradedConsensusStateResponse> {
    const data = QueryUpgradedConsensusStateRequest.encode(request).finish();
    const promise = this.rpc.request(
      "cosmos.upgrade.v1beta1.Query",
      "UpgradedConsensusState",
      data
    );
    return promise.then((data) =>
      QueryUpgradedConsensusStateResponse.decode(new Reader(data))
    );
  }
}

interface Rpc {
  request(
    service: string,
    method: string,
    data: Uint8Array
  ): Promise<Uint8Array>;
}

declare var self: any | undefined;
declare var window: any | undefined;
var globalThis: any = (() => {
  if (typeof globalThis !== "undefined") return globalThis;
  if (typeof self !== "undefined") return self;
  if (typeof window !== "undefined") return window;
  if (typeof global !== "undefined") return global;
  throw "Unable to locate global object";
})();

const atob: (b64: string) => string =
  globalThis.atob ||
  ((b64) => globalThis.Buffer.from(b64, "base64").toString("binary"));
function bytesFromBase64(b64: string): Uint8Array {
  const bin = atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

const btoa: (bin: string) => string =
  globalThis.btoa ||
  ((bin) => globalThis.Buffer.from(bin, "binary").toString("base64"));
function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  for (let i = 0; i < arr.byteLength; ++i) {
    bin.push(String.fromCharCode(arr[i]));
  }
  return btoa(bin.join(""));
}

type Builtin =
  | Date
  | Function
  | Uint8Array
  | string
  | number
  | undefined
  | Long;
export type DeepPartial<T> = T extends Builtin
  ? T
  : T extends Array<infer U>
  ? Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U>
  ? ReadonlyArray<DeepPartial<U>>
  : T extends {}
  ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

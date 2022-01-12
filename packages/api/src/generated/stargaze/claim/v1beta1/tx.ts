/* eslint-disable */
import { Reader, Writer } from "protobufjs/minimal";
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import * as Long from "long";

export const protobufPackage = "publicawesome.stargaze.claim.v1beta1";

export interface MsgInitialClaim {
  sender: string;
}

export interface MsgInitialClaimResponse {
  /** total initial claimable amount for the user */
  claimedAmount: Coin[];
}

const baseMsgInitialClaim: object = { sender: "" };

export const MsgInitialClaim = {
  encode(message: MsgInitialClaim, writer: Writer = Writer.create()): Writer {
    if (message.sender !== "") {
      writer.uint32(10).string(message.sender);
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInitialClaim {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseMsgInitialClaim
    ) as MsgInitialClaim;
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.sender = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInitialClaim {
    const message = globalThis.Object.create(
      baseMsgInitialClaim
    ) as MsgInitialClaim;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = String(object.sender);
    } else {
      message.sender = "";
    }
    return message;
  },

  fromPartial(object: DeepPartial<MsgInitialClaim>): MsgInitialClaim {
    const message = { ...baseMsgInitialClaim } as MsgInitialClaim;
    if (object.sender !== undefined && object.sender !== null) {
      message.sender = object.sender;
    } else {
      message.sender = "";
    }
    return message;
  },

  toJSON(message: MsgInitialClaim): unknown {
    const obj: any = {};
    message.sender !== undefined && (obj.sender = message.sender);
    return obj;
  },
};

const baseMsgInitialClaimResponse: object = {};

export const MsgInitialClaimResponse = {
  encode(
    message: MsgInitialClaimResponse,
    writer: Writer = Writer.create()
  ): Writer {
    for (const v of message.claimedAmount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): MsgInitialClaimResponse {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(
      baseMsgInitialClaimResponse
    ) as MsgInitialClaimResponse;
    message.claimedAmount = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.claimedAmount.push(Coin.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): MsgInitialClaimResponse {
    const message = globalThis.Object.create(
      baseMsgInitialClaimResponse
    ) as MsgInitialClaimResponse;
    message.claimedAmount = [];
    if (object.claimedAmount !== undefined && object.claimedAmount !== null) {
      for (const e of object.claimedAmount) {
        message.claimedAmount.push(Coin.fromJSON(e));
      }
    }
    return message;
  },

  fromPartial(
    object: DeepPartial<MsgInitialClaimResponse>
  ): MsgInitialClaimResponse {
    const message = {
      ...baseMsgInitialClaimResponse,
    } as MsgInitialClaimResponse;
    message.claimedAmount = [];
    if (object.claimedAmount !== undefined && object.claimedAmount !== null) {
      for (const e of object.claimedAmount) {
        message.claimedAmount.push(Coin.fromPartial(e));
      }
    }
    return message;
  },

  toJSON(message: MsgInitialClaimResponse): unknown {
    const obj: any = {};
    if (message.claimedAmount) {
      obj.claimedAmount = message.claimedAmount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.claimedAmount = [];
    }
    return obj;
  },
};

/** Msg defines the Msg service. */
export interface Msg {
  /** this line is used by starport scaffolding # proto/tx/rpc */
  InitialClaim(request: MsgInitialClaim): Promise<MsgInitialClaimResponse>;
}

export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
  }
  InitialClaim(request: MsgInitialClaim): Promise<MsgInitialClaimResponse> {
    const data = MsgInitialClaim.encode(request).finish();
    const promise = this.rpc.request(
      "publicawesome.stargaze.claim.v1beta1.Msg",
      "InitialClaim",
      data
    );
    return promise.then((data) =>
      MsgInitialClaimResponse.decode(new Reader(data))
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

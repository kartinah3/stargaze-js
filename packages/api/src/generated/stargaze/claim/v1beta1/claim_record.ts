/* eslint-disable */
import { Coin } from "../../../cosmos/base/v1beta1/coin";
import { Writer, Reader } from "protobufjs/minimal";
import * as Long from "long";

export const protobufPackage = "publicawesome.stargaze.claim.v1beta1";

export enum Action {
  ActionInitialClaim = 0,
  ActionBuySocialToken = 1,
  ActionMintNFT = 2,
  ActionVote = 3,
  ActionDelegateStake = 4,
  UNRECOGNIZED = -1,
}

export function actionFromJSON(object: any): Action {
  switch (object) {
    case 0:
    case "ActionInitialClaim":
      return Action.ActionInitialClaim;
    case 1:
    case "ActionBuySocialToken":
      return Action.ActionBuySocialToken;
    case 2:
    case "ActionMintNFT":
      return Action.ActionMintNFT;
    case 3:
    case "ActionVote":
      return Action.ActionVote;
    case 4:
    case "ActionDelegateStake":
      return Action.ActionDelegateStake;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Action.UNRECOGNIZED;
  }
}

export function actionToJSON(object: Action): string {
  switch (object) {
    case Action.ActionInitialClaim:
      return "ActionInitialClaim";
    case Action.ActionBuySocialToken:
      return "ActionBuySocialToken";
    case Action.ActionMintNFT:
      return "ActionMintNFT";
    case Action.ActionVote:
      return "ActionVote";
    case Action.ActionDelegateStake:
      return "ActionDelegateStake";
    default:
      return "UNKNOWN";
  }
}

export interface ClaimRecord {
  /** address of claim user */
  address: string;
  /** total initial claimable amount for the user */
  initialClaimableAmount: Coin[];
  /**
   * true if action is completed
   * index of bool in array refers to action enum #
   */
  actionCompleted: boolean[];
}

const baseClaimRecord: object = { address: "", actionCompleted: false };

export const ClaimRecord = {
  encode(message: ClaimRecord, writer: Writer = Writer.create()): Writer {
    if (message.address !== "") {
      writer.uint32(10).string(message.address);
    }
    for (const v of message.initialClaimableAmount) {
      Coin.encode(v!, writer.uint32(18).fork()).ldelim();
    }
    writer.uint32(34).fork();
    for (const v of message.actionCompleted) {
      writer.bool(v);
    }
    writer.ldelim();
    return writer;
  },

  decode(input: Reader | Uint8Array, length?: number): ClaimRecord {
    const reader = input instanceof Uint8Array ? new Reader(input) : input;
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = globalThis.Object.create(baseClaimRecord) as ClaimRecord;
    message.initialClaimableAmount = [];
    message.actionCompleted = [];
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.address = reader.string();
          break;
        case 2:
          message.initialClaimableAmount.push(
            Coin.decode(reader, reader.uint32())
          );
          break;
        case 4:
          if ((tag & 7) === 2) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.actionCompleted.push(reader.bool());
            }
          } else {
            message.actionCompleted.push(reader.bool());
          }
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },

  fromJSON(object: any): ClaimRecord {
    const message = globalThis.Object.create(baseClaimRecord) as ClaimRecord;
    message.initialClaimableAmount = [];
    message.actionCompleted = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = String(object.address);
    } else {
      message.address = "";
    }
    if (
      object.initialClaimableAmount !== undefined &&
      object.initialClaimableAmount !== null
    ) {
      for (const e of object.initialClaimableAmount) {
        message.initialClaimableAmount.push(Coin.fromJSON(e));
      }
    }
    if (
      object.actionCompleted !== undefined &&
      object.actionCompleted !== null
    ) {
      for (const e of object.actionCompleted) {
        message.actionCompleted.push(Boolean(e));
      }
    }
    return message;
  },

  fromPartial(object: DeepPartial<ClaimRecord>): ClaimRecord {
    const message = { ...baseClaimRecord } as ClaimRecord;
    message.initialClaimableAmount = [];
    message.actionCompleted = [];
    if (object.address !== undefined && object.address !== null) {
      message.address = object.address;
    } else {
      message.address = "";
    }
    if (
      object.initialClaimableAmount !== undefined &&
      object.initialClaimableAmount !== null
    ) {
      for (const e of object.initialClaimableAmount) {
        message.initialClaimableAmount.push(Coin.fromPartial(e));
      }
    }
    if (
      object.actionCompleted !== undefined &&
      object.actionCompleted !== null
    ) {
      for (const e of object.actionCompleted) {
        message.actionCompleted.push(e);
      }
    }
    return message;
  },

  toJSON(message: ClaimRecord): unknown {
    const obj: any = {};
    message.address !== undefined && (obj.address = message.address);
    if (message.initialClaimableAmount) {
      obj.initialClaimableAmount = message.initialClaimableAmount.map((e) =>
        e ? Coin.toJSON(e) : undefined
      );
    } else {
      obj.initialClaimableAmount = [];
    }
    if (message.actionCompleted) {
      obj.actionCompleted = message.actionCompleted.map((e) => e);
    } else {
      obj.actionCompleted = [];
    }
    return obj;
  },
};

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

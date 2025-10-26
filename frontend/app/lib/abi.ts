import { Abi } from "starknet";

export const CONTRACT_ABI: Abi = [
  {
    "type": "impl",
    "name": "IntiProgressImpl",
    "interface_name": "intidapp::IIntiProgress"
  },
  {
    "type": "interface",
    "name": "intidapp::IIntiProgress",
    "items": [
      {
        "type": "function",
        "name": "complete_mission",
        "inputs": [
          {
            "name": "points",
            "type": "core::integer::u128"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_progress",
        "inputs": [
          {
            "name": "student",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "event",
    "name": "intidapp::inti_progress::MissionCompleted",
    "kind": "struct",
    "members": [
      {
        "name": "student",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "points_earned",
        "type": "core::integer::u128",
        "kind": "data"
      },
      {
        "name": "total_points",
        "type": "core::integer::u128",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "intidapp::inti_progress::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "MissionCompleted",
        "type": "intidapp::inti_progress::MissionCompleted",
        "kind": "nested"
      }
    ]
  }
];

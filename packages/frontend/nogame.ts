export const ABI = [
  {
    "type": "impl",
    "name": "NoGame",
    "interface_name": "nogame::game::interface::INoGame"
  },
  {
    "type": "enum",
    "name": "core::bool",
    "variants": [
      {
        "name": "False",
        "type": "()"
      },
      {
        "name": "True",
        "type": "()"
      }
    ]
  },
  {
    "type": "enum",
    "name": "nogame::libraries::types::UpgradeType",
    "variants": [
      {
        "name": "SteelMine",
        "type": "()"
      },
      {
        "name": "QuartzMine",
        "type": "()"
      },
      {
        "name": "TritiumMine",
        "type": "()"
      },
      {
        "name": "EnergyPlant",
        "type": "()"
      },
      {
        "name": "Lab",
        "type": "()"
      },
      {
        "name": "Dockyard",
        "type": "()"
      },
      {
        "name": "EnergyTech",
        "type": "()"
      },
      {
        "name": "Digital",
        "type": "()"
      },
      {
        "name": "BeamTech",
        "type": "()"
      },
      {
        "name": "Armour",
        "type": "()"
      },
      {
        "name": "Ion",
        "type": "()"
      },
      {
        "name": "PlasmaTech",
        "type": "()"
      },
      {
        "name": "Weapons",
        "type": "()"
      },
      {
        "name": "Shield",
        "type": "()"
      },
      {
        "name": "Spacetime",
        "type": "()"
      },
      {
        "name": "Combustion",
        "type": "()"
      },
      {
        "name": "Thrust",
        "type": "()"
      },
      {
        "name": "Warp",
        "type": "()"
      }
    ]
  },
  {
    "type": "enum",
    "name": "nogame::libraries::types::BuildType",
    "variants": [
      {
        "name": "Carrier",
        "type": "()"
      },
      {
        "name": "Scraper",
        "type": "()"
      },
      {
        "name": "Celestia",
        "type": "()"
      },
      {
        "name": "Sparrow",
        "type": "()"
      },
      {
        "name": "Frigate",
        "type": "()"
      },
      {
        "name": "Armade",
        "type": "()"
      },
      {
        "name": "Blaster",
        "type": "()"
      },
      {
        "name": "Beam",
        "type": "()"
      },
      {
        "name": "Astral",
        "type": "()"
      },
      {
        "name": "Plasma",
        "type": "()"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::Fleet",
    "members": [
      {
        "name": "carrier",
        "type": "core::integer::u32"
      },
      {
        "name": "scraper",
        "type": "core::integer::u32"
      },
      {
        "name": "sparrow",
        "type": "core::integer::u32"
      },
      {
        "name": "frigate",
        "type": "core::integer::u32"
      },
      {
        "name": "armade",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::PlanetPosition",
    "members": [
      {
        "name": "system",
        "type": "core::integer::u16"
      },
      {
        "name": "orbit",
        "type": "core::integer::u8"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::Tokens",
    "members": [
      {
        "name": "erc721",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "steel",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "quartz",
        "type": "core::starknet::contract_address::ContractAddress"
      },
      {
        "name": "tritium",
        "type": "core::starknet::contract_address::ContractAddress"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::CompoundsLevels",
    "members": [
      {
        "name": "steel",
        "type": "core::integer::u8"
      },
      {
        "name": "quartz",
        "type": "core::integer::u8"
      },
      {
        "name": "tritium",
        "type": "core::integer::u8"
      },
      {
        "name": "energy",
        "type": "core::integer::u8"
      },
      {
        "name": "lab",
        "type": "core::integer::u8"
      },
      {
        "name": "dockyard",
        "type": "core::integer::u8"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::TechLevels",
    "members": [
      {
        "name": "energy",
        "type": "core::integer::u8"
      },
      {
        "name": "digital",
        "type": "core::integer::u8"
      },
      {
        "name": "beam",
        "type": "core::integer::u8"
      },
      {
        "name": "armour",
        "type": "core::integer::u8"
      },
      {
        "name": "ion",
        "type": "core::integer::u8"
      },
      {
        "name": "plasma",
        "type": "core::integer::u8"
      },
      {
        "name": "weapons",
        "type": "core::integer::u8"
      },
      {
        "name": "shield",
        "type": "core::integer::u8"
      },
      {
        "name": "spacetime",
        "type": "core::integer::u8"
      },
      {
        "name": "combustion",
        "type": "core::integer::u8"
      },
      {
        "name": "thrust",
        "type": "core::integer::u8"
      },
      {
        "name": "warp",
        "type": "core::integer::u8"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::Debris",
    "members": [
      {
        "name": "steel",
        "type": "core::integer::u128"
      },
      {
        "name": "quartz",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::ERC20s",
    "members": [
      {
        "name": "steel",
        "type": "core::integer::u128"
      },
      {
        "name": "quartz",
        "type": "core::integer::u128"
      },
      {
        "name": "tritium",
        "type": "core::integer::u128"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::DefencesLevels",
    "members": [
      {
        "name": "celestia",
        "type": "core::integer::u32"
      },
      {
        "name": "blaster",
        "type": "core::integer::u32"
      },
      {
        "name": "beam",
        "type": "core::integer::u32"
      },
      {
        "name": "astral",
        "type": "core::integer::u32"
      },
      {
        "name": "plasma",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::Mission",
    "members": [
      {
        "name": "id",
        "type": "core::integer::u16"
      },
      {
        "name": "time_start",
        "type": "core::integer::u64"
      },
      {
        "name": "destination",
        "type": "core::integer::u16"
      },
      {
        "name": "time_arrival",
        "type": "core::integer::u64"
      },
      {
        "name": "fleet",
        "type": "nogame::libraries::types::Fleet"
      },
      {
        "name": "is_debris",
        "type": "core::bool"
      }
    ]
  },
  {
    "type": "struct",
    "name": "nogame::libraries::types::HostileMission",
    "members": [
      {
        "name": "origin",
        "type": "core::integer::u16"
      },
      {
        "name": "id_at_origin",
        "type": "core::integer::u32"
      },
      {
        "name": "time_arrival",
        "type": "core::integer::u64"
      },
      {
        "name": "number_of_ships",
        "type": "core::integer::u32"
      }
    ]
  },
  {
    "type": "interface",
    "name": "nogame::game::interface::INoGame",
    "items": [
      {
        "type": "function",
        "name": "initializer",
        "inputs": [
          {
            "name": "erc721",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "steel",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "quartz",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "tritium",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "eth",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "owner",
            "type": "core::starknet::contract_address::ContractAddress"
          },
          {
            "name": "uni_speed",
            "type": "core::integer::u128"
          },
          {
            "name": "token_price",
            "type": "core::integer::u128"
          },
          {
            "name": "is_testnet",
            "type": "core::bool"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "upgrade",
        "inputs": [
          {
            "name": "impl_hash",
            "type": "core::starknet::class_hash::ClassHash"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "generate_mint_key",
        "inputs": [
          {
            "name": "secret",
            "type": "core::felt252"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_mint_key",
        "inputs": [
          {
            "name": "account",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [
          {
            "type": "core::felt252"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "generate_planet",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "collect_resources",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "process_compound_upgrade",
        "inputs": [
          {
            "name": "component",
            "type": "nogame::libraries::types::UpgradeType"
          },
          {
            "name": "quantity",
            "type": "core::integer::u8"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "process_tech_upgrade",
        "inputs": [
          {
            "name": "component",
            "type": "nogame::libraries::types::UpgradeType"
          },
          {
            "name": "quantity",
            "type": "core::integer::u8"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "process_ship_build",
        "inputs": [
          {
            "name": "component",
            "type": "nogame::libraries::types::BuildType"
          },
          {
            "name": "quantity",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "process_defence_build",
        "inputs": [
          {
            "name": "component",
            "type": "nogame::libraries::types::BuildType"
          },
          {
            "name": "quantity",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "send_fleet",
        "inputs": [
          {
            "name": "f",
            "type": "nogame::libraries::types::Fleet"
          },
          {
            "name": "destination",
            "type": "nogame::libraries::types::PlanetPosition"
          },
          {
            "name": "is_debris_collection",
            "type": "core::bool"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "attack_planet",
        "inputs": [
          {
            "name": "mission_id",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "recall_fleet",
        "inputs": [
          {
            "name": "mission_id",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "collect_debris",
        "inputs": [
          {
            "name": "mission_id",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "get_token_addresses",
        "inputs": [],
        "outputs": [
          {
            "type": "nogame::libraries::types::Tokens"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_current_planet_price",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_number_of_planets",
        "inputs": [],
        "outputs": [
          {
            "type": "core::integer::u16"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_generated_planets_positions",
        "inputs": [],
        "outputs": [
          {
            "type": "core::array::Array::<nogame::libraries::types::PlanetPosition>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_planet_position",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "nogame::libraries::types::PlanetPosition"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_position_slot_occupant",
        "inputs": [
          {
            "name": "position",
            "type": "nogame::libraries::types::PlanetPosition"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u16"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_last_active",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u64"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_compounds_levels",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "nogame::libraries::types::CompoundsLevels"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_tech_levels",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "nogame::libraries::types::TechLevels"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_debris_field",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "nogame::libraries::types::Debris"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_spendable_resources",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "nogame::libraries::types::ERC20s"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_collectible_resources",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "nogame::libraries::types::ERC20s"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_planet_points",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u128"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_ships_levels",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "nogame::libraries::types::Fleet"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_celestia_available",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u32"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_celestia_production",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "core::integer::u16"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_defences_levels",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "nogame::libraries::types::DefencesLevels"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "is_noob_protected",
        "inputs": [
          {
            "name": "planet1_id",
            "type": "core::integer::u16"
          },
          {
            "name": "planet2_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "core::bool"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_mission_details",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          },
          {
            "name": "mission_id",
            "type": "core::integer::u32"
          }
        ],
        "outputs": [
          {
            "type": "nogame::libraries::types::Mission"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_hostile_missions",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<nogame::libraries::types::HostileMission>"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "get_active_missions",
        "inputs": [
          {
            "name": "planet_id",
            "type": "core::integer::u16"
          }
        ],
        "outputs": [
          {
            "type": "core::array::Array::<nogame::libraries::types::Mission>"
          }
        ],
        "state_mutability": "view"
      }
    ]
  },
  {
    "type": "impl",
    "name": "OwnableImpl",
    "interface_name": "openzeppelin::access::ownable::interface::IOwnable"
  },
  {
    "type": "interface",
    "name": "openzeppelin::access::ownable::interface::IOwnable",
    "items": [
      {
        "type": "function",
        "name": "owner",
        "inputs": [],
        "outputs": [
          {
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "state_mutability": "view"
      },
      {
        "type": "function",
        "name": "transfer_ownership",
        "inputs": [
          {
            "name": "new_owner",
            "type": "core::starknet::contract_address::ContractAddress"
          }
        ],
        "outputs": [],
        "state_mutability": "external"
      },
      {
        "type": "function",
        "name": "renounce_ownership",
        "inputs": [],
        "outputs": [],
        "state_mutability": "external"
      }
    ]
  },
  {
    "type": "constructor",
    "name": "constructor",
    "inputs": []
  },
  {
    "type": "event",
    "name": "nogame::game::main::NoGame::PlanetGenerated",
    "kind": "struct",
    "members": [
      {
        "name": "id",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "position",
        "type": "nogame::libraries::types::PlanetPosition",
        "kind": "data"
      },
      {
        "name": "account",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "nogame::game::main::NoGame::CompoundSpent",
    "kind": "struct",
    "members": [
      {
        "name": "planet_id",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "compound_name",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "quantity",
        "type": "core::integer::u8",
        "kind": "data"
      },
      {
        "name": "spent",
        "type": "nogame::libraries::types::ERC20s",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "nogame::game::main::NoGame::TechSpent",
    "kind": "struct",
    "members": [
      {
        "name": "planet_id",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "tech_name",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "quantity",
        "type": "core::integer::u8",
        "kind": "data"
      },
      {
        "name": "spent",
        "type": "nogame::libraries::types::ERC20s",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "nogame::game::main::NoGame::FleetSpent",
    "kind": "struct",
    "members": [
      {
        "name": "planet_id",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "ship_name",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "quantity",
        "type": "core::integer::u32",
        "kind": "data"
      },
      {
        "name": "spent",
        "type": "nogame::libraries::types::ERC20s",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "nogame::game::main::NoGame::DefenceSpent",
    "kind": "struct",
    "members": [
      {
        "name": "planet_id",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "defence_name",
        "type": "core::felt252",
        "kind": "data"
      },
      {
        "name": "quantity",
        "type": "core::integer::u32",
        "kind": "data"
      },
      {
        "name": "spent",
        "type": "nogame::libraries::types::ERC20s",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "nogame::game::main::NoGame::FleetSent",
    "kind": "struct",
    "members": [
      {
        "name": "time",
        "type": "core::integer::u64",
        "kind": "data"
      },
      {
        "name": "origin",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "destination",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "mission_type",
        "type": "core::felt252",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "nogame::game::main::NoGame::BattleReport",
    "kind": "struct",
    "members": [
      {
        "name": "time",
        "type": "core::integer::u64",
        "kind": "data"
      },
      {
        "name": "attacker",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "attacker_position",
        "type": "nogame::libraries::types::PlanetPosition",
        "kind": "data"
      },
      {
        "name": "attacker_initial_fleet",
        "type": "nogame::libraries::types::Fleet",
        "kind": "data"
      },
      {
        "name": "attacker_fleet_loss",
        "type": "nogame::libraries::types::Fleet",
        "kind": "data"
      },
      {
        "name": "defender",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "defender_position",
        "type": "nogame::libraries::types::PlanetPosition",
        "kind": "data"
      },
      {
        "name": "defender_initial_fleet",
        "type": "nogame::libraries::types::Fleet",
        "kind": "data"
      },
      {
        "name": "defender_fleet_loss",
        "type": "nogame::libraries::types::Fleet",
        "kind": "data"
      },
      {
        "name": "initial_defences",
        "type": "nogame::libraries::types::DefencesLevels",
        "kind": "data"
      },
      {
        "name": "defences_loss",
        "type": "nogame::libraries::types::DefencesLevels",
        "kind": "data"
      },
      {
        "name": "loot",
        "type": "nogame::libraries::types::ERC20s",
        "kind": "data"
      },
      {
        "name": "debris",
        "type": "nogame::libraries::types::Debris",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "nogame::game::main::NoGame::DebrisCollected",
    "kind": "struct",
    "members": [
      {
        "name": "time",
        "type": "core::integer::u64",
        "kind": "data"
      },
      {
        "name": "debris_field_id",
        "type": "core::integer::u16",
        "kind": "data"
      },
      {
        "name": "amount",
        "type": "nogame::libraries::types::Debris",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded",
    "kind": "struct",
    "members": [
      {
        "name": "class_hash",
        "type": "core::starknet::class_hash::ClassHash",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "Upgraded",
        "type": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Upgraded",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
    "kind": "struct",
    "members": [
      {
        "name": "previous_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      },
      {
        "name": "new_owner",
        "type": "core::starknet::contract_address::ContractAddress",
        "kind": "data"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "OwnershipTransferred",
        "type": "openzeppelin::access::ownable::ownable::OwnableComponent::OwnershipTransferred",
        "kind": "nested"
      }
    ]
  },
  {
    "type": "event",
    "name": "openzeppelin::security::reentrancyguard::ReentrancyGuardComponent::Event",
    "kind": "enum",
    "variants": []
  },
  {
    "type": "event",
    "name": "nogame::game::main::NoGame::Event",
    "kind": "enum",
    "variants": [
      {
        "name": "PlanetGenerated",
        "type": "nogame::game::main::NoGame::PlanetGenerated",
        "kind": "nested"
      },
      {
        "name": "CompoundSpent",
        "type": "nogame::game::main::NoGame::CompoundSpent",
        "kind": "nested"
      },
      {
        "name": "TechSpent",
        "type": "nogame::game::main::NoGame::TechSpent",
        "kind": "nested"
      },
      {
        "name": "FleetSpent",
        "type": "nogame::game::main::NoGame::FleetSpent",
        "kind": "nested"
      },
      {
        "name": "DefenceSpent",
        "type": "nogame::game::main::NoGame::DefenceSpent",
        "kind": "nested"
      },
      {
        "name": "FleetSent",
        "type": "nogame::game::main::NoGame::FleetSent",
        "kind": "nested"
      },
      {
        "name": "BattleReport",
        "type": "nogame::game::main::NoGame::BattleReport",
        "kind": "nested"
      },
      {
        "name": "DebrisCollected",
        "type": "nogame::game::main::NoGame::DebrisCollected",
        "kind": "nested"
      },
      {
        "name": "UpgradeableEvent",
        "type": "openzeppelin::upgrades::upgradeable::UpgradeableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "OwnableEvent",
        "type": "openzeppelin::access::ownable::ownable::OwnableComponent::Event",
        "kind": "flat"
      },
      {
        "name": "ReentrancyGuardEvent",
        "type": "openzeppelin::security::reentrancyguard::ReentrancyGuardComponent::Event",
        "kind": "flat"
      }
    ]
  }
] as const;
